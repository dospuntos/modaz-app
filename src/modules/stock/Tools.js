import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { resetStock } from "api/productApi";
import MissingImages from "modules/stock/MissingImages";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import LaunchIcon from "@mui/icons-material/Launch";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";

export default function Tools() {
  const [showMissing, setShowMissing] = useState(false);
  const [date, setDate] = useState("");
  const theme = createTheme();

  function handleStockReset() {
    if (
      window.confirm(
        "¿Seguro que quieres reducir el stock de TODOS los productos a 0?\n\n¡ESTE ACCIÓN NO SE PUEDE REVERTIR!",
      )
    ) {
      if (
        window.confirm(
          "Última oportunidad, ¿SEGURO QUE QUIERES RESETEAR EL STOCK?",
        )
      ) {
        resetStock();
      }
    }
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={6}>
          <Card
            sx={{
              padding: theme.spacing(3),
              height: "100%",
            }}
            variant="outlined"
          >
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
        <Grid item sm={12} md={6}>
          <Card
            sx={{
              padding: theme.spacing(3),
              height: "100%",
            }}
            variant="outlined"
          >
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
        <Grid item sm={12} md={6}>
          <Card
            sx={{
              padding: theme.spacing(3),
              height: "100%",
            }}
            variant="outlined"
          >
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
        <Grid item sm={12} md={6}>
          <Card
            sx={{
              padding: theme.spacing(3),
              height: "100%",
            }}
            variant="outlined"
          >
            <p>Mostrar imágenes de pedido por fecha</p>
            <form /* className={classes.container} */ noValidate>
              <Grid container spacing={6}>
                <Grid item sm={6}>
                  <TextField
                    id="date"
                    label="Fecha de pedido"
                    type="date"
                    defaultValue=""
                    /* className={classes.textField} */
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item sm={6}>
                  {date !== "" && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={
                        import.meta.env.VITE_API_URL +
                        "getbyorderdate.php?orderdate=" +
                        date
                      }
                      target="_blank"
                    >
                      Mostrar para {date} <LaunchIcon />
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
      {showMissing && (
        <Card
          sx={{
            padding: theme.spacing(3),
            height: "100%",
            mt: 4,
          }}
        >
          <h2>Productos sin archivo de imágen válido</h2>
          <MissingImages />
        </Card>
      )}
    </Container>
  );
}
