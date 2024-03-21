import type { Block } from 'payload/types'

export const HeroSection: Block = {
    slug: 'hero-section',
    labels: {
        singular: 'Заглавна секция',
        plural: 'Заглавни секции',
    },
    fields: [
        {
            name: 'backgroundImg',
            label: 'Изображение за фон',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            label: 'Заглавие и подзаглавие',
            type: 'collapsible', 
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: 'title',
                    label: 'Заглавие',
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'subtitle',
                    label: 'Подзаглавие',
                    type: 'text',
                    localized: true,
                }
            ]
        }
    ]
}