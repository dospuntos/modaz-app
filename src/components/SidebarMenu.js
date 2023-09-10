import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CropFreeIcon from "@mui/icons-material/CropFree";
import Badge from "@mui/material/Badge";
import Cart from "modules/cart/Cart";
import { getStatistics } from "api/statisticsApi";

function SidebarMenu({ dispatch, cart, handleVariantCountChange }) {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    // Get statistics
    getStatistics().then((statistics) => {
      setStatistics(statistics);
    });
  }, []);

  return (
    <div>
      <Cart
        dispatch={dispatch}
        cart={cart}
        handleVariantCountChange={handleVariantCountChange}
      />
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
        <NavLink to="/stock">
          <ListItem button>
            <ListItemIcon>
              <CropFreeIcon />
            </ListItemIcon>
            <ListItemText primary="Escanear UPC" />
          </ListItem>
        </NavLink>
        <NavLink to="/tools">
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Herramientas" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
    </div>
  );
}

export default SidebarMenu;
