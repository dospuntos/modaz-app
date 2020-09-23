import React from "react";
import { useStickyState } from "./hooks";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [cart, setCart] = useStickyState([], "cart");
  const [loggedIn, setLoggedIn] = useStickyState(false, "loggedIn");

  // Check login state
  function setLoginState(pw) {
    /* User: joanne.tatiana@gmail.com, PW: joanne */
    if (pw === "am9hbm5lLnRhdGlhbmFAZ21haWwuY29tam9hbm5l") {
      setLoggedIn(pw);
    }
  }

  function handleAddItem(variant) {
    setCart([...cart, variant]);
    toast.info("Producto agregado al carrito.");
  }

  // Update item count
  function handleVariantCountChange(e, vid) {
    let newCart = cart.map((item) => {
      if (item.vid === vid) {
        item.order_item_quantity = e.target.value;
      }
      return item;
    });
    setCart(newCart);
  }

  // Remove selected item from cart
  function handleDeleteCartItem(vid) {
    let newCart = cart.filter((item) => item.vid !== vid);
    setCart(newCart);
  }

  // Remove all items from cart
  function handleEmptyCart(confirm = true) {
    if (!confirm || window.confirm("Quieres vaciar el carrito de compras?")) {
      setCart([]);
      toast.info("Carrito de compras vaciado");
    }
  }

  return loggedIn === "am9hbm5lLnRhdGlhbmFAZ21haWwuY29tam9hbm5l" ? (
    <Router>
      <ScrollToTop />
      <ToastContainer autoClose={3000} hideProgressBar />
      <div id="layout" className="content pure-g">
        <h1>{loggedIn.stringify}</h1>
        <SidebarMenu
          cart={cart}
          handleVariantCountChange={handleVariantCountChange}
          handleEmptyCart={handleEmptyCart}
          handleDeleteCartItem={handleDeleteCartItem}
        />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/products/:productid" component={ProductEdit} />
          <Route
            path="/products"
            render={(props) => (
              <Products {...props} handleAddItem={handleAddItem} />
            )}
          />
          <Route path="/orders/:orderid" component={OrderDetails} />
          <Route path="/orders" component={Orders} />
          <Route path="/stock" component={Stock} />
          <Route path="/users/:userid" component={Users} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  ) : (
    <Login handleLogin={setLoginState} />
  );
}

export default App;
