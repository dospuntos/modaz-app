import Tooltip from "@mui/material/Tooltip";

export default function ShowPrices({ product }) {
  return (
    <div>
      <Tooltip title="Precio regular (ModaZ)">
        <span className="price-tag">Bs. {product.price}</span>
      </Tooltip>
      {product.price_discount && product.price_discount > 0 && (
        <Tooltip title="Precio descuento">
          <span className="price-tag discount">
            Bs. {product.price_discount}
          </span>
        </Tooltip>
      )}
      <Tooltip title="Precio ZIN">
        <span className="price-tag zin">Bs. {product.zinprice}</span>
      </Tooltip>
      <Tooltip title="MSRP (Precio sugerido de venta)">
        <span className="price-tag msrp">
          ${product.msrp} (Bs. {(product.msrp * 6.96).toFixed(0)})
        </span>
      </Tooltip>
      <Tooltip title="Costo (con impuesto y transporte)">
        <span className="price-tag wholesaleprice">
          ${(product.wholesaleprice * 1.5).toFixed(1)} (Bs.{" "}
          {(product.wholesaleprice * 6.96 * 1.5).toFixed(0)})
        </span>
      </Tooltip>
    </div>
  );
}
