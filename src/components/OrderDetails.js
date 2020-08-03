import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../api/orderApi";

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  let { orderid } = useParams();

  useEffect(() => {
    // Get order details
    getOrderById(orderid, false).then((order) => {
      setOrder(order);
    });
    // Get order items
    getOrderById(orderid, true).then((order) => {
      setOrderItems(order);
    });
  }, [orderid]);
  console.log(order);

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-2">
            <h1 className="email-content-title">Pedido {orderid}</h1>
            <p className="email-content-subtitle">
              {order.length ? order[0].orderdetails : ""}
            </p>
          </div>
        </div>

        <div className="email-content-body product-cards-container">
          {order.length ? (
            orderItems.map((item) => {
              return (
                <p>
                  {item.name ? (
                    item.name
                  ) : (
                    <i style={{ color: "red" }}>
                      Producto {item.product_id} no encontrado
                    </i>
                  )}
                </p>
              );
            })
          ) : (
            <div className="error">
              <h2>Pedido no encontrado</h2>
              <Link to="/orders" className="pure-button primary-button">
                Volver a pedidos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
