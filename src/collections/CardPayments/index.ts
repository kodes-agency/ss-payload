import type { CollectionConfig } from "payload/types";

// ACTION, RC, STATUSMSG, AMOUNT, CURRENCY, ORDER, LANG, TIMESTAMP, TRAN_DATE, TRAN_TRTYPE, RRN, INT_REF, PARES_STATUS, AUTH_STEP_RES, CARDHOLDERINFO, ECI, CARD, CARD_BRAND,

export const CardPayments: CollectionConfig = {
  slug: "payments",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  labels: {
    singular: "Плащане с карта",
    plural: "Плащания с карта",
  },
  admin: {
    useAsTitle: "code",
    defaultColumns: ["updatedAt"],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          type: "select",
          name: "action",
          label: "Статус",
          options: [
            {
              label: "Успешна трансакция",
              value: "0",
            },
            {
              label: "Дублирана трансакция",
              value: "1",
            },
            {
              label: "Отказана от трансакция",
              value: "2",
            },
            {
              label: "Грешка при обработка на трансакцията",
              value: "3",
            },
            {
              label: "Дублирана трансакция при отказана трансакция",
              value: "6",
            },
            {
              label: "Дублирана трансакция при грешка при аутентикация",
              value: "7",
            },
            {
              label: "Дублирана трансакция при липса на отговор",
              value: "8",
            },
            {
              label: "Soft decline",
              value: "21",
            },
          ],
          admin: {
            readOnly: true,
            width: "25%",
          },
        },
        {
          type: "select",
          name: "RC",
          label: "Код на завършване",
          admin: {
            readOnly: true,
          },
          options: [
            {
              label: "Успешна трансакция",
              value: "00",
            },
            {
              label: "Дублирана трансакция",
              value: "01",
            },
            {
              label: "Отказана от трансакция",
              value: "02",
            },
            {
              label: "Грешка при обработка на трансакцията",
              value: "03",
            },
            {
              label: "Дублирана трансакция при отказана трансакция",
              value: "06",
            },
            {
              label: "Дублирана трансакция при грешка при аутентикация",
              value: "07",
            },
            {
              label: "Дублирана трансакция при липса на отговор",
              value: "08",
            },
            {
              label: "Soft decline",
              value: "21",
            },
          ],
        },
        {
            type: 'row',
            fields: [
                {
                  type: "text",
                  name: "AMOUNT",
                  label: "Сума",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "CURRENCY",
                  label: "Валута",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "ORDER",
                  label: "Поръчка №",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "LANG",
                  label: "Език",
                  admin: {
                    readOnly: true,
                  },
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                  type: "text",
                  name: "TIMESTAMP",
                  label: "Дата/час на отговор",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "TRAN_DATE",
                  label: "Дата/час на транзакцията",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "TRAN_TRTYPE",
                  label: "Тип на транзакцията",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "RRN",
                  label: "RRN - Референциа на транзакцията",
                  admin: {
                    readOnly: true,
                  },
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                  type: "text",
                  name: "INT_REF",
                  label: "Вътрешна референция",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "PARES_STATUS",
                  label: "Статус на автентикацията",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "AUTH_STEP_RES",
                  label: "Статус на автентикацията",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                    type: "text",
                    name: "DESC",
                    label: "Описание на трансакцията",
                    admin: {
                        readOnly: true,
                    },
                }
            ]
        },
        {
            type: 'row',
            fields: [
                {
                  type: "text",
                  name: "CARDHOLDERINFO",
                  label: "Информация за картодържателя",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "ECI",
                  label: "ECI",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "CARD",
                  label: "Номер на карта",
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "text",
                  name: "CARD_BRAND",
                  label: "Бранд на карта",
                  admin: {
                    readOnly: true,
                  },
                },
            ]
        },
      ],
    },
  ],
};
