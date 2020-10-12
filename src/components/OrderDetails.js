import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStickyState } from "hooks";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import {
  getOrderById,
  deleteOrderItem,
  addOrderItem,
  saveOrderItem,
  changeOrderState,
} from "api/orderApi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { getProducts } from "api/productApi";
import OrderDetailsList from "modules/orders/OrderDetailsList";
import OrderDetailsQuote from "modules/orders/OrderDetailsQuote";
import AddOrderItem from "modules/orders/AddOrderItem";
import { toast } from "react-toastify";

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useStickyState("list");
  const [showTools, setShowTools] = useState(false);
  const [config, setConfig] = useStickyState(
    [
      {
        name: "",
        comment: "Comment",
        shipping: 20,
        showTotal: true,
        showPrice: true,
      },
    ],
    "quoteConfig"
  );

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

  function updateOrderState(e) {
    changeOrderState(order.id, e.target.value).then((result) => {
      toast.info("Estado del pedido actualizado");
    });
    setOrder({ ...order, order_state: e.target.value });
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
            <h1 className="email-content-title">
              Pedido #{order.id} - Bs. {totalPrice()}
            </h1>
            <p className="email-content-subtitle">
              <strong>{order.orderdetails}</strong> -{" "}
              <span>{order.create_date}</span> Stock reducido:{" "}
              {order.stock_reduced === "1" ? "Si" : "No"}
            </p>
          </div>
          <div className="pure-u-1-4">
            <FormGroup row>
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, newView) => setView(newView)}
                aria-label="layout"
              >
                <ToggleButton value="list">
                  <FaThList />
                </ToggleButton>
                <ToggleButton value="quote">
                  <BsGrid3X3GapFill />
                </ToggleButton>
              </ToggleButtonGroup>

              <FormControl>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={order.order_state ? order.order_state : 0}
                  onChange={(e) => updateOrderState(e)}
                >
                  <MenuItem value="0">Cotización</MenuItem>
                  <MenuItem value="1">Para cotizar</MenuItem>
                  <MenuItem value="2">Cotizado</MenuItem>
                  <MenuItem value="3">Confirmado</MenuItem>
                  <MenuItem value="4">Entregado (pago pendiente)</MenuItem>
                  <MenuItem value="5">Entregado</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={showTools}
                    onChange={() => setShowTools(!showTools)}
                    name="checkedA"
                  />
                }
                label="Ajustes"
                labelPlacement="start"
              />
            </FormGroup>
          </div>
          {showTools && (
            <div className="pure-u-1">
              <h4>Configuración</h4>
              Mostrar campos (para vista de impresión):{" "}
              <button
                className={
                  "secondary-button pure-button" +
                  (config.showTotal ? " active" : "")
                }
                onClick={() =>
                  setConfig({ ...config, showTotal: !config.showTotal })
                }
              >
                Mostrar total
              </button>
              <button
                className={
                  "secondary-button pure-button" +
                  (config.showPrice ? " active" : "")
                }
                onClick={() =>
                  setConfig({ ...config, showPrice: !config.showPrice })
                }
              >
                Mostrar precios
              </button>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                placeholder="Nombre"
              />
              <textarea
                style={{ width: "100%", display: "block" }}
                onChange={(e) =>
                  setConfig({ ...config, comment: e.target.value })
                }
                placeholder="Comentario/nota"
                value={config.comment}
              />
            </div>
          )}
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
                              {config.name && (
                                <strong>
                                  Cotización para:
                                  <br />
                                  {config.name}
                                </strong>
                              )}
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
                    {config.showPrice && <td>Precio unitario</td>}
                    {config.showPrice && <td>Precio total</td>}
                  </tr>
                  {orderItems.map((item, index) => {
                    return (
                      <OrderDetailsQuote
                        key={index}
                        item={item}
                        config={config}
                      />
                    );
                  })}

                  {config.showTotal && (
                    <tr className="total">
                      <td></td>

                      <td colSpan="4">Total: Bs. {totalPrice()}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {config.comment === "" ? (
                <p className="small">
                  <strong>Nota:</strong> No podemos garantizar la disponibilidad
                  de los productos hasta que el pedido haya sido confirmado.
                  <br />
                  La cotización tiene validez de 30 días a partir de la fecha.
                </p>
              ) : (
                <p className="small">
                  <strong>Nota: </strong>
                  <span style={{ whiteSpace: "pre-line" }}>
                    {config.comment}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
