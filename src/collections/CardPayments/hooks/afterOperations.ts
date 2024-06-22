import { CollectionAfterChangeHook, PayloadRequest } from "payload/types";
import { validateOrderData } from "../../../utilities/cardPaymentUtilities/dataValidations";
import { checkAndUpdateTransaction } from "../../../utilities/cardPaymentUtilities/checkAndUpdateTransaction";

export const afterOperationHook: CollectionAfterChangeHook = async ({
  doc, // arguments passed into the operation
  req,
  operation, // name of the operation
}) => {
  if (operation === "create") {
    validateOrderData(doc);
    await checkAndUpdateTransaction(req, doc.ORDER);
  }

  return await doc;
};
