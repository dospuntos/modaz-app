import { useState } from "react";
import ShowPrices from "modules/ShowPrices";
import { RiDeleteBin5Line, RiSaveLine } from "react-icons/ri";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import ProductEdit from "components/ProductEdit";
import { getImagesByColor } from "functions";

const useStyles = makeStyles((theme) => ({
  paper: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: "80%",
    maxHeight: "90%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function OrderDetailsList({ item, handleDeleteClick, updateOrderItem }) {
  const [price, setPrice] = useState(item.order_item_price);
  const [quantity, setQuantity] = useState(item.order_item_quantity);
  const [edited, setEdited] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function handleOrderItemChange(e) {
    let data = {
      id: item.order_item_id,
      price: price,
      quantity: quantity,
    };
    updateOrderItem(data);
    setEdited(false);
  }

  return (
    <tr>
      <td>
        <img
          src={getImagesByColor(item.images, item.color)}
          alt={item.name}
          className="thumbnail zoom"
        />
      </td>
      <td>
        {item.name ? (
          <h4 onClick={() => setOpen(true)}>
            {item.name}
            <br />
            <small>UPC: {item.upc}</small>
          </h4>
        ) : (
          <i style={{ color: "red" }}>
            Producto {item.product_id} no encontrado
          </i>
        )}
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className={classes.paper}>
            <ProductEdit id={item.id} />
          </div>
        </Modal>
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
        <br />
        <ShowPrices product={item} />
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
