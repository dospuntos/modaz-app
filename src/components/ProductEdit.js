import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductById,
  getVariantsById,
  saveVariant,
  saveProduct,
  deleteVariant,
  getCategories,
} from "api/productApi";
import { RiArrowLeftSLine } from "react-icons/ri";
import TextInput from "modules/form/TextInput";
import ProductVariant from "modules/products/ProductVariant";
import Categories from "modules/products/Categories";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ImageEdit from "components/ImageEdit";
import { getDefaultImage, getAllImages } from "functions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InputAdornment from "@mui/material/InputAdornment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: "60%",
    maxHeight: "90%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ProductEdit(props) {
  const [product, setProduct] = useState([
    {
      id: "",
      name: "",
      images: "{}",
      orderdate: "",
      release_date: "",
      category: "",
      season: "",
      wholesaleprice: "",
      msrp: "",
      price: "",
      zinprice: "",
      price_discount: "",
      weight: "",
      composition: "",
      manufacturer: "",
      coo: "",
      country: "",
    },
  ]);

  const [edited, setEdited] = useState(false);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  let { productid } = useParams();
  if (!productid) {
    productid = props.id;
  }

  useEffect(() => {
    // Get products and split category list to array
    getProductById(productid).then((product) => {
      setProduct({ ...product, category: product.category.split(",") });
    });

    // Get variants
    getVariantsById(productid).then((variants) => {
      setVariants(variants);
    });

    // Get categories
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, [productid]);

  function handleChange({ target }) {
    const updatedProduct = {
      ...product,
      [target.name]: target.value,
    };
    setProduct(updatedProduct);
    setEdited(true);
  }

  function handleVariantChange(e, id, field) {
    const updatedVariants = variants.map((variant) =>
      variant.id === id ? { ...variant, [field]: e.target.value } : variant
    );
    setVariants(updatedVariants);
  }

  function handleVariantSave(id) {
    const variant = variants.filter((variant) => {
      return variant.id === id;
    });
    saveVariant(variant);
  }

  function handleProductSave() {
    let _product = product;
    saveProduct({
      ...product,
      category: _product.category.join(","),
    }).then(setEdited(false));
  }

  function addVariant(e) {
    e.preventDefault();
    const newVariant = [
      {
        id: "0",
        product_id: product.id,
        upc: "0",
        item_code: "0",
        color: "-",
        size: "-",
        stock: "0",
      },
    ];
    saveVariant({ ...newVariant }).then(() => {
      getVariantsById(productid).then((variants) => {
        setVariants(variants);
      });
    });
  }

  function handleVariantDelete(e, id) {
    e.preventDefault();
    if (window.confirm("¿Quieres eliminar este modelo?")) {
      deleteVariant(id);
      let _variants = variants.filter((v) => v.id !== id);
      setVariants(_variants);
    }
  }

  function handleCategoryChange(value) {
    setProduct({ ...product, category: value });
    setEdited(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleImageChange(type, index, value) {
    let images = getAllImages(product.images);
    images[index][type] = value;
    setProduct({ ...product, images: JSON.stringify(images) });
    setEdited(true);
  }

  function handleMakeDefaultImage(index) {
    let images = getAllImages(product.images);
    images.forEach(function (item, i) {
      if (i === index) {
        images.splice(i, 1);
        images.unshift(item);
      }
    });

    setProduct({ ...product, images: JSON.stringify(images) });
    setEdited(true);
  }

  function handleAddImage() {
    let images = getAllImages(product.images);
    let last = images[images.length - 1];
    images = [...images, last];
    setProduct({ ...product, images: JSON.stringify(images) });
    setEdited(true);
  }

  function handleDeleteImage(index) {
    let images = getAllImages(product.images);
    images.splice(index, 1);
    setProduct({ ...product, images: JSON.stringify(images) });
    setEdited(true);
  }

  return (
    <div className={classes.root}>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <ImageEdit
            images={product.images}
            handleImageChange={handleImageChange}
            handleMakeDefaultImage={handleMakeDefaultImage}
            handleAddImage={handleAddImage}
            handleDeleteImage={handleDeleteImage}
          />
        </div>
      </Modal>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <h1>{product.name}</h1>
        </Grid>
        <Grid item xs={12} md={4}>
          <p>
            {!props.id && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  !edited || window.confirm("¿Volver sin guardar?")
                    ? props.history.goBack()
                    : null
                }
              >
                <RiArrowLeftSLine /> Volver
              </Button>
            )}
            &nbsp;
            <Button
              onClick={handleProductSave}
              disabled={!edited}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </p>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                value={product.name || ""}
                onChange={handleChange}
                label="Nombre"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Precio ModaZ"
                onChange={handleChange}
                name="price"
                value={product.price || ""}
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Bs</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Descuento"
                onChange={handleChange}
                name="price_discount"
                value={product.price_discount || ""}
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Bs</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Precio ZIN"
                onChange={handleChange}
                name="zinprice"
                value={product.zinprice || ""}
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Bs</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <TextField
                label="Precio revendedora"
                onChange={handleChange}
                name="wholesaleprice"
                value={product.wholesaleprice || ""}
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$US</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <TextField
                label="MSRP"
                onChange={handleChange}
                name="msrp"
                value={product.msrp || ""}
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$US</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <hr />
          <h2>Modelos</h2>
          <p>
            <small>(Los cambios se guardan inmediatamente)</small>
          </p>
          {variants.map((item) => {
            return (
              <ProductVariant
                key={item.id}
                item={item}
                handleVariantChange={handleVariantChange}
                handleVariantSave={handleVariantSave}
                handleVariantDelete={handleVariantDelete}
              />
            );
          })}
          <Button
            variant="contained"
            onClick={addVariant}
            startIcon={<AddCircleOutlineIcon />}
            size="small"
          >
            Agregar modelo
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Categories
            categories={categories}
            prodCats={product.category || []}
            handleChange={handleCategoryChange}
          />
          <img src={getDefaultImage(product.images)} alt={product.name} />
          <br />
          {getAllImages(product.images).map((item, index) => {
            return (
              index > 0 && (
                <img
                  className="thumbnail zoom"
                  style={{ display: "inline-block", maxWidth: 50 }}
                  src={process.env.REACT_APP_PROD_IMG_URL + item.image}
                  alt={item.color}
                  onClick={() => handleMakeDefaultImage(index)}
                />
              )
            );
          })}
          <Button
            fullWidth
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpen(true)}
          >
            Editar
          </Button>
          <TextInput
            label="Order Date"
            onChange={handleChange}
            name="orderdate"
            value={product.orderdate || ""}
          />
          <TextInput
            label="Release Date"
            onChange={handleChange}
            name="release_date"
            value={product.release_date || ""}
          />
          <TextInput
            label="Season"
            onChange={handleChange}
            name="season"
            value={product.season || ""}
          />
          <TextInput
            label="Weight"
            onChange={handleChange}
            name="weight"
            value={product.weight || ""}
          />
          <TextInput
            label="Composition"
            onChange={handleChange}
            name="composition"
            value={product.composition || ""}
          />
          <TextInput
            label="Manufacturer"
            onChange={handleChange}
            name="manufacturer"
            value={product.manufacturer || ""}
          />
          <TextInput
            label="COO"
            onChange={handleChange}
            name="coo"
            value={product.coo || ""}
          />
          <TextInput
            label="Country"
            onChange={handleChange}
            name="country"
            value={product.country || ""}
          />
        </Grid>
      </Grid>
    </div>
  );
}
