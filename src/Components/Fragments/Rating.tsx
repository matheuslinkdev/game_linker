import { Flex, Text } from "@chakra-ui/react";
import { FaStar, FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({ rating }) => {
  const stars = [];

  // Arredondando a avaliação para o número mais próximo
  const roundedRating = Math.round(rating * 2) / 2;

  // Adicionando estrelas cheias, meias e vazias com base na avaliação
  for (let i = 1; i <= 5; i++) {
    if (roundedRating >= i) {
      stars.push(<FaStar key={i} />);
    } else if (roundedRating + 0.5 === i) {
      stars.push(<FaRegStarHalfStroke key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" w="140px" fontWeight={500} mt={2}>
      <Text color="common.900">Rating: </Text>
      <Flex color="yellow.300">{stars} </Flex>
    </Flex>
  );
};

export default Rating;
