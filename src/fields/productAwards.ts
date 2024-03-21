import type { Field } from 'payload/types'

export const WineAwards: Field = {
  name: 'wineAwards',
  label: 'Награди',
  type: 'array',
  fields: [
    {
      type: 'text',
      name: 'award',
      label: 'Име на наградата',
      localized: true,
    },
    {
      name: 'year',
      label: 'Дата на наградената реколта',
      type: 'date',
      admin: {
          date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMMM yyyy'
          }
      }
    },
  ],
}
