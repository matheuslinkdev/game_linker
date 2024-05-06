import { Link } from "react-router-dom";
import Carousel from "../Components/Carousel";

const HomePage = () => {
  return (
    <>
      <Carousel/>
      <Link to="/mostpopular">Mais Populares</Link>
    </>
  );
};

export default HomePage;
