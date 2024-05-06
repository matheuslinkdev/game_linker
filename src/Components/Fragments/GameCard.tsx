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
  Button,
  Skeleton,
} from "@chakra-ui/react";
import GameModal from "../Layout/GameModal";

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
                  alt="Green double couch with wooden legs"
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
                  <Text display={{ base: "none", md: "block" }}>
                    Rawg Io API, does not provide a game description. So check my GitHub: matheuslinkdev
                  </Text>
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
                <ButtonGroup spacing="2">
                  <GameModal targetGame={game} />
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
    </>
  );
};

export default GameCard;
