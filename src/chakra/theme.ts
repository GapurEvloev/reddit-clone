import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
// import { Input } from "./input";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ff4500",
      200: "#f74915",
    }
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
    // Input, // not working for some reason - come back to this
  },
})