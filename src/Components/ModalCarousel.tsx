import { Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ModalCarousel = ({ game }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar se a imagem está expandida

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % game.short_screenshots.length
      );
    }, 5000);

    return () => clearInterval(timer); // Limpa o intervalo quando o componente é desmontado ou o currentIndex muda
  }, [game]);

  const handleImageClick = () => {
    // Alterna entre expandido e não expandido ao clicar na imagem
    setIsExpanded(!isExpanded);
  };

  return (
    <Center>
      <Center
        position={isExpanded ? "absolute" : "relative"}
        objectFit="contain" // Mantém a proporção da imagem sem distorcê-la
        transition="all .4s ease"
        cursor={isExpanded ? "zoom-out" : "zoom-in"}
        zIndex={10000}
        onClick={handleImageClick}
      >
        <Button
          position="absolute"
          onClick={() => setIsExpanded(false)}
          display={isExpanded ? "block" : "none"}
          top={0}
          right={0}
          h={5}
          w={5}
          borderRadius="full"
          bgColor="#a70d0d95"
          color="common.100"
          _hover={{bgColor: "#a70d0d"}}
        >
          X
        </Button>
        <Image
          m="auto"
          maxW={isExpanded ? "60dvw" : "100%"}
          maxH={isExpanded ? "60dvh" : "100%"}
          src={game.short_screenshots[currentIndex]?.image}
          borderRadius={10}
        />
      </Center>
    </Center>
  );
};

export default ModalCarousel;
