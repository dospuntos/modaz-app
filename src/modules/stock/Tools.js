import { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { resetStock } from "api/productApi";
import MissingImages from "modules/stock/MissingImages";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function Tools() {
  const [showMissing, setShowMissing] = useState(false);

  function handleStockReset() {
    if (
      window.confirm(
        "¿Seguro que quieres reducir el stock de TODOS los productos a 0?\n\n¡ESTE ACCIÓN NO SE PUEDE REVERTIR!"
      )
    ) {
      if (
        window.confirm(
          "Última oportunidad, ¿SEGURO QUE QUIERES RESETEAR EL STOCK?"
        )
      ) {
        resetStock();
      }
    }
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <p>
          Iniciar copia de seguridad de ModaZ.net. Recomendado antes de hacer
          cambios de los productos o stock.
        </p>
        <a
          href="https://modaz.net/index.php?option=com_akeeba&view=Backup&key=m224rI-19VUwve5aUe-ZXGmttHTvFvo9"
          className="pure-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copia de Seguridad
          <br />
          (ModaZ.net)
        </a>
      </Grid>
      <Grid item xs={12} sm={4}>
        <p>Resetear stock para todos los productos</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleStockReset()}
        >
          Resetear stock
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <p>Mostrar productos sin imagen</p>
        <FormControlLabel
          control={
            <Switch
              checked={showMissing}
              onChange={() => setShowMissing(!showMissing)}
              name="checkedA"
            />
          }
          label="Mostrar"
        />
      </Grid>

      {showMissing && (
        <div className="missingImages">
          <MissingImages />
        </div>
      )}

      {/* <div className="tools">
      <h1>Herramientas - usar con cuidado</h1>
      <div className="pure-g">
        <div className="pure-u-1 pure-u-sm-1-5">
          <p>
            Iniciar copia de seguridad de ModaZ.net. Recomendado antes de hacer
            cambios de los productos o stock.
          </p>
          <a
            href="https://modaz.net/index.php?option=com_akeeba&view=Backup&key=m224rI-19VUwve5aUe-ZXGmttHTvFvo9"
            className="pure-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copia de Seguridad
            <br />
            (ModaZ.net)
          </a>
        </div>
        <div className="pure-u-1 pure-u-sm-1-5">
          <p>Resetear stock para todos los productos</p>
          <button
            className="pure-button secondary-button"
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => handleStockReset()}
          >
            Resetear stock
          </button>
        </div>
        <div className="pure-u-1 pure-u-sm-1-5">
          <p>Mostrar productos sin imagen</p>
          <button
            className="pure-button secondary-button"
            onClick={() => setShowMissing(!showMissing)}
          >
            Mostrar
          </button>
        </div>
      </div>
      {showMissing && (
        <div className="missingImages">
          <MissingImages />
        </div>
      )}
    </div> */}
    </Grid>
  );
}

export default Tools;
