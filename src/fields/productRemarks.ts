import type { Field } from 'payload/types'

export const WineRemarks: Field = {
  name: 'wineRemarks',
  label: 'Допълнителна информация',
  type: 'group',
  admin: {
    condition: (data, siblingData) => {
       return data.productType?.productType === 'single'
    }
  },
  fields: [
    {
        type: 'textarea',
        name: 'vinification',
        label: 'Винификация',
        localized: true,
    },
    {
        type: 'textarea',
        name: 'maturation',
        label: 'Матурация',
        localized: true,
    },
    {
        type: 'textarea',
        name: 'degustation',
        label: 'Дегустационни бележки',
        localized: true,
    },
    {
        type: 'textarea',
        name: 'food',
        label: 'Съчетание с храна',
        localized: true,
    },
  ],
}
