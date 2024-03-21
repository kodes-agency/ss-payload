import { CollectionConfig } from 'payload/types'

export const ProductCategory: CollectionConfig = {
  slug: 'productCategory',

  access: {
    create: ({req: {user}}) => user && user.role === 'admin',
    read: () => true,
    update: ({req: {user}}) => user && user.role === 'admin',
    delete: ({req: {user}}) => user && user.role === 'admin',
    
  },
  admin: {
    useAsTitle: 'label',
  },
  labels: {
    singular: 'Продуктова категория',
    plural: 'Продуктови категории',
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