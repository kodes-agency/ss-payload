import { CollectionAfterChangeHook } from "payload/types";
import { sendEmail } from "../../../utilities/email";


export const afterChange: CollectionAfterChangeHook = async ({
    doc, // arguments passed into the operation
    req,
    operation, // name of the operation
  }) => {
    if (operation === "create") {
        await sendEmail(req, {
            operation: "b2b",
            lang: "bg",
            name: doc.contactName,
            email: doc.email,
            companyName: doc.companyName,
            phone: doc.phone,
            request: doc.message
        })
    }
}
