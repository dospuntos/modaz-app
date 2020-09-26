import React from "react";

function PriceDisplay({ product }) {
  return (
    <p>
      <span className="small-label orderstatus-2">Bs. {product.price}</span>
      {product.price_discount && (
        <span className="small-label orderstatus-4">
          Bs. {product.price_discount}
        </span>
      )}
      <span className="small-label orderstatus-3">
        ZIN: Bs. {product.zinprice}
      </span>
      <span className="small-label orderstatus-1">
        MSRP: $US {product.msrp} (Bs. {(product.msrp * 6.96).toFixed(2)})
      </span>
      <span className="small-label orderstatus-5">
        Wholesale: $US {product.wholesaleprice} (Bs.{" "}
        {(product.wholesaleprice * 6.96).toFixed(2)})
      </span>
    </p>
  );
}

export default PriceDisplay;
