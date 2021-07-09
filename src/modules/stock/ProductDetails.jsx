import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ShowPrices from "modules/ShowPrices";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: "100%",
    margin: "30px 10px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    //width:"50%",
    height: "2rem",
    paddingTop: "83.75%",
  },
  content: {
    //width:"40%",

    textAlign: "left",
    padding: theme.spacing(3),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    width: 100,
    height: 100,
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing(),
    },
  },
}));

export default function ProductDetails({ product }) {
  const classes = useStyles();
  const images = product.images;
  const [displayImage, setDisplayImage] = useState();

  useEffect(() => {
    setDisplayImage(
      process.env.REACT_APP_PROD_IMG_URL + product.images["0"]["image"]
    );
  }, [product.images]);

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={displayImage} />
      <CardContent className={classes.content}>
        <Typography
          style={product.state === "1" ? { color: "green" } : { color: "red" }}
          variant={"h5"}
        >
          {product.name} (#{product.id}) {product.featured === "1" ? "*" : ""}
        </Typography>
        <Typography variant={"h6"} gutterBottom>
          {product.size}, {product.color} - UPC: {product.upc}
        </Typography>
        <ShowPrices product={product} />
        <Typography variant={"subtitle2"}>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText primary={product.composition} />
            </ListItem>
          </List>
          <ul>
            {product.notes && <li>Notes: {product.notes}</li>}
            {product.description && <li>Description: {product.description}</li>}
            <li>Composition: {product.composition}</li>
            <li>Country: {product.country}</li>
            <li>Manufacturer: {product.manufacturer}</li>
            <li>Order Date: {product.orderdate}</li>
            <li>Release Date: {product.release_date}</li>
            <li>Season: {product.season}</li>
            <li>Tags: {product.tags}</li>
            <li>Weight: {product.weight}</li>
            <li>Variant ID: {product.vid}</li>
            <li>Product ID: {product.product_id}</li>
          </ul>
        </Typography>
        <Divider className={classes.divider} light />
        {images.length > 1 &&
          images.map((image, index) => (
            <Avatar
              className={classes.avatar}
              key={index}
              src={process.env.REACT_APP_PROD_IMG_URL + image.image}
              onClick={() =>
                setDisplayImage(
                  process.env.REACT_APP_PROD_IMG_URL + image.image
                )
              }
            />
          ))}
      </CardContent>
    </Card>
  );
}
