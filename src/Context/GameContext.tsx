import { createContext, useContext, useState } from "react";

const GameContext = createContext();


export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({ score: 0, level: 1 });
  const [gameDescription, setGameDescription] = useState("")

  return (
    <GameContext.Provider value={{ gameState, setGameState, gameDescription, setGameDescription }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useGame = () => {
  return useContext(GameContext);
};
