import React, { useState, useEffect } from "react";
import { Flex, Button, Tag, Heading } from "@chakra-ui/react";
import { getGameGenres, getGamesByGenre } from "../../api/GlobalApi";

const Filters = ({
  onFilterResults,
  currentPage,
  setCurrentPage,
  setSelectedGenre,
}) => {
  const [genres, setGenres] = useState([]);
  const [localSelectedGenre, setLocalSelectedGenre] = useState("");

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

  useEffect(() => {
    if (localSelectedGenre !== "") {
      fetchGamesByGenre(localSelectedGenre, currentPage);
    }
  }, [localSelectedGenre, currentPage]);

  const handleGenreChange = (genreId) => {
    setLocalSelectedGenre(genreId);
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const fetchGamesByGenre = async (genre, page) => {
    try {
      const data = await getGamesByGenre(genre, page);
      onFilterResults(data.results, genre, page);
    } catch (error) {
      console.error("Erro ao buscar os jogos por gênero:", error);
      onFilterResults([], genre, page);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" mt={2}>

      <Flex alignItems="center" flexWrap="wrap" gap={2}>
        {genres.map((genre) => (
          <Tag
            key={genre.id}
            onClick={() => handleGenreChange(genre.id)}
            bg="blue.700"
            color="common.100"
            _hover={{cursor: "pointer", bg: "blue.800"}}
            transition=".3s ease"
          >
            {genre.name}
          </Tag>
        ))}
      </Flex>
    </Flex>
  );
};

export default Filters;
