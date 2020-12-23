import { useReducer, useEffect } from "react";
import clsx from "clsx";
import { useStickyState } from "./hooks";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import "purecss/build/pure-min.css";
import "purecss/build/grids-responsive.css";
import "./App.css";
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
import SidebarMenu from "./components/SidebarMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import pkg from "../package.json";
import cartReducer from "./cartReducer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useStickyState(false, "menuOpen");
  //const [initialCart, setInitialCart] = useStickyState([], "cart");
  const [loggedIn, setLoggedIn] = useStickyState(false, "loggedIn");
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  // Check login state
  function setLoginState(pw) {
    /* User: joanne.tatiana@gmail.com, PW: joanne */
    if (pw === "am9hbm5lLnRhdGlhbmFAZ21haWwuY29tam9hbm5l") {
      setLoggedIn(pw);
    }
  }

  return loggedIn === "am9hbm5lLnRhdGlhbmFAZ21haWwuY29tam9hbm5l" ? (
    <Router>
      <div className={classes.root}>
        <ScrollToTop />
        <ToastContainer
          autoClose={2000}
          hideProgressBar
          position="bottom-right"
        />

        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
            >
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(true)}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h6" noWrap>
                  Moda Z App
                </Typography>
              </Grid>

              <Grid item>
                <div>
                  Version: {pkg.version}{" "}
                  <strong>{process.env.NODE_ENV.substring(0, 3)}</strong>
                  <br />
                  <a
                    href="/"
                    onClick={() => localStorage.removeItem("loggedIn")}
                  >
                    Salir
                  </a>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <SidebarMenu
            dispatch={dispatch}
            cart={cart}
            handleVariantCountChange={null}
          />
        </Drawer>
        {/* <div id="layout" className="content pure-g"> */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/products/:productid" component={ProductEdit} />
            <Route
              path="/products"
              render={(props) => <Products {...props} dispatch={dispatch} />}
            />
            <Route path="/orders/:orderid" component={OrderDetails} />
            <Route path="/orders" component={Orders} />
            <Route
              path="/stock"
              render={(props) => <Stock {...props} dispatch={dispatch} />}
            />
            <Route path="/users/:userid" component={Users} />
            <Route path="/users" component={Users} />
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </div>
    </Router>
  ) : (
    <Login handleLogin={setLoginState} />
  );
}
