import { createRoot } from "react-dom/client";
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

const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CartProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CartProvider>
  </ThemeProvider>
);

serviceWorker.register();
