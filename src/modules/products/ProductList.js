import React from "react";
import "./productlist.css";
import ChangeStock from "modules/ChangeStock";
import * as Constants from "constants.js";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function ProductList({ product, updateStockInState, handleAddItem }) {
  return (
    <div className="pure-g list-item-wrap">
      <div className="pure-u-2-24">
        {/* IMAGE | NAME / UPC | VARIANTS / STOCK | PRICES | ID */}
        <img
          src={
            product.images !== "0"
              ? Constants.PROD_IMG_URL + product.images
              : Constants.DEFAULT_IMG_URL
          }
          alt={product.name}
          className="thumbnail zoom"
        />
      </div>
      <div className="pure-u-6-24">
        <h4>
          <Link to={"products/" + product.id}>{product.name}</Link>
        </h4>
      </div>

      <div className="pure-u-6-24">
        <ul className="unstyled-list">
          {product.variants.map((variant) => {
            return (
              <li key={variant.vid}>
                <ChangeStock
                  variantId={variant.vid}
                  productId={variant.product_id}
                  updateStockInState={updateStockInState}
                />
                {variant.stock < 1 ? (
                  ""
                ) : (
                  <span
                    className="pure-button pure-button-cart-sm"
                    onClick={() => {
                      // Add product name to variant object (for cart display)
                      variant["name"] = product.name;
                      variant["price"] = product.price;
                      variant["order_item_quantity"] = "1";
                      // Add to cart
                      handleAddItem(variant);
                    }}
                  >
                    <RiShoppingCartLine />
                  </span>
                )}
                {variant.size} - {variant.color} ({variant.stock})
                <small
                  onClick={() => {
                    navigator.clipboard.writeText(variant.upc);
                  }}
                  style={{ cursor: "pointer", color: "grey" }}
                >
                  (UPC: {variant.upc})
                </small>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pure-u-10-24">{product.id}</div>
    </div>
  );
}

export default ProductList;
