import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    height: 300,
  },
  media: {
    height: 140,
  },
});

export default function ProductStats({ stats }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/random/?clothing%20store"
          title="Productos"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Productos
          </Typography>
          <Typography variant="h5" color="textSecondary" component="h5">
            {stats.products} productos / {stats.variants} variantes
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to="/products">
          <Button size="small" color="primary">
            Ver productos
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
