import React, { useEffect, useState } from "react";
import { getGameAdditions, getGameDetails } from "../api/GlobalApi";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Img,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import Rating from "../Components/Fragments/Rating";
import Return from "../Components/Fragments/Return";
import { GameProps } from "../types/globalTypes";

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [game, setGame] = useState<GameProps | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const gameId = parseInt(id, 10); // Convertendo id para número
          if (!isNaN(gameId)) {
            const data = await getGameDetails(gameId);
            console.log(data);

            const additions = await getGameAdditions(gameId);
            console.log(additions);
            setGame(data);
          } else {
            console.error("ID inválido:", id);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Jogo:", error);
      }
    };

    fetchData();
  }, [id]);

  const shortenedDescription = (description: string | undefined) => {
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

  if (!id) {
    return null; // Ou qualquer lógica para lidar com id undefined, como redirecionar para página de erro
  }

  return (
    <>
      <Return />
      <Flex
        w="auto"
        maxW="95dvw"
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
            <Heading size="md" fontWeight={400}>
              Developers:
            </Heading>
            <Flex flexWrap="wrap" gap={1}>
              {game?.developers?.map((developer, index) => (
                <Tag
                  m="0 2px"
                  bgColor="blue.900"
                  color="common.100"
                  mt={2}
                  key={index}
                  width="auto"
                >
                  {developer.name}
                </Tag>
              ))}
            </Flex>
          </Grid>

          <Grid my={4}>
            <Heading size="md" fontWeight={400}>
              Platforms:
            </Heading>
            <Flex flexWrap="wrap" gap={1}>
              {game?.platforms?.map((platform, index) => (
                <Tag
                  m="0 2px"
                  bgColor="blue.900"
                  color="common.100"
                  mt={2}
                  key={index}
                  width="auto"
                >
                  {platform.platform.name}
                </Tag>
              ))}
            </Flex>
          </Grid>

          <Grid my={4}>
            <Heading size="md" fontWeight={400}>
              Stores:
            </Heading>
            <Flex flexWrap="wrap" gap={1}>
              {game?.stores?.map((store, index) => (
                <Tag
                  m="0 2px"
                  bgColor="blue.900"
                  color="common.100"
                  mt={2}
                  key={index}
                  width="auto"
                >
                  {store.store.name}
                </Tag>
              ))}
            </Flex>
          </Grid>

          <Text fontWeight={500} mt={2}>
            Released: {game?.released}
          </Text>
          <Rating rating={game?.rating ?? 0} />
          <Link
            href={game?.website}
            target="_blank"
            w={135}
            color="blue.50"
            bg="blue.800"
            p={2}
            borderRadius="5px"
            mt={2}
          >
            Official Website
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default GameDetails;
