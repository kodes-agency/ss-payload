import type { Block } from 'payload/types'

export const ImgSection: Block = {
    slug: 'img-section',
    labels: {
        singular: 'Секция със снимка',
        plural: 'Секции със снимка',
    },
    fields: [
        {
            name: 'img',
            label: 'Снимка',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'text',
            label: 'Текст',
            type: 'text',
            required: true,
            localized: true,
        }
    ]
}