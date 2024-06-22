import { PayloadRequest } from "payload/types";

async function getProducts(products: any, req: PayloadRequest, locale: string) {
  const productsPromise = products.map(async (product) => {
    const payloadProduct = await req.payload.findByID({
      collection: "products",
      locale: locale,
      id: product.product,
    });

    return {
      name:
        payloadProduct.productType.productType === "single"
          ? payloadProduct.productTitle +
            " " +
            new Date(payloadProduct.productBasicInformation.harvestYear).getFullYear() +
            " " +
            payloadProduct.stockManagement.volume +
            " ml"
          : payloadProduct.productTitle,
      quantity: product.quantity,
      total: product.total,
    };
  });

  return await Promise.all(productsPromise);
}

interface Product {
  name: string;
  quantity: number;
  total: number;
}

function productTemplate(products: Product[]): string {
  return products
    .map((product: Product) => {
      return `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.total} BGN</td>
            </tr>
        `;
    })
    .join("");
}

function adminProccessingEmail({
  orderNumber,
  firstName,
  lastName,
  phone,
  email,
  orderTotal,
  paymentMethod,
  products,
  orderLink,
}: {
  orderNumber: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  orderTotal: string;
  paymentMethod: string;
  products: Product[];
  orderLink: string;
}): string {
  const productRows = productTemplate(products);
  let template = `
      <!DOCTYPE html>
          <html lang="bg">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Santa Sarah</title>
              <style>
                  body {
                      font-family: Arial, Arial, Helvetica, sans-serif;
                      line-height: 1.5;
                      color: #847648;
                      background-color: #F5F3E4;
                      font-size: 14px;
                  }
  
                  .logo {
                      fill: #F5F3E4
                  }
  
                  .email-container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      border: 1px solid #847648;
                  }
                  .header {
                      background-color: #847648;
                      padding: 20px;;
                      text-align: center;
                  }
                  .header h1 {
                      margin: 0;
                      color: #F5F3E4;
                      font-size: 24px;
                      padding-top: 10px;
                      font-weight: 500;
                  }
                  .body {
                      padding: 10px;
                  }
                  .table-container {
                      width: 100%;
                      border-collapse: collapse;
                  }
                  .table-container th, .table-container td {
                      border: 1px solid #847648;
                      padding: 8px;
                      text-align: left;
                  }
  
                  .table-bottom {
                      margin-top: -1px;
                  }
  
                  .footer {
                      padding: 10px;
                      text-align: center;
                      font-size: 12px;
                      color: #847648;
                  }
                  
                  a {
                      color: #847648;
                      text-decoration: none;
                      font-size: 12px;
                  }
  
                  .table-bottom-header {
                      opacity: 0;
                  }

                  .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #847648;
                        font-weight: 800;
                        color: white!important;
                        text-decoration: none;
                        border-radius: 1px;
                        margin-top: 10px;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="header">
                      <h1>Имате нова поръчка!</h1>
                  </div>
                  <div class="body">
                      <p>Детайли на клиента:</p> 
                      <p>Име: ${firstName} ${lastName}</p>
                      <p>Телефон: <a href=tel:${phone}>${phone}</a></p>
                      <p>Имейл: <a href=mailto:${email}>${email}</a></p>
                      <p>Номер на поръчката: ${orderNumber}</p>
                      <br>

                      <p>Детайли на поръчката:</p>
                      <table class="table-container">
                          <thead>
                              <tr>
                                  <th>Име на продукта</th>
                                  <th>Koличество</th>
                                  <th>Цена</th>
                              </tr>
                          </thead>
                          <tbody>
                              ${productTemplate(products)}
                          </tbody>
                          <tfoot>
                              <tr>
                                  <td colspan="2">Общо</td>
                                  <td>${orderTotal} BGN</td>
                              </tr>
                              <tr>
                                  <td colspan="2">Доставка</td>
                                  <td>В изчакване на детайли</td>
                              </tr>
                              <tr>
                                  <td colspan="2">Начин на плащане</td>
                                  <td>${paymentMethod}</td>
                              </tr>
                          </tfoot>
                      </table>

                      <a class="button" href=${orderLink}>Прегледай поръчката</a>


                  </div>
                  <div class="footer">
                      <p>&copy; 2024 Винарско имение Санта Сара АД</p>
                      <p>Горица 8225, ул. Ивайло 2, <br> района на Поморие, Бургас, България</p>
                      <a href="https://wwww.santa-sarah.com">www.santa-sarah.com</a>
                      <a href="tel:+359888908064">+359 888 9080 64</a>
                      <a href="mailto:genowski@santa-sarah.com">genowski@santa-sarah.com</a>
                  </div>
              </div>
          </body>
          </html>
      `;

  template = template.replace(/\s+/g, " ").trim();

  return template;
}

