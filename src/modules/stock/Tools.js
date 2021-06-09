import { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { resetStock } from "api/productApi";
import MissingImages from "modules/stock/MissingImages";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      padding: theme.spacing(6),
      width: "100%",
    },
  },
  card: {
    padding: theme.spacing(3),
  },
}));

function Tools() {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Paper>
        <Grid container spacing={6}>
          <Grid item sm={12} md={4}>
            <Card className={classes.card} variant="outlined">
              <p>
                Iniciar copia de seguridad de ModaZ.net. Recomendado antes de
                hacer cambios de los productos o stock.
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
            </Card>
          </Grid>
          <Grid item sm={12} md={4}>
            <Card className={classes.card} variant="outlined">
              <p>Resetear stock para todos los productos</p>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleStockReset()}
              >
                Resetear stock
              </Button>
            </Card>
          </Grid>
          <Grid item sm={12} md={4}>
            <Card className={classes.card} variant="outlined">
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
            </Card>
          </Grid>
        </Grid>
      </Paper>
      {showMissing && (
        <Paper>
          <h2>Productos sin archivo de imágen válido</h2>
          <MissingImages />
        </Paper>
      )}
    </div>
  );
}

export default Tools;
