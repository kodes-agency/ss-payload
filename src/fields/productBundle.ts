import type { Field } from "payload/types";

export const Bundle: Field = {
  type: "array",
  name: "productBundle",
  labels: {
    singular: "Комплект",
    plural: "Комплекти",
  },
  label: "Комплект",
  admin: {
    condition: (data, siblingData) => {
      return data.productType?.productType === "bundle";
    },
    width: "70%",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "product",
          label: "Избери продукт за комплект",
          required: true,
          type: "relationship",
          relationTo: "products",
          filterOptions: ({ relationTo, siblingData }) => {
            return {
              "productType.productType": {
                not_equals: "bundle",
              },
            };
          },
        },
        {
          name: "quantity",
          label: "Брой ботилки от вид",
          type: "number",
          required: true,
          min: 1,
          max: 10,
          admin: {
            step: 1,
            width: "30%",
          },
        },
      ],
    },
  ],
};
