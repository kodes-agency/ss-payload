import type { CollectionConfig } from "payload/types";
import { Country } from "../../fields/country";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import CustomAdminError from "../../utilities/errorClasses";
import { deleteOrder } from "./hooks/delete";
import { manageOrders } from "./hooks/manageOrders";



export const Orders: CollectionConfig = {
  slug: "orders",
  labels: {
    singular: "Поръчка",
    plural: "Поръчки",
  },
  admin: {
    useAsTitle: "last_name",
    defaultColumns: ["last_name", "status", "orderTotal", "orderDate", "orderId"],
  },
  versions: {
    drafts: true,
  },
  access: {
    create: ({ req }) => req.user && req.user.role === "admin" || req.user.role === "editor",
    read: ({ req }) => req.user && req.user.role === "admin" || req.user.role === "editor",
    update: ({ req }) => req.user && req.user.role === "admin" || req.user.role === "editor",
    delete: ({ req }) => req.user && req.user.role === "admin" || req.user.role === "editor",
  },
  hooks: {
    beforeDelete: [deleteOrder],
    beforeOperation: [manageOrders]
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          type: "text",
          name: "orderTotal",
          label: "Обща сума",
          admin: {
            readOnly: true,
          },
        },
        {
          type: "text",
          name: "orderId",
          label: "Поръчка №",
          admin: {
            readOnly: true,
          },
        },
        {
          type: "date",
          name: "orderDate",
          label: "Дата на поръчка",
          admin: {
            readOnly: true,
            date: {
              displayFormat: "d MMM yyy",
            }
          },
        },
        {
          type: "select",
          name: "status",
          label: "Статус",
          defaultValue: "processing",
          required: true,
          admin: {
            width: "25%",
          },
          options: [
            {
              label: "В очакване на плащане",
              value: "pending",
            },
            {
              label: "В процес на обработка",
              value: "processing",
            },
            {
              label: "Завършена поръчка",
              value: "completed",
            },
            {
              label: "Провалена поръчка",
              value: "failed",
            },
            {
              label: "Отказана поръчка",
              value: "cancelled",
            },
          ],
        },
      ],
    },
    {
      type: "textarea",
      name: "customer_note",
      label: "Бележка от клиента",
    },
    {
      type: "collapsible",
      label: "Информация за клиента",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "first_name",
              label: "Име",
              required: true,
            },
            {
              type: "text",
              name: "last_name",
              label: "Фамилия",
              required: true,
            },
            {
              type: "text",
              name: "email",
              label: "Имейл",
              required: true,
            },
            {
              type: "text",
              name: "phone",
              label: "Телефонен номер",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            Country,
            {
              type: "text",
              name: "city",
              label: "Град",
              required: true,
            },
            {
              type: "text",
              name: "postcode",
              label: "Пощенски код",
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "address_1",
              label: "Адрес",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "products",
      labels: {
        singular: "Продукт",
        plural: "Продукти",
      },
      label: "Продукти",
      hooks: {
        beforeChange: [async ({value, previousValue, data})=>{
          if(previousValue) {
            const removedProducts = previousValue.filter(product => 
              !value.find(updatedProduct => updatedProduct.id === product.id)
            );
  
            const WooCommerce = await new WooCommerceRestApi({
              url: process.env.PAYLOAD_PUBLIC_WOO_URL,
              consumerKey: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY,
              consumerSecret: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET,
              version: "wc/v3",
            })
  
            await WooCommerce.put(`orders/${data.orderId}`, {
              line_items: removedProducts.map(product => {
                return {
                  id: product.product_key,
                  quantity: 0,
                }
              })
            })
          }

        }],
          beforeValidate: [async ({value}) => {
            const productIds = value.map(product => product.product);
            const uniqueProductIds = new Set(productIds);
            if(productIds.length !== uniqueProductIds.size){
              throw new CustomAdminError("Duplicate products are not allowed in the same order. If you want to adjust the quantity, please use the original product entry", 400);
            }
          }
        ],
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "relationship",
              name: "product",
              label: "Продукт",
              relationTo: "products",
              unique: false,
              required: true,
              filterOptions: () => {
                return {
                  productId: { exists: true }
                }
              },
              admin: {
                width: "40%",
              },
            },
            {
              type: "text",
              name: "sku",
              label: "SKU номер",
              admin: {
                readOnly: true,
                width: "15%",
              },
            },
            {
              type: "number",
              name: "quantity",
              label: "Количество",
              min: 1,
              required: true,
              admin: {
                width: "15%",
                step: 1,
              },
            },
            {
              type: "number",
              name: "price_readOnly",
              label: "Ед. цена",
              admin: {
                hidden: true,
                condition: (data, siblingData ) => {
                  return !siblingData.isDiscounted
                },
                width: "15%",
              },
            },
            {
              type: "number",
              name: "price",
              label: "Ед. цена",
              required: true,
              min: 0,
              admin: {
                condition: (data, siblingData ) => {
                  return siblingData.isDiscounted
                },
                step: 0.01,
                width: "15%",
              }
            },
            {
              type: "text",
              name: "total",
              label: "Общо",
              admin: {
                readOnly: true,
                width: "15%",
              }
            },
          ],
        },
        {
          type: "checkbox",
          name: "isDiscounted",
          label: "Промени цена",
        },
        {
          type: 'number',
          name: 'product_key',
          label: 'ID',
          admin: {
            readOnly: true,
            hidden: true,
          },
          }
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: "collapsible",
          label: "Информация за плащането",
          fields: [
            {
              type: "row",
              fields: [
                {
                  type: "text",
                  name: "payment_method_title",
                  label: "Метод на плащане",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "transaction_id",
                  label: "Транцацкион №",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "date",
                  name: "date_paid",
                  label: "Дата на плащане",
                  admin: {
                    readOnly: true,
                  },
                },
              ],
            },
          ],
        },
        // {
        //   type: "collapsible",
        //   label: "Код за отстъпка",
        //   fields: [
        //     {
        //       type: "relationship",
        //       name: "coupons",
        //       label: "Кодове",
        //       relationTo: "coupons",
        //       hasMany: true,
        //     },
        //   ],
        // },
      ]
    }
  ],
};
