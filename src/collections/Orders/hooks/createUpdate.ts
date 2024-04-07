import { CollectionBeforeChangeHook } from "payload/types";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import CustomAdminError from "../../../utilities/errorClasses";


export const createUpdateOrder: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
    const WooCommerce = await new WooCommerceRestApi({
        url: process.env.PAYLOAD_PUBLIC_WOO_URL,
        consumerKey: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY,
        consumerSecret: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET,
        version: "wc/v3",
    })

    console.log(data)

    const lineItemsPromises = data.products.map(async (product) => {

        let total
        if(product.total){
            total = product.total.toString()
        } else {
            total = product.price * product.quantity.toString()
        }

        const productId = await req.payload.find({
            collection: "products",
            where: {
                id: {in : product.product}
            }
        })

        console.log(productId)
        return {
            product_id: Number(productId.docs[0].productId),
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
    })
    
    const lineItems = await Promise.all(lineItemsPromises);

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

    const order = {
        status: data.status,
        currency: "BGN",
        customer_note: data.customer_note,
        billing: {
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            phone: data?.phone,
            address_1: data?.address_1,
            city: data?.city,
            state: data?.state,
            postcode: data?.postcode,
            country: data?.country,
        },
        shipping: {
            first_name: data?.first_name,
            last_name: data?.last_name,
            address_1: data?.address_1,
            city: data?.city,
            state: data?.state,
            postcode: data?.postcode,
            country: data?.country,
        },
        line_items: lineItems,
        // coupon_lines: lineCoupons,
        payment_method: "cod",
        transaction_id: data.transaction_id,
        // Set up to true if there was a succefssful card payment
        set_paid: false,
    }
     

    if (operation === "create") {
      console.log("Creating order");
        await WooCommerce.post("orders", order)
        .then((response) => {
            data.orderId = response.data?.id;
            data.orderTotal = response.data?.total + " лв.";
            data.orderDate = response.data?.date_created;
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
            })
        })
        .catch((error) => {
            throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status)
        });

        return data
    }

    if (operation === "update") {
      console.log("Updating order");
        await WooCommerce.put(`orders/${data.orderId}`, order)
        .then((response) => {
            console.log(response.data.line_items)
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
            })
        })
        .catch((error) => {
            throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status)
        })
    }
};
 