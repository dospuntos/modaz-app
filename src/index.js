import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { CartProvider } from "modules/cart/cartContext";
import { ProductProvider } from "productContext";

const theme = createTheme(
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
