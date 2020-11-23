import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
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

export default function ShowPrices({
  price,
  price_discount,
  zinprice,
  msrp,
  wholesaleprice,
}) {
  const classes = useStyles();

  return (
    <>
      <Tooltip title="Precio regular (ModaZ)">
        <span className={classes.pricetag}>Bs. {price}</span>
      </Tooltip>
      {price_discount && price_discount > 0 && (
        <Tooltip title="Precio descuento">
          <span className={clsx(classes.pricetag, classes.discount)}>
            Bs. {price_discount}
          </span>
        </Tooltip>
      )}
      <Tooltip title="Precio ZIN">
        <span className={clsx(classes.pricetag, classes.zin)}>
          Bs. {zinprice}
        </span>
      </Tooltip>
      <Tooltip title="MSRP (Precio sugerido de venta)">
        <span className={clsx(classes.pricetag, classes.msrp)}>
          ${msrp} (Bs. {(msrp * 6.96).toFixed(0)})
        </span>
      </Tooltip>
      <Tooltip title="Costo (con impuesto y transporte)">
        <span className={clsx(classes.pricetag, classes.wholesaleprice)}>
          ${(wholesaleprice * 1.5).toFixed(1)} (Bs.{" "}
          {(wholesaleprice * 6.96 * 1.5).toFixed(0)})
        </span>
      </Tooltip>
    </>
  );
}
