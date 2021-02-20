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
              dir: 0,
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
              dir: 1,
              productId: props.productId,
            })
          }
        />
      </span>
    </span>
  );
}
