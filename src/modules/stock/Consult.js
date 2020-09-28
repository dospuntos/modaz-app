import React, { useState } from "react";
import { searchUPC } from "api/productApi";
import PriceDisplay from "modules/PriceDisplay";

export default function Tools() {
  const [upc, setUpc] = useState("");
  const [result, setResult] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    searchUPC(upc).then((result) => {
      result.length ? setResult(result) : setResult({});
    });
    setUpc("");
  }

  return (
    <div>
      <div className="consult">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="pure-input-1"
            type="text"
            placeholder="Buscar UPC"
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
          />
        </form>
      </div>
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
            <ul>
              <li>Composition: {result[0].composition}</li>
              <li>Country: {result[0].country}</li>
              <li>Description: {result[0].description}</li>
              <li>Manufacturer: {result[0].manufacturer}</li>
              <li>Notes: {result[0].notes}</li>
              <li>Order Date: {result[0].orderdate}</li>
              <li>Release Date: {result[0].release_date}</li>
              <li>Season: {result[0].season}</li>
              <li>Tags: {result[0].tags}</li>
              <li>Weight: {result[0].weight}</li>
            </ul>
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
    </div>
  );
}
