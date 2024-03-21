import { CollectionConfig } from 'payload/types'

export const WineType: CollectionConfig = {
  slug: 'wineType',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'label',
  },
  labels: {
    singular: 'Вид Вино',
    plural: 'Видове Вина',
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