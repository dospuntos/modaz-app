import React from "react";
import "./changestock.css";
import { changeStock } from "../api/productApi";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function ChangeStock(props) {
  function handleChangeStock(id, dir) {
    changeStock(id, dir);
  }

  return (
    <span className="change-stock pull-right">
      <span className="less">
        <FaMinusCircle onClick={() => handleChangeStock(props.variantId, 0)} />
      </span>
      <span className="more">
        <FaPlusCircle onClick={() => handleChangeStock(props.variantId, 1)} />
      </span>
    </span>
  );
}

export default ChangeStock;
