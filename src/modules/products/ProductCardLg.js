import React, { useState } from "react";
import "./productcardlg.css";
import * as Constants from "constants.js";
import ChangeStock from "modules/ChangeStock";
import { Link } from "react-router-dom";
import {
  RiShoppingCartLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiEdit2Line,
  RiStarLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { BsGear } from "react-icons/bs";

function ProductCardLg({
  product,
  updateStockInState,
  handleAddItem,
  changePublishedState,
}) {
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
            <div className="buy" onClick={() => setClicked(true)}>
              <BsGear />
            </div>
          </div>
          <div className="right">
            <div className="done">
              <RiCloseLine />
            </div>
            <div className="details">
              <span /* onClick={() => deleteProduct(product.id)} */>
                <RiDeleteBinLine color="red" />
              </span>
              <span>
                <RiStarLine
                  color={product.featured === "1" ? "yellow" : "grey"}
                />
              </span>
              <span onClick={() => changePublishedState(product.id)}>
                {product.state === "1" ? (
                  <RiCheckboxCircleLine color="green" />
                ) : (
                  <RiCloseLine color="red" />
                )}
              </span>
              <span>
                <Link to={"products/" + product.id}>
                  <RiEdit2Line />
                </Link>
              </span>
            </div>
            <div className="remove" onClick={() => setClicked(false)}>
              <RiCloseLine />
            </div>
          </div>
        </div>
      </div>
      <div className={Number(product.state) ? "inside" : "inside unpublished"}>
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
