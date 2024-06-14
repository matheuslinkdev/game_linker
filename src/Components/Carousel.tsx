import { Center, Flex, Heading, Image, Skeleton, Text } from "@chakra-ui/react";
import { getBestSellingGames } from "../api/GlobalApi";
import React, { useEffect, useState } from "react";

interface CarouselProps {
  background_image?: string;
}

const Carousel: React.FC<CarouselProps> = () => {
  const [carouselGames, setCarouselGames] = useState<
    { background_image?: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellingGames = async () => {
      try {
        const response = await getBestSellingGames();
        const data = response.results;

        const shuffledData = data.sort(() => 0.5 - Math.random());
        const selectedItems = shuffledData.slice(0, 10);

        setCarouselGames(selectedItems);
        setIsLoading(false); // Set isLoading to false when data is fetched
      } catch (error) {
        console.error("Erro ao buscar jogos mais vendidos:", error);
      }
    };

    fetchBestSellingGames();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = (currentIndex + 1) % carouselGames.length;
      setCurrentIndex(newIndex);
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex, carouselGames]);

  return (
    <Center w="100%" h="auto" bgColor="common.900" position="relative">
      {isLoading ? ( // Render skeletons if isLoading is true
        <Skeleton w="700px" h="400px" maxH="50dvh" />
      ) : (
        <Center>
          <Image
            src={carouselGames[currentIndex]?.background_image}
            w="100dvw"
            maxWidth="100%"
            h="600px"
            maxH={{ base: "30dvh", md: "70dvh" }}
            objectFit="cover"
          />
        </Center>
      )}
      {!isLoading && ( // Render carousel heading if isLoading is false
        <Flex
          position="absolute"
          bgColor="#151515cc"
          h="100%"
          w="100%"
          top={0}
          left={0}
          alignItems="start"
          p={{ base: 8, md: 24 }}
          flexDir="column"
          justifyContent="center"
          textAlign="start"
        >
          <Heading color="common.50" fontWeight={400} mb={1}>
            GameLinker
          </Heading>
          <Text w={400} fontWeight={500} maxW="95%">
            Discover the latest and most popular games, explore various genres,
            and find your next favorite game today. Enjoy browsing!
          </Text>
        </Flex>
      )}
    </Center>
  );
};

export default Carousel;
