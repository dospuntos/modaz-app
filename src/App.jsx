import useToken from "api/useToken";
import { logOut } from "api/usersApi";
import { useStickyState } from "./hooks";
import "purecss/build/pure-min.css";
import "purecss/build/grids-responsive.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import pkg from "../package.json";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./modules/ScrollToTop";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import ProductEdit from "./components/ProductEdit";
import Orders from "./components/Orders";
import OrderDetails from "./components/OrderDetails";
import Stock from "./components/Stock";
import Users from "./components/Users";
import Login from "./components/Login";
import Tools from "modules/stock/Tools";
import SidebarMenu from "./components/SidebarMenu";
import { ToastContainer } from "react-toastify";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function App() {
  const [open, setOpen] = useStickyState(false, "menuOpen");
  const { token, setToken } = useToken();

  if (!token) return <Login setToken={setToken} />;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  function handleLogout(e) {
    e.preventDefault();
    logOut()
      .then((data) => data.json())
      .then(() => {
        localStorage.removeItem("token");
        window.location.reload();
      });
  }

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <ScrollToTop />
        <ToastContainer
          autoClose={2000}
          hideProgressBar
          position="bottom-center"
        />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Moda Z App
            </Typography>

            <div>
              Version: {pkg.version}{" "}
              <strong>{process.env.NODE_ENV.substring(0, 3)}</strong>
              <br />
              <a href="#/" onClick={(e) => handleLogout(e)}>
                Salir {token.full_name && <span>({token.full_name})</span>}
              </a>
            </div>
          </Toolbar>
        </AppBar>
        {/* Sidebar */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <SidebarMenu />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/products/:productid" component={ProductEdit} />
            <Route path="/products" component={Products} />
            <Route path="/orders/:orderid" component={OrderDetails} />
            <Route path="/orders" component={Orders} />
            <Route path="/stock" component={Stock} />
            <Route path="/tools" component={Tools} />
            <Route path="/users/:userid" component={Users} />
            <Route path="/users" component={Users} />
            <Route path="/login" component={Login} />
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}
