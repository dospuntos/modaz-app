import { toast } from "react-toastify";
import { toggleFeatured, togglePublished } from "api/productApi";
import api from "api/api";
import _ from "lodash";

export default function productReducer(products, action) {
  switch (action.type) {
    // set state
    case "set":
      return action.data;

    // Toggle featured state in API and current state
    case "featuredToggle": {
      const { id } = action;

      // send change to API
      toggleFeatured(id);

      let tempProducts = products;
      let prevState = _.find(tempProducts, { id: id })["featured"];
      let newState = 1 - prevState;
      _.set(_.find(tempProducts, { id: id }), "featured", newState);

      if (newState) {
        toast.success("Producto destacado");
      } else {
        toast.warning("Producto NO destacado");
      }
      return [...tempProducts];
    }

    case "publishedToggle": {
      const { id } = action;
      togglePublished(id);

      let tempProducts = products;
      let prevState = _.find(tempProducts, { id: id })["state"];
      let newState = 1 - prevState;
      _.set(_.find(tempProducts, { id: id }), "state", newState);

      if (newState) {
        toast.success("Producto publicado");
      } else {
        toast.warning("Producto despublicado");
      }
      return [...tempProducts];
    }

    case "updateStock": {
      const { id, dir, productId } = action;
      let newVariantStock = 0;
      let tempProducts = products;

      // Apply changes in database
      api
        .changeStock(id, dir)
        .then((response) => {
          newVariantStock = response.data.data.variants[0].stock;
          // Update stock in state if success
          let { totalstock: prevTotalstock } = tempProducts.find(
            (post) => post.id === productId
          );

          let newTotalStock =
            dir === "UP" ? prevTotalstock + 1 : prevTotalstock - 1;

          // Update totalstock (products->productId->totalstock)
          _.set(
            _.find(tempProducts, { id: productId }),
            "totalstock",
            newTotalStock
          );

          // Update variant (products->productId->variants->vId->totalstock)
          _.set(
            _.find(_.flatten(_.map(tempProducts, "variants")), {
              vid: id,
            }),
            "stock",
            newVariantStock
          );
          toast.info(`Stock del producto cambiado a ${newVariantStock}`);
          return [...tempProducts];
          // End update stock
        })
        .catch((err) => {
          console.log(err);
          return products;
        });
      break;
    }

    case "updateVariant": {
      const { variant } = action;
      let updatedProducts = products;
      (async () => {
        try {
          await api.updateVariant(variant.id, variant); // Update variant
          updatedProducts = await api.getProducts(); // Get products and variants from DB
          toast.info(`Stock del producto cambiado a ${variant.stock}`);
        } catch (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            toast.error(JSON.stringify(error.response.data.messages));
            //setErrors(error.response.data.messages);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            toast.error("Could not get response from API. Check connection");
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            toast.error(`Undefined Error: ${error.message}`);
          }
        }
      })();

      return [...updatedProducts];
    }

    case "delete":
      if (window.confirm("Eliminar producto? No se puede restaurar.")) {
        const { id } = action;
        (async () => {
          try {
            await api.deleteProduct(id);
            toast.success("Producto eliminado.");
            return products.filter((item) => item.id !== id);
          } catch (error) {
            const { response } = error;
            console.log(response);
            toast.error(
              "Oops, no se pudo eliminar el producto.\n" +
                JSON.stringify(response.data.messages)
            );
          }
        })();

        // Delete product from database
        //api.deleteProduct(id);

        // Remove from state
        //toast.info("Producto eliminado.");
        //return products.filter((item) => item.id !== id);
        return products;
      } else {
        return products;
      }

    default:
      throw new Error(`Unhandled action ${action.type}`);
  }
}
