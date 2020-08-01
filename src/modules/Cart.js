import React, { useState } from "react";
import { createOrder } from "../api/productApi";
import { useHistory } from "react-router-dom";
import { RiShoppingCartLine, RiDeleteBin5Line } from "react-icons/ri";
import "./cart.css";

function Cart({
  cart,
  handleEmptyCart,
  handleVariantCountChange,
  handleDeleteCartItem,
}) {
  const [cartUser, setCartUser] = useState("0");
  let history = useHistory();

  function saveCart(cart, user, type) {
    createOrder(cart, user, type);
    handleEmptyCart(false); // Empty cart without confirmation
    history.push("/orders"); // Redirect to orders
  }

  /*   function removeDuplicates(data, key) {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  }

  let cart2 = removeDuplicates(cart, (it) => it.vid);
  console.log(cart2); 

  console.log(_.uniq(cart, true));*/

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
              <ul className="cart-items">
                {cart.map((item) => {
                  return (
                    <li key={item.vid}>
                      {item.name}
                      <br />
                      <small>
                        {item.color}, {item.size}
                      </small>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        step="1"
                        value={item.order_item_quantity}
                        onChange={(e) => handleVariantCountChange(e, item.vid)}
                      />
                      <RiDeleteBin5Line
                        color="red"
                        style={{ float: "right" }}
                        onClick={() => handleDeleteCartItem(item.vid)}
                      />
                    </li>
                  );
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
