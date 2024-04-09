import { useEffect, useState, useReducer } from "react";
import ProductCardLg from "modules/products/ProductCardLg";
import ProductCardMd from "modules/products/ProductCartMd";
import ProductCardSm from "modules/products/ProductCardSm";
import ProductList from "modules/products/ProductList";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import { BsFillGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useStickyState } from "hooks";
import { getProducts, getCategories } from "api/productApi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import productReducer from "productReducer";
import CircularProgress from "@mui/material/CircularProgress";

const initialState = [];

export default function Products() {
  const [products, prodDispatch] = useReducer(productReducer, initialState);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get products
    getProducts().then((products) => {
      prodDispatch({ type: "set", data: products });
      setLoading(false);
    });

    // Get categories
    getCategories().then((categories) => setCategories(categories));
  }, [refreshProducts]);

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

  if (loading) return <CircularProgress />;

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-3">
            <h1 className="email-content-title">Productos</h1>
            <p className="email-content-subtitle">
              <span>
                Mostrando {filteredProducts.length}/{products.length} productos.
              </span>
            </p>
          </div>

          <div className="email-content-controls pure-u-2-3">
            <FormControl>
              <InputLabel>Talla</InputLabel>
              <Select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                label="Talla"
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
                label="Categoría"
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
                label="Stock"
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
                label="Estado"
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
                labelRowsPerPage="Ítems por página:"
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
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
                      prodDispatch={prodDispatch}
                      forceProductRefresh={forceProductRefresh}
                    />
                  );
                case "grid-md":
                  return (
                    <ProductCardMd
                      key={product.name}
                      product={product}
                      prodDispatch={prodDispatch}
                    />
                  );
                case "grid-sm":
                  return (
                    <ProductCardSm
                      key={product.name}
                      product={product}
                      prodDispatch={prodDispatch}
                    />
                  );
                default:
                  return (
                    <ProductList
                      key={product.name}
                      product={product}
                      prodDispatch={prodDispatch}
                    />
                  );
              }
            })}
        </div>
      </div>
    </div>
  );
}
