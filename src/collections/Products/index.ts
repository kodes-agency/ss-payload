import type { CollectionConfig } from 'payload/types'
import { WineDetails } from '../../fields/productDetails'
import { WineBasicInfo } from '../../fields/productBasicInfo'
import { WineRemarks } from '../../fields/productRemarks'
import { slugField } from '../../fields/productSlug'
import { Bundle } from '../../fields/productBundle'
import { ProductImage } from '../../fields/productOtherProducts'
import { manageProducts } from './hooks/manageProducts'

export const Products: CollectionConfig = {
    slug: 'products',
    labels: {
        singular: 'Продукт',
        plural: 'Продукти',
    },
    access: {
      read: () => true,
    },
    admin: {
        useAsTitle: 'systemTitle',
        defaultColumns: ['systemTitle', 'slug']
    },
    hooks: {
      beforeOperation: [manageProducts]
    },
    versions: {
        drafts: true,
    },
    fields: [
      {
        type: "tabs",
        tabs: [
          {
            label: "Подробности за продукта",
            fields: [
              {
                type: 'text',
                name: 'systemTitle',
                label: 'Системно име',
                admin: {
                  readOnly: true,
                  hidden: true,
                },
                hooks: {
                  beforeValidate: [({value ,data, req: {locale} }) => {
                    if(locale !== 'bg') return
            
                    if (data.productType?.productType === 'single') {
                      return value = `${data?.productTitle} ${data?.productBasicInformation?.harvestYear ? new Date(data?.productBasicInformation?.harvestYear).getFullYear() : ""}г. ${data?.stockManagement?.volume}мл`
                    }
                    if (data.productType?.productType === 'bundle') {
                      return value = `${data?.productTitle}`              
                    }
                    if (data.productType?.productType === 'other') {
                      return value = data?.productTitle
                    }
                  }]
                }
              },
              {
                type: "group",
                label: "Вид на продукта",
                name: "productType",

                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        type: 'radio',
                        name: 'productType',
                        label: "Продуктът е",
                        required: true,
                        admin: {
                          layout: 'horizontal',
                        },
                        defaultValue: 'single',
                        options: [
                          {
                            label: 'Бутилка вино',
                            value: 'single',
                          },
                          {
                            label: 'Комплект вина',
                            value: 'bundle',
                          },
                          {
                            label: 'Други продукти/услуги',
                            value: 'other',
                          }
                        ]
                      },
                      {
                        type: 'radio',
                        name: 'productPosition',
                        required: true,
                        label: "Позиция на продукта",
                        options: [
                          {
                            label: "Каталог",
                            value: "catalog-only",
                          },
                          {
                            label: "Магазин",
                            value: "shop-only",
                          },
                          {
                            label: "Каталог + Магазин",
                            value: "catalog-shop",
                          }
                        ]
                      },
                      
                    ]
                  },
                ]
              },
              {
                type: "row",
                fields: [
                  // {
                  //   name: "title",
                  //   label: "Име на продукта",
                  //   type: "text",
                  //   // required: true,
                  //   unique: false,
                  //   localized: true,
                  //   admin: {
                  //     width: "50%",
                  //   },
                  // },
                  {
                    name: "productTitle",
                    label: "Име на продукта",
                    type: "text",
                    required: true,
                    localized: true,
                    admin: {
                      width: "50%",
                    },
                  },
                  // {
                  //   type: 'relationship',
                  //   name: 'productCategory',
                  //   label: 'Категория на продукта',
                  //   relationTo: 'productCategory',
                  //   required: true,
                  //   admin: {
                  //     width: '25%'
                  //   },
                  //   filterOptions: ({ relationTo, siblingData, data }) => {
                  //     if (data.productType?.productType === 'bundle') {
                  //       return {
                  //         value : { not_equals: 'individual-bottles' }
                  //       }
                  //     }
                  //     if(data.productType?.productType === 'single') {
                  //       return {
                  //         value: { equals: 'individual-bottles' }
                  //       }
                  //     }
                  //   },
                  // },
                  {
                    type: 'select',
                    name: 'productKind',
                    label: 'Категория на продукта',
                    required: true,
                    defaultValue: 'bottle',
                    options: [
                      {
                        label: 'Бутилка вино',
                        value: 'bottle'
                      },
                      {
                        label: 'Комплект вина',
                        value: 'bundle'
                      },
                      {
                        label: 'Специални предложения',
                        value: 'special'
                      },
                      {
                        label: 'Други продукти/услуги',
                        value: 'other'
                      }
                    ],
                  },
                  slugField,
                ],
              },
              WineBasicInfo,
              WineDetails,
              WineRemarks,
              Bundle,
              ProductImage
            ]
          },
          {
            label: "Цена/наличност/видимост",
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    type: 'group',
                    label: 'Управление на наличностите',
                    name: 'stockGroup',
                    fields: [
                      {
                        type: 'radio',
                        label: false,
                        name: 'manageStock',
                        defaultValue: '0',
                        options: [
                          {
                            label: "Да",
                            value: "1"
                          },
                          {
                            label: "Не",
                            value: "0"
                          }
                        ]
                      },
                    ]
                  },
                  {
                    type: 'group',
                    label: 'Промоционална цена',
                    name: 'saleGroup',
                    fields: [
                      {
                        type: 'radio',
                        name: 'onSale',
                        label: false,
                        defaultValue: '0',
                        options: [
                          {
                            label: "Да",
                            value: "1"
                          },
                          {
                            label: "Не",
                            value: "0"
                          }
                        ]
                      },
                    ]
                  },
                  {
                    type: 'group',
                    label: 'Видимост на продукта',
                    name: 'visibilityGroup',
                    fields: [
                      {
                        type: 'radio',
                        name: 'visibility',
                        label: false,
                        defaultValue: '1',
                        options: [
                          {
                            label: "Видим",
                            value: "1"
                          },
                          {
                            label: "Скрит",
                            value: "0"
                          }
                        ]
                      },
                    ]
                  },
                  {
                    type: 'text',
                    name: 'productId',
                    label: 'Продукт №',
                    admin: {
                      readOnly: true,
                    }
                  }
                ]
              },
              {
                type: 'row',
                fields: [

                  {
                    type: 'group',
                    label: 'Управление на цена',
                    name: 'priceManagement',
                    admin: {
                      width: '50%',
                    },
                    fields: [
                      {
                        name: "regularPrice",
                        label: "Редовна цена",
                        type: "number",
                        required: true,
                        min: 0,
                        admin: {
                          step: 0.01,
                        },
                      },
                      {
                        name: "salePrice",
                        label: "Промоционална цена",
                        required: true,
                        type: "number",
                        min: 0,
                        validate: (val, {data}) => {
                          if (data.priceManagement?.regularPrice <= val) {
                            return 'The sale price must be less than the regular price'
                          }
                          if (val <= 0) {
                            return 'The sale price must be greater than 0'
                          }
                        },
                        admin: {
                          step: 0.01,
                          condition: (data, siblingData) => { 
                            return data.saleGroup?.onSale === '1'
                          }
                        },
                      },
                    ]
                  },
    
                  {
                    type: 'group',
                    label: 'Управление на наличностите',
                    name: 'stockManagement',
                    admin: {
                      width: '50%',
                    },
                    fields: [
                      {
                        type: 'number',
                        name: 'stockQuantity',
                        label: 'Брой налични продукти',
                        required: true,
                        min: 0,
                        admin: {
                          condition: (data, siblingData) => {
                            return data.stockGroup?.manageStock === '1'
                          }
                        }
                      },
                      {
                        type: 'text',
                        name: 'sku',
                        label: 'SKU номер',
                        unique: true,
                      },
                      {
                        type: 'select',
                        name: 'volume',
                        required: true,
                        defaultValue: '750',
                        options: [
                          {
                            value: '375',
                            label: '375 ml'
                          },
                          {
                            value: '750',
                            label: '750 ml'
                          },
                          {
                            value: '1500',
                            label: '1500 ml'
                          },
                          {
                            value: '0',
                            label: 'Продуктът не е бутилка'
                          }
                        ],
                        label: 'Обем на бутилката в мл (за вина в магазина)',
                      }
                    ]
                  }
                ]
              },
            ]
          }
        ]
      },
    ],
}


