import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MostPopular from "./Routes/MostPopular.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Routes/HomePage.tsx";
import ErrorPage from "./Routes/ErrorPage.tsx";
import Header from "./Components/Common/Header.tsx";
import { Providers } from "./providers.tsx";

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
    <Providers>
      <main>
        <Header/>
        <RouterProvider router={router} />
      </main>
    </Providers>
  </React.StrictMode>
);
