import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getOrderById,
  deleteOrderItem,
  addOrderItem,
  saveOrderItem,
} from "api/orderApi";
import { getProducts } from "api/productApi";
import OrderDetailsList from "modules/orders/OrderDetailsList";
import AddOrderItem from "modules/orders/AddOrderItem";

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);

  let { orderid } = useParams();
  /* let result = []; */

  useEffect(() => {
    // Get order details
    getOrderById(orderid, false).then((order) => {
      if (order.length) {
        setOrder(...order);
      }
    });
    // Get order items
    getOrderById(orderid, true).then((orderItems) => {
      setOrderItems(orderItems);
    });

    // get products
    getProducts().then((products) => {
      setProducts(products);
    });
  }, [orderid]);

  function createOrderItem(data) {
    addOrderItem(data).then(() => {
      getOrderById(orderid, true).then((orderItems) => {
        setOrderItems(orderItems);
      });
    });
  }

  function updateOrderItem(data) {
    saveOrderItem(data).then(() => {
      let _orderItems = orderItems;
      _orderItems = orderItems.map((item) => {
        return item.order_item_id === data.id
          ? {
              ...item,
              order_item_quantity: data.quantity,
              order_item_price: data.price,
            }
          : item;
      });
      setOrderItems(_orderItems);
    });
  }

  function handleDeleteClick(id) {
    if (
      window.confirm("¿Quieres eliminar el producto " + id + " del pedido?")
    ) {
      deleteOrderItem(id).then(() => {
        let _orderItems = orderItems.filter(
          (item) => item.order_item_id !== id
        );
        setOrderItems(_orderItems);
      });
    }
  }

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-2">
            <h1 className="email-content-title">Pedido #{order.id}</h1>
            <p className="email-content-subtitle">
              <strong>{order.orderdetails}</strong> -{" "}
              <span>{order.create_date}</span> Stock reducido:{" "}
              {order.stock_reduced === "1" ? "Si" : "No"}
            </p>
          </div>
        </div>

        <div className="email-content-body order-cards-container">
          <AddOrderItem
            products={products}
            handleSave={createOrderItem}
            orderid={orderid}
          />

          <table className="pure-table pure-table-striped">
            <tbody>
              {orderItems.length ? (
                orderItems.map((item, index) => {
                  return (
                    <OrderDetailsList
                      key={index}
                      item={item}
                      updateOrderItem={updateOrderItem}
                      handleDeleteClick={handleDeleteClick}
                    />
                  );
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
