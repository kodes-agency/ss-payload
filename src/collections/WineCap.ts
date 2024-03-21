import { CollectionConfig } from 'payload/types'

export const WineCap: CollectionConfig = {
  slug: 'wineCap',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'label',
  },
  labels: {
    singular: 'Вид затваряне',
    plural: 'Видове затваряне',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          label: 'Наименование',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'value',
          label: 'Стойност',
          type: 'text',
          required: true,
          unique: true,
        }
      ]
    },
  ],
}