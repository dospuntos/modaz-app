import React, { useState } from "react";
import "./productcardsm.css";
import * as Constants from "constants.js";
import { RiShoppingCartLine, RiCloseLine } from "react-icons/ri";

function ProductCardSm({ product, handleAddItem }) {
  const [clicked, setClicked] = useState(false);

  const bgimg =
    product.images !== "0"
      ? Constants.PROD_IMG_URL + product.images
      : Constants.DEFAULT_IMG_URL;

  return (
    <div className="wrapper-sml">
      <div className="container">
        <div
          className="top"
          style={{
            background:
              "#fff url(" + bgimg + ") center center /cover no-repeat",
          }}
        ></div>
        <div className={clicked ? "bottom clicked" : "bottom"}>
          <div className="left">
            <div className="details">
              <h4>{product.name}</h4>
              <p>{product.price}</p>
            </div>
            <div
              className="buy"
              onClick={() => {
                setClicked(true);
              }}
            >
              <RiShoppingCartLine />
            </div>
          </div>
          <div className="right" onClick={() => setClicked(false)}>
            <div className="done">
              <RiCloseLine />
            </div>
            <div className="details">
              <h4>{product.name}</h4>
            </div>
            <div className="remove">
              <i className="material-icons">clear</i>
            </div>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon">{product.totalstock}</div>
        <div className="contents">
          <table>
            <tbody>
              {product.variants.map((variant, index) => {
                return (
                  <tr key={index}>
                    <td
                      colSpan="2"
                      key={index}
                      style={{ borderBottom: "1px solid grey" }}
                    >
                      {variant.size} - {variant.color} ({variant.stock}){" "}
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSm;
