import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import * as Constants from "../constants";
import {
  RiDashboardLine,
  RiBarcodeBoxLine,
  RiShoppingCartLine,
} from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";

function SidebarMenu() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // Get product count
    axios
      .get(Constants.API_URL + "count.php")
      .then(function (response) {
        // handle success
        setProductCount(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div id="nav" className="pure-u">
      <a href="#/" className="nav-menu-button">
        Menu
      </a>

      <div className="nav-inner">
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
                <span className="email-count">({productCount})</span>
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <NavLink to="/orders" className="pure-menu-link">
                <RiShoppingCartLine /> Pedidos
              </NavLink>
            </li>
            <li className="pure-menu-item">
              <NavLink to="/stock" className="pure-menu-link">
                <FaBoxOpen /> Stock
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
    </div>
  );
}

export default SidebarMenu;
