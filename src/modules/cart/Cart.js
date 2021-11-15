import { useState } from "react";
import { createOrder } from "api/productApi";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import CartContents from "modules/cart/CartContents";
import { useCart } from "modules/cart/cartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    right: 25,
    bottom: 25,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Cart({ handleVariantCountChange }) {
  const { cart, dispatch } = useCart();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  let history = useHistory();

  function saveCart(cart, user, type) {
    createOrder(cart, user, type);
    dispatch({ type: "empty2" });
    history.push("/orders"); // Redirect to orders
  }

  function countCartItems() {
    let cartItems = 0;
    cart.map((i) => (cartItems += parseInt(i.order_item_quantity)));
    return cartItems;
  }

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <Badge badgeContent={countCartItems()} color="secondary">
          <ShoppingCart />
        </Badge>
      </Fab>

      <CartContents
        dispatch={dispatch}
        open={open}
        cart={cart}
        onClose={() => setOpen(false)}
        saveCart={saveCart}
      />
    </div>
  );
}
