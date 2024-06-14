import React, { useState } from "react";
import Carousel from "../Components/Carousel";
import SearchGame from "../Components/Form/SearchGame";
import MostPopular from "./MostPopular";
import { Flex, Icon, Button, Heading } from "@chakra-ui/react";
import Filters from "../Components/Form/Filters";
import GameCard from "../Components/Fragments/GameCard";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { getGamesByGenre } from "../api/GlobalApi";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleSearchResults = (results) => {
    setResults(results);
  };

  const handleFilteredResults = (results, genre, page) => {
    setResults(results);
    setSelectedGenre(genre);
    setCurrentPage(page);
    handleCloseSidebar(); // Fechar a sidebar após filtrar os resultados
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const fetchGames = async (page) => {
    try {
      const data = await getGamesByGenre(selectedGenre, page);
      setResults(data.results);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro ao buscar os jogos por gênero:", error);
    }
  };

  const nextPage = () => {
    fetchGames(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      fetchGames(currentPage - 1);
    }
  };

  return (
    <Flex flexDir="column" mt="10dvh">
      {results.length === 0 && <Carousel />}

      <Icon
        as={sidebarOpen ? IoIosArrowBack : IoIosArrowForward}
        fontSize={32}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        cursor="pointer"
        color="pink.950"
        position="absolute"
        left={2}
        top={4}
        bg="blue.200"
        borderRadius="50%"
        p={2}
      />

      <Flex
        position="absolute"
        left={0}
        top="10dvh"
        bg="blue.500"
        w={300}
        h="90dvh"
        borderRadius="0 0 10px 0"
        zIndex={999}
        transition="all 0.3s ease-in-out"
        transform={sidebarOpen ? "translateX(0)" : "translateX(-100%)"}
      >
        {sidebarOpen && (
          <Flex margin="auto" flexDir="column" alignItems="start" p={2}>
            <Heading size="md" fontWeight={400} mb={2}>Search for a game:</Heading>
            <SearchGame
              onSearchResults={handleSearchResults}
              setSidebarOpen={setSidebarOpen}
            />
            <Heading size="md" mt={4} fontWeight={400}>Filter by Genre:</Heading>
            <Filters
              onFilterResults={handleFilteredResults}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setSelectedGenre={setSelectedGenre}
            />
          </Flex>
        )}
      </Flex>

      {results.length === 0 && <MostPopular />}
      {results.length > 0 && (
        <>
          <Flex
            flexWrap="wrap"
            gap="20px"
            justifyContent="center"
            alignItems="center"
            mt={20}
            maxWidth="95%"
            margin="5dvh auto"
          >
            <GameCard games={results} />
          </Flex>
          <Flex mt={4} justifyContent="center" mb={4}>
            <Button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button ml={2} onClick={nextPage}>
              Next
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default HomePage;
