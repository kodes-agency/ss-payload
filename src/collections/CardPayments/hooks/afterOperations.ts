import { CollectionAfterChangeHook, PayloadRequest } from "payload/types";
import { validateOrderData } from "../../../utilities/cardPaymentUtilities/dataValidations";
import { checkAndUpdateTransaction } from "../../../utilities/cardPaymentUtilities/checkAndUpdateTransaction";

export const afterOperationHook: CollectionAfterChangeHook = async ({
  doc, // arguments passed into the operation
  req,
  operation, // name of the operation
}) => {
  if (operation === "create") {
    try {
      validateOrderData(doc);
      await checkAndUpdateTransaction(req, doc);
      return doc;
    }
    catch (error) {
      console.error("Error processing transaction for order:", doc.ORDER, error);
    }
  }
};
