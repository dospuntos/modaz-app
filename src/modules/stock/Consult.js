import { useState } from "react";
import { searchUPC } from "api/productApi";
//import PriceDisplay from "modules/PriceDisplay";
import ShowPrices from "modules/ShowPrices";
import TextField from "@material-ui/core/TextField";
import { getDefaultImage } from "functions";
import ProductDetails from "./ProductDetails";

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
        <ProductDetails product={result[0]} />
      ) : (
        hasSearched && <p>Producto no encontrado.</p>
      )}
    </div>
  );
}
