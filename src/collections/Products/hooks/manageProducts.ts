import type { BeforeOperationHook } from "payload/dist/collections/config/types";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import CustomAdminError from "../../../utilities/errorClasses";

export const manageProducts: BeforeOperationHook = async ({
  args: { data, id, req: {locale, payload}},
  operation,
}) => {
  const WooCommerce = new WooCommerceRestApi({
    url: process.env.PAYLOAD_PUBLIC_WOO_URL,
    consumerKey: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_KEY,
    consumerSecret: process.env.PAYLOAD_PUBLIC_WOO_CONSUMER_SECRET,
    version: "wc/v3",
  });

  if (operation === "create") {
    const product = {
      name:
        locale === "bg"
          ? `${data?.productTitle} ${data?.productBasicInformation?.harvestYear ? new Date(data?.productBasicInformation?.harvestYear).getFullYear() : ""} ${data?.stockManagement?.volume || ""}`
          : "В изчакване на заглавие на български език",
      type: "simple",
      status: data?.visibilityGroup?.visibility === "1" ? "publish" : "draft",
      description: id,
      sku: data?.stockManagement?.sku || "",
      regular_price: data.priceManagement.regularPrice ? data.priceManagement.regularPrice.toString() : null,
      sale_price:
        data?.saleGroup?.onSale === "1"
          ? data?.priceManagement.salePrice.toString()
          : null,
      manage_stock: data?.stockGroup?.manageStock === "1" ? true : false,
      stock_quantity:
        data?.stockGroup?.manageStock === "1"
          ? data?.stockManagement?.stockQuantity
          : null,
      meta_data: [
        {
          key: "payload_id",
          value: id
        }
      ]
    };

    await WooCommerce.post("products", product)
      .then((response) => {
        data.productId = response.data?.id;
        // console.log(response.data)
      })
      .catch((error) => {
        throw new CustomAdminError(
          error.response?.data?.message,
          error.response?.data?.data?.status
        );
      });
  }

  if (operation === "update") {

    let name = await payload.find({
      collection: "products",
      where: {
        id: { equals: id },
        locale: 'bg'
      },
    });
    
    const product = {
      name: `${name.docs[0].productTitle} ${data?.productBasicInformation?.harvestYear ? new Date(data?.productBasicInformation?.harvestYear).getFullYear() : ""} ${data?.stockManagement?.volume === "0" ? "" : data?.stockManagement?.volume}`,
      type: "simple",
      status: data?.visibilityGroup?.visibility === "1" ? "publish" : "draft",
      description: id,
      sku: data?.stockManagement?.sku || "",
      regular_price: data.priceManagement.regularPrice ? data.priceManagement.regularPrice.toString() : null,
      sale_price:
        data?.saleGroup?.onSale === "1"
          ? data?.priceManagement.salePrice.toString()
          : null,
      manage_stock: data?.stockGroup?.manageStock === "1" ? true : false,
      stock_quantity:
        data?.stockGroup?.manageStock === "1"
          ? data?.stockManagement?.stockQuantity
          : null,
      meta_data: [
        {
          key: "payload_id",
          value: id
        }
      ]
    };

    if (!data?.productId) {
      await WooCommerce.post("products", product)
        .then((response) => {
          data.productId = response.data?.id;
          // console.log(response.data)
        })
        .catch((error) => {
          throw new CustomAdminError(
            error.response?.data?.message,
            error.response?.data?.data?.status
          );
        });
    } else {
      await WooCommerce.put(`products/${data?.productId}`, product)
        .then((response) => {
          // console.log(response.data)
        })
        .catch((error) => {
          throw new CustomAdminError(
            error.response?.data?.message,
            error.response?.data?.data?.status
          );
        });
    }
}
  
  if (operation === "delete") {
    let product = await payload.find({
      collection: "products",
      where: {
        id: { equals: id },
      },
    });

    await WooCommerce.delete(`products/${product?.docs[0]?.productId}`, {
      force: true,
    })
      .then((response) => {
        console.log("Product deleted");
      })
      .catch((error) => {
        throw new CustomAdminError(
          error.response?.data?.message,
          error.response?.data?.data?.status
        );
      });
  }
};
