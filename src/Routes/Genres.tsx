import React, { useEffect, useState } from "react";
import { getGameGenres } from "../api/GlobalApi";
import { GenreProps } from "../types/globalTypes";

const Genres: React.FC = () => {
  const [gameGenres, setGameGenres] = useState<GenreProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameGenres();
        setGameGenres(data.results);
      } catch (error) {
        console.error("Erro ao buscar os gêneros:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Game Genres</h1>
      {gameGenres.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {gameGenres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Genres;
