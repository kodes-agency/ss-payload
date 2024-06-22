import { getBoricaData } from "./getBoricaData";
import { updateCardPayments } from "./updateCardPayments";

const repeatCodes = ["-40", "-39", "-33", "-31"];

export async function checkAndUpdateTransaction(req, order) {
  try {
    const transactionData = await getBoricaData(order);
    console.log("Transaction data received for order:", order);

    if (repeatCodes.includes(transactionData.RC)) {
      console.log(`Transaction RC (${transactionData.RC}) is in the repeatCodes array. Starting checks.`);
      let intervalId = setInterval(async () => {
        const updatedTransactionData = await getBoricaData(order);
        console.log(`Checking transaction for order: ${order}. Status code: ${updatedTransactionData.RC}`);

        if (!repeatCodes.includes(updatedTransactionData.RC)) {
          clearInterval(intervalId);
          console.log(`Transaction RC (${updatedTransactionData.RC}) is not in the repeatCodes array anymore. Transaction recorded!`);
          await updateCardPayments(req, order, updatedTransactionData);
        }
      }, 20000);

      setTimeout(() => {
        clearInterval(intervalId);
        console.log("Interval cleared after 15 minutes for order:", order);
      }, 900000);
    } else {
      await updateCardPayments(req, order, transactionData);
      console.log(`Transaction RC (${transactionData.RC}) is not in the repeatCodes array. Transaction recorded without looping!`);
    }
  } catch (error) {
    console.error("Error processing transaction for order:", order, error);
  }
}