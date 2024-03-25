import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Файл',
    plural: 'Файлове',
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
    formatOptions: {
        format: 'webp',
        options: {
            quality: 60,
        },
    },

  },
  fields: [
    {
      name: 'alt',
      label: 'Кратко описание (за снимки)',
      type: 'text',
    },
  ],
}