import React, { useState } from "react";
import { RiShoppingCartLine, RiDeleteBin5Line } from "react-icons/ri";
import "./cart.css";

function Cart({ cart, handleEmptyCart }) {
  const [cartUser, setCartUser] = useState("0");

  function saveCart(cart, user, type) {
    alert("Saving cart...");
  }

  return (
    <div className="shopping-cart">
      <div className="icon">
        <RiShoppingCartLine size={32} />
        {cart.length}
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
            <>
              <ul>
                {cart.map((item, index) => {
                  return <li key={index}>{item.name}</li>;
                })}
              </ul>
              <select
                value={cartUser}
                onChange={(e) => setCartUser(e.target.value)}
              >
                <option value="0">- Users -</option>
                <option value="345">Johan (345)</option>
                <option value="346">Joanne (346)</option>
              </select>
              {cartUser === "0" ? (
                ""
              ) : (
                <>
                  <button
                    className="pure-button primary-button pure-button-create-order"
                    onClick={() => saveCart(cart, cartUser, "order")}
                  >
                    Pedido
                  </button>
                  <button
                    className="pure-button secondary-button pure-button-create-quote"
                    onClick={() => saveCart(cart, cartUser, "quote")}
                  >
                    Cotización
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
