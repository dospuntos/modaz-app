import { useEffect, useState } from "react";
import _ from "lodash";
import ProductCardLg from "modules/products/ProductCardLg";
import ProductCardMd from "modules/products/ProductCartMd";
import ProductCardSm from "modules/products/ProductCardSm";
import ProductList from "modules/products/ProductList";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { BsFillGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useStickyState } from "hooks";
import { toast } from "react-toastify";
import {
  getProducts,
  togglePublished,
  toggleFeatured,
  deleteProduct,
  getCategories,
} from "api/productApi";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [productLayout, setProductLayout] = useStickyState(
    "grid-lg",
    "product-layout"
  );
  const [stockFilter, setStockFilter] = useStickyState("all", "stockFilter");
  const [publishedFilter, setPublishedFilter] = useStickyState(
    "all",
    "publishedFilter"
  );
  const [searchText, setSearchText] = useState("");
  const [sizeFilter, setSizeFilter] = useStickyState("all", "sizeFilter");
  const [categories, setCategories] = useState([]);
  const [catFilter, setCatFilter] = useStickyState("all", "catFilter");
  const [refreshProducts, setRefreshProducts] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useStickyState(10, "rowsPerPage");

  useEffect(() => {
    // Get products
    getProducts().then((products) => {
      setProducts(products);
    });

    // Get categories
    getCategories().then((categories) => setCategories(categories));
  }, [refreshProducts]);

  // Function to update stock in state object
  // ToDo: might need some cleanup!!
  function updateStockInState(id, dir, productId) {
    let tempProducts = products;
    let prevTotalstock = _.find(tempProducts, { id: productId })["totalstock"];
    let prevVariantstock = _.find(_.flatten(_.map(tempProducts, "variants")), {
      vid: id,
    })["stock"];
    let newTotalStock = dir ? prevTotalstock + 1 : prevTotalstock - 1;
    let newVariantStock = dir
      ? Number(prevVariantstock) + 1
      : Number(prevVariantstock) - 1;

    // Update totalstock (products->productId->totalstock)
    _.set(_.find(tempProducts, { id: productId }), "totalstock", newTotalStock);

    // Update variant (products->productId->variants->vId->totalstock)
    _.set(
      _.find(_.flatten(_.map(tempProducts, "variants")), {
        vid: id,
      }),
      "stock",
      newVariantStock
    );
    setProducts([...tempProducts]);

    toast.info("Stock del producto cambiado a " + newVariantStock);
  }

  function changePublishedState(id) {
    togglePublished(id);

    let tempProducts = products;
    let prevState = _.find(tempProducts, { id: id })["state"];
    let newState = 1 - prevState;
    _.set(_.find(tempProducts, { id: id }), "state", newState);

    setProducts([...tempProducts]);
    if (newState) {
      toast.success("Producto publicado");
    } else {
      toast.warning("Producto despublicado");
    }
  }

  function changeFeaturedState(id) {
    toggleFeatured(id);

    let tempProducts = products;
    let prevState = _.find(tempProducts, { id: id })["featured"];
    let newState = 1 - prevState;
    _.set(_.find(tempProducts, { id: id }), "featured", newState);

    setProducts([...tempProducts]);

    if (newState) {
      toast.success("Producto destacado");
    } else {
      toast.warning("Producto NO destacado");
    }
  }

  function handleDeleteProduct(id) {
    if (window.confirm("Eliminar producto? No se puede restaurar.")) {
      // Delete product from database
      deleteProduct(id);

      // Remove from state
      const newList = products.filter((item) => item.id !== id);
      setProducts(newList);

      toast.info("Producto eliminado.");
    }
  }

  function forceProductRefresh() {
    setRefreshProducts(!refreshProducts);
  }

  let filteredProducts = products;

  /* Filter by category  */
  if (catFilter !== "all" && filteredProducts.length) {
    filteredProducts = filteredProducts.filter((eachItem) =>
      eachItem.category !== null ? eachItem.category.includes(catFilter) : false
    );
  }

  /* Filter by search */
  filteredProducts = filteredProducts.filter(
    (eachItem) =>
      eachItem["name"].toLowerCase().includes(searchText.toLowerCase()) ||
      eachItem["season"].toLowerCase().includes(searchText.toLowerCase())
  );

  /* Filter by size */
  if (sizeFilter !== "all") {
    filteredProducts = filteredProducts.filter((obj) =>
      obj.variants.some((cat) => cat.size.toLowerCase() === sizeFilter)
    );
  }

  /* Filter by available stock */
  if (stockFilter !== "all") {
    filteredProducts = filteredProducts.filter((eachItem) =>
      stockFilter === "1"
        ? Number(eachItem["totalstock"]) > 0
        : Number(eachItem["totalstock"]) < 1
    );
  }

  /* Filter by published state */
  if (publishedFilter !== "all") {
    filteredProducts = filteredProducts.filter((eachItem) =>
      publishedFilter === "1"
        ? Number(eachItem["state"]) > 0
        : Number(eachItem["state"]) < 1
    );
  }

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-3">
            <h1 className="email-content-title">Productos</h1>
            <p className="email-content-subtitle">
              <span>Mostrando</span> {filteredProducts.length}/{products.length}{" "}
              productos.
            </p>
          </div>

          <div className="email-content-controls pure-u-2-3">
            <FormControl>
              <InputLabel>Talla</InputLabel>
              <Select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="xs">XS</MenuItem>
                <MenuItem value="s">S</MenuItem>
                <MenuItem value="m">M</MenuItem>
                <MenuItem value="l">L</MenuItem>
                <MenuItem value="xl">XL</MenuItem>
                <MenuItem value="xxl">XXL</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.title} ({cat.path})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Stock</InputLabel>
              <Select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="1">Disponible</MenuItem>
                <MenuItem value="0">Agotado</MenuItem>
              </Select>
            </FormControl>{" "}
            <FormControl>
              <InputLabel>Estado</InputLabel>
              <Select
                value={publishedFilter}
                onChange={(e) => setPublishedFilter(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="1">Publicado</MenuItem>
                <MenuItem value="0">Despublicado</MenuItem>
              </Select>
            </FormControl>{" "}
            <TextField
              label="Buscar"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />{" "}
            <ToggleButtonGroup
              value={productLayout}
              exclusive
              onChange={(e, newLayout) => setProductLayout(newLayout)}
              aria-label="text alignment"
            >
              <ToggleButton value="grid-lg" aria-label="grid large">
                <BsFillGridFill />
              </ToggleButton>
              <ToggleButton value="grid-md" aria-label="grid medium">
                <BsFillGridFill />
              </ToggleButton>
              <ToggleButton value="grid-sm" aria-label="grid small">
                <BsGrid3X3GapFill />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list">
                <FaThList />
              </ToggleButton>
            </ToggleButtonGroup>
            <br />
            {filteredProducts.length && (
              <TablePagination
                rowsPerPageOptions={[10, 25, 100, 500]}
                component="div"
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(event, newPage) => setPage(newPage)}
                onChangeRowsPerPage={(event) => {
                  setRowsPerPage(+event.target.value);
                  setPage(0);
                }}
              />
            )}
          </div>
        </div>

        <div className="email-content-body product-cards-container">
          {!filteredProducts.length && (
            <h3>Ningún producto coincide con los filtros.</h3>
          )}

          {filteredProducts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => {
              switch (productLayout) {
                case "grid-lg":
                  return (
                    <ProductCardLg
                      key={product.name}
                      product={product}
                      updateStockInState={updateStockInState}
                      changePublishedState={changePublishedState}
                      changeFeaturedState={changeFeaturedState}
                      deleteProduct={handleDeleteProduct}
                      forceProductRefresh={forceProductRefresh}
                    />
                  );
                case "grid-md":
                  return (
                    <ProductCardMd
                      key={product.name}
                      product={product}
                      updateStockInState={updateStockInState}
                      changePublishedState={changePublishedState}
                      changeFeaturedState={changeFeaturedState}
                      deleteProduct={handleDeleteProduct}
                    />
                  );
                case "grid-sm":
                  return (
                    <ProductCardSm
                      key={product.name}
                      product={product}
                      updateStockInState={updateStockInState}
                    />
                  );
                default:
                  return (
                    <ProductList
                      key={product.name}
                      product={product}
                      updateStockInState={updateStockInState}
                    />
                  );
              }
            })}
        </div>
      </div>
    </div>
  );
}
