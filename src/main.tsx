import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import MostPopular from "./Routes/MostPopular.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Routes/HomePage.tsx";
import ErrorPage from "./Routes/ErrorPage.tsx";
import Header from "./Components/Common/Header.tsx";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const router = createBrowserRouter([
  {
    path: "/*",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mostpopular",
    element: <MostPopular />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <main>
        <Header/>
        <RouterProvider router={router} />
      </main>
    </ChakraProvider>
  </React.StrictMode>
);
