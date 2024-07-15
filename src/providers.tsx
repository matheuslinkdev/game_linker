import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { FavoritesProvider } from "./Context/FavoritesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ChakraProvider>
  );
}
