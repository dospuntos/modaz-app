import React from "react";
import "./changestock.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function ChangeStock(props) {
  function handleChangeStock(id, dir) {
    dir === "increase"
      ? alert("Increasing stock for product variant ID " + id)
      : alert("Reducing stock for product ID " + id);
  }

  return (
    <span className="change-stock pull-right">
      <span className="less">
        <FaMinusCircle
          onClick={() => handleChangeStock(props.variantId, "decrease")}
        />
      </span>
      <span className="more">
        <FaPlusCircle
          onClick={() => handleChangeStock(props.variantId, "increase")}
        />
      </span>
    </span>
  );
}

export default ChangeStock;
