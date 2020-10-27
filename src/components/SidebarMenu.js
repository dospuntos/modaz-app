import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StoreIcon from "@material-ui/icons/Store";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Badge from "@material-ui/core/Badge";
import { FaBoxOpen } from "react-icons/fa";
import Cart from "modules/cart/Cart";
import { getStatistics } from "api/statisticsApi";

function SidebarMenu({
  cart,
  handleEmptyCart,
  handleVariantCountChange,
  handleDeleteCartItem,
}) {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    // Get statistics
    getStatistics().then((statistics) => {
      setStatistics(statistics);
    });
  }, []);

  return (
    <div>
      <List>
        <Cart
          cart={cart}
          handleEmptyCart={handleEmptyCart}
          handleVariantCountChange={handleVariantCountChange}
          handleDeleteCartItem={handleDeleteCartItem}
        />
      </List>
      <Divider />
      <List>
        <NavLink to="/">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/products">
          <ListItem button>
            <ListItemIcon>
              <Badge
                badgeContent={statistics.products}
                max={999}
                color="primary"
              >
                <StoreIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>
        </NavLink>
        <NavLink to="/orders">
          <ListItem button>
            <ListItemIcon>
              <Badge badgeContent={statistics.orders} color="secondary">
                <ShoppingBasket />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItem>
        </NavLink>
        <NavLink to="/stock">
          <ListItem button>
            <ListItemIcon>
              <FaBoxOpen />
            </ListItemIcon>
            <ListItemText primary="Stock" />
          </ListItem>
        </NavLink>
        <NavLink to="/users">
          <ListItem button>
            <ListItemIcon>
              <Badge badgeContent={statistics.users} color="secondary">
                <PeopleAltIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
    </div>
  );
}

export default SidebarMenu;
