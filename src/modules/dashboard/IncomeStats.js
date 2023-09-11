import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

/* const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    height: 300,
  },
  media: {
    height: 140,
  },
}); */

export default function Products({ stats }) {
  function currencyFormat(num) {
    return "Bs. " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <Card /* className={classes.root} */>
      <CardActionArea>
        <CardMedia
          /* className={classes.media} */
          image="https://source.unsplash.com/random/?money"
          title="Ingresos"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Ingresos
          </Typography>
          <Typography variant="h5" color="textSecondary" component="h5">
            {currencyFormat(stats.sold_total)} en {stats.orders} pedidos
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
