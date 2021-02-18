import { useState } from "react";
import { searchUPC } from "api/productApi";
//import PriceDisplay from "modules/PriceDisplay";
import ShowPrices from "modules/ShowPrices";
import TextField from "@material-ui/core/TextField";
import { getDefaultImage } from "functions";

export default function Tools() {
  const [upc, setUpc] = useState("");
  const [result, setResult] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setHasSearched(true);
    searchUPC(upc).then((result) => {
      result.length ? setResult(result) : setResult({});
    });
    setUpc("");
  }

  return (
    <div>
      <div className="consult">
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
              pattern: "[7-9]{1}[0-9]{9}",
            }}
            variant="filled"
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
          />
        </form>
      </div>
      {result.length ? (
        <div className="result pure-g">
          <div className="pure-u-1 pure-u-sm-2-3">
            <h2 style={result[0].state ? { color: "green" } : { color: "red" }}>
              {result[0].name} (#{result[0].vid}){" "}
              {result[0].featured === "1" ? "*" : ""}
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
            <ul>
              <li>Notes: {result[0].notes}</li>
              <li>Description: {result[0].description}</li>
              <li>Composition: {result[0].composition}</li>
              <li>Country: {result[0].country}</li>
              <li>Manufacturer: {result[0].manufacturer}</li>
              <li>Order Date: {result[0].orderdate}</li>
              <li>Release Date: {result[0].release_date}</li>
              <li>Season: {result[0].season}</li>
              <li>Tags: {result[0].tags}</li>
              <li>Weight: {result[0].weight}</li>
              <li>Variant ID: {result[0].vid}</li>
              <li>Product ID: {result[0].product_id}</li>
            </ul>
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
