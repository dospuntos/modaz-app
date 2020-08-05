import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "api/productApi";
import * as Constants from "constants.js";

function ProductEdit(props) {
  const [product, setProduct] = useState([
    {
      id: "",
      name: "",
      images: "0",
      order_date: "",
      release_date: "",
      season: "",
      wholesaleprice: "",
      msrp: "",
      price: "",
      zinprice: "",
      weight: "",
      composition: "",
      manufacturer: "",
      variants: [],
    },
  ]);
  let { productid } = useParams();

  useEffect(() => {
    // Get products
    getProductById(productid).then((product) => {
      setProduct(product);
    });
  }, [productid]);

  return (
    <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-3-4">
            <h1 className="email-content-title">{product.name}</h1>
            <p className="email-content-subtitle">Producto #{productid}</p>
          </div>
        </div>

        <div className="email-content-body order-cards-container">
          <div className="pure-g">
            <div className="pure-u-1 pure-u-md-3-4">
              <p>
                <strong>{product.name}</strong>
              </p>
            </div>
            <div className="pure-u-1 pure-u-md-1-4">
              <img
                src={
                  product.images !== "0"
                    ? Constants.PROD_IMG_URL + product.images
                    : Constants.DEFAULT_IMG_URL
                }
                alt={product.name}
              />
            </div>
          </div>
          <p>
            <button
              className="pure-button secondary-button"
              onClick={() => props.history.goBack()}
            >
              &lt; Volver
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
