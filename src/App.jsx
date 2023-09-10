import useToken from "api/useToken";
import { logOut } from "api/usersApi";
import clsx from "clsx";
import { useStickyState } from "./hooks";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
import Tools from "modules/stock/Tools";
import SidebarMenu from "./components/SidebarMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import pkg from "../package.json";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:
      process.env.NODE_ENV.substring(0, 3) === "dev" ? "#ff0047" : "primary",
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

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useStickyState(false, "menuOpen");
  const { token, setToken } = useToken();

  if (!token) return <Login setToken={setToken} />;

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
      <div className={classes.root}>
        <ScrollToTop />
        <ToastContainer
          autoClose={2000}
          hideProgressBar
          position="bottom-center"
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
                  <a href="#/" onClick={(e) => handleLogout(e)}>
                    Salir {token.full_name && <span>({token.full_name})</span>}
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
          <SidebarMenu handleVariantCountChange={null} />
        </Drawer>
        {/* <div id="layout" className="content pure-g"> */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
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
        </main>
      </div>
    </Router>
  );
}
