import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
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
        <NavLink to="/dashboard">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </NavLink>
        <NavLink to="/">
          <ListItemButton>
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
          </ListItemButton>
        </NavLink>
        <NavLink to="/orders">
          <ListItemButton>
            <ListItemIcon>
              <Badge badgeContent={statistics.orders} color="secondary">
                <ShoppingBasket />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItemButton>
        </NavLink>
        <NavLink to="/users">
          <ListItemButton>
            <ListItemIcon>
              <Badge badgeContent={statistics.users} color="secondary">
                <PeopleAltIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </NavLink>
        <NavLink to="/stock">
          <ListItemButton>
            <ListItemIcon>
              <CropFreeIcon />
            </ListItemIcon>
            <ListItemText primary="Escanear UPC" />
          </ListItemButton>
        </NavLink>
        <NavLink to="/tools">
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Herramientas" />
          </ListItemButton>
        </NavLink>
      </List>
      <Divider />
    </div>
  );
}

export default SidebarMenu;
