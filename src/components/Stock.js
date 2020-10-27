import { useStickyState } from "hooks";
import Add from "modules/stock/Add";
import Remove from "modules/stock/Remove";
import Consult from "modules/stock/Consult";
import Tools from "modules/stock/Tools";
import AddToCart from "modules/stock/AddToCart";

function Stock({ handleAddItem }) {
  const [tab, setTab] = useStickyState("add", "tab");
  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-2">
            <h1 className="email-content-title">Stock</h1>
            <p className="email-content-subtitle">
              Manejar productos en stock - agregar, editar y borrar.
            </p>
          </div>

          <div className="email-content-controls pure-u-1-2">
            <button
              className={
                "secondary-button pure-button" +
                (tab === "consult" ? " active" : "")
              }
              onClick={() => setTab("consult")}
            >
              Consultar
            </button>
            <button
              className={
                "secondary-button pure-button" +
                (tab === "add" ? " active" : "")
              }
              onClick={() => setTab("add")}
            >
              Agregar
            </button>
            <button
              className={
                "secondary-button pure-button" +
                (tab === "remove" ? " active" : "")
              }
              onClick={() => setTab("remove")}
            >
              Reducir
            </button>
            <button
              className={
                "secondary-button pure-button" +
                (tab === "tools" ? " active" : "")
              }
              onClick={() => setTab("tools")}
            >
              Herramientas
            </button>
            <button
              className={
                "secondary-button pure-button" +
                (tab === "cart" ? " active" : "")
              }
              onClick={() => setTab("cart")}
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="email-content-body product-cards-container">
          {tab === "add" && <Add />}
          {tab === "consult" && <Consult />}
          {tab === "remove" && <Remove />}
          {tab === "cart" && <AddToCart handleAddItem={handleAddItem} />}
          {tab === "tools" && <Tools />}
        </div>
      </div>
    </div>
  );
}

export default Stock;
