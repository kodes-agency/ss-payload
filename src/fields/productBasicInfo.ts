import type { Field } from "payload/types";
import { slugField } from "./productSlug";

export const WineBasicInfo: Field = {
  type: "group",
  label: "Основна информация за продукта",
  name: "productBasicInformation",
  admin: {
    condition: (data, siblingData) => {
       return data.productType?.productType === 'single'
    }
  },
  fields: [
    {
      type: "row",
      fields: [
        // {
        //   name: "wineType",
        //   type: "relationship",
        //   relationTo: "wineType",
        //   label: "Вид вино",
        //   hasMany: false,
        //   required: true,
        // },
        {
          name: "wineSort",
          type: "select",
          label: "Вид вино",
          defaultValue: "collection",
          required: true,
          admin: {
            width: '25%'
          },
          options: [
            { label: "Бели вина", value: "white" },
            { label: "Червени вина", value: "red" },
            { label: "Розе вина", value: "rose" },
            { label: "Колекционни вина", value: "collection" },
          ],
        },
        {
          name: "harvestYear",
          type: "date",
          required: true,
          label: "Реколта",
          admin: {
            date: {
              pickerAppearance: "monthOnly",
              displayFormat: "MMMM yyyy",
            },
          },
        },
      ],
    },
    {
      type: "textarea",
      name: "shortDescription",
      label: "Кратко описание",
      localized: true,
      required: true,
    },
    {
      type: "textarea",
      name: "longDescription",
      label: "Пълно описание",
      localized: true,
      required: true,
    },
    {
      type: "upload",
      name: "img",
      label: "Основна снимка",
      relationTo: "media",
      required: true,
    },
    {
      type: "upload",
      name: "passport",
      label: "Винен паспорт",
      relationTo: "media",
    },
    {
      name: "wineAwards",
      label: "Награди",
      labels: {
        singular: "Награда",
        plural: "Награди",
      },
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "award",
              label: "Име на наградата",
              localized: true,
            },
            {
              name: "year",
              label: "Дата на наградената реколта",
              type: "date",
              admin: {
                date: {
                  pickerAppearance: "monthOnly",
                  displayFormat: "MMMM yyyy",
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
