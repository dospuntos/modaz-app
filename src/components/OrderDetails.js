import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStickyState } from "hooks";
import {
  getOrderById,
  deleteOrderItem,
  addOrderItem,
  saveOrderItem,
} from "api/orderApi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { getProducts } from "api/productApi";
import OrderDetailsList from "modules/orders/OrderDetailsList";
import OrderDetailsQuote from "modules/orders/OrderDetailsQuote";
import AddOrderItem from "modules/orders/AddOrderItem";

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useStickyState("list");

  let { orderid } = useParams();

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

  function totalPrice() {
    let total = 0;
    orderItems.forEach((item) => {
      total += item.order_item_quantity * item.order_item_price;
    });

    return total;
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
          <div className="pure-u-3-4">
            <h1 className="email-content-title">Pedido #{order.id}</h1>
            <p className="email-content-subtitle">
              <strong>{order.orderdetails}</strong> -{" "}
              <span>{order.create_date}</span> Stock reducido:{" "}
              {order.stock_reduced === "1" ? "Si" : "No"}
            </p>
          </div>
          <div className="pure-u-1-4">
            <button
              className={
                "secondary-button pure-button" +
                (view === "list" ? " active" : "")
              }
              onClick={() => setView("list")}
            >
              <FaThList />
            </button>
            <button
              className={
                "secondary-button pure-button" +
                (view === "quote" ? " active" : "")
              }
              onClick={() => setView("quote")}
            >
              <BsGrid3X3GapFill />
            </button>
            {view === "quote" && (
              <button
                className="pure-button primary-button"
                onClick={() => {
                  window.print();
                }}
              >
                Imprimir
              </button>
            )}
          </div>
        </div>

        <div className="email-content-body order-cards-container">
          {view === "list" ? (
            <>
              <AddOrderItem
                products={products}
                handleSave={createOrderItem}
                orderid={orderid}
              />
              <hr />
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
                        <Link
                          to="/orders"
                          className="pure-button primary-button"
                        >
                          Volver a pedidos
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <div className="invoice-box" id="pdf-invoice">
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr className="top">
                    <td colSpan="4">
                      <table>
                        <tbody>
                          <tr>
                            <td className="title">
                              <img
                                src="/img/ZWS-Dist-Logo-PINK.jpg"
                                alt="ModaZ Logo"
                                style={{ width: "100%", maxWidth: 300 }}
                              />
                            </td>

                            <td colSpan="3">
                              <h3>Detalles de pedido de Moda Z</h3>
                              <br /> Fecha:{" "}
                              {new Date().toLocaleString("es-CO").split(",")[0]}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <tr className="information">
                    <td colSpan="4">
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan="3">
                              <strong>
                                Moda Z - Distribuidora Autorizada de Zumba Wear
                                en Bolivia
                              </strong>
                              <br /> Joanne Maidana
                              <br /> Distribuidora Autorizada para Bolivia
                            </td>

                            <td>
                              {/* <strong>Sin Nombre</strong> <br />{" "}
                              sinnombre@modaz.net{" "} */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="heading">
                    <td></td>
                    <td>Producto</td>
                    <td style={{ textAlign: "center" }}>Cantidad</td>
                    <td>Precio unitario</td>
                    <td>Precio total</td>
                  </tr>
                  {orderItems.map((item, index) => {
                    return <OrderDetailsQuote key={index} item={item} />;
                  })}

                  <tr className="total">
                    <td></td>

                    <td colSpan="4">Total: Bs. {totalPrice()} </td>
                  </tr>
                </tbody>
              </table>
              <p className="small">
                <strong>Nota:</strong> No podemos garantizar la disponibilidad
                de los productos hasta que el pedido haya sido confirmado.
                <br />
                La cotización tiene validez de 30 días a partir de la fecha.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
