import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bgImage: "url('/Game-Background-Graphics.webp')", // Define a imagem de fundo para html e body
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
      },
    },
  },
  colors: {
    common: {
      "50": "#f6f6f6",
      "100": "#e7e7e7",
      "200": "#d1d1d1",
      "300": "#b0b0b0",
      "400": "#888888",
      "500": "#6d6d6d",
      "600": "#464646",
      "700": "#353535",
      "800": "#252525",
      "900": "#121212",
      "950": "#050505",
      transparent: {
        "950": "#050505cc",
      },
    },
  },
});
