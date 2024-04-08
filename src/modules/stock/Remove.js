import { useState } from "react";
import { useStickyState } from "hooks";
import { searchUPC } from "api/productApi";
import { changeStock } from "api/productApi";
import { quickOrder } from "api/orderApi";
import { toast } from "react-toastify";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ProductDetails from "./ProductDetails";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

export default function Remove() {
  const [upc, setUpc] = useState("");
  const [result, setResult] = useState({});
  const [createOrder, setCreateOrder] = useStickyState(false, "createOrder");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
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
      setLoading(false);
    });
    setUpc("");
  }

  if (loading) return <CircularProgress />;

  return (
    <div className="remove">
      <TextField
        id="filled-full-width"
        label="Buscar UPC"
        style={{ margin: 8, fontSize: "50px" }}
        placeholder="UPC para reducir"
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
          pattern: "[7-9]{1}[0-9]{9}",
        }}
        variant="filled"
        value={upc}
        onChange={(e) => setUpc(e.target.value)}
      />
      <FormControlLabel
        control={
          <Switch
            checked={createOrder}
            onChange={() => setCreateOrder(!createOrder)}
            name="createOrder"
            color="primary"
          />
        }
        label="Crear pedido"
      />
      {result.length ? (
        <ProductDetails product={result[0]} />
      ) : (
        hasSearched && <p>Producto no encontrado.</p>
      )}
    </div>
  );
}
