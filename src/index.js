import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { esES } from "@material-ui/core/locale";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: "#E44F9A",
      },
      secondary: {
        main: "#f44336",
      },
    },
  },
  esES
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
