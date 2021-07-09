import ShowPrices from "modules/ShowPrices";

export default function ProductDetails({ product }) {
  return (
    <div className="result pure-g">
      <div className="pure-u-1 pure-u-sm-2-3">
        <h2 style={product.state ? { color: "green" } : { color: "red" }}>
          {product.name} (#{product.id}) {product.featured ? "*" : ""}
        </h2>
        <h4>
          Categorías: {product.category} - UPC: {product.upc}
        </h4>
        <ShowPrices product={product} />
        <h2>
          {product.size}, {product.color}
        </h2>
        <span
          className="product-stock"
          style={{
            float: "right",
            fontSize: 75,
            border: "1px solid black",
            padding: 10,
            borderRadius: 10,
            color: product.stock > 0 ? "green" : "red",
          }}
        >
          {product.stock}
        </span>
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
          <li>Weight: {product.weight}</li>
          <li>Variant ID: {product.vid}</li>
          <li>Product ID: {product.product_id}</li>
        </ul>
      </div>
      <div className="pure-u-1 pure-u-sm-1-3">
        <img
          style={{ width: "100%" }}
          src={
            process.env.REACT_APP_PROD_IMG_URL + product.images["0"]["image"]
          }
          alt={product.name}
        />
      </div>
    </div>
  );
}
