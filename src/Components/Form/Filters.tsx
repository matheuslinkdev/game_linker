import React, { useState, useEffect } from "react";
import { Select, Button, Flex } from "@chakra-ui/react";
import { getGameGenres, getGamesByGenre } from "../../api/GlobalApi";
import GameCard from "../Fragments/GameCard";

const Filters = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameGenres();
        setGenres(data.results);
      } catch (error) {
        console.error("Erro ao buscar os gêneros:", error);
      }
    };

    fetchData();
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const fetchGamesByGenre = async () => {
    try {
      const data = await getGamesByGenre(selectedGenre, currentPage);
      setGames(data.results);
    } catch (error) {
      console.error("Erro ao buscar os jogos por gênero:", error);
    }
  };

  // Handler para avançar para a próxima página de jogos
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchGamesByGenre();
  };

  // Handler para voltar para a página anterior de jogos
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      fetchGamesByGenre();
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Select
        value={selectedGenre}
        onChange={handleGenreChange}
        mb={4}
        placeholder="Selecione um gênero"
      >
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </Select>
      <Button colorScheme="blue" onClick={fetchGamesByGenre} mb={4}>
        Buscar Jogos
      </Button>
      <Flex
        flexWrap="wrap"
        gap="20px"
        justifyContent="center"
        alignItems="center"
        mt={20}
        maxWidth="95%"
        margin="5dvh auto"
      >
        {games.length > 0 && (
          <>
            <GameCard games={games} />
            <Flex mt={4}>
              <Button onClick={prevPage} disabled={currentPage === 1}>
                Página Anterior
              </Button>
              <Button ml={2} onClick={nextPage}>
                Próxima Página
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Filters;
