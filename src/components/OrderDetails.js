import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "api/orderApi";
import { getProducts } from "api/productApi";
import * as Constants from "constants.js";
import { useStickyState } from "hooks";
import OrderDetailsList from "modules/orders/OrderDetailsList";

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSelect, setProductSelect] = useState(0);
  const [variantSelect, setVariantSelect] = useState("");
  const [stockFilter, setStockFilter] = useStickyState(false, "stickyState");
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

  function createOrderItem() {
    alert("Creating new item");
  }

  function updateOrderItem(id) {
    alert("Updating order item ID " + id);
  }

  let result = products.filter((product) => {
    return product.id === productSelect;
  });

  let filteredProducts = products;
  if (stockFilter) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.totalstock > 0;
    });
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
          <table className="pure-table">
            <thead>
              <tr>
                <td colSpan="5">Agregar producto</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {result.length && result[0].images !== "" && (
                    <img
                      src={Constants.PROD_IMG_URL + result[0].images}
                      alt={result[0].name}
                      style={{ maxWidth: 75 }}
                    />
                  )}
                </td>
                <td>
                  <select
                    value={productSelect}
                    onChange={(e) => setProductSelect(e.target.value)}
                  >
                    {!filteredProducts.length ? (
                      <option>Cargando...</option>
                    ) : (
                      filteredProducts.map((product) => {
                        return (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        );
                      })
                    )}
                  </select>
                </td>
                <td>
                  <select
                    value={variantSelect}
                    onChange={(e) => setVariantSelect(e.target.value)}
                  >
                    {result.length &&
                      result[0].variants.map((variant) => {
                        return (
                          <option value={variant.vid}>
                            {variant.color} - {variant.size} ({variant.stock})
                          </option>
                        );
                      })}
                  </select>
                </td>
                <td>
                  <button
                    className="pure-button primary-button"
                    onClick={createOrderItem}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    className={
                      stockFilter
                        ? "pure-button primary-button"
                        : "pure-button secondary-button"
                    }
                    onClick={() => setStockFilter(!stockFilter)}
                  >
                    Solo stock
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="pure-table pure-table-striped">
            <tbody>
              {orderItems.length ? (
                orderItems.map((item, index) => {
                  return (
                    <OrderDetailsList
                      key={index}
                      item={item}
                      updateOrderItem={updateOrderItem}
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
