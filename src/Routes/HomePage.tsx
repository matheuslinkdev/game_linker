import { SetStateAction, useState } from "react";
import Carousel from "../Components/Carousel";
import SearchGame from "../Components/Form/SearchGame";
import MostPopular from "./MostPopular";
import { Flex, Icon, Button, Heading, Tag } from "@chakra-ui/react";
import Filters from "../Components/Form/Filters";
import GameCard from "../Components/Fragments/GameCard";
import { IoIosArrowForward, IoIosArrowBack, IoMdHeart } from "react-icons/io";

import { getGamesByGenre } from "../api/GlobalApi";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleSearchResults = (results: []) => {
    setResults(results);
  };

  const handleFilteredResults = (
    results: [],
    genre: SetStateAction<string>,
    page: SetStateAction<number>
  ) => {
    setResults(results);
    setSelectedGenre(genre);
    setCurrentPage(page);
    handleCloseSidebar(); // Fechar a sidebar após filtrar os resultados
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const fetchGames = async (page: number) => {
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
    <Flex flexDir="column">
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
        bg="blue.400"
        borderRadius="50%"
        boxShadow="0 0 6px 2px var(--chakra-colors-blue-900)"
        p={2}
        zIndex={999999}
      />

      <Flex
        position="absolute"
        flexDir="column"
        left={0}
        top="0"
        bg="#0762f2"
        w={{ base: "100%", md: 400 }}
        h="70dvh"
        borderRadius="0 0 10px 0"
        zIndex={999}
        transition="all 0.3s ease-in-out"
        transform={sidebarOpen ? "translateX(0)" : "translateX(-100%)"}
        p={2}
      >
        {sidebarOpen && (
          <Flex margin="auto" flexDir="column" alignItems="start">
            <Heading size="md" fontWeight={400} mb={2}>
              Search for a game:
            </Heading>
            <SearchGame
              onSearchResults={handleSearchResults}
              setSidebarOpen={setSidebarOpen}
            />
            <Heading size="md" mt={4} fontWeight={400}>
              Filter by Genre:
            </Heading>
            <Filters
              onFilterResults={handleFilteredResults}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setSelectedGenre={setSelectedGenre}
            />
          </Flex>
        )}
        <Link to="wishlist" style={{ width: "130px" }}>
          <Tag
          bg="red.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{bg: "red.600"}}
            transition=".2s ease"
            p={1} 
          >
            My Favorites
            <Icon as={IoMdHeart} color="blue.800" _hover={{color: "blue.500"}}/>
          </Tag>
        </Link>
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
