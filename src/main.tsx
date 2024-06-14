import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import MostPopular from "./Routes/MostPopular.tsx";
import HomePage from "./Routes/HomePage.tsx";
import ErrorPage from "./Routes/ErrorPage.tsx";
import { Providers } from "./providers.tsx";
import GameDetails from "./Routes/GameDetails.tsx";
import Genres from "./Routes/Genres.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <Router>
        <main style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", minHeight: "100dvh"}}>
        

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mostpopular" element={<MostPopular />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        </main>
      </Router>
    </Providers>
  </React.StrictMode>
);
