import "./orderlistitem.css";
import { Link } from "react-router-dom";
import { TiClipboard } from "react-icons/ti";

function OrderListItem({ order, products, userName }) {
  return (
    <div className={`pure-g order-list-item orderstatus-${order.order_state}`}>
      <div className="pure-u-2-24 icon">
        <TiClipboard size={64} />
        {order.id}
      </div>
      <div className="pure-u-4-24">
        <Link to={`orders/${order.id}`}>{userName}</Link>
        <br />
        {order.create_date}
      </div>
      <div className="pure-u-6-24">
        <ol>
          {order.items.map((item, index) => {
            return (
              <li key={index}>
                <strong>{item.product_id}</strong> - {item.order_item_quantity}{" "}
                {item.order_item_price} Bs. -{" "}
                <strong>
                  <em>
                    Total {item.order_item_quantity * item.order_item_price} Bs.
                  </em>
                </strong>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="pure-u-6-24">Total: {order.totalprice} Bs.</div>
      <div className="pure-u-6-24">{order.orderdetails}</div>
    </div>
  );
}

export default OrderListItem;
