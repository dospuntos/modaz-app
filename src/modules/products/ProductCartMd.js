import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import ChangeStock from "modules/ChangeStock";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getAllImages } from "functions";
import { useCart } from "modules/cart/cartContext";

/* const useStyles = makeStyles((theme) => ({
  root: {
    width: "32%",
    maxWidth: 345,
    float: "left",
    margin: ".5%",
  },
  media: {
    height: 0,
    paddingTop: "84%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  subheader: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: green[500],
  },
  avatar2: {
    backgroundColor: grey[200],
  },
})); */

export default function ProductCardMd({ product, prodDispatch }) {
  const { dispatch } = useCart();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const images = getAllImages(product.images);
  const bgimg = process.env.REACT_APP_PROD_IMG_URL + images["0"]["image"];

  return (
    <Card /* className={classes.root} */>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={
              product.state === "1"
                ? "backgroundColor: green[500]"
                : "backgroundColor: grey[200]"
            }
            onClick={() =>
              prodDispatch({
                type: "publishedToggle",
                id: product.id,
              })
            }
          >
            {product.totalstock}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.name}
        subheader={"Bs. " + product.price + " (ZIN: " + product.zinprice + ")"}
        /* className={classes.subheader} */
      />
      <CardMedia
        /* className={classes.media} */ image={bgimg}
        title={product.name}
      />
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography> */}
        {product.variants.map((variant, index) => {
          return (
            <table>
              <tbody>
                <tr key={index}>
                  <td colSpan="2" key={index}>
                    {variant.size} - {variant.color} ({variant.stock}){" "}
                    {variant.stock < 1 ? (
                      ""
                    ) : (
                      <span
                        className="pure-button pure-button-cart-sm"
                        onClick={() => {
                          // Add product name to variant object (for cart display)
                          variant["name"] = product.name;
                          variant["price"] = product.price;
                          variant["order_item_quantity"] = "1";
                          // Add to cart
                          dispatch({
                            type: "add",
                            variant,
                          });
                        }}
                      >
                        <AddShoppingCartIcon />
                      </span>
                    )}
                    <ChangeStock
                      variantId={variant.vid}
                      productId={variant.product_id}
                      prodDispatch={prodDispatch}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            color={parseInt(product.featured) === 1 ? "secondary" : ""}
            onClick={() =>
              prodDispatch({
                type: "featuredToggle",
                id: product.id,
              })
            }
          />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() =>
            prodDispatch({
              type: "delete",
              id: product.id,
            })
          }
        >
          <Delete />
        </IconButton>
        <Link to={"products/" + product.id}>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton
          /* className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })} */
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
