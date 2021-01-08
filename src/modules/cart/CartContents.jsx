import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    right: 25,
    bottom: 25,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: red[100],
    color: red[600],
  },
}));

export default function CartContents({
  dispatch,
  onClose,
  selectedValue,
  open,
  cart,
  users,
  cartUser,
  handleSetCartUser,
  saveCart,
}) {
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">
        Carrito de compras
        <IconButton edge="end">
          <DeleteIcon
            style={{ color: red[900] }}
            onClick={() => {
              dispatch({ type: "empty" });
            }}
          />
        </IconButton>
      </DialogTitle>
      {!cart.length ? (
        <p style={{ textAlign: "center" }}>No hay items en el carrito</p>
      ) : (
        <List dense>
          {cart.map((item) => (
            <ListItem
              button
              /* onClick={() =>
                dispatch({
                  type: "updateQuantity",
                  vid: item.vid,
                  quantity: 2,
                })
              } */
              key={item}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  {item.order_item_quantity}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`${item.color} - ${item.size} (Stock: ${item.stock})`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={(e) =>
                    dispatch({
                      type: "updateQuantity",
                      vid: item.vid,
                      quantity: 0,
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <select
        value={cartUser}
        onChange={handleSetCartUser}
        style={{ maxWidth: "80%", margin: "15px auto" }}
      >
        <option value="0">- Seleccione usuario -</option>
        {users.length ? (
          users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))
        ) : (
          <option>Cargando usuarios...</option>
        )}
      </select>

      {cartUser === "0" ? (
        ""
      ) : (
        <p style={{ textAlign: "center" }}>
          <Button
            onClick={() => saveCart(cart, cartUser, "order")}
            color="primary"
            variant="contained"
          >
            Pedido
          </Button>{" "}
          <Button
            onClick={() => saveCart(cart, cartUser, "quote")}
            color="secondary"
            variant="contained"
          >
            Cotización
          </Button>
        </p>
      )}
    </Dialog>
  );
}
