import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";

function Cart() {
  return (
    <div className="shopping-cart">
      <div className="icon">
        <RiShoppingCartLine />
      </div>
      <div className="cart-dropdown">
        <h3>Productos</h3>
      </div>
    </div>
  );
}

export default Cart;
