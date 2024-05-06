import { useState, useEffect } from "react";
import {
  useFetchData,
  getAllGames,
  getBestSellingGames,
} from "../api/GlobalApi";
import {
  Flex,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import GameCard from "../Components/Fragments/GameCard";
import GameModal from "../Components/Layout/GameModal";

const MostPopular = () => {
  const [games, setGames] = useState([]); // Estado para armazenar os jogos

  // Chamada para buscar os jogos usando o gancho personalizado useFetchData
  useFetchData(getAllGames);

  // Atualizar o estado dos jogos quando os dados forem recebidos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBestSellingGames();
        setGames(data.results); // Define os jogos recebidos no estado
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchData();
  }, []);

  return (
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
       <GameCard games={games}/>
      </Flex>
    </>
  );
};

export default MostPopular;
