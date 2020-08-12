import React, { useEffect, useState } from "react";
import _ from "lodash";
import ProductCardLg from "modules/products/ProductCardLg";
import ProductCardSm from "modules/products/ProductCardSm";
import ProductList from "modules/products/ProductList";
import { BsFillGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useStickyState } from "hooks";
import { getProducts, togglePublished } from "api/productApi";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [productLayout, setProductLayout] = useStickyState(
    "grid-lg",
    "product-layout"
  );
  const [stockFilter, setStockFilter] = useStickyState("all", "stockFilter");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Get products
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

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
  }

  /* function changePublishedState(id) {
    togglePublished(product.id);
    .then(()=>
      const updatedVariants = variants.map((variant) =>
      variant.id === id ? { ...variant, [field]: e.target.value } : variant
    );
    setVariants(updatedVariants);
    )
  } */

  let filteredProducts = products;

  /* Filter by search */
  filteredProducts = filteredProducts.filter((eachItem) => {
    return (
      eachItem["name"].toLowerCase().includes(searchText.toLowerCase()) ||
      eachItem["season"].toLowerCase().includes(searchText.toLowerCase())
    );
  });

  /* TODO: Filter by Size */

  /* Filter by available stock */
  if (stockFilter !== "all") {
    filteredProducts = filteredProducts.filter((eachItem) => {
      return stockFilter === "1"
        ? Number(eachItem["totalstock"]) > 0
        : Number(eachItem["totalstock"]) < 1;
    });
  }

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-1-2">
            <h1 className="email-content-title">Productos - component</h1>
            <p className="email-content-subtitle">
              From at <span>3:56pm, April 3, 2012</span>
            </p>
          </div>

          <div className="email-content-controls pure-u-1-2">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="1">Disponible</option>
              <option value="0">Agotado</option>
            </select>
            <input
              className="pure-input-1"
              type="text"
              placeholder="Buscar"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className={
                "secondary-button pure-button" +
                (productLayout === "grid-lg" ? " active" : "")
              }
              onClick={() => setProductLayout("grid-lg")}
            >
              <BsFillGridFill />
            </button>
            <button
              className={
                "secondary-button pure-button" +
                (productLayout === "grid-sm" ? " active" : "")
              }
              onClick={() => setProductLayout("grid-sm")}
            >
              <BsGrid3X3GapFill />
            </button>
            <button
              className={
                "secondary-button pure-button" +
                (productLayout === "list" ? " active" : "")
              }
              onClick={() => setProductLayout("list")}
            >
              <FaThList />
            </button>
          </div>
        </div>

        <div className="email-content-body product-cards-container">
          {filteredProducts.map((product, index) => {
            switch (productLayout) {
              case "grid-lg":
                return (
                  <ProductCardLg
                    key={index}
                    product={product}
                    updateStockInState={updateStockInState}
                    handleAddItem={props.handleAddItem}
                  />
                );
              case "grid-sm":
                return (
                  <ProductCardSm
                    key={index}
                    product={product}
                    updateStockInState={updateStockInState}
                    handleAddItem={props.handleAddItem}
                  />
                );
              default:
                return (
                  <ProductList
                    key={index}
                    product={product}
                    updateStockInState={updateStockInState}
                    handleAddItem={props.handleAddItem}
                  />
                );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
