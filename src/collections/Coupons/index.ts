import type { CollectionConfig } from "payload/types";
import { createUpdateCoupon } from "./hooks/createUpdate";
import { deleteCoupon } from "./hooks/delete";
import { metaData } from "./hooks/metaData";

export const Coupons: CollectionConfig = {
  slug: "coupons",
  labels: {
    singular: "Код за отстъпка",
    plural: "Кодове за отстъпка",
  },
  admin: {
    useAsTitle: "code",
    defaultColumns: ["code", "discount", "updatedAt"],
  },
  hooks: {
    beforeChange: [createUpdateCoupon],
    beforeDelete: [deleteCoupon],
    afterChange: [metaData]
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "code",
          type: "text",
          label: "Code",
          required: true,
          unique: true,
          admin: {
            width: "33.33%",
          },
        },
        {
          name: "amount",
          type: "number",
          label: "Amount",
          required: true,
          min: 1,
          admin: {
            step: 0.01,
            width: "33.33%",
          },
        },
        {
          name: "discount_type",
          label: "Discount Type",
          type: "select",
          required: true,
          defaultValue: 'fixed_cart',
          admin: {
            width: "33.33%",
          },
          options: [
            { label: "Percentage", value: "percent" },
            { label: "Fixed", value: "fixed_cart" },
          ],
        },
      ],
    },
    {
      type: 'number',
      name: 'couponId',
      label: 'Coupon ID',
      admin: {
        readOnly: true,
      }
    },
    {
      type: "collapsible",
      label: "Usage Restrictions",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: "date_expires",
              type: "date",
              label: "Expiry Date",
            },
            {
              name: "product_ids",
              type: "relationship",
              label: "Only for section products",
              relationTo: "products",
              hasMany: true,
            },
            {
              name: 'minimum_amount',
              type: 'number',
              label: 'Minimum Order Amount',
            }
          ],
        }
      ]
    }
  ],
};
