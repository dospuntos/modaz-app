import { useState, useEffect } from "react";
import { createOrder } from "api/productApi";
import { useHistory } from "react-router-dom";
import { getUsers } from "api/usersApi";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import CartContents from "modules/cart/CartContents";

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

export default function Cart({ dispatch, cart, handleVariantCountChange }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [cartUser, setCartUser] = useState("0");
  const [users, setUsers] = useState([]);

  let history = useHistory();

  useEffect(() => {
    // Get users
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  function handleSetCartUser(e) {
    setCartUser(e.target.value);
  }

  function saveCart(cart, user, type) {
    createOrder(cart, user, type);
    //TODO: Empty cart using cartReducer.
    //handleEmptyCart(false); // Empty cart without confirmation
    history.push("/orders"); // Redirect to orders
  }

  function countCartItems() {
    let cartItems = 0;
    cart.map((i) => (cartItems += parseInt(i.order_item_quantity)));
    return cartItems;
  }

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <Badge badgeContent={countCartItems()} color="secondary">
          <ShoppingCart />
        </Badge>
      </Fab>

      <CartContents
        dispatch={dispatch}
        open={open}
        cart={cart}
        onClose={handleClose}
        users={users}
        cartUser={cartUser}
        handleSetCartUser={handleSetCartUser}
        saveCart={saveCart}
      />
    </div>
  );
}
