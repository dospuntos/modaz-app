function OrderDetailsQuote({ item, config }) {
  const imgMaxWidth = config.showPrice ? 120 : 200;
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
          style={{ maxWidth: imgMaxWidth, float: "left", marginRight: 15 }}
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
      {config.showPrice && (
        <td>
          <em>
            {item.order_item_price < item.price && (
              <s style={{ color: "red" }}>
                Bs.
                {item.price}
                <br />
              </s>
            )}
            {item.order_item_quantity > 0 ? (
              <strong>Bs. {item.order_item_price}</strong>
            ) : (
              " - "
            )}
          </em>
        </td>
      )}
      {config.showPrice && (
        <td>
          {item.order_item_quantity > 0
            ? "Bs. " + item.order_item_price * item.order_item_quantity
            : " - "}
        </td>
      )}
    </tr>
  );
}

export default OrderDetailsQuote;
