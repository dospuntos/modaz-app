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
import SidebarMenu from "./components/SidebarMenu";

function App() {
  const [cart, setCart] = useStickyState([], "cart");

  function handleAddItem(variant) {
    setCart([...cart, variant]);
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
    }
  }

  return (
    <Router>
      <ScrollToTop />
      <div id="layout" className="content pure-g">
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
