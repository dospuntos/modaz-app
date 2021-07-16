import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function ProductVariant({
  item,
  handleVariantChange,
  handleVariantSave,
  handleVariantDelete,
}) {
  return (
    <div className="pure-form pure-form-stacked">
      <fieldset>
        <legend>Variant ID {item.id}</legend>
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-5-24">
            <input
              type="text"
              placeholder="UPC"
              required={true}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "upc")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.upc}
            />
          </div>
          <div className="pure-u-1 pure-u-md-3-24">
            <input
              type="text"
              placeholder="Talla"
              required={true}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "size")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.size}
            />
          </div>
          <div className="pure-u-1 pure-u-md-5-24">
            <input
              type="text"
              placeholder="Color"
              required={true}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "color")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.color}
            />
          </div>
          <div className="pure-u-1 pure-u-md-3-24">
            <input
              type="number"
              placeholder="Stock"
              required={true}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "stock")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.stock}
            />
          </div>
          <div className="pure-u-1 pure-u-md-3-24">
            <input
              type="text"
              placeholder="Item"
              className="pure-u-23-24"
              required={true}
              onChange={(e) => handleVariantChange(e, item.id, "item")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.item}
            />
          </div>
          <div className="pure-u-1 pure-u-md-3-24">
            <input
              type="number"
              placeholder="Transport ID"
              required={true}
              className="pure-u-23-24"
              onChange={(e) => handleVariantChange(e, item.id, "transport_id")}
              onBlur={(e) => handleVariantSave(item.id)}
              value={item.transport_id}
            />
          </div>
          <div className="pure-u-1 pure-u-md-2-24">
            <IconButton
              onClick={(e) => handleVariantDelete(e, item.id)}
              style={{ float: "right" }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default ProductVariant;
