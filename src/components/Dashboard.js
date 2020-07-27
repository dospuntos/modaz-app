import React from "react";
import {
  RiShoppingCartLine,
  RiFileList2Line,
  RiMoneyDollarBoxLine,
  RiFileList3Line,
} from "react-icons/ri";
import { GiCardboardBox } from "react-icons/gi";
import "../modules/card.css";

function Dashboard() {
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
                  <h3>0/23</h3>
                  <p>Pendientes / Confirmados</p>
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
                  <h3>159/256</h3>
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
                  <h3>$1235,-</h3>
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
                    <li>Tarea 1</li>
                    <li>Tarea 1</li>
                    <li>Tarea 1</li>
                    <li>Tarea 1</li>
                    <li>Tarea 1</li>
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
