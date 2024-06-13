import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { GameProvider } from "./Context/GameContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <GameProvider>{children}</GameProvider>
    </ChakraProvider>
  );
}
