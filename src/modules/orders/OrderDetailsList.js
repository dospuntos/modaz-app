import React from "react";
import * as Constants from "constants.js";
import { RiDeleteBin5Line } from "react-icons/ri";

function OrderDetailsList({ item }) {
  const img =
    item.images !== "0"
      ? Constants.PROD_IMG_URL + item.images
      : Constants.DEFAULT_IMG_URL;
  return (
    <tr>
      <td>
        <img src={img} alt={item.name} className="thumbnail zoom" />
      </td>
      <td>
        {item.name ? (
          <>
            <h4>{item.name}</h4>
            <small>UPC: {item.upc}</small>
          </>
        ) : (
          <i style={{ color: "red" }}>
            Producto {item.product_id} no encontrado
          </i>
        )}
      </td>
      <td>
        {item.color}, {item.size}
      </td>
      <td>
        Bs. <input type="number" value={item.order_item_price} />
      </td>
      <td>
        Cantidad: {item.order_item_quantity}
        <br />
        <small>(Stock: {item.stock})</small>
      </td>
      <td>
        <button
          className="pure-button pure-button-danger"
          onClick={() => alert("Deleting product")}
        >
          <RiDeleteBin5Line />{" "}
        </button>
      </td>
    </tr>
  );
}

export default OrderDetailsList;
