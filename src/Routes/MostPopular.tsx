import { useState, useEffect } from "react";
import { getBestSellingGames } from "../api/GlobalApi";
import { Flex, Heading } from "@chakra-ui/react";
import GameCard from "../Components/Fragments/GameCard";

const MostPopular = () => {
  const [games, setGames] = useState([]); // Estado para armazenar os jogos

  // Atualizar o estado dos jogos quando os dados forem recebidos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBestSellingGames();
        setGames(data.results); // Define os jogos recebidos no estado
        console.log(data.results);
        
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Heading fontWeight={400} ml={24} mt={4}>Most Popular Games:</Heading>
      <Flex
        flexWrap="wrap"
        gap="20px"
        justifyContent="center"
        alignItems="center"
        mt={20}
        maxWidth="95%"
        margin="5dvh auto"
      >
        <GameCard games={games} />
      </Flex>
    </>
  );
};

export default MostPopular;
