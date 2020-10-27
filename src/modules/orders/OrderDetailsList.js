import { useState } from "react";
import { RiDeleteBin5Line, RiSaveLine } from "react-icons/ri";

function OrderDetailsList({ item, handleDeleteClick, updateOrderItem }) {
  const [price, setPrice] = useState(item.order_item_price);
  const [quantity, setQuantity] = useState(item.order_item_quantity);
  const [edited, setEdited] = useState(false);

  function handleOrderItemChange(e) {
    let data = {
      id: item.order_item_id,
      price: price,
      quantity: quantity,
    };
    updateOrderItem(data);
    setEdited(false);
  }

  const img =
    item.images !== "0"
      ? process.env.REACT_APP_PROD_IMG_URL + item.images
      : process.env.REACT_APP_DEFAULT_IMG_URL;
  return (
    <tr>
      <td>
        <img src={img} alt={item.name} className="thumbnail zoom" />
      </td>
      <td>
        {item.name ? (
          <h4>
            {item.name}
            <br />
            <small>UPC: {item.upc}</small>
          </h4>
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
        Bs.{" "}
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setEdited(true);
          }}
        />
      </td>
      <td>
        Cantidad:
        <br />
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            setEdited(true);
          }}
        />
        <br />
        <small>(Stock: {item.stock})</small>
      </td>
      <td>
        <button
          className="pure-button button-success"
          disabled={!edited}
          onClick={() => handleOrderItemChange()}
        >
          <RiSaveLine />
        </button>
      </td>
      <td>
        <button
          className="pure-button pure-button-danger"
          onClick={() => handleDeleteClick(item.order_item_id)}
        >
          <RiDeleteBin5Line />
        </button>
      </td>
    </tr>
  );
}

export default OrderDetailsList;
