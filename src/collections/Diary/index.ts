import type { CollectionConfig } from 'payload/types'
import { slugField } from '../../fields/pageSlug'
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical'

export const Diary: CollectionConfig = {
    slug: 'diary',
    labels: {
      singular: "Дневник",
      plural: "Дневник",
    },
    access: {
      read: () => true
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt']
    },
    versions: {
        drafts: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: 'title',
            label: 'Заглавие',
            type: 'text',
            localized: true,
            required: true,
            unique: true,
            admin: {
              width: '50%',
            }
          },
          {
            name: 'publishedAt',
            label: 'Дата на публикуване',
            type: 'date',
            admin: {
              width: '25%'
            },
          },
          slugField,
        ]
      },
      {
        name: 'img',
        label: 'Снимка',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'text',
        localized: true,
        label: 'Текст',
        type: 'richText',
        required: true,
        editor: lexicalEditor({
          features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            // The HTMLConverter Feature is the feature which manages the HTML serializers. If you do not pass any arguments to it, it will use the default serializers.
            HTMLConverterFeature({}),
          ],
        }),
      },
      lexicalHTML('text', { name: 'text_html' }),
    ],
}