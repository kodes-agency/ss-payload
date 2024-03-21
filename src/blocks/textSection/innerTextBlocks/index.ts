import type { Block } from 'payload/types'
import {
    HTMLConverterFeature,
    lexicalEditor,
    lexicalHTML
} from '@payloadcms/richtext-lexical'

export const TitleBlock: Block = {
    slug: 'title-block',
    labels: {
        singular: 'Заглавен блок',
        plural: 'Заглавни блокове',
    },
    fields: [
        {
            name: 'title',
            label: 'Заглавие',
            type: 'text',
            required: true,
            localized: true,
        }
    ]
}

export const SubTitleBlock: Block = {
    slug: 'subtitle-block',
    labels: {
        singular: 'Подзаглавен блок',
        plural: 'Подзаглавни блокове',
    },
    fields: [
        {
            name: 'subtitle',
            label: 'Подзаглавие',
            type: 'text',
            required: true,
            localized: true,
        }
    ]
}

export const TextBlock: Block = {
    slug: 'text-block',
    labels: {
        singular: 'Текстови блок',
        plural: 'Текстови блокове',
    },
    fields: [
        {
            name: 'text',
            label: 'Текст',
            type: 'richText',
            required: true,
            localized: true,
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  // The HTMLConverter Feature is the feature which manages the HTML serializers. If you do not pass any arguments to it, it will use the default serializers.
                  HTMLConverterFeature({}),
                ],
            }),
        },
        lexicalHTML('text', { name: 'text_html' }),
    ]
}

export const ImgBlock: Block = {
    slug: 'img-block',
    labels: {
        singular: 'Снимков блок',
        plural: 'Снимкови блокове',
    },
    fields: [
        {
            name: 'image',
            label: 'Снимка',
            type: 'upload',
            relationTo: 'media',
            required: true,
        }
    ]
}

export const ButtonBlock: Block = {
    slug: 'button-block',
    labels: {
        singular: 'Бутонен блок',
        plural: 'Бутонни блокове',
    },
    fields: [
        {
            name: 'buttonText',
            label: 'Текст на бутона',
            type: 'text',
            localized: true,
            required: true,
        },
        {
            name: 'buttonLink',
            label: 'Линк на бутона',
            type: 'text',
            required: true,
        }
    ]
}

export const PolicyBlock: Block = {
    slug: 'policy-block',
    labels: {
        singular: 'Блок за политика',
        plural: 'Блокове за политика',
    },
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Заглавие',
            localized: true,
        },
        {
            type: 'richText',
            name: 'text',
            label: 'Текст',
            localized: true,
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  // The HTMLConverter Feature is the feature which manages the HTML serializers. If you do not pass any arguments to it, it will use the default serializers.
                  HTMLConverterFeature({}),
                ],
            }),
        },
        lexicalHTML('text', { name: 'text_html' }),
    ]
}
