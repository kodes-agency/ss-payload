import { CollectionBeforeDeleteHook } from "payload/types";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import CustomAdminError from "../../../utilities/errorClasses";

export const deleteOrder: CollectionBeforeDeleteHook = async ({ req, id }) => {
  const WooCommerce = new WooCommerceRestApi({
    url: process.env.PAYLOAD_PUBLIC_WOO_URL,
    consumerKey: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY,
    consumerSecret: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET,
    version: "wc/v3",
  });

  throw new CustomAdminError("Изтриването на поръчки не е разрешено, спрямо изискванията на НАП", 403);

  let order = await req.payload.find({
    collection: "orders",
    where: {
      id: { equals: id },
    },
  });


  await WooCommerce.delete(`orders/${order?.docs[0]?.orderId}`, {
    force: true,
  })
    .then((response) => {
      console.log("Order deleted")
    })
    .catch((error) => {
      throw new CustomAdminError(error.response?.data?.message, error.response?.data?.data?.status)
    });
};
