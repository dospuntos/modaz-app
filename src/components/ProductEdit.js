import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "api/productApi";
import { RiSave2Line, RiArrowLeftSLine } from "react-icons/ri";
import * as Constants from "constants.js";
import TextInput from "modules/form/TextInput";

// Input field
const Input = (value) => {
  return <input type="text" placeholder="Input" />;
};

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

  function handleChange({ target }) {
    const updatedProduct = {
      ...product,
      [target.name]: target.value,
    };
    setProduct(updatedProduct);
  }

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
              <form className="pure-form">
                <TextInput
                  id="name"
                  label="Name"
                  onChange={handleChange}
                  name="name"
                  value={product.name}
                  /* error={props.errors.name} */
                />
                <TextInput
                  id="price"
                  label="Precio ModaZ"
                  onChange={handleChange}
                  name="price"
                  value={product.price}
                  /* error={props.errors.name} */
                />
                <TextInput
                  id="zinprice"
                  label="Precio ZIN"
                  onChange={handleChange}
                  name="zinprice"
                  value={product.zinprice}
                  /* error={props.errors.name} */
                />
                <TextInput
                  id="wholesaleprice"
                  label="Precio revendedora"
                  onChange={handleChange}
                  name="wholesaleprice"
                  value={product.wholesaleprice}
                  /* error={props.errors.name} */
                />
              </form>

              <table className="pure-table">
                <thead>
                  <tr>
                    <td>Precio ModaZ</td>
                    <td>Precio ModaZ ZIN</td>
                    <td>Precio Revendedora</td>
                    <td>MSRP</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Input />
                      {product.price}
                    </td>
                    <td>{product.zinprice}</td>
                    <td>{product.wholesaleprice}</td>
                    <td>{product.msrp}</td>
                  </tr>
                </tbody>
              </table>
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
              <RiArrowLeftSLine /> Volver
            </button>
            &nbsp;
            <button className="pure-button primary-button">
              <RiSave2Line /> Guardar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