function customerCompletedEmail({
  lang,
  orderNumber,
  firstName,
  lastName,
  orderTotal,
  paymentMethod,
  products,
}: {
  lang: string;
  orderNumber: number;
  firstName: string;
  lastName: string;
  orderTotal: string;
  paymentMethod: string;
  products: Product[];
}): string {
  const productRows = productTemplate(products);
  let template = `
      <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Santa Sarah</title>
              <style>
                  body {
                      font-family: Arial, Arial, Helvetica, sans-serif;
                      line-height: 1.5;
                      color: #847648;
                      background-color: #F5F3E4;
                      font-size: 14px;
                  }
  
                  .logo {
                      fill: #F5F3E4
                  }
  
                  .email-container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      border: 1px solid #847648;
                  }
                  .header {
                      background-color: #847648;
                      padding: 20px;;
                      text-align: center;
                  }
                  .header h1 {
                      margin: 0;
                      color: #F5F3E4;
                      font-size: 24px;
                      padding-top: 10px;
                      font-weight: 500;
                  }
                  .body {
                      padding: 10px;
                  }
                  .table-container {
                      width: 100%;
                      border-collapse: collapse;
                  }
                  .table-container th, .table-container td {
                      border: 1px solid #847648;
                      padding: 8px;
                      text-align: left;
                  }
  
                  .table-bottom {
                      margin-top: -1px;
                  }
  
                  .footer {
                      padding: 10px;
                      text-align: center;
                      font-size: 12px;
                      color: #847648;
                  }
                  
                  a {
                      color: #847648;
                      text-decoration: none;
                      font-size: 12px;
                  }
  
                  .table-bottom-header {
                      opacity: 0;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="header">
                      <h1>${
                        lang === "bg"
                          ? "Вашата поръчка е изпратена към Вас."
                          : "Your order is on its way"
                      }</h1>
                  </div>
                  <div class="body">
                      <p>${
                        lang === "bg" ? "Здравейте," : "Dear"
                      } ${firstName} ${lastName},</p>
                      <p>${
                        lang === "bg"
                          ? `Вашата поръчка с номер №: ${orderNumber} e изпратена към Вас. Очаквайте я в най-кратък срок.`
                          : `Your order with number: ${orderNumber} has been sent to you. Expect it soon.`
                      }
                      <p>${
                        lang === "bg"
                          ? "Информация за Вашата поръчка:"
                          : "Here are the details of your order:"
                      }</p>
                      <table class="table-container">
                          <thead>
                              <tr>
                                  <th>${
                                    lang === "bg"
                                      ? "Име на продукта"
                                      : "Product Name"
                                  }</th>
                                  <th>${
                                    lang === "bg" ? "Koличество" : "Quantity"
                                  }</th>
                                  <th>${lang === "bg" ? "Цена" : "Price"}</th>
                              </tr>
                          </thead>
                          <tbody>
                              ${productTemplate(products)}
                          </tbody>
                          <tfoot>
                              <tr>
                                  <td colspan="2">${
                                    lang === "bg" ? "Общо" : "Total"
                                  }</td>
                                  <td>${orderTotal} BGN</td>
                              </tr>
                              <tr>
                                  <td colspan="2">${
                                    lang === "bg" ? "Доставка" : "Shipping"
                                  }</td>
                                  <td>${
                                    lang === "bg"
                                      ? "В изчакване на детайли"
                                      : "Аwaiting more details"
                                  }</td>
                              </tr>
                              <tr>
                                  <td colspan="2">${
                                    lang === "bg"
                                      ? "Начин на плащане"
                                      : "Payment method"
                                  }</td>
                                  <td>${paymentMethod}</td>
                              </tr>
                          </tfoot>
                      </table>
  
  
                      <p>${
                        lang === "bg"
                          ? "Надяваме се да се насладите на всяка капка от поръчаните вина. Ако имате въпроси, не се колебайте да се свържете с нас на посочените данни за контакт."
                          : "We hope you enjoy your wine. If you have any questions, feel free to contact our team."
                      }</p>
                  </div>
                  <div class="footer">
                      <p>&copy; 2024 ${
                        lang === "bg"
                          ? "Винарско имение Санта Сара АД"
                          : "Santa Sarah Wine Estate"
                      }</p>
                      <p>${
                        lang === "bg"
                          ? "Горица 8225, ул. Ивайло 2, <br> района на Поморие, Бургас, България"
                          : "Goritsa 8225, Ivaylo 2 street, <br> Pomorie region, Burgas, Bulgaria"
                      }</p>
                      <a href="https://wwww.santa-sarah.com">www.santa-sarah.com</a>
                      <a href="tel:+359888908064">+359 888 9080 64</a>
                      <a href="mailto:genowski@santa-sarah.com">genowski@santa-sarah.com</a>
                  </div>
              </div>
          </body>
          </html>
      `;

  template = template.replace(/\s+/g, " ").trim();

  return template;
}

