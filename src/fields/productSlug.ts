import type { Field, FieldHook } from "payload/types";
// import formatSlug from "../utilities/formatSlug";
import { format } from "../utilities/formatSlug";

export const slugField: Field = {
  name: "slug",
  label: "URL опашка",
  type: "text",
  index: true,
  admin: {
    readOnly: true,
    width: "25%",
  },
  hooks: {
    beforeValidate: [({data, value, req: {locale}, operation}): FieldHook => {
      if(operation === 'create' || operation === "update") {
        if(locale !== 'bg') {
        let preFormattedSlug = `${data?.productTitle} ${data?.productBasicInformation?.harvestYear ? new Date(data?.productBasicInformation?.harvestYear).getFullYear() : ""} ${data?.stockManagement?.volume === "0" ? "" : data?.stockManagement?.volume}`
        // @ts-expect-error
        return value = format(preFormattedSlug)
        }
      }
    }],
  },
};
