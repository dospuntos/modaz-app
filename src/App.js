import React from "react";
import "purecss/build/pure-min.css";
import "purecss/build/grids-responsive.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./modules/ScrollToTop";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Stock from "./components/Stock";
import SidebarMenu from "./components/SidebarMenu";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div id="layout" className="content pure-g">
        <SidebarMenu />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/products" component={Products} />
          <Route path="/orders" component={Orders} />
          <Route path="/stock" component={Stock} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
