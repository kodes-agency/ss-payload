import { CollectionAfterChangeHook, PayloadRequest } from "payload/types";
import { getTransactionData } from "../../../utilities/getTransactionData";
import { Payment } from "payload/generated-types";

const repeatCodes = ["-40", "-33", "-31", "-24"];

async function setTransactionRecords(
  req: PayloadRequest,
  id: string,
  transactionData: Payment
) {
    console.log("Setting transaction records");
  await req.payload.update({
    req,
    collection: "payments",
    id: id,
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
        await setTransactionRecords(req, doc.id, transactionData);
        console.log("Waiting for transaction data");
        // If the transactionData.ACTION is one of the specified values, clear the interval
        if (!repeatCodes.includes(transactionData.RC)) {
          clearInterval(intervalId);
          await setTransactionRecords(req, doc.id, transactionData);
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
    //   await setTransactionRecords(payload, doc.id, transactionData);
      console.log("Transaction is not -40 or -24 or -33 or -31");
    }
  }

  return await doc;
};
