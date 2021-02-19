import { useStickyState } from "hooks";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Add from "modules/stock/Add";
import Remove from "modules/stock/Remove";
import Consult from "modules/stock/Consult";
import AddToCart from "modules/stock/AddToCart";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Stock() {
  const [tab, setTab] = useStickyState("add", "tab");
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12} md={5}>
          <Typography variant="h3">Stock</Typography>
        </Grid>

        <Grid item xs={12} md={7} style={{ textAlign: "right" }}>
          <ToggleButtonGroup
            value={tab}
            exclusive
            onChange={(e, tab) => setTab(tab)}
          >
            <ToggleButton value="consult">Consultar</ToggleButton>
            <ToggleButton value="add">Agregar</ToggleButton>
            <ToggleButton value="remove">Reducir</ToggleButton>
            <ToggleButton value="cart">Agregar a carrito</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <Paper className={classes.paper}>
        {tab === "add" && <Add />}
        {tab === "consult" && <Consult />}
        {tab === "remove" && <Remove />}
        {tab === "cart" && <AddToCart />}
      </Paper>
    </Container>
  );
}
