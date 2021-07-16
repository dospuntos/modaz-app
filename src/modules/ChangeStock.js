import "./changestock.css";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function ChangeStock(props) {
  return (
    <span className="change-stock pull-right">
      <span className="less">
        <FaMinusCircle
          color="grey"
          onClick={() =>
            props.prodDispatch({
              type: "updateStock",
              id: props.variantId,
              dir: "DOWN",
              productId: props.productId,
            })
          }
        />
      </span>
      <span className="more">
        <FaPlusCircle
          onClick={() =>
            props.prodDispatch({
              type: "updateStock",
              id: props.variantId,
              dir: "UP",
              productId: props.productId,
            })
          }
        />
      </span>
    </span>
  );
}
