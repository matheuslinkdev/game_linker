import React, { createContext, useContext, useEffect, useState } from "react";
import { GameProps } from "../types/globalTypes";

type FavoritesContextType = {
  favorites: GameProps[];
  addFavorite: (item: GameProps) => void;
  removeFavorite: (item: GameProps) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

// Hook customizado para usar o Contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

// Cria o provedor do Contexto
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<GameProps[]>([]);

  // Efeito para carregar favoritos do localStorage ao iniciar
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Função para adicionar um favorito
  const addFavorite = (item: GameProps) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, item];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Função para remover um favorito
  const removeFavorite = (item: GameProps) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (favorite) => favorite.id !== item.id // Assuming GameProps has an `id` field
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
