import React, { useState, useEffect } from "react";
import { Flex, Tag } from "@chakra-ui/react";
import { getGameGenres, getGamesByGenre } from "../../api/GlobalApi";
import { FilterProps, GenreProps } from "../../types/globalTypes";

const Filters: React.FC<FilterProps> = ({
  onFilterResults,
  currentPage,
  setCurrentPage,
  setSelectedGenre,
}) => {
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [localSelectedGenre, setLocalSelectedGenre] = useState<string>("");

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

  const handleGenreChange = (genreId: string) => {
    setLocalSelectedGenre(genreId);
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const fetchGamesByGenre = async (genre: string, page: number) => {
    try {
      const data = await getGamesByGenre(genre, page);
      onFilterResults(data.results, genre, page);
    } catch (error) {
      console.error("Error:", error);
      onFilterResults([], genre, page);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" mt={2}>
      <Flex alignItems="center" flexWrap="wrap" gap={2}>
        {genres.map((genre) => (
          <Tag
            key={genre.id}
            onClick={() => handleGenreChange(genre.id.toString())}
            bg="blue.700"
            color="common.100"
            _hover={{ cursor: "pointer", bg: "blue.800" }}
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
