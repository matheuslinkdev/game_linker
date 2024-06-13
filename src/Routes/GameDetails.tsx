import { useEffect, useState } from "react";
import { getGameAdditions, getGameDetails } from "../api/GlobalApi";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Img,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useGame } from "../Context/GameContext";
import Rating from "../Components/Fragments/Rating";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameDetails(id);
        console.log(data);

        const additions = await getGameAdditions(id)
        console.log(additions)
        setGame(data);
      } catch (error) {
        console.error("Erro ao buscar dados do Jogo:", error);
      }
    };

    fetchData();
  }, [id]);

  const shortenedDescription = (description) => {
    if (!description) return "";

    let countDots = 0;
    let index = 0;

    while (countDots < 4 && index < description.length) {
      if (description[index] === ".") {
        countDots++;
      }
      index++;
    }

    return description.substring(0, index);
  };
  return (
    <>
      <Flex
        w="95%"
        margin="auto"
        bg="blue.600"
        borderRadius="15px"
        p={4}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box ml={2} maxWidth="100%" flexDir="column">
          <Img
            src={game?.background_image}
            objectFit="cover"
            width="500px"
            maxWidth="100%"
            height="auto"
            borderRadius={5}
          />
          <Text width="500px" maxWidth="100%" fontWeight={500} mt={2}>
            {shortenedDescription(game?.description_raw)}
          </Text>
        </Box>

        <Box ml={2} maxWidth="100%" flexDir="column">
          <Grid my={4}>
            <Heading size="lg" fontWeight={400}>Developers:</Heading>
            <Flex>
              {game?.developers?.map((developer, index) => {
                return (
                  <Tag
                    m="0 2px"
                    bgColor="blue.900"
                    color="common.100"
                    mt={2}
                    key={index}
                    width="auto"
                  >
                    {developer?.name}
                  </Tag>
                );
              })}
            </Flex>
          </Grid>
      
          <Grid my={4}>
            <Heading size="lg" fontWeight={400}>Platforms:</Heading>
            <Flex>
              {game?.platforms?.map((platform, index) => {
                return (
                  <Tag
                    m="0 2px"
                    bgColor="blue.900"
                    color="common.100"
                    mt={2}
                    key={index}
                    width="auto"
                  >
                    {platform.platform?.name}
                  </Tag>
                );
              })}
            </Flex>
          </Grid>
          <Grid my={4}>
            <Heading size="lg" fontWeight={400}>Stores:</Heading>
            <Flex>
              {game?.stores?.map((store, index) => {
                return (
                  <Tag
                    m="0 2px"
                    bgColor="blue.900"
                    color="common.100"
                    mt={2}
                    key={index}
                    width="auto"
                  >
                    {store.store?.name}
                  </Tag>
                );
              })}
            </Flex>
          </Grid>

          <Text>Released: {game?.released}</Text>
          
        <Link href={game?.website} target="_blank" color="blue.50" bg="blue.800" p={2} borderRadius="10px">Official Website</Link>

          <Rating rating={game?.rating} />
        </Box>
      </Flex>
    </>
  );
};

export default GameDetails;
