import React from "react";
import { RiShoppingCartLine, RiDeleteBin5Line } from "react-icons/ri";
import "./cart.css";

function Cart({ cart, handleEmptyCart }) {
  return (
    <div className="shopping-cart">
      <div className="icon">
        <RiShoppingCartLine size={32} />
        <div className="cart-dropdown">
          <span className="empty-cart" onClick={handleEmptyCart}>
            <RiDeleteBin5Line
              color={"red"}
              style={{ position: "absolute", top: "15px", right: "5px" }}
            />
          </span>
          {!cart.length ? (
            <em>No hay productos en el carrito</em>
          ) : (
            cart.map((item, index) => {
              return <h5 key={index}>{item}</h5>;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
