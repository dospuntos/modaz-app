import "./changestock.css";
import { changeStock } from "api/productApi";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function ChangeStock(props) {
  function handleChangeStock(id, dir, productId) {
    changeStock(id, dir);
    props.updateStockInState(id, dir, productId);
  }

  return (
    <span className="change-stock pull-right">
      <span className="less">
        <FaMinusCircle
          color="grey"
          onClick={() => handleChangeStock(props.variantId, 0, props.productId)}
        />
      </span>
      <span className="more">
        <FaPlusCircle
          onClick={() => handleChangeStock(props.variantId, 1, props.productId)}
        />
      </span>
    </span>
  );
}

export default ChangeStock;
