import type { CollectionConfig } from "payload/types";
import { afterOperationHook } from "./hooks/afterOperations";

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
  hooks: {
    afterChange: [afterOperationHook]
  },
  admin: {
    useAsTitle: "ORDER",
    defaultColumns: ["ACTION, AMOUNT, createdAt, "],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          type: "select",
          name: "ACTION",
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
            { label: "Успешна трансакция", value: "00" },
            { label: "В заявката не е попълнено задължително поле", value: "-1" },
            { label: "Заявката съдържа поле с некоректно име", value: "-2" },
            { label: "Авторизационният хост не отговаря или форматът на отговора е неправилен", value: "-3" },
            { label: "Няма връзка с авторизационния хост", value: "-4" },
            { label: "Грешка във сръзката с авторизационния хост", value: "-5" },
            { label: "Грешка в конфигурацията на APGW", value: "-6" },
            { label: "Форматът на отговора от авторизационният хост е неправилен", value: "-7" },
            { label: "Грешка в поле 'Сума' в заявката", value: "-10" },
            { label: "Грешка в поле 'Валута' в заявката", value: "-11" },
            { label: "Грешка в поле 'Идентификатор на търговеца' в заявката", value: "-12" },
            { label: "Неправилен IP адрес на търговеца", value: "-13" },
            { label: "Грешка в поле 'RRN' в заявката", value: "-15" },
            { label: "В момента се изпълнява друга трансакция на терминала", value: "-16" },
            { label: "Отказан достъп до платежния сървър (напр. грешка при проверка на P_SIGN)", value: "-17" },
            { label: "Грешка в искането за автентикация или неуспешна автентикация", value: "-19" },
            { label: "Разрешената разлика между времето на сървъра на търговеца и e-Gateway сървъра е надвишена", value: "-20" },
            { label: "Трансакцията вече е била изпълнена", value: "-21" },
            { label: "Транзакцията съдържа невалидни данни за аутентикация", value: "-22" },
            { label: "Заявката съдържа стойности за полета, които не могат да бъдат обработени. Например валутата е различна от валутата на терминала или транзакцията е по-стара от 24 часа.", value: "-24" },
            { label: "Допълнителното потвърждение на трансакцията е отказано от картодържателя", value: "-25" },
            { label: "Невалиден BIN на картата", value: "-26" },
            { label: "Невалидно име на търговеца", value: "-27" },
            { label: "Невалидно допълнително поле (например AD.CUST_BOR_ORDER_ID)", value: "-28" },
            { label: "Невалиден отговор от ACS на издателя на картата", value: "-29" },
            { label: "Трансакцията е отказана", value: "-30" },
            { label: "Трансакцията е в процес на обрбаотка от издателя", value: "-31" },
            { label: "Дублирана отказана трансакция", value: "-32" },
            { label: "Трансакцията е в процес на аутентикация на картодържателя", value: "-33" },
            { label: "Искане за потвърждаване на клиента", value: "-39" },
            { label: "Искане за потвърждаване на трансакцията", value: "-40" }
          ],
        },
        {
          type: "text",
          name: "STATUSMSG",
          label: "Съобщение за статус",
          admin: {
            readOnly: true,
          },
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
    {
      type: "json",
      name: "orderData",
      label: "Данни за поръчката",
      admin: {
        readOnly: true,
      },
    }
  ],
};


