// import { CollectionBeforeChangeHook } from "payload/types";
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// import CustomAdminError from "../../../utilities/errorClasses";


// export const createUpdateCoupon: CollectionBeforeChangeHook = async ({ data, operation, req }) => {

//     const WooCommerce = await new WooCommerceRestApi({
//         url: process.env.PAYLOAD_PUBLIC_WOO_URL,
//         consumerKey: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY,
//         consumerSecret: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET,
//         version: "wc/v3",
//     });

//     const products = await req.payload.find({
//         collection: "products",
//         limit: 100,
//         where: {
//             id: { in: data.product_ids },
//         }
//     })
    
//     const productIds = products.docs.map((product) => product.productId);

//     const coupon = {
//         code: data?.code,
//         amount: data?.amount.toString(),
//         discount_type: data?.discount_type,
//         product_ids: productIds ? productIds : null,
//         date_expires: data?.date_expires ? data?.date_expires.toString() : "",
//         minimum_amount: data?.minimum_amount ? data?.minimum_amount.toString() : "",
//     };

//     if (operation === "create") {
//         console.log(coupon)
//       console.log("Creating coupon");
//         await WooCommerce.post("coupons", coupon)
//         .then((response) => {
//             data.couponId = response.data?.id;
//             // console.log(response.data)
//         })
//         .catch((error) => {
//             throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status)
//         });

//         return data;
//     }

//     if (operation === "update") {
//       console.log("Updating coupon");

//         await WooCommerce.put(`coupons/${data.couponId}`, coupon)
//         .then((response) => {
//           // console.log(response.data)
//         })
//         .catch((error) => {
//             throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status)
//         });
//     }
// };
//  ``