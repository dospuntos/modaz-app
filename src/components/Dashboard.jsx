import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TodoList from "modules/TodoList";
import NewsList from "modules/NewsList";
import { getStatistics } from "api/statisticsApi";
import "modules/card.css";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import {
  RiShoppingCartLine,
  RiFileList3Line,
  RiMoneyDollarBoxLine,
} from "react-icons/ri";
import { GiCardboardBox } from "react-icons/gi";

export default function Dashboard() {
  const [statistics, setStatistics] = useState([]);
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
    </Container>
  );
}
