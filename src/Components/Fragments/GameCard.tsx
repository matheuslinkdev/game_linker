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
} from "@chakra-ui/react";
import GameModal from "../Layout/GameModal";
import { Link } from "react-router-dom";
import { useGame } from "../../Context/GameContext";

const GameCard = ({ games }) => {
  const isLoading = games.length === 0;

  return (
    <>
      {isLoading
        ? // Render skeletons if games are still loading
          Array(3)
            .fill()
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
          games.map((game) => (
            <Card maxW="sm" key={game.name} bgColor="blue.400">
              <CardBody>
                <Image
                  src={game.background_image}
                  alt={`${game.name} Background Image`}
                  borderRadius="lg"
                  width="100%"
                  height="200px"
                  objectFit="cover"
                  transition="all .2s linear"
                  _hover={{ transform: "scale(1.05)" }}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md" fontWeight={400}>
                    {game.name}
                  </Heading>
                  <Flex>
                    {game.genres.map((genre) => (
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
              <CardFooter>
                <Flex
                  width={180}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Link to={`/games/${game.id}`}>See More</Link>
                  <GameModal targetGame={game} />
                </Flex>
              </CardFooter>
            </Card>
          ))}
    </>
  );
};

export default GameCard;
