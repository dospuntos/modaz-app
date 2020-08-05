import React, { useState } from "react";
import "./productcardlg.css";
import * as Constants from "constants.js";
import ChangeStock from "modules/ChangeStock";
import { Link } from "react-router-dom";
import { RiShoppingCartLine, RiCloseLine } from "react-icons/ri";

function ProductCardLg({ product, updateStockInState, handleAddItem }) {
  const [clicked, setClicked] = useState(false);
  const bgimg =
    product.images !== "0"
      ? Constants.PROD_IMG_URL + product.images
      : Constants.DEFAULT_IMG_URL;

  return (
    <div className="wrapper">
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
              <h1>{product.name}</h1>
              <p>Bs. {product.price}</p>
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
              <h1>
                <Link to={"products/" + product.id}>{product.name}</Link>
              </h1>
              <p></p>
            </div>
            <div className="remove">
              <RiCloseLine />
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
                      <ChangeStock
                        variantId={variant.vid}
                        productId={variant.product_id}
                        updateStockInState={updateStockInState}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th>Precio ZWear</th>
                <th>Precio c/imp.</th>
              </tr>
              <tr>
                <td>
                  ${product.wholesaleprice} (Bs.
                  {Math.round(+product.wholesaleprice * 6.96)})
                </td>
                <td>
                  ${Math.round(product.wholesaleprice * 1.5)} (Bs.
                  {Math.round(+product.wholesaleprice * 6.96 * 1.5)})
                </td>
              </tr>
              <tr>
                <th>Precio</th>
                <th>Precio ZIN</th>
              </tr>
              <tr>
                <td>Bs. {product.price}</td>
                <td>Bs. {product.zinprice}</td>
              </tr>
              <tr>
                <th>Order Date</th>
                <th>Release Date</th>
              </tr>
              <tr>
                <td>{product.order_date}</td>
                <td>{product.release_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductCardLg;
