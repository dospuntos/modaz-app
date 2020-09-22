import React from "react";

function OrderDetailsQuote({ item, config }) {
  const img =
    item.images !== "0"
      ? process.env.REACT_APP_PROD_IMG_URL + item.images
      : process.env.REACT_APP_DEFAULT_IMG_URL;
  return (
    <tr className="item">
      <td>
        <img
          src={img}
          alt=""
          className="thumbnail"
          style={{ maxWidth: 120, float: "left", marginRight: 15 }}
        />
      </td>
      <td>
        <strong>{item.name}</strong>
        <br />
        <em>
          {item.color}, {item.size}
        </em>
      </td>
      <td style={{ textAlign: "center" }}>
        {item.order_item_quantity > 0 ? item.order_item_quantity : "Agotado"}
      </td>
      <td>
        <em>
          {item.order_item_quantity > 0
            ? "Bs. " + item.order_item_price
            : " - "}
        </em>
      </td>
      <td>
        {item.order_item_quantity > 0
          ? "Bs. " + item.order_item_price * item.order_item_quantity
          : " - "}
      </td>
    </tr>
  );
}

export default OrderDetailsQuote;
