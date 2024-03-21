import type { Block } from 'payload/types'

export const ImgButtonSection: Block = {
    slug: 'img-button-section',
    labels: {
        singular: 'Секция със снимка и бутон',
        plural: 'Секции със снимка и бутон',
    },
    fields: [
        {
            type: 'array',
            name: 'imgButtonBlock',
            label: 'Блок със снимка и бутон',
            labels: {
                singular: 'Блок със снимка и бутон',
                plural: 'Блок със снимка и бутон',
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
                    name: 'linkText',
                    label: 'Текст на бутона',
                    type: 'text',
                    localized: true,
                    required: true,
                },
                {
                    name: 'link',
                    label: 'Линк на бутона',
                    type: 'text',
                    required: true,
                }
            ]
        },
    ]
}