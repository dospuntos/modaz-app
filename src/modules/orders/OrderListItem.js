import React from "react";
import "./orderlistitem.css";
import { Link } from "react-router-dom";
import { TiClipboard } from "react-icons/ti";

function OrderListItem({ order, userName }) {
  return (
    <div className={"pure-g order-list-item orderstatus-" + order.order_state}>
      <div className="pure-u-2-24 icon">
        <TiClipboard size={64} />
        {order.id}
      </div>
      <div className="pure-u-4-24">
        <Link to={"orders/" + order.id}>{userName}</Link>
        <br />
        {order.create_date}
      </div>
      <div className="pure-u-12-24">
        Items:{" "}
        {order.items.map((item, index) => {
          return item.product_id + ", ";
        })}
      </div>
      <div className="pure-u-6-24">{order.orderdetails}</div>
    </div>
  );
}

export default OrderListItem;
