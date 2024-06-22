import { CollectionAfterChangeHook} from "payload/types";
import { validateOrderData } from "../../../utilities/cardPaymentUtilities/dataValidations";
import { checkAndUpdateTransaction } from "../../../utilities/cardPaymentUtilities/checkAndUpdateTransaction";
import { APIError } from "payload/errors";

export const afterChange: CollectionAfterChangeHook = async ({
  doc, // arguments passed into the operation
  req,
  operation, // name of the operation
}) => {
  if (operation === "create") {
    // console.log(req)
    try {
      validateOrderData(doc);
      await checkAndUpdateTransaction(req, doc);
      console.log("Order created");
      return doc;
    }
    catch (error) {
      console.error("Error processing transaction for order:", doc.ORDER, error);
      throw new APIError(`Error processing transaction for order: ${doc.ORDER}`,400);
    }
  }
};
