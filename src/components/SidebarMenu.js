import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  RiDashboardLine,
  RiBarcodeBoxLine,
  RiShoppingCartLine,
} from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import Cart from "../modules/Cart";
import pkg from "../../package.json";
import { getStatistics } from "../api/statisticsApi";

function SidebarMenu({ cart, handleEmptyCart }) {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    // Get statistics
    getStatistics().then((statistics) => {
      setStatistics(statistics);
    });
  }, []);

  return (
    <div id="nav" className="pure-u">
      <a href="#/" className="nav-menu-button">
        Menu
      </a>

      <div className="nav-inner">
        <Cart cart={cart} handleEmptyCart={handleEmptyCart} />
        <button className="primary-button pure-button">Moda Z Admin</button>

        <div className="pure-menu">
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <NavLink to="/" className="pure-menu-link">
                <RiDashboardLine /> Dashboard
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <NavLink to="/products" className="pure-menu-link">
                <RiBarcodeBoxLine /> Productos{" "}
                <span className="email-count">({statistics.products})</span>
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <NavLink to="/orders" className="pure-menu-link">
                <RiShoppingCartLine /> Pedidos
                <span className="email-count">({statistics.orders})</span>
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <NavLink to="/stock" className="pure-menu-link">
                <FaBoxOpen /> Stock
                <span className="email-count">
                  ({statistics.products}/{statistics.variants})
                </span>
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <a href="#/" className="pure-menu-link">
                Trash
              </a>
            </li>
            <li className="pure-menu-heading">Labels</li>
            <li className="pure-menu-item">
              <a href="#/" className="pure-menu-link">
                <span className="email-label-personal"></span>Personal
              </a>
            </li>
            <li className="pure-menu-item">
              <a href="#/" className="pure-menu-link">
                <span className="email-label-work"></span>Work
              </a>
            </li>
            <li className="pure-menu-item">
              <a href="#/" className="pure-menu-link">
                <span className="email-label-travel"></span>Travel
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="version">
        <small>Version: {pkg.version}</small>
      </div>
    </div>
  );
}

export default SidebarMenu;
