import type { Field } from "payload/types";

export const ProductImage: Field = {
  type: 'group',
  admin: {
    condition: (data, siblingData) => {
      return data.productType?.productType === "other" || data.productType?.productType === "bundle";
    },
  },
  name: 'productImage',
  label: false,
  fields: [
    {
      type: 'upload',
      name: 'productImage',
      label: 'Снимка на продукта',
      relationTo: 'media',
    }
  ]
};
