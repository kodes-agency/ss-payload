import { CollectionAfterChangeHook } from "payload/types";
import { getTransactionData } from "../../../utilities/getTransactionData";
import { Payload } from "payload";
import { Payment } from "payload/generated-types";

const repeatCodes = ["-40", "-33", "-31", "-24"];

async function setTransactionRecords(
  payload: Payload,
  id: string,
  transactionData: Payment
) {
  await payload.update({
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
  req: { payload },
  operation, // name of the operation
}) => {
  if (operation === "create" || operation === "update") {
    const transactionData = await getTransactionData(doc.ORDER);

    if (repeatCodes.includes(transactionData.RC)) {
      let intervalId: NodeJS.Timeout;
      const checkTransactionData = async () => {
        const transactionData = await getTransactionData(doc.ORDER);
        setTransactionRecords(payload, doc.id, transactionData);
        console.log("Waiting for transaction data");
        // If the transactionData.ACTION is one of the specified values, clear the interval
        if (!repeatCodes.includes(transactionData.RC)) {
          clearInterval(intervalId);
          setTransactionRecords(payload, doc.id, transactionData);
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
      setTransactionRecords(payload, doc.id, transactionData);
      console.log("Transaction is not -40 or -24 or -33 or -31");
    }
  }

  return await doc;
};
