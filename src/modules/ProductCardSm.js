import React from "react";
import "./productcardsm.css";
import * as Constants from "../constants";
import { RiShoppingCartLine, RiInformationLine } from "react-icons/ri";

function ProductCardSm({ product }) {
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
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h4>SML: {product.name}</h4>
              <p>{product.price}</p>
            </div>
            <div className="buy">
              <RiShoppingCartLine />
            </div>
          </div>
          <div className="right">
            <div className="done">
              <i className="material-icons">done</i>
            </div>
            <div className="details">
              <h1>{product.name}</h1>
              <p>Agregado al carrito</p>
            </div>
            <div className="remove">
              <i className="material-icons">clear</i>
            </div>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon">
          <RiInformationLine />
        </div>
        <div className="contents">
          <table>
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSm;
