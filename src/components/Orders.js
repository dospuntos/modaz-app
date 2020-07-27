import React, { useState } from "react";

function Orders() {
  const [searchText, setSearchText] = useState("");
  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-2">
            <h1 className="email-content-title">Pedidos y cotizaciones</h1>
            <p className="email-content-subtitle">
              Responder y crear pedidos y cotizaciones.
            </p>
          </div>

          <div className="email-content-controls pure-u-1-2">
            <input
              className="pure-input-1"
              type="text"
              placeholder="Buscar pedido"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="email-content-body product-cards-container">&nbsp;</div>
      </div>
    </div>
  );
}

export default Orders;
