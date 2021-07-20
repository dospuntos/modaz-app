import ChangeStock from "modules/ChangeStock";
import ShowPrices from "modules/ShowPrices";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCart } from "modules/cart/cartContext";

export default function ProductList({ product, prodDispatch }) {
  const { dispatch } = useCart();
  const images = product.images;
  const img = process.env.REACT_APP_PROD_IMG_URL + images["0"]["image"];

  return (
    <div className="pure-g list-item-wrap">
      <div className="pure-u-3-24">
        <img src={img} alt={product.name} className="thumbnail zoom" />
      </div>
      <div className="pure-u-7-24">
        <h4>
          <Link to={`products/${product.id}`}>{product.name}</Link>({product.id}
          )
        </h4>
        <ShowPrices product={product} />
      </div>

      <div className="pure-u-12-24">
        <ul className="unstyled-list">
          {product.variants.map((variant) => {
            return (
              <li key={variant.vid}>
                <ChangeStock
                  variantId={variant.vid}
                  productId={variant.product_id}
                  prodDispatch={prodDispatch}
                />
                {variant.stock < 1 ? (
                  ""
                ) : (
                  <span
                    className="pure-button pure-button-cart-sm"
                    onClick={() => {
                      // Add product name to variant object (for cart display)
                      variant["name"] = product.name;
                      variant["price"] = product.price;
                      variant["order_item_quantity"] = "1";
                      // Add to cart
                      dispatch({
                        type: "add",
                        variant,
                      });
                    }}
                  >
                    <RiShoppingCartLine />
                  </span>
                )}
                {variant.size} - {variant.color} ({variant.stock})
                <small
                  onClick={() => {
                    navigator.clipboard.writeText(variant.upc);
                  }}
                  style={{ cursor: "pointer", color: "grey" }}
                >
                  (UPC: {variant.upc})
                </small>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pure-u-2-24">{product.id}</div>
    </div>
  );
}
