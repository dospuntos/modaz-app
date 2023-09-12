import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ShowPrices from "modules/ShowPrices";
import { getDefaultImage, getAllImages } from "functions";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const StyledCard = styled("Card")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  maxWidth: "100%",
  margin: theme.spacing(6),
  transition: "0.3s",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  },
}));

export default function ProductDetails({ product }) {
  const images = getAllImages(product.images);
  const [displayImage, setDisplayImage] = useState();
  const theme = useTheme();

  useEffect(() => {
    setDisplayImage(getDefaultImage(product.images));
  }, [product.images]);

  return (
    <StyledCard>
      <CardMedia
        sx={{
          height: "2rem",
          paddingTop: "83.75%",
        }}
        image={displayImage}
      />
      <CardContent
        sx={{
          padding: theme.spacing(3),
        }}
      >
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
            <li>Weight: {product.weight} lbs</li>
            <li>Variant ID: {product.vid}</li>
            <li>Product ID: {product.product_id}</li>
          </ul>
        </Typography>

        {images.length > 1 &&
          images.map((image, index) => (
            <Avatar
              sx={{
                width: 100,
                height: 100,
                display: "inline-block",
                border: "2px solid white",
                "&:not(:first-of-type)": {
                  marginLeft: -theme.spacing(),
                },
              }}
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
    </StyledCard>
  );
}
