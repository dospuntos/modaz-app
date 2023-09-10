import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
