import type { Block } from 'payload/types'

const ProductRelationship: Block = { 
    slug: 'product-relationship',
    labels: {
        singular: 'Връзка към продукт',
        plural: 'Връзки към продукти',
    },
    fields: [
        {
            name: 'product',
            label: 'Продукт',
            type: 'relationship',
            relationTo: 'products',
            minRows: 1,
            maxRows: 3,
            hasMany: true,
        },
    ]
}

const NewsRelationship: Block = { 
    slug: 'news-relationship',
    labels: {
        singular: 'Връзка към новина',
        plural: 'Връзки към новини',
    },
    fields: [
        {
            name: 'news',
            label: 'Новини',
            type: 'relationship',
            relationTo: 'news',
            minRows: 1,
            maxRows: 3,
            hasMany: true,
        },
    ]
}

const DiaryRelationship: Block = {
    slug: 'diary-relationship',
    labels: {
        singular: 'Връзка към дневник',
        plural: 'Връзки към дневник',
    },
    fields: [
        {
            name: 'diary',
            label: 'Дневник',
            type: 'relationship',
            relationTo: 'diary',
            minRows: 1,
            maxRows: 3,
            hasMany: true,
        },
    ]
}

export const RelationshipSection: Block = {
    slug: 'relationship-section',
    labels: {
        singular: 'Секция за връзка',
        plural: 'Секции за връзка',
    },
    fields: [
        {
            type: 'row',   
            fields: [
                {
                    type: 'checkbox',
                    name: 'hasTitle',
                    label: 'Има заглавие',
                    defaultValue: false
                },
                {
                    type: 'checkbox',
                    name: 'hasSubtitle',
                    label: 'Има подзаглавие',
                    defaultValue: false
                },
                {
                    type: 'checkbox',
                    name: 'hasButton',
                    label: 'Има бутон',
                    defaultValue: false
                },
            ]
        },
        {
            name: 'title',
            label: 'Заглавие',
            type: 'text',
            localized: true,
            admin: {
                condition: (data, siblingData) => {
                    return siblingData.hasTitle
                }
            }
        },
        {
            name: 'subtitle',
            label: 'Подзаглавие',
            type: 'text',
            localized: true,
            admin: {
                condition: (data, siblingData) => {
                    return siblingData.hasSubtitle
                }
            }
        },
        {
            type: 'row',
            admin: {
                condition: (data, siblingData) => {
                    return siblingData.hasButton
                }
            },
            fields: [
                {
                    name: 'buttonText',
                    label: 'Текст на бутона',
                    type: 'text',
                    localized: true,
                },
                {
                    name: 'buttonLink',
                    label: 'Линк на бутона',
                    type: 'text',
                },
            ]
        },
        {
            name: 'relationTo',
            label: 'Вид връзка',
            type: 'blocks',
            minRows: 1,
            maxRows: 1,
            blocks: [ProductRelationship, NewsRelationship, DiaryRelationship]
        }
    ]
}