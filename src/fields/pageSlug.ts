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
          // @ts-expect-error
          return value = format(data.title)
        }
      }
    }],
  },
};
