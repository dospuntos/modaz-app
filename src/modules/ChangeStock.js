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
              type: "updateVariant",
              variant: {
                id: props.variant.vid,
                stock:
                  props.variant.stock - 1 < 0 ? 0 : props.variant.stock - 1, // Should not be less than 0
              },
            })
          }
        />
      </span>
      <span className="more">
        <FaPlusCircle
          onClick={() =>
            props.prodDispatch({
              type: "updateVariant",
              variant: {
                id: props.variant.vid,
                stock: props.variant.stock + 1,
              },
            })
          }
        />
      </span>
    </span>
  );
}
