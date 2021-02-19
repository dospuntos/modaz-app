import { toast } from "react-toastify";

export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      if (window.confirm("Quieres vaciar el carrito de compras?")) {
        toast.info("Carrito de compras vaciado.");
        return [];
      }
      return cart;

    case "empty2" /* Empty cart without confirmation */:
      return [];

    case "updateQuantity": {
      const { vid, quantity } = action;
      // Send Toast notification
      quantity === 0
        ? toast.warning("Item eliminado del carrito")
        : toast.info("Cantidad cambiado en carrito");
      // Return updated cart
      return quantity === 0
        ? cart.filter((i) => i.vid !== vid)
        : cart.map((i) =>
            i.vid === vid ? { ...i, order_item_quantity: quantity } : i
          );
    }

    case "add":
      const { variant } = action;
      const itemInCart = cart.find((i) => i.vid === variant.vid);
      if (itemInCart) {
        // Return new array with the matching item replaced
        toast.info("Producto existe en el carrito, cantidad incrementado.");
        return cart.map((i) =>
          i.vid === variant.vid
            ? {
                ...variant,
                order_item_quantity: parseInt(i.order_item_quantity) + 1,
              }
            : i
        );
      } else {
        // Return new array with the new item appended
        toast.info("Producto agregado al carrito");
        return [...cart, variant];
      }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}
