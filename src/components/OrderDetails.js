import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../api/orderApi";
import OrderDetailsList from "../modules/OrderDetailsList";

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  let { orderid } = useParams();

  useEffect(() => {
    // Get order details
    getOrderById(orderid, false).then((order) => {
      if (order.length) {
        setOrder(...order);
      }
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
            <h1 className="email-content-title">Pedido #{order.id}</h1>
            <p className="email-content-subtitle">
              <strong>{order.orderdetails}</strong> -{" "}
              <span>{order.create_date}</span> Stock reducido:{" "}
              {order.stock_reduced ? "Si" : "No"}
            </p>
          </div>
        </div>

        <div className="email-content-body order-cards-container">
          <table className="pure-table pure-table-striped">
            <tbody>
              {orderItems.length ? (
                orderItems.map((item, index) => {
                  return <OrderDetailsList key={index} item={item} />;
                })
              ) : (
                <tr className="error">
                  <td colSpan="100">
                    <h2>Pedido no encontrado</h2>
                    <Link to="/orders" className="pure-button primary-button">
                      Volver a pedidos
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
