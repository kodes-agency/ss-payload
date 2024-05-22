import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import CustomAdminError from "../../../utilities/errorClasses";
import { BeforeOperationHook } from "payload/dist/collections/config/types";
import { sendEmail } from "../../../utilities/email";


export const manageOrders: BeforeOperationHook = async ({
    args: { data, id,req, req: {locale, payload}},
    operation,
  }) => {

    const WooCommerce = await new WooCommerceRestApi({
        url: process.env.PAYLOAD_PUBLIC_WOO_URL,
        consumerKey: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY,
        consumerSecret: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET,
        version: "wc/v3",
    })

    if(operation === "create" && req.payloadAPI === "REST") {
        throw new CustomAdminError("Създаването на поръчки не е възможно поради ограничения произлизащи от използваните палтежни методи", 403)
    }


    // const lineCouponsPromises = data.coupons.map(async (coupon) => {
    //     const couponId = await req.payload.find({
    //         collection: "coupons",
    //         where: {
    //             id: {in : coupon}
    //         }
    //     })
    //     return {
    //         code: couponId.docs[0].code
    //     }   
    // })

    // const lineCoupons = await Promise.all(lineCouponsPromises);
     

    // if (operation === "create" && req.payloadAPI === "REST") {
    //   console.log("Creating order");

    //   const lineItemsPromises = data.products.map(async (product) => {

    //     let total
    //     if(product.total){
    //         total = product.total.toString()
    //     } else {
    //         total = product.price * product.quantity.toString()
    //     }

    //     const productId = await payload.find({
    //         collection: "products",
    //         where: {
    //             id: {in : product.product}
    //         }
    //     })

    //     return {
    //         product_id: Number(productId.docs[0].productId),
    //         id: product.product_key,
    //         quantity: product.quantity,
    //         meta_data: [
    //             {
    //                 key: "id",
    //                 value: `${product.product}`
    //             }
    //         ],
    //         subtotal: product.price ? (product.price * product.quantity).toString() : undefined,
    //         total: product.price ? (product.price * product.quantity).toString() : undefined,
    //     }
    // })
    
    // const lineItems = await Promise.all(lineItemsPromises);

    // const order = {
    //     status: data.status,
    //     currency: "BGN",
    //     customer_note: data.customer_note,
    //     billing: {
    //         first_name: data?.first_name,
    //         last_name: data?.last_name,
    //         email: data?.email,
    //         phone: data?.phone,
    //         address_1: data?.address_1,
    //         city: data?.city,
    //         state: data?.state,
    //         postcode: data?.postcode,
    //         country: data?.country,
    //     },
    //     shipping: {
    //         first_name: data?.first_name,
    //         last_name: data?.last_name,
    //         address_1: data?.address_1,
    //         city: data?.city,
    //         state: data?.state,
    //         postcode: data?.postcode,
    //         country: data?.country,
    //     },
    //     line_items: lineItems,
    //     // coupon_lines: lineCoupons,
    //     payment_method: "other_method",
    //     transaction_id: data.transaction_id,
    //     // Set up to true if there was a succefssful card payment
    //     set_paid: false,
    // }

    //     await WooCommerce.post("orders", order)
    //     .then((response) => {
    //         data.orderId = response.data?.id;
    //         data.orderTotal = response.data?.total + " лв.";
    //         data.orderDate = response.data?.date_created;
    //         data.payment_method_title = "Създаден от вътрешна система"
    //         data.products = data.products.map((product) => {
    //             const lineItem = response.data.line_items.find((lineItem) => lineItem.meta_data[0].value == product.product)
    //             return {
    //                 ...product,
    //                 sku: lineItem.sku,
    //                 price: lineItem.price,
    //                 price_readOnly: lineItem.price,
    //                 total: lineItem.total,
    //                 product_key: lineItem.id
    //             }
    //         })
    //     })
    //     .catch((error) => {
    //         throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status)
    //     });

    //     return
    // }

    if (operation === "update" && req.payloadAPI === "REST") {
        const lineItemsPromises = data.products.map(async (product) => {
            const total = product.total ? product.total.toString() : (product.price * product.quantity).toString();
    
            const productId = await payload.find({
                collection: "products",
                where: {
                    id: {in : product.product}
                }
            });
    
            if (!productId.docs[0]) {
                throw new Error('Product not found');
            }
    
            return {
                product_id: Number(productId.docs[0].productId),
                product: productId.docs[0].id,
                id: product.product_key,
                quantity: product.quantity,
                meta_data: [
                    {
                        key: "id",
                        value: `${product.product}`
                    }
                ],
                subtotal: product.price ? (product.price * product.quantity).toString() : undefined,
                total: product.price ? (product.price * product.quantity).toString() : undefined,
            }
        });
    
        const lineItems = await Promise.all(lineItemsPromises);
    
        const customerDetails = {
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            phone: data?.phone,
            address_1: data?.address_1,
            city: data?.city,
            state: data?.state,
            postcode: data?.postcode,
            country: data?.country,
        };
    
        const order = {
            status: data.status,
            currency: "BGN",
            customer_note: data.customer_note,
            billing: customerDetails,
            shipping: customerDetails,
            line_items: lineItems,
            payment_method: "other_payment",
            set_paid: false,
        };
    
        console.log("Updating order");
    
        try {
            const response = await WooCommerce.put(`orders/${data.orderId}`, order);
            
            if(data.status === "completed" && data.completed === "0") {
                let payment = await payload.findByID({
                    collection: "payments",
                    id: data.transaction
                });
                await sendEmail(req, {
                    lang: payment.LANG,
                    operation: 'completed',
                    orderNumber: response.data.id,
                    firstName: response.data.billing.first_name,
                    lastName: response.data.billing.last_name,
                    email: response.data.billing.email,
                    phone: response.data.billing.phone,
                    orderTotal: response.data.total,
                    paymentMethod: 'Credit/Debit card',
                    products: lineItems,
                })
                data.completed = "1";
            }


            data.orderTotal = response.data?.total  + " лв.";
            data.products = data.products.map((product) => {
                const lineItem = response.data.line_items.find((lineItem) => lineItem.meta_data[0].value == product.product)
                return {
                    ...product,
                    sku: lineItem.sku,
                    price: lineItem.price,
                    price_readOnly: lineItem.price,
                    total: lineItem.total,
                    product_key: lineItem.id
                }
            });

        } catch (error) {
            throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status);
        }
    }
};
 