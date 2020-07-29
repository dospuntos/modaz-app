import React from "react";
import "./orderlistitem.css";
import { TiClipboard } from "react-icons/ti";

function OrderListItem({ order }) {
  return (
    <div className={"pure-g order-list-item orderstatus-" + order.order_state}>
      <div className="pure-u-2-24 icon">
        <TiClipboard size={64} />
        {order.id}
      </div>
      <div className="pure-u-4-24">
        <a href="!">Usuario: {order.client}</a>
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

/*
<li>
                {order.id} (Bs. {order.totalprice}) - {order.orderdetails}
                <ul>
                  {order.items.map((item) => {
                    return <li>{item.product_id}</li>;
                  })}
                </ul>
              </li>
              */
