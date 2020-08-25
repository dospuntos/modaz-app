import React, { useState, useEffect } from "react";
import {
  RiShoppingCartLine,
  RiFileList2Line,
  RiMoneyDollarBoxLine,
  RiFileList3Line,
} from "react-icons/ri";
import { GiCardboardBox } from "react-icons/gi";
import { getStatistics } from "api/statisticsApi";
import "modules/card.css";

function Dashboard() {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    // Get statistics
    getStatistics().then((statistics) => {
      setStatistics(statistics);
    });
  }, []);

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-2">
            <h1 className="email-content-title">Panel de Control - Moda Z</h1>
            <p className="email-content-subtitle">Información y estadísticas</p>
          </div>
        </div>

        <div className="email-content-body product-cards-container">
          <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-4">
              <div className="card card-1">
                <div className="card-title color-primary">
                  <span className="icon">
                    <RiShoppingCartLine />
                  </span>
                  <h2>Pedidos</h2>
                </div>
                <div className="card-content">
                  <h3>{statistics.orders}</h3>
                  <p>Total</p>
                </div>
              </div>
            </div>
            <div className="pure-u-1 pure-u-md-1-4">
              <div className="card card-1">
                <div className="card-title color-secondary">
                  <span className="icon">
                    <RiFileList3Line />
                  </span>
                  <h2>Cotizaciones</h2>
                </div>
                <div className="card-content">
                  <h3>5/23</h3>
                  <p>Pendientes / Confirmados</p>
                </div>
              </div>
            </div>
            <div className="pure-u-1 pure-u-md-1-4">
              <div className="card card-1">
                <div className="card-title color-tertiary">
                  <span className="icon">
                    <GiCardboardBox />
                  </span>
                  <h2>Productos</h2>
                </div>
                <div className="card-content">
                  <h3>
                    {statistics.products}/{statistics.variants}
                  </h3>
                  <p className="text-center">Productos/variantes</p>
                </div>
              </div>
            </div>
            <div className="pure-u-1 pure-u-md-1-4">
              <div className="card card-1">
                <div className="card-title color-quaternary">
                  <span className="icon">
                    <RiMoneyDollarBoxLine />
                  </span>
                  <h2>Ingresos</h2>
                </div>
                <div className="card-content">
                  <h3>Bs. {statistics.sold_total},-</h3>
                  <h4>({statistics.sold_items} items)</h4>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div className="pure-g">
            <div className="pure-u-1">
              <div className="card card-1">
                <div className="card-title color-primary">
                  <span className="icon">
                    <RiFileList2Line />
                  </span>
                  <h2>ToDo</h2>
                </div>
                <div className="card-content">
                  <ul>
                    <li>Update order state</li>
                    <li>Deleting product also removes variants</li>
                    <li>Select fields to display in print view</li>
                    <li>Create product</li>
                    <li>Duplicate product (and create an empty variant)</li>
                    <li>Support multiple images (JSON-encode images)</li>
                    <li>
                      <s>Print PDF</s>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
