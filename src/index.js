import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { esES } from "@material-ui/core/locale";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CartProvider } from "modules/cart/cartContext";
import { ProductProvider } from "productContext";

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
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CartProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CartProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
