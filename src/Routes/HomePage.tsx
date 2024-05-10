import Carousel from "../Components/Carousel";
import MostPopular from "./MostPopular";
import { Heading } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <>
      <Carousel/>
      <Heading m="auto" textAlign="center" my={10} fontWeight={400}>Most Popular Games:</Heading>
      <MostPopular/>
    </>
  );
};

export default HomePage;
