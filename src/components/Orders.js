import React, { useState, useEffect } from "react";
import { getOrders } from "api/orderApi";
import OrderListItem from "modules/orders/OrderListItem";
import { getUsers } from "api/usersApi";
import { getProducts } from "api/productApi";

function Orders() {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState("id");
  const [orderDir, setOrderDir] = useState("desc");

  useEffect(() => {
    // Get orders
    getOrders().then((orders) => {
      setOrders(orders);
    });
    getUsers().then((users) => {
      setUsers(users);
    });
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const getUser = (userId) => users.find((x) => x.id === userId)?.name;

  let order;
  let filteredOrders = orders;
  if (orderDir === "asc") {
    order = 1;
  } else {
    order = -1;
  }

  filteredOrders = filteredOrders
    .sort((a, b) => {
      if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    })
    .filter((eachItem) => {
      return eachItem["orderdetails"]
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-2">
            <h1 className="email-content-title">Pedidos y cotizaciones</h1>
            <p className="email-content-subtitle">
              <span>Número de pedidos: {orders.length}</span>
            </p>
            <p>
              <span className="small-label orderstatus-1">Para cotizar</span>
              <span className="small-label orderstatus-2">Cotizado</span>
              <span className="small-label orderstatus-3">
                Confirmado (por entregar)
              </span>
              <span className="small-label orderstatus-4">
                Entregado (Pendiente pago)
              </span>
              <span className="small-label orderstatus-5">Entregado</span>
            </p>
          </div>

          <div className="email-content-controls pure-u-1-2">
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="id">ID</option>
              <option value="order_state">Estado de pedido</option>
              <option value="create_date">Fecha</option>
            </select>
            <span
              className="pure-button secondary-button"
              onClick={() => setOrderDir(orderDir === "asc" ? "desc" : "asc")}
            >
              {orderDir}
            </span>
            <input
              className="pure-input-1"
              type="text"
              placeholder="Buscar pedido"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="email-content-body product-cards-container">
          {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
          {filteredOrders.map((order) => {
            return (
              <OrderListItem
                key={order.id}
                order={order}
                products={products}
                userName={getUser(order.client)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;
