import type { Block } from 'payload/types'
import { TitleBlock, SubTitleBlock, TextBlock, ImgBlock, ButtonBlock, PolicyBlock } from './innerTextBlocks/index'

export const TextSection: Block = {
    slug: 'text-section',
    labels: {
        singular: 'Текстова секция',
        plural: 'Текстови секции',
    },
    fields: [
        {
            name: 'blocks',
            type: 'blocks',
            labels: {
                singular: 'Блок',
                plural: 'Блокове',
            },
            blocks: [TitleBlock, SubTitleBlock, TextBlock, ImgBlock, ButtonBlock, PolicyBlock],
            required: true,
        },
        {
            type: 'collapsible',
            label: "Допълнителни полета",
            admin: {
                initCollapsed: false,
            },
            fields: [
                {
                    type: 'text',
                    name: 'anchor',
                    label: 'Котва',
                }
            ]
        }
    ]
}