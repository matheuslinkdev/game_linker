import { useEffect, useState } from 'react'
import { getGameDetails } from '../api/GlobalApi';
import { useParams } from 'react-router-dom';
import { Flex, Img } from '@chakra-ui/react';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameDetails(id);
        console.log(data);
        setGame(data);
      } catch (error) {
        console.error("Erro ao buscar dados do Jogo:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Flex margin="auto">
        <Img
          src={game?.background_image}
          objectFit="cover"
          width="auto"
          height="50dvh"
          borderRadius={5}
        />
      </Flex>
    </>
  );
};

export default GameDetails;
