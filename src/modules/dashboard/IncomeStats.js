import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    height: 300,
  },
  media: {
    height: 140,
  },
});

export default function Products({ stats }) {
  const classes = useStyles();

  function currencyFormat(num) {
    return "Bs. " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
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
      <CardActions>
        {/* <Button size="small" color="primary">
          Ver pedidos
        </Button> */}
      </CardActions>
    </Card>
  );
}
