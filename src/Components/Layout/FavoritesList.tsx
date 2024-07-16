import { useFavorites } from "../../Context/FavoritesContext";
import { Box, Center, Heading, keyframes, Text } from "@chakra-ui/react";
import GameListBox from "../Custom/GameListBox";

const zoomInOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

// Definindo a animação com uma duração e o tipo de repetição
const animation = `${zoomInOut} 10s infinite ease-in-out`;

const FavoritesList = () => {
  const { favorites } = useFavorites();

  console.log(favorites);

  return (
    <div>
      {favorites.length > 0 ? (
        <Center flexDir="column">
          <Text fontWeight={500} fontSize={20}>
            Here are your favorite games! Enjoy exploring and playing your top
            picks!
          </Text>
          <GameListBox games={favorites} />
        </Center>
      ) : (
        <Center
          position="relative"
          w="900px"
          maxW="95dvw"
          h="70dvh"
          overflow="hidden"
          borderRadius={6}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bgColor="#10275baa"
            zIndex={10}
            boxShadow="0 0 12px #b8dfffaa"
            borderRadius={6}
          />
          <Box
            bgImage="url('/Game-Background-Graphics.webp')"
            bgSize="cover"
            bgPosition="center"
            w="100%"
            h="100%"
            zIndex={1}
            animation={animation}
          />
          <Box
            zIndex={20}
            color="white"
            position="absolute"
            top="50%"
            left={{ base: "50%", md: "30%" }}
            transform="translate(-50%, -50%)"
            w={450}
            maxW="90dvw"
          >
            <Heading fontWeight={400}>No favorites added yet!</Heading>
            <Text mt={4} fontWeight={500} fontSize={18}>
              Oops! It looks like your favorites list is empty. Browse our
              selection of games and add your favorites here!
            </Text>
          </Box>
        </Center>
      )}
    </div>
  );
};

export default FavoritesList;
