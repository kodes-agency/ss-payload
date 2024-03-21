import type { GlobalConfig } from "payload/types";

export const General: GlobalConfig = {
  slug: "general",
  label: "Информация за превод",
  access: {
    read: () => true,
    update: ({ req: { user } }) => user && user.role === 'admin',
  },
  fields: [
    {
      type: "group",
      name: "header",
      label: "Меню",
      fields: [
        {
          type: "array",
          name: "colums",
          labels: {
            singular: "Колона",
            plural: "Колони",
          },
          label: "Колини",
          minRows: 1,
          fields: [
            {
              type: "array",
              name: "links",
              labels:{
                singular: "Връзка",
                plural: "Връзки",
              },
              label: "Връзки",
              minRows: 1,
              fields: [
                {
                  type: "checkbox",
                  name: "isHeading",
                  label: "Заглавие",
                },
                {
                  type: "row",
                  fields: [
                    {
                      type: "text",
                      name: "text",
                      label: "Текст",
                      localized: true,
                      required: true,
                    },
                    {
                      type: "text",
                      name: "url",
                      label: "URL",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "footer",
      label: "Фуутър",
      fields: [
        {
          type: "array",
          name: "address",
          labels: {
            singular: "Адрес",
            plural: "Адреси",
          },
          label: "Адрес",
          minRows: 1,
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: "text",
                  name: "text",
                  label: "Текст",
                  localized: true,
                  required: true,
                },
                {
                  type: "text",
                  name: "url",
                  label: "URL",
                },
              ]
            }
          ],
        },
        {
          type: "array",
          name: "links",
          labels: {
            singular: "Връзка",
            plural: "Връзки",
          },
          label: "Връзки",
          minRows: 1,
          fields: [
            {
              type: "row",
              fields: [
                {
                  type: "text",
                  name: "text",
                  label: "Текст",
                  localized: true,
                  required: true,
                },
                {
                  type: "text",
                  name: "url",
                  label: "URL",
                },
              ],
            },
          ],
        },
        {
          type: "array",
          name: "socialMedia",
          label: "Социални медии",
          labels: {
            singular: "Социална медия",
            plural: "Социални медии",
          },
          minRows: 1,
          fields: [
            {
              type: "row",
              fields: [
                {
                  type: "text",
                  name: "text",
                  label: "Текст",
                  required: true,
                },
                {
                  type: "text",
                  name: "url",
                  label: "URL",
                },
              ],
            },
            {
              type: "code",
              name: "icon",
              label: "Icon SVG",
              required: true,
            }
          ],
        },
      ],
    },
    {
      type: "group",
      name: "contact",
      label: "Страница контакти",
      fields: [
        {
          type: 'text',
          name: 'pageTitle',
          label: 'Заглавие на страницата',
          localized: true,
          required: true,
        }
      ]
    },
    {
      type: "group",
      name: "diary",
      label: "Страница дневник",
      fields: [
        {
          type: 'text',
          name: 'pageTitle',
          label: 'Заглавие на страницата',
          localized: true,
          required: true,
        }
      ]
    },
    {
      type: "group",
      name: "news",
      label: "Страница новини",
      fields: [
        {
          type: 'text',
          name: 'pageTitle',
          label: 'Заглавие на страницата',
          localized: true,
          required: true,
        }
      ]
    },
    {
      type: "group",
      name: "wines",
      label: "Страница Вина",
      fields: [
        {
          type: 'collapsible',
          label: 'Информация за страницата',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "pageTitle"
                  },
                  name: 'pageTitle',
                  label: 'Заглавие на страницата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "pageTitleSingleWine"
                  },
                  name: 'pageTitleSingleWine',
                  label: 'Заглавие на страницата за едно вино',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "pageSubtitle"
                  },
                  name: 'pageSubtitle',
                  label: 'Подзаглавие на страницата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "showFiltersButton"
                  },
                  name: 'showFiltersButton',
                  label: 'Бутон - покажи филтрите',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "hideFiltersButton"
                  },
                  name: 'hideFiltersButton',
                  label: 'Бутон - скрий филтрите',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonWinePassport"
                  },
                  name: 'buttonWinePassport',
                  label: 'Бутон - изтегли винен паспорт',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonGoToShop"
                  },
                  name: 'buttonGoToShop',
                  label: 'Бутон - към магазина',
                  localized: true,
                  required: true,
                },
              ]
            }
          ]
        },
        {
          type: 'collapsible',
          label: 'Детайли за виното',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "alchoholContent"
                  },
                  name: 'alchoholContent',
                  label: 'Съдържание на алкохол',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "sugarContent"
                  },
                  name: 'sugarContent',
                  label: 'Съдържание на захар',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "acidContent"
                  },
                  name: 'acidContent',
                  label: 'Съдържание на киселини',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'bottleVolumeSize',
                  label: 'Обем и количество на бутилката',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'closingType',
                  label: 'Вид затваряне',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'bottledYear',
                  label: 'Година на бутилиране',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'temperature',
                  label: 'Температура',
                  localized: true,
                  required: true,
                },
              ]
            }
          ]
        },
        {
          type: 'collapsible',
          label: 'Бележки към виното',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'rewardsTitle',
                  label: 'Заглавие на секция награди',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'vinification',
                  label: 'Заглавие на секция винификация',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'maturation',
                  label: 'Заглавие на секция отлежаване',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'degustation',
                  label: 'Заглавие на секция дегустационни бележки',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'food',
                  label: 'Заглавие на секция Съчетание с храна',
                  localized: true,
                  required: true,
                },
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'group',
      name: 'b2b',
      label: 'Страница B2B',
      fields: [
        {
          type: 'collapsible',
          label: 'Контактна форма',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'formTitle',
                  label: 'Заглавие на формата',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'formTitle'
                  }
                },
                {
                  type: 'text',
                  name: 'names',
                  label: 'Имена',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'names'
                  }
                },
                {
                  type: 'text',
                  name: 'companyName',
                  label: 'Име на фирмата',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'companyName'
                  }
                },
                {
                  type: 'text',
                  name: 'chooseOption',
                  label: 'Изберете опция',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'chooseOption'
                  }
                },
                {
                  type: 'text',
                  name: 'questionActivity',
                  label: 'Предмет на дейност',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'questionActivity'
                  }
                },
                {
                  type: 'text',
                  name: 'questionServices',
                  label: 'От какво се интересувате?',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'questionServices'
                  }
                },
                {
                  type: 'text',
                  name: 'questionFamiliarity',
                  label: 'Познавате ли вината на Санта Сара?',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'questionFamiliarity'
                  }
                },
                {
                  type: 'text',
                  name: 'questionCurrentOffering',
                  label: 'Предлагате ли вината на Санта Сара?',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'questionCurrentOffering'
                  }
                },
                {
                  type: 'text',
                  name: 'answerPrivatePerson',
                  label: 'Отговор - частно лице',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'answerPrivatePerson'
                  }
                },
                {
                  type: 'text',
                  name: 'answerSeller',
                  label: 'Отговор - търговец',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'answerSeller'
                  }
                },
                {
                  type: 'text',
                  name: 'answerHoreka',
                  label: 'Отговор - хорека',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'answerHoreka'
                  }
                },
                {
                  type: 'text',
                  name: 'answerWhiteWine',
                  label: 'Отговор - бели вина',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'answerWhiteWine'
                  }
                },
                {
                  type: 'text',
                  name: 'answerRedWine',
                  label: 'Отговор - червени вина',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'answerRedWine',
                  }
                },
                {
                  type: 'text',
                  name: 'answerRoseWine',
                  label: 'Отговор - розе вина',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'RoseWine'
                  }
                },
                {
                  type: 'text',
                  name: 'answerCollectionWine',
                  label: 'Отговор - колекционни вина',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'collectionWine'
                  }
                },
                {
                  type: 'text',
                  name: 'answerVisits',
                  label: 'Отговор - посещения',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'answerVisits'
                  }
                },
                {
                  type: 'text',
                  name: 'answerYes',
                  label: 'Отговор - да',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'answerYes'
                  }
                },
                {
                  type: 'text',
                  name: 'answerNo',
                  label: 'Отговор - не',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'answerNo',
                  }
                },
                {
                  type: 'text',
                  name: 'phone',
                  label: 'Телефон',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'phone'
                  }
                },
                {
                  type: 'text',
                  name: 'email',
                  label: 'Имейл',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'email'
                  }
                },
                {
                  type: 'text',
                  name: 'buttonSend',
                  label: 'Бутон - изпрати',
                  required: true,
                  localized: true,
                  admin: {
                    width: '25%',
                    description: 'buttonSend',
                  }
                },
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'group',
      name: 'shop',
      label: 'Страница Магазин',
      fields: [
        {
          type: 'collapsible',
          label: 'Информация за страницата',
          fields: [
            {
              type: 'upload',
              name: 'heroImg',
              label: 'Заглавна снимка',
              relationTo: 'media',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'pageTitle',
                  label: 'Заглавие на страницата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'pageSubtitle',
                  label: 'Подзаглавие на страницата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'paymentMethodsButton',
                  label: 'Бутон - методи на плащане',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'deliveryMethodsButton',
                  label: 'Бутон - методи на доставка',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'buttonAddToCart',
                  label: 'Бутон - добави в количката',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%'
                  },
                  name: 'buttonLearnMore',
                  label: 'Бутон - научи повече',
                  localized: true,
                  required: true,
                },
              ]
            }
          ]
        },
        {
          type: 'collapsible',
          label: 'Секция ифнормация - доставки/плащане',
          fields: [
            {
              type: 'array',
              name: 'infoTabs',
              label: 'Секция ифнормация - доставки/плащане',
              required: true,
              labels: {
                singular: 'Информация',
                plural: 'Информации',
              },
              minRows: 1,
              maxRows: 3,
              fields: [
                {
                  type: 'text',
                  name: 'title',
                  label: 'Заглавие',
                  localized: true,
                  required: true,
                },
                {
                  type: 'textarea',
                  name: 'content',
                  label: 'Съдържание',
                  localized: true,
                  required: true,
                }
              ]
            }
          ]
        },
        {
          type: 'collapsible',
          label: 'Филтри за продукти',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "filterProductCategory"
                  },
                  name: 'filterProductCategory',
                  label: 'Филтър - категория на продукта',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "filterWineType"
                  },
                  name: 'filterWineType',
                  label: 'Филтър - вид вино',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "filterWineVintage"
                  },
                  name: 'filterWineVintage',
                  label: 'Филтър - реколта',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "filterVolume"
                  },
                  name: 'filterVolume',
                  label: 'Филтър - обем',
                  localized: true,
                  required: true,
                },
              ]
            }
          ]
        },
        {
          type: 'collapsible',
          label: 'Секция количка',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "cartTitle"
                  },
                  name: 'cartTitle',
                  label: 'Заглавие на секция количка',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonContinueShopping"
                  },
                  name: 'buttonContinueShopping',
                  label: 'Бутон - продължи пазаруването',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonContinueToCheckout"
                  },
                  name: 'buttonContinueToCheckout',
                  label: 'Бутон - продължи към плащане',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "checkoutTableTitle"
                  },
                  name: 'checkoutTableTitle',
                  label: 'Таблица - продукт',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "checkoutTableQuantity"
                  },
                  name: 'checkoutTableQuantity',
                  label: 'Таблица - количество',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "checkoutTablePrice"
                  },
                  name: 'checkoutTablePrice',
                  label: 'Таблица - цена',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "checkoutTableTotal"
                  },
                  name: 'checkoutTableTotal',
                  label: 'Таблица - общо',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "orderTitle"
                  },
                  name: 'orderTitle',
                  label: 'Заглавие на секция обобщение поръчка',
                  localized: true,
                  required: true,
                },
              ]
            }
          ]
        },
        {
          type: 'collapsible',
          label: 'Форма за плащане',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: 'formTitle'
                  },
                  name: 'formTitle',
                  label: 'Заглавие на формата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "invoiceRequest"
                  },
                  name: 'invoiceRequest',
                  label: 'Желание за издаване на фактура',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "companyName"
                  },
                  name: 'companyName',
                  label: 'Име на фирмата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "vatNumber"
                  },
                  name: 'vatNumber',
                  label: 'ЕИК номер',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "companyCountry"
                  },
                  name: 'companyCountry',
                  label: 'Държава на фирмата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "companyAddress"
                  },
                  name: 'companyAddress',
                  label: 'Адрес на фирмата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "firstName"
                  },
                  name: 'firstName',
                  label: 'Име',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "lastName"
                  },
                  name: 'lastName',
                  label: 'Фамилия',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "email"
                  },
                  name: 'email',
                  label: 'Имейл',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "phone"
                  },
                  name: 'phone',
                  label: 'Телефон',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "address"
                  },
                  name: 'address',
                  label: 'Адрес',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "city"
                  },
                  name: 'city',
                  label: 'Град',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "zipCode"
                  },
                  name: 'zipCode',
                  label: 'Пощенски код',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "region"
                  },
                  name: 'region',
                  label: 'Регион',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "country"
                  },
                  name: 'country',
                  label: 'Държава',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "orderNote"
                  },
                  name: 'orderNote',
                  label: 'Бележка към поръчката',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "ageConsent"
                  },
                  name: 'ageConsent',
                  label: 'Съгласие за възраст',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "policyConsent"
                  },
                  name: 'policyConsent',
                  label: 'Съгласие с политиките',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "marketingConsent"
                  },
                  name: 'marketingConsent',
                  label: 'Съгласие за маркетинг',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "deliveryConsent"
                  },
                  name: 'deliveryConsent',
                  label: 'Съгласие за доставката',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "compulsoryField"
                  },
                  name: 'compulsoryField',
                  label: 'Задължително поле',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonPay"
                  },
                  name: 'buttonPay',
                  label: 'Бутон - плати',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonCard"
                  },
                  name: 'buttonCard',
                  label: 'Бутон - карта',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonCash"
                  },
                  name: 'buttonCash',
                  label: 'Бутон - наложен платеж',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonBack"
                  },
                  name: 'buttonBack',
                  label: 'Бутон - назад',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "stepCart"
                  },
                  name: 'stepCart',
                  label: 'Стъпка - количка',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "stepConsent"
                  },
                  name: 'stepConsent',
                  label: 'Стъпка - съгласие',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "stepClientInfo"
                  },
                  name: 'stepClientInfo',
                  label: 'Стъпка - данни на клиента',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "stepPaymentMethod"
                  },
                  name: 'stepPaymentMethod',
                  label: 'Стъпка - метод на плащане',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "stepFinilize"
                  },
                  name: 'stepFinilize',
                  label: 'Стъпка - финализиране',
                  localized: true,
                  required: true,
                },
              ]
            }
          ]
        },
        {
          type: 'collapsible',
          label: 'Страница успешно плащане',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "sectionTitle"
                  },
                  name: 'sectionTitle',
                  label: 'Заглавие на страницата',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "orderDetails"
                  },
                  name: 'orderDetails',
                  label: 'Вашата поръчка',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "clientDetails"
                  },
                  name: 'clientDetails',
                  label: 'Вашите данни',
                  localized: true,
                  required: true,
                },
                {
                  type: 'text',
                  admin: {
                    width: '25%',
                    description: "buttonBackToHome"
                  },
                  name: 'buttonBackToHome',
                  label: 'Бутон - към начало',
                  localized: true,
                  required: true,
                },
              ]
            }
          ]
        }
      ]
    }
  ],
};
