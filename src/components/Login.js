import React, { useState } from "react";

function Login({ handleLogin }) {
  const [emailField, setEmailField] = useState("");
  const [pwField, setPwField] = useState("");

  return (
    <div className="absolute-center">
      <form
        className="pure-form pure-form-stacked"
        style={{ maxWidth: 400, margin: "0 auto" }}
        onSubmit={(e) => handleLogin(btoa(emailField + pwField))}
      >
        <fieldset>
          <legend>
            <img src="/img/admin-logo.png" alt="Moda Z App" />
          </legend>
          <input
            type="email"
            id="stacked-email"
            required={true}
            placeholder="Email"
            onChange={(e) => setEmailField(e.target.value)}
          />
          <input
            type="password"
            id="stacked-password"
            placeholder="Contraseña"
            onChange={(e) => setPwField(e.target.value)}
          />
          <button type="submit" className="pure-button primary-button">
            Ingresar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
