import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
 
  fields: [
    {
      name: 'alt',
      label: 'Кратко описание (за снимки)',
      type: 'text',
    },
  ],
}