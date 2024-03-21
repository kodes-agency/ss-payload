import { CollectionBeforeDeleteHook } from "payload/types";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import CustomAdminError from "../../../utilities/errorClasses";

export const deleteCoupon: CollectionBeforeDeleteHook = async ({ req, id }) => {
  const WooCommerce = new WooCommerceRestApi({
    url: process.env.PAYLOAD_PUBLIC_WOO_URL,
    consumerKey: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY,
    consumerSecret: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET,
    version: "wc/v3",
  });

  let coupon = await req.payload.find({
    collection: "coupons",
    where: {
      id: { equals: id },
    },
  });

  console.log(coupon?.docs[0]?.couponId)

  await WooCommerce.delete(`coupons/${coupon?.docs[0]?.couponId}`, {
    force: true,
  })
    .then((response) => {
      console.log("Coupon deleted")
    })
    .catch((error) => {
      throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status)
    });
};
