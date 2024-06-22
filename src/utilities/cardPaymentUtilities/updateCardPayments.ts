import { Payment } from "payload/generated-types";
import { PayloadRequest } from "payload/types";
import CustomAdminError from "../errorClasses";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { sendEmail } from "../email";
import { OrderResponse } from "../../types/orderType";

// Helper function to validate environment variables
function validateEnvVar(variable: string | undefined, name: string): string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return variable;
}

// WooCommerce API configuration
const WooCommerce = new WooCommerceRestApi({
  url: validateEnvVar(process.env.PAYLOAD_PUBLIC_WOO_URL, 'PAYLOAD_PUBLIC_WOO_URL'),
  consumerKey: validateEnvVar(process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY, 'PAYLOAD_PUBLIC_WOO_CONSUMER_KEY'),
  consumerSecret: validateEnvVar(process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET, 'PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET'),
  version: "wc/v3",
});

// Function to get products from the order data
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

// Function to create an order in WooCommerce and Payload CMS
async function createOrder(doc: Payment, req: PayloadRequest) {
  console.log('createOrder function called');

  try {
    // Destructure order data from the payment document
    const { billing_address: billing, shipping_address: shipping, items, customer_note } = doc.orderData as {
      billing_address: any;
      shipping_address: any;
      items: Array<{ id: number; quantity: number }>;
      customer_note: string;
    };

    // Prepare order data for WooCommerce
    const orderData = {
      status: "processing",
      payment_method: "other_payment",
      customer_note: customer_note,
      billing,
      shipping,
      line_items: items.map((orderItem) => ({
        product_id: orderItem.id,
        quantity: orderItem.quantity,
      })),
      set_paid: false,
    };

    console.log('Sending order to WooCommerce');
    const order = await WooCommerce.post("orders", orderData);
    console.log('Order created');
    const orderDataResponse: OrderResponse = order.data;

    // Get products details
    const products = await getProducts(orderDataResponse, req);

    // Create order in Payload CMS
    const payloadOrder = await req.payload.create({
      collection: "orders",
      data: {
        orderId: orderDataResponse.id,
        status: orderDataResponse.status,
        orderDate: orderDataResponse.date_created,
        orderTotal: orderDataResponse.total,
        // @ts-expect-error
        customer_note: doc.orderData.customerNote,
        first_name: orderDataResponse.billing.first_name,
        last_name: orderDataResponse.billing.last_name,
        email: orderDataResponse.billing.email,
        phone: orderDataResponse.billing.phone,
        address_1: orderDataResponse.billing.address_1,
        address_2: orderDataResponse.billing.address_2
          ? `Наименование: ${orderDataResponse.billing.address_2}, \nЕИК: ${orderDataResponse.billing.company}, \nДържава на регистрация: ${orderDataResponse.shipping.address_2}, \nАдрес на регистрация: ${orderDataResponse.shipping.company}`
          : "",
        country: orderDataResponse.billing.country,
        city: orderDataResponse.billing.city,
        postcode: orderDataResponse.billing.postcode,
        products: products,
        transaction: doc.id,
      },
    });

    // Send confirmation email
    await sendEmail(req, {
      lang: doc.LANG,
      operation: 'processing',
      orderNumber: orderDataResponse.id,
      firstName: orderDataResponse.billing.first_name,
      lastName: orderDataResponse.billing.last_name,
      email: orderDataResponse.billing.email,
      phone: orderDataResponse.billing.phone,
      orderTotal: orderDataResponse.total,
      paymentMethod: 'Credit/Debit card',
      products: products,
      orderLink: `https://api.santa-sarah.com/admin/collections/orders/${payloadOrder.id}`,
    });

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    const errorStatus = error.response?.data?.data?.status || 500;
    throw new CustomAdminError(errorMessage, errorStatus);
  }
}

// Function to update card payments
export async function updateCardPayments(
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

  // Create an order if the transaction is successful
  if (transactionData.ACTION === "0" && transactionData.RC === "00") {
    await createOrder(doc, req);
  }
}
