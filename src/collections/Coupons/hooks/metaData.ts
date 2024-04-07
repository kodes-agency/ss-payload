// import { CollectionAfterChangeHook } from "payload/types";
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// import CustomAdminError from "../../../utilities/errorClasses";

// export const metaData: CollectionAfterChangeHook = async ({ doc, operation }) => {
//   const WooCommerce = new WooCommerceRestApi({
//     url: process.env.PAYLOAD_PUBLIC_WOO_URL,
//     consumerKey: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY,
//     consumerSecret: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET,
//     version: "wc/v3",
//   });
  
  
//   if(operation === "create") {
//     const coupon = {
//       meta_data: [
//           {
//               key: "id",
//               value: doc.id
//           }
//       ]
//     };
    
//     await WooCommerce.put(`coupons/${doc.couponId}`, coupon)
//     .then((response) => {
//       // console.log(response.data)
//       console.log(response.data)
//     })
//     .catch((error) => {
//         throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status)
//     });
//   }
// };
