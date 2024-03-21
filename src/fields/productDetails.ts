import type { Field } from 'payload/types'

export const WineDetails: Field = {
  name: 'wineDetails',
  label: 'Характеристики на виното',
  admin: {
    condition: (data, siblingData) => {
       return data.productType?.productType === 'single'
    }
  },
  type: 'group',
  fields: [
    {
        type: 'row',
        fields: [
            {
                name: 'alchoholContent',
                label: 'Съдържание на алкохол',
                type: 'number',
                admin: {
                    step: 0.1,
                },
            },
            {
                name: 'acidContent',
                label: 'Съдържание на киселини',
                type: 'number',
                admin: {
                    step: 0.1,
                },
            },
            {
                name: 'sugarContent',
                label: 'Съдържание на захар',
                type: 'number',
                admin: {
                    step: 0.1,
                },
            },
        ]
    },
    {
        type: 'row',
        fields: [
            {
                name: 'temperatureC',
                label: 'Оптимална температура (C)',
                type: 'number',
                admin: {
                    step: 1,
                },
            },
            {
                name: 'temperatureF',
                label: 'Оптимална температура (F)',
                type: 'number',
                admin: {
                    step: 1,
                },
            },
        ]
    },
    {
        type: 'row',
        fields: [
            // {
            //     name: 'closingType',
            //     label: 'Вид капачка',
            //     type: 'relationship',
            //     relationTo: 'wineCap',
            // },
            {
                name: 'bottleClosingType',
                label: 'Вид затваряне на бутилката',
                type: 'select',
                defaultValue: 'diam5',
                options: [
                    { label: 'Винт', value: 'screwcap' },
                    { label: 'Естествен корк', value: 'cork' },
                    { label: 'Стъклена капачка', value: 'vinolok' },
                    { label: 'DIAM5', value: 'diam5' },
                ],
            },
            {
                name: 'yearBottled',
                label: 'Година на бутилиране',
                type: 'date',
                admin: {
                    date: {
                        pickerAppearance: 'monthOnly',
                        displayFormat: 'MMMM yyyy'
                    }
                }
            },
        ]
    },
    {
        type: 'array',
        name: 'volumeAndQuantity',
        labels: {
            singular: 'Количество и обем на бутилката',
            plural: 'Количество и обем на бутилките',
        },
        label: 'Количество и обем на бутилките',
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        name: 'volume',
                        label: 'Обем на бутилката (ml)',
                        type: 'number',
                        admin: {
                            step: 1,
                        },
                    },
                    {
                        name: 'quantity',
                        label: 'Количество',
                        type: 'number',
                        admin: {
                            step: 1,
                        },
                    },
                ]
            }
        ]
    }
  ],
}
