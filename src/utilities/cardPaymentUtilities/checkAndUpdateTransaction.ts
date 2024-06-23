import { PayloadRequest } from "payload/types";
import { getBoricaData } from "./getBoricaData";
import { updateCardPayments } from "./updateCardPayments";
import { Payment } from "payload/generated-types";

const repeatCodes = ["-40", "-39", "-33", "-31"];

export async function checkAndUpdateTransaction(req: PayloadRequest, doc: Payment) {
  const order = doc.ORDER;
  try {
    const transactionData = await getBoricaData(order);
    console.log("Transaction data received for order:", order);

    // if (repeatCodes.includes(transactionData.RC)) {
      if (transactionData.RC.includes("-")) {
      console.log(`Transaction RC (${transactionData.RC}) is in the repeatCodes array. Starting checks.`);
      let intervalId = setInterval(async () => {
        const updatedTransactionData = await getBoricaData(order);
        console.log(`Checking transaction for order: ${order}. Status code: ${updatedTransactionData.RC}`);

        if (!transactionData.RC.includes("-")) {
          clearInterval(intervalId);
          console.log(`Transaction RC (${updatedTransactionData.RC}) is not in the repeatCodes array anymore. Transaction recorded!`);
          await updateCardPayments(req, doc, updatedTransactionData);
        }
      }, 10000);

      setTimeout(() => {
        clearInterval(intervalId);
        console.log("Interval cleared after 15 minutes for order:", order);
      }, 900000);
    } else {
      await updateCardPayments(req, doc, transactionData);
      console.log(`Transaction RC (${transactionData.RC}) is not in the repeatCodes array. Transaction recorded without looping!`);
    }
  } catch (error) {
    console.error("Error processing transaction for order:", order, error);
  }
}