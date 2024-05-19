import { CollectionAfterChangeHook, PayloadRequest } from "payload/types";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { getTransactionData } from "../../../utilities/getTransactionData";
import { Payment } from "payload/generated-types";
import { OrderData } from "../../../types/orderType";



const repeatCodes = ["-40", "-33", "-31", "-24"];

async function createOrder(doc: Payment, req: PayloadRequest){

  // @ts-expect-error
  const products = await Promise.all(doc.orderData.items.map(async (orderItem) => {
    const product = await req.payload.findByID({
      collection: 'products',
      id: orderItem.description.replace(/<\/?p>/g, '')
    });

    // Return an object containing the product details
    return {
      product: product.id,
      name: product.productTitle,
      sku: orderItem.sku,
      quantity: orderItem.quantity,
      price_readOnly: Number(orderItem.prices.price),
      price: Number(orderItem.prices.price),
      total: orderItem.totals.total_price,
      product_key: orderItem.id
    };
  }));

  const order = req.payload.create({
    collection: "orders",
    data: {
      // @ts-ignore
      first_name: doc.orderData.billing_address.first_name,
      // @ts-ignore
      last_name: doc.orderData.billing_address.last_name,
      // @ts-ignore
      email: doc.orderData.billing_address.email,
      // @ts-ignore
      phone: doc.orderData.billing_address.phone,
      // @ts-ignore
      address_1: doc.orderData.billing_address.address_1,
      // @ts-ignore
      address_2: doc.orderData.billing_address.address_2,
      // @ts-ignore
      country: doc.orderData.billing_address.country,
      // @ts-ignore
      city: doc.orderData.billing_address.city,
      // @ts-ignore
      postcode: doc.orderData.billing_address.postcode,
      status: "processing",
      // @ts-ignore
      orderTotal: doc.orderData.totals.total_price,
      // @ts-ignore
      customer_note: doc.orderData.customer_note,
      products: products
    },
  });
}

async function setTransactionRecords(
  req: PayloadRequest,
  doc: Payment,
  transactionData: Payment
) {
  console.log(doc)
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

  if(transactionData.ACTION === "0" && transactionData.RC === "00") {
    await createOrder(doc, req);
  }
}


export const afterOperationHook: CollectionAfterChangeHook = async ({
  doc, // arguments passed into the operation
  req,
  operation, // name of the operation
}) => {

  if (operation === "create" ) {
    const transactionData = await getTransactionData(doc.ORDER);
    console.log("trying to update")

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
