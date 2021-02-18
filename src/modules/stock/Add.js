import { useState } from "react";
import { searchUPC } from "api/productApi";
//import PriceDisplay from "modules/PriceDisplay";
import ShowPrices from "modules/ShowPrices";
import { changeStock } from "api/productApi";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import { getDefaultImage } from "functions";

export default function Add() {
  const [upc, setUpc] = useState("");
  const [result, setResult] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setHasSearched(true);
    searchUPC(upc).then((result) => {
      if (result.length) {
        let newStock = parseInt(result[0].stock, 10) + 1;
        setResult(result, { ...(result[0].stock = newStock) });
        changeStock(result[0].vid, true); // Increase stock by 1 in database
        toast.info("Stock incrementado a " + newStock);
      } else {
        setResult({});
        toast.warning("Producto NO encontrado");
      }
    });
    setUpc("");
  }

  return (
    <div className="add">
      <h1>Agregar stock para producto con UPC:</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="filled-full-width"
          label="Buscar UPC"
          style={{ margin: 8, fontSize: "50px" }}
          placeholder="Ingresar o escanear UPC"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            style: {
              fontSize: 50,
            },
          }}
          variant="filled"
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
        hasSearched && <p>Producto no encontrado.</p>
      )}
    </div>
  );
}
