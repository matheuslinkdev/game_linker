import Carousel from "../Components/Carousel";
import MostPopular from "./MostPopular";
import { Flex, Heading } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Flex flexDir="column" mt="10dvh">
      <Carousel/>
      <Heading m="auto" textAlign="center" my={10} fontWeight={400}>Most Popular Games:</Heading>
      <MostPopular/>
    </Flex>
  );
};

export default HomePage;
