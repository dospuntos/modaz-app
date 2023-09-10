import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  pricetag: {
    padding: "2px 4px",
    borderRadius: 5,
    margin: "0 3px",
    fontSize: 10,
    whiteSpace: "nowrap",
    background: "#E44F9A",
    color: "#fff",
  },
  discount: {
    background: "red",
  },
  zin: {
    background: "#DBE32B",
  },
  msrp: {
    background: "#1B98F8",
  },
  wholesaleprice: {
    background: "#9CDBAB",
  },
}));

export default function ShowPrices({ product }) {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Precio regular (ModaZ)">
        <span className={classes.pricetag}>Bs. {product.price}</span>
      </Tooltip>
      {product.price_discount && product.price_discount > 0 && (
        <Tooltip title="Precio descuento">
          <span className={clsx(classes.pricetag, classes.discount)}>
            Bs. {product.price_discount}
          </span>
        </Tooltip>
      )}
      <Tooltip title="Precio ZIN">
        <span className={clsx(classes.pricetag, classes.zin)}>
          Bs. {product.zinprice}
        </span>
      </Tooltip>
      <Tooltip title="MSRP (Precio sugerido de venta)">
        <span className={clsx(classes.pricetag, classes.msrp)}>
          ${product.msrp} (Bs. {(product.msrp * 6.96).toFixed(0)})
        </span>
      </Tooltip>
      <Tooltip title="Costo (con impuesto y transporte)">
        <span className={clsx(classes.pricetag, classes.wholesaleprice)}>
          ${(product.wholesaleprice * 1.5).toFixed(1)} (Bs.{" "}
          {(product.wholesaleprice * 6.96 * 1.5).toFixed(0)})
        </span>
      </Tooltip>
    </div>
  );
}
