import React, { useState } from "react";
import { useStickyState } from "hooks";
import { searchUPC } from "api/productApi";
import PriceDisplay from "modules/PriceDisplay";
import { changeStock } from "api/productApi";
import { quickOrder } from "api/orderApi";
import { toast } from "react-toastify";

function Remove() {
  const [upc, setUpc] = useState("");
  const [result, setResult] = useState({});
  const [createOrder, setCreateOrder] = useStickyState(false, "createOrder");

  function handleSubmit(e) {
    e.preventDefault();
    searchUPC(upc).then((result) => {
      if (result.length) {
        let newStock = parseInt(result[0].stock, 10) - 1;
        setResult(result, { ...(result[0].stock = newStock) });
        changeStock(result[0].vid, false); // Reduce stock by 1 in database
        toast.info("Stock reducido a " + newStock);
        if (createOrder) {
          /* Create quick-order in database with default price */
          quickOrder(result[0].vid, result[0].price).then((result) => {
            toast.success("Pedido rápido generado.");
          });
        }
      } else {
        setResult({});
        toast.warning("Producto NO encontrado");
      }
    });
    setUpc("");
  }

  return (
    <div className="remove">
      <h1>Reducir stock para producto con UPC:</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="pure-input-1"
          type="text"
          placeholder="Buscar UPC"
          value={upc}
          onChange={(e) => setUpc(e.target.value)}
        />
      </form>
      {result.length ? (
        <div className="result pure-g">
          <div className="pure-u-1 pure-u-sm-2-3">
            <h2 style={result[0].state ? { color: "green" } : { color: "red" }}>
              {result[0].name} (#{result[0].id}) {result[0].featured ? "*" : ""}
            </h2>
            <h4>
              Categorías: {result[0].category} - UPC: {result[0].upc}
            </h4>
            <PriceDisplay product={result[0]} />
            <h2>
              {result[0].size}, {result[0].color}
            </h2>
            <span
              className="product-stock"
              style={{
                float: "right",
                fontSize: 75,
                border: "1px solid black",
                padding: 10,
                borderRadius: 10,
                color: result[0].stock > 0 ? "green" : "red",
              }}
            >
              {result[0].stock}
            </span>
          </div>
          <div className="pure-u-1 pure-u-sm-1-3">
            <img
              style={{ width: "100%" }}
              src={
                result[0].images !== "0"
                  ? process.env.REACT_APP_PROD_IMG_URL + result[0].images
                  : process.env.REACT_APP_DEFAULT_IMG_URL
              }
              alt={result[0].name}
            />
          </div>
        </div>
      ) : (
        <p>Producto no encontrado.</p>
      )}
      <button
        className={
          "secondary-button pure-button" + (createOrder ? " active" : "")
        }
        onClick={() => setCreateOrder(!createOrder)}
      >
        Crear pedido
      </button>
    </div>
  );
}

export default Remove;
