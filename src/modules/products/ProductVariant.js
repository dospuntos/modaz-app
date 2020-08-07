import React from "react";

function ProductVariant({ item, handleVariantChange, handleVariantSave }) {
  return (
    <div className="pure-form pure-form-stacked">
      <fieldset>
        <legend>Variant ID {item.id}</legend>
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-5">
            <input
              type="text"
              placeholder={item.upc}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "upc")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.upc}
            />
          </div>
          <div className="pure-u-1 pure-u-md-1-5">
            <input
              type="text"
              placeholder={item.size}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "size")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.size}
            />
          </div>
          <div className="pure-u-1 pure-u-md-1-5">
            <input
              type="text"
              placeholder={item.color}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "color")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.color}
            />
          </div>
          <div className="pure-u-1 pure-u-md-1-5">
            <input
              type="text"
              placeholder={item.stock}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "stock")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.stock}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default ProductVariant;
