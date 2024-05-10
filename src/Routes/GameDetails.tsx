import { useEffect, useState } from 'react'
import { getGameDetails } from '../api/GlobalApi';
import { useParams } from 'react-router-dom';

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
    <div>
      GameDetails
      <h2>{id}</h2>
    </div>
  );
};

export default GameDetails;
