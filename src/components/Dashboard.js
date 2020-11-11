import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TodoList from "modules/TodoList";
import { RiShoppingCartLine, RiFileList3Line } from "react-icons/ri";
import { getStatistics } from "api/statisticsApi";
import "modules/card.css";
import Card from "@material-ui/core/Card";
import ProductStats from "modules/dashboard/ProductStats";
import OrderStats from "modules/dashboard/OrderStats";
import IncomeStats from "modules/dashboard/IncomeStats";

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

  useEffect(() => {
    // Get statistics
    getStatistics().then((statistics) => {
      setStatistics(statistics);
    });
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProductStats stats={statistics} />
          {/* <div className="card card-1">
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
            </div> */}
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderStats stats={statistics} />
          {/* <Paper className={classes.paper}>
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
          </Paper> */}
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12} md={4}>
          <IncomeStats stats={statistics} />
          {/* <Paper className={classes.paper}>
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
          </Paper> */}
        </Grid>
      </Grid>
      <Box pt={4}>
        <Card variant="outlined">
          <TodoList />
        </Card>
      </Box>

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
                  <ol>
                    <li>Create product</li>
                    <li>Duplicate product (and create an empty variant)</li>
                    <li>Add filtered items to cart (empty cart first?)</li>
                    <li>Support multiple images (JSON-encode images)</li>
                    <li>
                      Fix editing and deleting items with same name from cart
                    </li>
                    <li>
                      <s>Handle categories</s>
                    </li>
                    <li>
                      <s>Filter by category</s>
                    </li>
                    <li>
                      <s>Implement material-ui</s>
                    </li>
                    <li>
                      <s>Filter by product size</s>
                    </li>
                    <li>
                      <s>Create new variant</s>
                    </li>
                    <li>
                      <s>Search, add and reduce by UPC</s>
                    </li>
                    <li>
                      <s>Update order state</s>
                    </li>
                    <li>
                      <s>Deleting product also removes variants</s>
                    </li>
                    <li>
                      <s>Different API URL for staging and deployed app</s>
                    </li>
                    <li>
                      <s>Select fields to display in print view</s>
                    </li>
                    <li>
                      <s>Print PDF</s>
                    </li>
                  </ol>
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
