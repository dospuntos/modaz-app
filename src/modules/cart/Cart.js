import React, { useState, useEffect } from "react";
import { createOrder } from "api/productApi";
import { useHistory } from "react-router-dom";
import { getUsers } from "api/usersApi";
import { RiShoppingCartLine, RiDeleteBin5Line } from "react-icons/ri";
import "./cart.css";

function Cart({
  cart,
  handleEmptyCart,
  handleVariantCountChange,
  handleDeleteCartItem,
}) {
  const [cartUser, setCartUser] = useState("0");
  const [users, setUsers] = useState([]);

  let history = useHistory();

  useEffect(() => {
    // Get users
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  function saveCart(cart, user, type) {
    createOrder(cart, user, type);
    handleEmptyCart(false); // Empty cart without confirmation
    history.push("/orders"); // Redirect to orders
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
              <ul className="cart-items">
                {cart.map((item, index) => {
                  return (
                    <li key={index}>
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
                {users.length ? (
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))
                ) : (
                  <option>Cargando usuarios...</option>
                )}
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
