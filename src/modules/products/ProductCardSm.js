import "./productcardsm.css";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartOutlined from "@material-ui/icons/AddShoppingCartOutlined";

function ProductCardSm({ product, handleAddItem }) {
  const bgimg =
    product.images !== "0"
      ? process.env.REACT_APP_PROD_IMG_URL + product.images
      : process.env.REACT_APP_DEFAULT_IMG_URL;

  return (
    <div className="wrapper-sml">
      <div className="container">
        <div
          className="top"
          style={{
            background:
              "#fff url(" + bgimg + ") center center /cover no-repeat",
          }}
        ></div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h4>{product.name}</h4>
            </div>
            <div className="buy" style={{ textAlign: "center" }}>
              <p>Bs. {product.price}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon">{product.totalstock}</div>
        <div className="contents">
          <table>
            <tbody>
              {product.variants.map((variant, index) => {
                return (
                  <tr key={index}>
                    <td colSpan="2" style={{ borderBottom: "1px solid grey" }}>
                      {variant.size} - {variant.color} ({variant.stock}){" "}
                      {variant.stock < 1 ? (
                        ""
                      ) : (
                        <IconButton
                          color="secondary"
                          aria-label="add to shopping cart"
                          onClick={() => {
                            // Add product name to variant object (for cart display)
                            variant["name"] = product.name;
                            variant["price"] = product.price;
                            variant["order_item_quantity"] = "1";
                            // Add to cart
                            handleAddItem(variant);
                          }}
                        >
                          <AddShoppingCartOutlined style={{ fontSize: 14 }} />
                        </IconButton>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSm;
