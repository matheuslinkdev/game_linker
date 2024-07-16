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
  Skeleton,
  Tag,
  Icon,
  Center,
} from "@chakra-ui/react";
import GameModal from "../Layout/GameModal";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useFavorites } from "../../Context/FavoritesContext";
import { GameProps, GenreProps } from "../../types/globalTypes";

type GamesProps ={
  games: GameProps[]
}

const GameCard = ({ games }: GamesProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isLoading = !games.length;

  const isFavorite = (game: GameProps) => {
    return favorites.some((fav) => fav.id === game.id);
  };

  const handleToggleFavorite = (game: GameProps) => {
    if (isFavorite(game)) {
      removeFavorite(game);
    } else {
      addFavorite(game);
    }
  };

  return (
    <>
      {isLoading
        ? // Render skeletons if games are still loading
          Array(3)
            .fill(null)
            .map((_, index) => (
              <Card maxW="sm" key={index} bgColor="blue.400">
                <Skeleton height="200px" />
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Skeleton height="20px" />
                    <Skeleton height="10px" />
                    <Flex alignItems="center">
                      <Skeleton height="20px" width="50%" mr="2" />
                      <Skeleton height="20px" width="30%" />
                    </Flex>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Skeleton height="30px" width="120px" />
                    <Skeleton height="30px" width="120px" />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))
        : // Render game cards when games are loaded
          games.map((game: GameProps) => (
            <Card
              w={370}
              maxW="95%"
              h={400}
              key={game.id}
              bgColor="blue.400"
              display="flex"
              flexDirection="column"
            >
              <Flex>
                <Image
                  src={
                    game.background_image ||
                    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                  }
                  alt={`${game.name} Background Image`}
                  width="100%"
                  height="200px"
                  objectFit="cover"
                />
              </Flex>
              <CardBody
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                flexGrow={1}
              >
                <Stack spacing="3">
                  <Heading size="md" fontWeight={400}>
                    {game.name}
                  </Heading>
                  <Flex flexWrap="wrap" gap={2}>
                    {game.genres.map((genre: GenreProps) => (
                      <Tag
                        m="0 2px"
                        bgColor="blue.900"
                        color="common.100"
                        mt={2}
                        key={genre.name}
                        width="auto"
                      >
                        {genre.name}
                      </Tag>
                    ))}
                  </Flex>
                  <Flex alignItems="center">
                    <Text
                      color="blue.700"
                      fontSize="xl"
                      fontWeight={500}
                      opacity="0.80"
                      textDecor="line-through"
                    >
                      $50
                    </Text>
                    <Text
                      color="blue.900"
                      fontSize="2xl"
                      fontWeight={500}
                      ml={2}
                    >
                      $25
                    </Text>
                  </Flex>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter
                position="absolute"
                bottom={0}
                alignItems="center"
                width="100%"
                justifyContent="space-between"
              >
                <Flex
                  width={180}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Link to={`/games/${game.id}`}>See More</Link>
                  <GameModal targetGame={game} />
                </Flex>
                <Center bg="blue.100" borderRadius="full" p={2}>
                  <Icon
                    as={isFavorite(game) ? IoMdHeart : IoMdHeartEmpty}
                    onClick={() => handleToggleFavorite(game)}
                    cursor="pointer"
                    color={isFavorite(game) ? "blue.800" : "blue.700"}
                  />
                </Center>
              </CardFooter>
            </Card>
          ))}
    </>
  );
};

export default GameCard;
