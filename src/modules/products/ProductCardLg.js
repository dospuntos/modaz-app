import { useState } from "react";
import "./productcardlg.css";
import ChangeStock from "modules/ChangeStock";
import {
  RiShoppingCartLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiEdit2Line,
  RiStarLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import ProductEdit from "components/ProductEdit";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { getDefaultImage } from "functions";

const useStyles = makeStyles((theme) => ({
  paper: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: "80%",
    maxHeight: "90%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ProductCardLg({
  dispatch,
  product,
  updateStockInState,
  changePublishedState,
  changeFeaturedState,
  deleteProduct,
  forceProductRefresh,
}) {
  const [clicked, setClicked] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const defaultImg = getDefaultImage(product.images);

  return (
    <div className="wrapper">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          forceProductRefresh();
        }}
      >
        <div className={classes.paper}>
          <ProductEdit id={product.id} />
        </div>
      </Modal>
      <div className="container">
        <div
          className="top"
          style={{
            background:
              "#fff url(" + defaultImg + ") center center /cover no-repeat",
          }}
        ></div>
        <div className={clicked ? "bottom clicked" : "bottom"}>
          <div className="left">
            <div className="details">
              <h1>{product.name}</h1>
              <p>Bs. {product.price}</p>
            </div>
            <div className="buy" onClick={() => setClicked(true)}>
              <BsGear />
            </div>
          </div>
          <div className="right">
            <div className="done">
              <RiCloseLine />
            </div>
            <div className="details">
              <span onClick={() => deleteProduct(product.id)}>
                <RiDeleteBinLine color="red" />
              </span>
              <span onClick={() => changeFeaturedState(product.id)}>
                <RiStarLine
                  color={String(product.featured) === "1" ? "yellow" : "grey"}
                />
              </span>
              <span onClick={() => changePublishedState(product.id)}>
                {String(product.state) === "1" ? (
                  <RiCheckboxCircleLine color="green" />
                ) : (
                  <RiCloseLine color="red" />
                )}
              </span>
              <span>
                <RiEdit2Line onClick={() => setOpen(true)} />
              </span>
            </div>
            <div className="remove" onClick={() => setClicked(false)}>
              <RiCloseLine />
            </div>
          </div>
        </div>
      </div>
      <div className={Number(product.state) ? "inside" : "inside unpublished"}>
        <div className="icon">{product.totalstock}</div>
        <div className="contents">
          <table>
            <tbody>
              {product.variants.map((variant) => {
                return (
                  <tr key={variant.vid}>
                    <td colSpan="2" style={{ borderBottom: "1px solid grey" }}>
                      {variant.size} - {variant.color} ({variant.stock}){" "}
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
                      <ChangeStock
                        variantId={variant.vid}
                        productId={variant.product_id}
                        updateStockInState={updateStockInState}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th>Precio ZWear</th>
                <th>Precio c/imp.</th>
              </tr>
              <tr>
                <td>
                  ${product.wholesaleprice} (Bs.
                  {Math.round(+product.wholesaleprice * 6.96)})
                </td>
                <td>
                  ${Math.round(product.wholesaleprice * 1.5)} (Bs.
                  {Math.round(+product.wholesaleprice * 6.96 * 1.5)})
                </td>
              </tr>
              <tr>
                <th>Precio</th>
                <th>Precio ZIN</th>
              </tr>
              <tr>
                <td>Bs. {product.price}</td>
                <td>Bs. {product.zinprice}</td>
              </tr>
              <tr>
                <th>MSRP</th>
                <th>Categorías</th>
              </tr>
              <tr>
                <td>
                  $ {product.msrp} (Bs. {Math.round(product.msrp * 6.96)})
                </td>
                <td>{product.category}</td>
              </tr>
              <tr>
                <th>Order Date</th>
                <th>Release Date</th>
              </tr>
              <tr>
                <td>{product.orderdate}</td>
                <td>{product.release_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductCardLg;
