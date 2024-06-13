import React, { useState } from "react";
import Carousel from "../Components/Carousel";
import SearchGame from "../Components/Form/SearchGame";
import MostPopular from "./MostPopular";
import { Flex, Heading } from "@chakra-ui/react";
import Filters from "../Components/Form/Filters";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <Flex flexDir="column" mt="10dvh">
      <Carousel />
      <Heading m="auto" textAlign="center" my={10} fontWeight={400}>
        Most Popular Games:
      </Heading>
      <SearchGame onSearchResults={handleSearchResults} />
      <Filters/>
      {searchResults.length === 0 && <MostPopular />}
    </Flex>
  );
};

export default HomePage;
