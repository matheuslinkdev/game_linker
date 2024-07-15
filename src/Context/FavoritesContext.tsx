import React, { createContext, useContext, useEffect, useState } from "react";

// Cria o Contexto
const FavoritesContext = createContext();

// Hook customizado para usar o Contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

// Cria o provedor do Contexto
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Efeito para carregar favoritos do localStorage ao iniciar
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Função para adicionar um favorito
  const addFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, item];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Função para remover um favorito
  const removeFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (favorite) => favorite !== item
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
