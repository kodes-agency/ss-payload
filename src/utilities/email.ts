interface Product {
    name: string;
    quantity: number;
    total: number;
}

function productTemplate(products: Product[]): string {
    return products.map((product: Product) => {
        return `
            <tr>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.total} BGN</td>
            </tr>
        `
    }).join("");
}

function emailTemplate(lang: string, orderNumber: string, firstName: string, lastName: string, orderTotal: string, paymentMethod: string, products: Product[]): string {
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
                }

                .flex-col {
                    display: flex;
                    flex-direction: column;
                }
                
                a {
                    color: #847648;
                    text-decoration: none;
                    font-size: 14px;
                }

                .table-bottom-header {
                    opacity: 0;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>${lang === "bg" ? "Вашата поръчка е в процес на обработка." : "Your order is being processed."}</h1>
                </div>
                <div class="body">
                    <p>${lang === "bg" ? "Здравейте," : "Dear"} ${firstName} ${lastName}</p>
                    <p>${lang === "bg" ? "Благодарим Ви, че избрахте винарско имение Санта Сара. Номерът на Вашата поръчка е:" : "Thank you for your purchase. Your order number is:"} <span>${orderNumber}</span></p>
                    <p>${lang === "bg" ? "В най-кратък срок ще обработим Вашата поръчка и ще се свържем с Вас с детейли относно доставката." : "We will proccess your order as soon as possible and contact you with the details for the delivery method and price."}</p>
                    <p>${lang === "bg" ? "Информация за Вашата поръчка:" : "Here are the details of your order:"}</p>
                    <table class="table-container">
                        <thead>
                            <tr>
                                <th>${lang === "bg" ? "Име на продукта" : "Product Name"}</th>
                                <th>${lang === "bg" ? "Koличество" : "Quantity" }</th>
                                <th>${lang === "bg" ? "Цена" : "Price" }</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productTemplate(products)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2">${lang === "bg" ? "Общо" : "Total"}</td>
                                <td>${orderTotal}</td>
                            </tr>
                            <tr>
                                <td colspan="2">${lang === "bg" ? "Доставка" : "Shipping"}</td>
                                <td>${lang === "bg" ? "В изчакване на детайли" : "Аwaiting more details"}</td>
                            </tr>
                            <tr>
                                <td colspan="2">${lang === "bg" ? "Начин на плащане" : "Payment method"}</td>
                                <td>${paymentMethod}</td>
                            </tr>
                        </tfoot>
                    </table>


                    <p>${lang === "bg" ? "Надяваме се да се насладите на всяка капка от поръчаните вина. Ако имате въпроси, не се колебайте да се свържете с нас на посочените данни за контакт." : "We hope you enjoy your wine. If you have any questions, feel free to contact our team."}</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 ${lang === "bg" ? "Винарско имение Санта Сара АД" : "Santa Sarah Wine Estate"}</p>
                    <p>${lang === "bg" ? "Горица 8225, ул. Ивайло 2, <br> района на Поморие, Бургас, България" : "Goritsa 8225, Ivaylo 2 street, <br> Pomorie region, Burgas, Bulgaria"}</p>
                    
                    <div class="flex-col">
                        <a href="https://wwww.santa-sarah.com">www.santa-sarah.com</a>
                        <a href="tel:+359888908064">+359 888 9080 64</a>
                        <a href="mailto:genowski@santa-sarah.com">genowski@santa-sarah.com</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `

    template = template.replace(/\s+/g, ' ').trim();

    return template;
}





export async function sendEmail(
    lang: string, 
    orderNumber: string, 
    firstName: string, 
    lastName: string, 
    orderTotal: string, 
    paymentMethod: string, 
    products: Product[]
  ): Promise<any> { // Update the function return type
    try {      
      const template = emailTemplate(lang, orderNumber, firstName, lastName, orderTotal, paymentMethod, products);
  
      const emailRequest = await fetch(process.env.EMAIL_API_URL, { // Use environment variable for URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          from: "evgeniya.g@santa-sarah.com",
          to: "denev@kodes.agency",
          name: "Santa Sarah Wine Estate",
          subject: "Поръчка от Santa Sarah",
          body: template,
        })
      })
  
      if (!emailRequest.ok) {
        throw new Error(`Email API responded with HTTP ${emailRequest.status}`);
      }

      console.log("Email sent successfully")
      const emailResponse = await emailRequest.json();
  
      return emailResponse;
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
      throw error;
    }
  }