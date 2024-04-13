import { useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.rawg.io/api/";
const API_KEY = "54e082f6d8c44317ba8b367c1f0b9051";

const fetchData = async (urlParams) => {
  try {
    const response = await axios.get(
      `${BASE_URL}games?key=${API_KEY}${urlParams}`
    );
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os dados:", error);
    throw error;
  }
};

const useFetchData = (callback) => {
  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const data = await callback();
        console.log("Dados recebidos:", data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchDataWrapper();
  }, [callback]);
};

const getAllGames = async () => {
  return await fetchData("");
};

const getGamesByGenre = async (genreId) => {
  return await fetchData(`&genres=${genreId}`);
};

const getTopRatedGames = async () => {
  return await fetchData("&ordering=-rating");
};

const getBestSellingGames = async () => {
  return await fetchData("&ordering=-ratings_count");
};

export {
  useFetchData,
  getAllGames,
  getGamesByGenre,
  getTopRatedGames,
  getBestSellingGames,
};
