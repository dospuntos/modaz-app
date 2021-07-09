import { useState } from "react";
import { useStickyState } from "hooks";

function AddOrderItem({ products, handleSave, orderid }) {
  const [productSelect, setProductSelect] = useState(0);
  const [variantSelect, setVariantSelect] = useState("");
  const [stockFilter, setStockFilter] = useStickyState(false, "stickyState");

  let result = products.filter((product) => {
    return product.id === productSelect;
  });

  let filteredProducts = products;
  if (stockFilter) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.totalstock > 0;
    });
  }

  return (
    <table className="pure-table">
      <thead>
        <tr>
          <td colSpan="5">Agregar producto</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {result.length && result[0].images !== "" && (
              <img
                src={
                  process.env.REACT_APP_PROD_IMG_URL +
                  result[0].images["0"]["image"]
                }
                alt={result[0].name}
                style={{ maxWidth: 75 }}
              />
            )}
          </td>
          <td>
            <select
              value={productSelect}
              onChange={(e) => setProductSelect(e.target.value)}
            >
              {!filteredProducts.length ? (
                <option>Cargando...</option>
              ) : (
                filteredProducts.map((product) => {
                  return (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  );
                })
              )}
            </select>
          </td>
          <td>
            <select
              value={variantSelect}
              onChange={(e) => setVariantSelect(e.target.value)}
            >
              <option value={0}>Talla y color</option>
              {result.length &&
                result[0].variants.map((variant) => {
                  return (
                    <option key={variant.vid} value={variant.vid}>
                      {variant.color} - {variant.size} ({variant.stock})
                    </option>
                  );
                })}
            </select>
          </td>
          <td>
            <button
              className="pure-button primary-button"
              onClick={() => {
                let data = {
                  product_id: variantSelect,
                  order_id: orderid,
                  order_item_price: result[0].price,
                };
                handleSave(data);
              }}
            >
              +
            </button>
          </td>
          <td>
            <button
              className={
                stockFilter
                  ? "pure-button primary-button"
                  : "pure-button secondary-button"
              }
              onClick={() => setStockFilter(!stockFilter)}
            >
              Solo stock
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default AddOrderItem;
