import type { CollectionConfig } from 'payload/types'
import { afterChange } from './hooks/afterCreate'

export const Messages: CollectionConfig = {
    slug: 'messages',
    labels: {
      singular: 'Съобщение',
      plural: 'Съобщения',
    },
    hooks: {
      afterChange: [afterChange],
    },
    access: {
      create: () => true,
    },
    admin: {
        useAsTitle: 'contactName',
        defaultColumns: ['contactName', 'companyName','updatedAt']
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: 'contactName',
            label: 'Имена',
            type: 'text',
            admin: {
              width: '25%',
              readOnly: true
            }
          },
          {
            name: 'companyName',
            label: 'Фирма',
            type: 'text',
            admin: {
              width: '25%',
              readOnly: true
            },
          },
          {
            name: 'phone',
            label: 'Телефон',
            type: 'text',
            admin: {
              width: '25%',
              readOnly: true
            },
          },
          {
            name: 'email',
            label: 'Имейл',
            type: 'text',
            admin: {
              width: '25%',
              readOnly: true
            },
          },
        ]
      },
      {
        name: 'message',
        label: 'Запитване',
        type: 'textarea',
        admin: {
            readOnly: true
        }
      }
    ],
}