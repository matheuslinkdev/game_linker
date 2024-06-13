import React, { useState } from "react";
import { searchGame } from "../../api/GlobalApi";
import GameCard from "../Fragments/GameCard";
import { Flex } from "@chakra-ui/react";

const SearchGame = ({ onSearchResults }) => {
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
    } catch (error) {
      console.error("Error fetching search results:", error);
      onSearchResults([]); // Reset results in case of error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {searchResults.length > 0 ? (
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
              <GameCard games={searchResults} />
            </Flex>
          </>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchGame;
