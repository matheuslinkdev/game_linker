import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { searchGame } from "../../api/GlobalApi";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { StateProps } from "../../types/globalTypes";

const SearchGame: React.FC<StateProps> =({ onSearchResults, setSidebarOpen }: StateProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<[]>([]);

  useEffect(()=>{
    
  }, [searchResults])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
            w={300}
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
