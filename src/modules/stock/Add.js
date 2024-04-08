import { useState } from "react";
import { searchUPC } from "api/productApi";
import { changeStock } from "api/productApi";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import ProductDetails from "./ProductDetails";
import CircularProgress from "@mui/material/CircularProgress";

export default function Add() {
  const [upc, setUpc] = useState("");
  const [result, setResult] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
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
      setLoading(false);
    });
    setUpc("");
  }

  if (loading) return <CircularProgress />;

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
          autoFocus
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
        <ProductDetails product={result[0]} />
      ) : (
        hasSearched && <p>Producto no encontrado.</p>
      )}
    </div>
  );
}
