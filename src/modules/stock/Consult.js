import React, { useState } from "react";
import { searchUPC } from "api/productApi";

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
            placeholder="Buscar"
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
          />
        </form>
      </div>
      {result.length ? (
        <div className="result pure-g">
          <div className="pure-u-1 pure-u-sm-2-3">
            <h2>{result[0].name}</h2>
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
