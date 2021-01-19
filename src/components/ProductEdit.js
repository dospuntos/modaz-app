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
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ImageEdit from "components/ImageEdit";
import { getDefaultImage } from "functions";

const useStyles = makeStyles((theme) => ({
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

function ProductEdit(props) {
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
    let _images;
    console.log(typeof _images);
    try {
      _images = JSON.parse(product.images);
    } catch (e) {
      console.log("No JSON");
    }
    _images[index][type] = value;
    _images = JSON.stringify(_images);
    setProduct({ ...product, images: _images });
    setEdited(true);
  }

  function handleMakeDefaultImage(index) {
    alert(index);
  }

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-3-4">
            <h1 className="email-content-title">{product.name}</h1>
            <p className="email-content-subtitle">Producto #{productid}</p>
          </div>
          <div className="pure-u-1-4">
            <p>
              {!props.id && (
                <button
                  className="pure-button secondary-button"
                  onClick={() =>
                    !edited ||
                    window.confirm("¿Quieres volver sin guardar los cambios?")
                      ? props.history.goBack()
                      : null
                  }
                >
                  <RiArrowLeftSLine /> Volver
                </button>
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
          </div>
        </div>

        <div className="email-content-body order-cards-container">
          <form
            className="pure-form pure-form-aligned"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="pure-g">
              <div className="pure-u-1 pure-u-md-3-4">
                <TextInput
                  label="Nombre"
                  onChange={handleChange}
                  name="name"
                  value={product.name || ""}
                  className="pure-u-2-3"
                />
                <TextInput
                  label="Precio ModaZ (Bs)"
                  onChange={handleChange}
                  name="price"
                  value={product.price || ""}
                />
                <TextInput
                  label="Descuento"
                  onChange={handleChange}
                  name="price_discount"
                  value={product.price_discount || ""}
                />
                <TextInput
                  id="zinprice"
                  label="Precio ZIN (Bs)"
                  onChange={handleChange}
                  name="zinprice"
                  value={product.zinprice || ""}
                />
                <TextInput
                  label="Precio revendedora ($US)"
                  onChange={handleChange}
                  name="wholesaleprice"
                  value={product.wholesaleprice || ""}
                />
                <TextInput
                  label="MSRP ($US)"
                  onChange={handleChange}
                  name="msrp"
                  value={product.msrp || ""}
                />

                <hr />
                <h2>Modelos</h2>
                <p>
                  <small>(Los cambios se guardan immediatamente)</small>
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
                <button
                  className="pure-button primary-button"
                  onClick={addVariant}
                >
                  +
                </button>
              </div>
              <div className="pure-u-1 pure-u-md-1-4">
                <Categories
                  categories={categories}
                  prodCats={product.category || []}
                  handleChange={handleCategoryChange}
                />
                <img src={getDefaultImage(product.images)} alt={product.name} />
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setOpen(true)}
                >
                  Editar
                </Button>
                <TextInput
                  label="Imágen"
                  onChange={handleChange}
                  name="images"
                  value={product.images || ""}
                  style={{ width: "100%" }}
                />

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
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <ImageEdit
            images={product.images}
            handleImageChange={handleImageChange}
            handleMakeDefaultImage={handleMakeDefaultImage}
          />
        </div>
      </Modal>
    </div>
  );
}

export default ProductEdit;
