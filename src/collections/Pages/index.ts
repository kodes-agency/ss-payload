import type { CollectionConfig } from 'payload/types'
import { slugField } from '../../fields/pageSlug'
import { HeroSection } from '../../blocks/heroSection'
import { ImgSection } from '../../blocks/imgSection'
import { TextSection } from '../../blocks/textSection'
import { ImgButtonSection } from '../../blocks/imgButtonSection'
import { RelationshipSection } from '../../blocks/relationshipSection'


export const Pages: CollectionConfig = {
    slug: 'pages',
    labels: {
      singular: 'Страница',
      plural: 'Страници',
    },
    access: {
      read: () => true,
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
            type: 'text',
            label: 'Заглавие',
            required: true,
            unique: true,
            localized: true,
            admin: {
              width: '75%',
            }
          },
          slugField,
        ]
      },
      {
        name: 'layout',
        type: 'blocks',
        label: "Съдържание на страницата",
        blocks: [HeroSection, ImgSection, TextSection, ImgButtonSection, RelationshipSection],
      },
    ],
}