import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TodoList from "modules/TodoList";
import NewsList from "modules/NewsList";
import { getStatistics } from "api/statisticsApi";
import "modules/card.css";
import Card from "@mui/material/Card";
/* import ProductStats from "modules/dashboard/ProductStats";
import OrderStats from "modules/dashboard/OrderStats";
import IncomeStats from "modules/dashboard/IncomeStats"; */
import CircularProgress from "@mui/material/CircularProgress";
import {
  RiShoppingCartLine,
  RiFileList3Line,
  RiMoneyDollarBoxLine,
} from "react-icons/ri";
import { GiCardboardBox } from "react-icons/gi";

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

export default function Dashboard() {
  const [statistics, setStatistics] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get statistics
    getStatistics().then((statistics) => {
      setStatistics(statistics);
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress />;
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
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
          {/* <ProductStats stats={statistics} /> */}
        </Grid>
        <Grid item xs={12} md={3}>
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
          {/* <OrderStats stats={statistics} /> */}
        </Grid>
        <Grid item xs={12} md={3}>
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
          {/* <IncomeStats stats={statistics} /> */}
        </Grid>
        <Grid item xs={12} md={3}>
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
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Box pt={4}>
            <Card variant="outlined">
              <TodoList />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box pt={4}>
            <Card variant="outlined">
              <NewsList />
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* <div id="main" className="pure-u-1">
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
        </div>
      </div>
    </div> */}
    </Container>
  );
}