function customerProccessingEmail({
  lang,
  orderNumber,
  firstName,
  lastName,
  orderTotal,
  paymentMethod,
  products,
}: {
  lang: string;
  orderNumber: number;
  firstName: string;
  lastName: string;
  orderTotal: string;
  paymentMethod: string;
  products: Product[];
}): string {
  const productRows = productTemplate(products);
  let template = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Santa Sarah</title>
            <style>
                body {
                    font-family: Arial, Arial, Helvetica, sans-serif;
                    line-height: 1.5;
                    color: #847648;
                    background-color: #F5F3E4;
                    font-size: 14px;
                }

                .logo {
                    fill: #F5F3E4
                }

                .email-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    border: 1px solid #847648;
                }
                .header {
                    background-color: #847648;
                    padding: 20px;;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    color: #F5F3E4;
                    font-size: 24px;
                    padding-top: 10px;
                    font-weight: 500;
                }
                .body {
                    padding: 10px;
                }
                .table-container {
                    width: 100%;
                    border-collapse: collapse;
                }
                .table-container th, .table-container td {
                    border: 1px solid #847648;
                    padding: 8px;
                    text-align: left;
                }

                .table-bottom {
                    margin-top: -1px;
                }

                .footer {
                    padding: 10px;
                    text-align: center;
                    font-size: 12px;
                    color: #847648;
                }
                
                a {
                    color: #847648;
                    text-decoration: none;
                    font-size: 12px;
                }

                .table-bottom-header {
                    opacity: 0;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>${
                      lang === "bg"
                        ? "Вашата поръчка е в процес на обработка."
                        : "Your order is being processed."
                    }</h1>
                </div>
                <div class="body">
                    <p>${
                      lang === "bg" ? "Здравейте," : "Dear"
                    } ${firstName} ${lastName},</p>
                    <p>${
                      lang === "bg"
                        ? "Благодарим Ви, че избрахте винарско имение Санта Сара. Номерът на Вашата поръчка е:"
                        : "Thank you for your purchase. Your order number is:"
                    } <span>${orderNumber}</span></p>
                    <p>${
                      lang === "bg"
                        ? "В най-кратък срок ще обработим Вашата поръчка и ще се свържем с Вас с детейли относно доставката."
                        : "We will proccess your order as soon as possible and contact you with the details for the delivery method and price."
                    }</p>
                    <p>${
                      lang === "bg"
                        ? "Информация за Вашата поръчка:"
                        : "Here are the details of your order:"
                    }</p>
                    <table class="table-container">
                        <thead>
                            <tr>
                                <th>${
                                  lang === "bg"
                                    ? "Име на продукта"
                                    : "Product Name"
                                }</th>
                                <th>${
                                  lang === "bg" ? "Koличество" : "Quantity"
                                }</th>
                                <th>${lang === "bg" ? "Цена" : "Price"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productTemplate(products)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2">${
                                  lang === "bg" ? "Общо" : "Total"
                                }</td>
                                <td>${orderTotal} BGN</td>
                            </tr>
                            <tr>
                                <td colspan="2">${
                                  lang === "bg" ? "Доставка" : "Shipping"
                                }</td>
                                <td>${
                                  lang === "bg"
                                    ? "В изчакване на детайли"
                                    : "Аwaiting more details"
                                }</td>
                            </tr>
                            <tr>
                                <td colspan="2">${
                                  lang === "bg"
                                    ? "Начин на плащане"
                                    : "Payment method"
                                }</td>
                                <td>${paymentMethod}</td>
                            </tr>
                        </tfoot>
                    </table>


                    <p>${
                      lang === "bg"
                        ? "Надяваме се да се насладите на всяка капка от поръчаните вина. Ако имате въпроси, не се колебайте да се свържете с нас на посочените данни за контакт."
                        : "We hope you enjoy your wine. If you have any questions, feel free to contact our team."
                    }</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 ${
                      lang === "bg"
                        ? "Винарско имение Санта Сара АД"
                        : "Santa Sarah Wine Estate"
                    }</p>
                    <p>${
                      lang === "bg"
                        ? "Горица 8225, ул. Ивайло 2, <br> района на Поморие, Бургас, България"
                        : "Goritsa 8225, Ivaylo 2 street, <br> Pomorie region, Burgas, Bulgaria"
                    }</p>
                    <a href="https://wwww.santa-sarah.com">www.santa-sarah.com</a>
                    <a href="tel:+359888908064">+359 888 9080 64</a>
                    <a href="mailto:genowski@santa-sarah.com">genowski@santa-sarah.com</a>
                </div>
            </div>
        </body>
        </html>
    `;

  template = template.replace(/\s+/g, " ").trim();

  return template;
}

function b2bCustomerEmail({
    lang,
    name,
    companyName,
  }: {
    lang: string;
    name: string;
    companyName: string;
  }): string {
    let template = `
      <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Santa Sarah</title>
              <style>
                  body {
                      font-family: Arial, Arial, Helvetica, sans-serif;
                      line-height: 1.5;
                      color: #847648;
                      background-color: #F5F3E4;
                      font-size: 14px;
                  }
  
                  .logo {
                      fill: #F5F3E4
                  }
  
                  .email-container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      border: 1px solid #847648;
                  }
                  .header {
                      background-color: #847648;
                      padding: 20px;;
                      text-align: center;
                  }
                  .header h1 {
                      margin: 0;
                      color: #F5F3E4;
                      font-size: 24px;
                      padding-top: 10px;
                      font-weight: 500;
                  }
                  .body {
                      padding: 10px;
                  }
                  .table-container {
                      width: 100%;
                      border-collapse: collapse;
                  }
                  .table-container th, .table-container td {
                      border: 1px solid #847648;
                      padding: 8px;
                      text-align: left;
                  }
  
                  .table-bottom {
                      margin-top: -1px;
                  }
  
                  .footer {
                      padding: 10px;
                      text-align: center;
                      font-size: 12px;
                      color: #847648;
                  }
                  
                  a {
                      color: #847648;
                      text-decoration: none;
                      font-size: 12px;
                  }
  
                  .table-bottom-header {
                      opacity: 0;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="header">
                      <h1>${
                        lang === "bg"
                          ? "Вашата заявка е получена успешно!"
                          : "Your request has been successfully received!"
                      }</h1>
                  </div>
                  <div class="body">
                      <p>${
                        lang === "bg" ? "Здравейте," : "Dear"
                      } ${name}!</p>
                      <p>${
                        lang === "bg"
                          ? "Благодарим Ви за интереса към винарско имение Санта Сара. "
                          : "Thank you for your interest in Santa Sarah Wine Estate."
                      }
                      </p>
                      <p>${
                        lang === "bg"
                          ? "В най-кратък срок ще се свържем с Вас за да уточним детайлите по заявката Ви."
                          : "We will contact you shortly to clarify the details of your request."
                      }</p>
                      
                  </div>
                  <div class="footer">
                      <p>&copy; 2024 ${
                        lang === "bg"
                          ? "Винарско имение Санта Сара АД"
                          : "Santa Sarah Wine Estate"
                      }</p>
                      <p>${
                        lang === "bg"
                          ? "Горица 8225, ул. Ивайло 2, <br> района на Поморие, Бургас, България"
                          : "Goritsa 8225, Ivaylo 2 street, <br> Pomorie region, Burgas, Bulgaria"
                      }</p>
                      <a href="https://wwww.santa-sarah.com">www.santa-sarah.com</a>
                      <a href="tel:+359888908064">+359 888 9080 64</a>
                      <a href="mailto:genowski@santa-sarah.com">genowski@santa-sarah.com</a>
                  </div>
              </div>
          </body>
          </html>
      `;
  
    template = template.replace(/\s+/g, " ").trim();
  
    return template;
  }


  function b2bAdminEmail({
    lang,
    name,
    companyName,
    email,
    phone,
    request
  }: {
    lang: string;
    name: string;
    companyName: string;
    email: string;
    phone: string;
    request: string;
  }): string {
    let template = `
      <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Santa Sarah</title>
              <style>
                  body {
                      font-family: Arial, Arial, Helvetica, sans-serif;
                      line-height: 1.5;
                      color: #847648;
                      background-color: #F5F3E4;
                      font-size: 14px;
                  }
  
                  .logo {
                      fill: #F5F3E4
                  }
  
                  .email-container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      border: 1px solid #847648;
                  }
                  .header {
                      background-color: #847648;
                      padding: 20px;;
                      text-align: center;
                  }
                  .header h1 {
                      margin: 0;
                      color: #F5F3E4;
                      font-size: 24px;
                      padding-top: 10px;
                      font-weight: 500;
                  }
                  .body {
                      padding: 10px;
                  }
                  .table-container {
                      width: 100%;
                      border-collapse: collapse;
                  }
                  .table-container th, .table-container td {
                      border: 1px solid #847648;
                      padding: 8px;
                      text-align: left;
                  }
  
                  .table-bottom {
                      margin-top: -1px;
                  }
  
                  .footer {
                      padding: 10px;
                      text-align: center;
                      font-size: 12px;
                      color: #847648;
                  }
                  
                  a {
                      color: #847648;
                      text-decoration: none;
                      font-size: 12px;
                  }
  
                  .table-bottom-header {
                      opacity: 0;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="header">
                      <h1>Имате нова B2B заявка!</h1>
                  </div>
                  <div class="body">
                    <p>Детайли на клиента:</p> 
                    <p>Име: ${name}</p>
                    <p>Фирма: ${companyName}</p>
                    <p>Телефон: <a href=tel:${phone}>${phone}</a></p>
                    <p>Имейл: <a href=mailto:${email}>${email}</a></p>
                    <p>Заявка: ${request}</p>
                      
                  </div>
                  <div class="footer">
                      <p>&copy; 2024 ${
                        lang === "bg"
                          ? "Винарско имение Санта Сара АД"
                          : "Santa Sarah Wine Estate"
                      }</p>
                      <p>${
                        lang === "bg"
                          ? "Горица 8225, ул. Ивайло 2, <br> района на Поморие, Бургас, България"
                          : "Goritsa 8225, Ivaylo 2 street, <br> Pomorie region, Burgas, Bulgaria"
                      }</p>
                      <a href="https://wwww.santa-sarah.com">www.santa-sarah.com</a>
                      <a href="tel:+359888908064">+359 888 9080 64</a>
                      <a href="mailto:genowski@santa-sarah.com">genowski@santa-sarah.com</a>
                  </div>
              </div>
          </body>
          </html>
      `;
  
    template = template.replace(/\s+/g, " ").trim();
  
    return template;
  }

export async function sendEmail(
  req: PayloadRequest,
  {
    lang,
    operation,
    orderNumber,
    firstName,
    lastName,
    email,
    phone,
    orderTotal,
    paymentMethod,
    products,
    orderLink,
    name,
    companyName,
    request
  }: {
    lang: string;
    operation: "processing" | "completed" | "b2b";
    orderNumber?: number;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    orderTotal?: string;
    paymentMethod?: string;
    products?: any;
    orderLink?: string;
    name?: string;
    companyName?: string;
    request?: string;
  }
): Promise<any> {
  // Update the function return type
  try {
    if (operation === "processing") {
      const customerTemplate = customerProccessingEmail({
        lang,
        orderNumber,
        firstName,
        lastName,
        orderTotal,
        paymentMethod,
        products: await getProducts(products, req, lang),
      });

      const adminTemplate = adminProccessingEmail({
        orderNumber,
        firstName,
        lastName,
        email,
        phone,
        orderTotal,
        paymentMethod,
        products: await getProducts(products, req, "bg"),
        orderLink,
      });

      const adminEmailRequest1 = await fetch(process.env.EMAIL_API_URL, {
        // Use environment variable for URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Santa Sarah Shop <evgeniya.g@santa-sarah.com>",
          to: "denev@kodes.agency",
          subject: "Имате нова поръчка с номер: " + orderNumber,
          body: adminTemplate,
        }),
      });

        // const adminEmailRequest2 = await fetch(process.env.EMAIL_API_URL, {
        //   // Use environment variable for URL
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     from: "Santa Sarah Shop <evgeniya.g@santa-sarah.com>",
        //     to: "evgeniya.g@santa-sarah.com",
        //     subject: "Имате нова поръчка с номер: " + orderNumber,
        //     body: adminTemplate,
        //   }),
        // });

        // const adminEmailRequest3 = await fetch(process.env.EMAIL_API_URL, {
        //     // Use environment variable for URL
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       from: "Santa Sarah Shop <evgeniya.g@santa-sarah.com>",
        //       to: "genowski@santa-sarah.com",
        //       subject: "Имате нова поръчка с номер: " + orderNumber,
        //       body: adminTemplate,
        //     }),
        //   });

      const customerEmailRequest = await fetch(process.env.EMAIL_API_URL, {
        // Use environment variable for URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Santa Sarah Shop <evgeniya.g@santa-sarah.com>",
          to: email,
          subject:
            lang === "bg"
              ? "Вашата поръчка се обработва - Santa Sarah"
              : "Your order is being processed - Santa Sarah",
          body: customerTemplate,
        }),
      });

      // if (!customerEmailRequest.ok || !adminEmailRequest1.ok || !adminEmailRequest2.ok || !adminEmailRequest3.ok) {
      //   throw new Error(
      //     `Email API responded with HTTP ${
      //       customerEmailRequest.status || adminEmailRequest1.status
      //     }`
      //   );
      // }

      console.log("Emails sent successfully");
    }

    if (operation === "completed") {
    //   Implement the email template for completed orders
      const customerTemplate = customerCompletedEmail({
        lang,
        orderNumber,
        firstName,
        lastName,
        orderTotal,
        paymentMethod,
        products: await getProducts(products, req, lang),
      });

      const customerEmailRequest = await fetch(process.env.EMAIL_API_URL, {
        // Use environment variable for URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Santa Sarah Shop <evgeniya.g@santa-sarah.com>",
          to: email,
          subject:
            lang === "bg"
              ? "Поръчката Ви пътува към Вас - Santa Sarah"
              : "Your order has been shipped - Santa Sarah",
          body: customerTemplate,
        }),
      });

        if (!customerEmailRequest.ok) {
            throw new Error(
            `Email API responded with HTTP ${customerEmailRequest.status}`
            );
        }

        console.log("Emails sent successfully");
    }

    if(operation === "b2b") {
      // Implement the email template for B2B orders
        const customerTemplate = b2bCustomerEmail({
            lang,
            name,
            companyName,
        });

        const adminTemplate = b2bAdminEmail({
            lang,
            name,
            companyName,
            email,
            phone,
            request
        });

        const adminEmailRequest = await fetch(process.env.EMAIL_API_URL, {
            // Use environment variable for URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Santa Sarah Shop <evgeniya.g@santa-sarah.com>",
                to: "evgeniya.g@santa-sarah.com",
                subject: "Имате нова B2B заявка - Santa Sarah",
                body: adminTemplate,
            }),
        });

        const customerEmailRequest = await fetch(process.env.EMAIL_API_URL, {
            // Use environment variable for URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Santa Sarah Shop <evgeniya.g@santa-sarah.com>",
                to: email,
                subject:             
                lang === "bg"
                ? "Вашето запитване е получено успешно - Santa Sarah"
                : "Your request has been successfully received - Santa Sarah",
                body: customerTemplate,
            }),
        });


        if (!customerEmailRequest.ok || !adminEmailRequest.ok) {
            throw new Error(
            `Email API responded with HTTP ${
                customerEmailRequest.status || adminEmailRequest.status
            }`
            );
        }

        console.log("Emails sent successfully");
    }
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
    throw error;
  }
}
