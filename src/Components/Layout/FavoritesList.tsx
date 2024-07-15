import React from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import { Heading } from "@chakra-ui/react";
import GameListBox from "../Custom/GameListBox";

const FavoritesList = () => {
  const { favorites } = useFavorites();

  console.log(favorites);

  return (
    <div>
      {favorites.length > 0 ? (
        <GameListBox games={favorites}/>
      ) : (
        <>
          <Heading>No favorites added !</Heading>
        </>
      )}
    </div>
  );
};

export default FavoritesList;
