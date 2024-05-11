import React, { useEffect, useState } from 'react'
import { getGameGenres } from '../api/GlobalApi';

const Genres = () => {
      const [gameGenres, setGameGenres] = useState([]); // Estado para armazenar os jogos

      // Atualizar o estado dos jogos quando os dados forem recebidos
      useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getGameGenres();
            setGameGenres(data.results); // Define os jogos recebidos no estado
        } catch (error) {
            console.error("Erro ao buscar os jogos:", error);
        }
    };
    
    fetchData();
}, []);
console.log(gameGenres);
return (
    <div>{gameGenres[0]?.name}</div>
  )
}

export default Genres