import { useState } from "react";
import { searchUPC } from "api/productApi";
import { toast } from "react-toastify";
import { useCart } from "modules/cart/cartContext";
import ProductDetails from "./ProductDetails";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddToCart() {
  const { dispatch } = useCart();
  const [upc, setUpc] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
    });
    setUpc("");
  }

  if (loading) return <CircularProgress />;

  return (
    <div className="remove">
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="filled-full-width"
          label="Buscar UPC"
          style={{ margin: 8, fontSize: "50px" }}
          placeholder="UPC para agregar a carrito"
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
      </form>

      {result.length ? (
        <ProductDetails product={result[0]} />
      ) : (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
}
