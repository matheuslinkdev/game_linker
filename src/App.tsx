import React, { useState, useEffect } from "react";
import { useFetchData, getAllGames, getBestSellingGames } from "./api/GlobalApi"; // Importa a função getAllGames e useFetchData

function App() {
  const [games, setGames] = useState([]); // Estado para armazenar os jogos

  // Chamada para buscar os jogos usando o gancho personalizado useFetchData
  useFetchData(getAllGames);

  // Efeito para atualizar o estado dos jogos quando os dados forem recebidos
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
  }, []); // Executa o efeito somente uma vez quando o componente é montado

  return (
    <div>
      <h1>Lista de Jogos</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li> // Renderiza o nome de cada jogo
        ))}
      </ul>
    </div>
  );
}

export default App;
