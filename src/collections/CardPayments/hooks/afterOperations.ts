import { CollectionAfterChangeHook, PayloadRequest } from "payload/types";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { getTransactionData } from "../../../utilities/getTransactionData";
import { Payment } from "payload/generated-types";
import { OrderResponse } from "../../../types/orderType";
import CustomAdminError from "../../../utilities/errorClasses";

const repeatCodes = ["-40", "-33", "-31", "-24"];

async function createOrder(doc: Payment, req: PayloadRequest) {
  console.log('createOrder function called'); // Log when the function is called
  try {
    const WooCommerce = new WooCommerceRestApi({
      url: validateEnvVar(process.env.PAYLOAD_PUBLIC_WOO_URL, 'PAYLOAD_PUBLIC_WOO_URL'),
      consumerKey: validateEnvVar(process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY, 'PAYLOAD_PUBLIC_WOO_CONSUMER_KEY'),
      consumerSecret: validateEnvVar(process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET, 'PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET'),
      version: "wc/v3",
    });

    // @ts-expect-error
    const { billing_address: billing, shipping_address: shipping, items } = doc.orderData;
    console.log('Order data'); // Log the order data

    const orderData = {
      status: "processing",
      paymnet_method: "other_payment",
      customer_note: "note",
      billing,
      shipping,
      line_items: items.map((orderItem) => ({
        product_id: orderItem.id,
        quantity: orderItem.quantity,
      })),
      set_paid: false,
    };

    console.log('Sending order to WooCommerce'); // Log before sending the order
    const order = await WooCommerce.post("orders", orderData);
    console.log('Order created'); // Log the created order
    const orderDataResponse: OrderResponse = order.data;

    const products = await getProducts(orderDataResponse, req);

    await req.payload.create({
      collection: "orders",
      data: {
        orderId: orderDataResponse.id,
        status: orderDataResponse.status,
        orderDate: orderDataResponse.date_created,
        orderTotal: orderDataResponse.total,
        customer_note: orderDataResponse.customer_note,
        first_name: orderDataResponse.billing.first_name,
        last_name: orderDataResponse.billing.last_name,
        email: orderDataResponse.billing.email,
        phone: orderDataResponse.billing.phone,
        address_1: orderDataResponse.billing.address_1,
        address_2: orderDataResponse.billing.address_2,
        country: orderDataResponse.billing.country,
        city: orderDataResponse.billing.city,
        postcode: orderDataResponse.billing.postcode,
        products: products,
      },
    });
  } catch (error) {
    throw new CustomAdminError(
      error.response?.data?.message,
      error.response?.data?.data?.status
    );
  }
}

function validateEnvVar(variable: string | undefined, name: string): string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return variable;
}

async function getProducts(orderData: OrderResponse, req: PayloadRequest) {
  const productsPromise = orderData.line_items.map(async (lineItem) => {
    const productIds = await req.payload.find({
      collection: "products",
      where: {
        productId: { equals: lineItem.product_id },
      },
    });

    return {
      product: productIds.docs[0].id,
      sku: lineItem.sku,
      quantity: lineItem.quantity,
      price: lineItem.price,
      price_readOnly: lineItem.price,
      total: lineItem.total,
      product_key: lineItem.id,
    };
  });

  return await Promise.all(productsPromise);
}

async function setTransactionRecords(
  req: PayloadRequest,
  doc: Payment,
  transactionData: Payment
) {

  await req.payload.update({
    req,
    collection: "payments",
    id: doc.id,
    data: {
      ACTION: transactionData.ACTION,
      STATUSMSG: transactionData.STATUSMSG,
      RC: transactionData.RC,
      AMOUNT: transactionData.AMOUNT,
      CURRENCY: transactionData.CURRENCY,
      ORDER: transactionData.ORDER,
      DESC: transactionData.DESC,
      TIMESTAMP: transactionData.TIMESTAMP,
      LANG: transactionData.LANG,
      TRAN_TRTYPE: transactionData.TRAN_TRTYPE,
      RRN: transactionData.RRN,
      INT_REF: transactionData.INT_REF,
      PARES_STATUS: transactionData.PARES_STATUS,
      AUTH_STEP_RES: transactionData.AUTH_STEP_RES,
      CARDHOLDERINFO: transactionData.CARDHOLDERINFO,
      ECI: transactionData.ECI,
      CARD: transactionData.CARD,
      CARD_BRAND: transactionData.CARD_BRAND,
    },
  });

  if (transactionData.ACTION === "0" && transactionData.RC === "00") {
    await createOrder(doc, req);
  }
}

export const afterOperationHook: CollectionAfterChangeHook = async ({
  doc, // arguments passed into the operation
  req,
  operation, // name of the operation
}) => {
  if (operation === "create") {
    const transactionData = await getTransactionData(doc.ORDER);
    console.log("trying to update");

    if (repeatCodes.includes(transactionData.RC)) {
      let intervalId: NodeJS.Timeout;
      const checkTransactionData = async () => {
        const transactionData = await getTransactionData(doc.ORDER);
        await setTransactionRecords(req, await doc, transactionData);
        console.log("Waiting for transaction data");
        // If the transactionData.ACTION is one of the specified values, clear the interval
        if (!repeatCodes.includes(transactionData.RC)) {
          clearInterval(intervalId);
          await setTransactionRecords(req, await doc, transactionData);
          console.log("Transaction found");
        }
      };

      // Start the interval
      intervalId = setInterval(checkTransactionData, 20000);

      // Clear the interval after 15 minutes (900000 milliseconds)
      setTimeout(() => {
        clearInterval(intervalId);
        console.log("Interval cleared after 15 minutes");
      }, 900000);
    } else {
      await setTransactionRecords(req, await doc, transactionData);
      console.log("Transaction is not -40 or -24 or -33 or -31");
    }
  }

  return await doc;
};
