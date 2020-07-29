import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";

function Cart({ cart }) {
  return (
    <div className="shopping-cart">
      <div className="icon">
        <RiShoppingCartLine />
      </div>
      <div className="cart-dropdown">
        <h3>Productos</h3>
        {!cart.length ? (
          <em>No hay productos en el carrito</em>
        ) : (
          cart.map((item, index) => {
            return <h5 key={index}>{item}</h5>;
          })
        )}
      </div>
    </div>
  );
}

export default Cart;
