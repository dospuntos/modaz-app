import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
  return (
    <div className="pure-control-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        type="text"
        onChange={props.onChange}
        name={props.name}
        className={props.className}
        value={props.value}
      />
    </div>
  );
}

export default TextInput;

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
  id: "",
};
