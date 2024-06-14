import React, { useState } from "react";
import { searchGame } from "../../api/GlobalApi";
import GameCard from "../Fragments/GameCard";
import { Flex, FormLabel, Icon, Input } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";

const SearchGame = ({ onSearchResults, setSidebarOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const results = await searchGame(searchTerm);
      setSearchResults(results.results);
      onSearchResults(results.results);
      setSidebarOpen(false)
    } catch (error) {
      console.error("Error fetching search results:", error);
      onSearchResults([]);
    }
  };

  return (
    <Flex>
      <form onSubmit={handleSubmit}>
  
        <Flex alignItems="center">
          <Input
            type="text"
            placeholder="Search for a game..."
            value={searchTerm}
            onChange={handleChange}
            borderRadius="30px"
            color="common.100"
            fontWeight={500}
            _placeholder={{color: "common.200"}}
          />
          <button type="submit">
            <Icon as={IoSearch} color="common.100" ml={2} mt={1}/>
          </button>
        </Flex>
      </form>
    </Flex>
  );
};

export default SearchGame;
