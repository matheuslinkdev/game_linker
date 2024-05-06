import Carousel from "../Components/Carousel";
import MostPopular from "./MostPopular";
import { Heading } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <>
      <Carousel/>
      <Heading>Most Popular Games:</Heading>
      <MostPopular/>
    </>
  );
};

export default HomePage;
