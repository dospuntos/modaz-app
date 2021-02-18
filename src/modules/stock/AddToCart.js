import { useState } from "react";
import { searchUPC } from "api/productApi";
import ShowPrices from "modules/ShowPrices";
import { toast } from "react-toastify";
import { getDefaultImage } from "functions";
import { useCart } from "modules/cart/cartContext";

export default function AddToCart() {
  const { dispatch } = useCart();
  const [upc, setUpc] = useState("");
  const [result, setResult] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    searchUPC(upc).then((result) => {
      if (result.length) {
        result[0]["order_item_quantity"] = "1";
        // Add to cart
        dispatch({
          type: "add",
          variant: result[0],
        });

        setResult(result);
      } else {
        setResult({});
        toast.warning("Producto NO encontrado");
      }
    });
    setUpc("");
  }

  return (
    <div className="remove">
      <h1>Agregar producto a carrito:</h1>
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
            <ShowPrices product={result[0]} />
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
              src={getDefaultImage(result[0].images)}
              alt={result[0].name}
            />
          </div>
        </div>
      ) : (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
}
