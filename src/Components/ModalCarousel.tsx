import { Center, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface GameProps {
  game: {
    short_screenshots: { image: string }[];
  };
}

const ModalCarousel = ({ game }: GameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % game.short_screenshots.length
      );
    }, 5000);

    return () => clearInterval(timer); // Limpa o intervalo quando o componente é desmontado ou o currentIndex muda
  }, [game]);

  return (
    <Center>
      <Center
        objectFit="contain" // Mantém a proporção da imagem sem distorcê-la
        transition="all .4s ease"
        zIndex={10000}
      >
        <Image
          m="auto"
          src={game.short_screenshots[currentIndex]?.image}
          borderRadius={10}
        />
      </Center>
    </Center>
  );
};

export default ModalCarousel;
