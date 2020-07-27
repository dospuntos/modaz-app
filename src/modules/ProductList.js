import React from "react";
import "./productlist.css";
import * as Constants from "../constants";

function ProductList({ product }) {
  return (
    <div className="list-item-wrap">
      <span className="image">
        <img
          src={
            product.images !== "0"
              ? Constants.PROD_IMG_URL + product.images
              : Constants.DEFAULT_IMG_URL
          }
          alt={product.name}
          style={{ maxHeight: 100 }}
        />
      </span>
      <span className="name">{product.name}</span>
      <span className="color">
        Variants:
        <ul>
          {product.variants.map((variant, index) => {
            return (
              <li key={index}>
                {variant.size} - {variant.color} ({variant.stock})
              </li>
            );
          })}
        </ul>
      </span>
    </div>
  );
}

export default ProductList;
