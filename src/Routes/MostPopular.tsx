import { useState, useEffect } from "react";
import { getBestSellingGames } from "../api/GlobalApi";
import { Heading } from "@chakra-ui/react";
import GameListBox from "../Components/Custom/GameListBox";

const MostPopular = () => {
  const [games, setGames] = useState([]);

  // Atualizar o estado dos jogos quando os dados forem recebidos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBestSellingGames();
        setGames(data.results);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Heading fontWeight={400} ml={24} mt={4}>
        Most Popular Games:
      </Heading>
      <GameListBox games={games} />
    </>
  );
};

export default MostPopular;
