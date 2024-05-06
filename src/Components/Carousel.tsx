import { Center, Heading, Image, Skeleton } from "@chakra-ui/react";
import { getBestSellingGames } from "../api/GlobalApi";
import { useEffect, useState } from "react";

const Carousel = () => {
  const [carouselGames, setCarouselGames] = useState([]);
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
    <Center w="100%" h="100%" bgColor="common.900" position="relative">
      {isLoading ? ( // Render skeletons if isLoading is true
        <Skeleton w="700px" h="400px" maxH="50dvh" />
      ) : (
        <Center>
          <Image
            src={carouselGames[currentIndex]?.background_image}
            w="700px"
            maxWidth="100%"
            h="400px"
            maxH="50dvh"
            objectFit="cover"
          />
        </Center>
      )}
      {!isLoading && ( // Render carousel heading if isLoading is false
        <Center
          position="absolute"
          bgColor="#25252587"
          h="100%"
          w="100%"
          top={0}
          left={0}
        >
          <Heading
            color="common.100"
            position="absolute"
            bottom={0}
            fontWeight={400}
          >
            {carouselGames[currentIndex]?.name}
          </Heading>
        </Center>
      )}
    </Center>
  );
};

export default Carousel;
