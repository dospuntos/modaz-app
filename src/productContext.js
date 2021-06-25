import { createContext, useReducer, useContext, useEffect } from "react";
import { getProducts } from "api/productApi";
import api from "api/api";
import productReducer from "productReducer";

const ProductContext = createContext(null);
let initialProducts;

/* getProducts().then((products) => {
  initialProducts = products;
}); */

export function ProductProvider(props) {
  const [products, prodDispatch] = useReducer(productReducer, initialProducts);
  useEffect(() => {
    api.getProducts().then((products) => {
      console.log("UseEffect setting products");
      console.log("Products: ", products.data.data.products);
      initialProducts = products.data.data.products;
    });
  });

  const contextValue = {
    products,
    prodDispatch,
  };
  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  return context;
}
