import { useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.rawg.io/api/";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchData = async (urlParams: string) => {
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

const getGameDetails = async (id: number) => {
    try {
      const response = await axios.get(
        `${BASE_URL}games/${id}?key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os dados:", error);
      throw error;
    }
};

const getGameGenres = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}genres?key=${API_KEY}`
        );
        return response.data;
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados:", error);
        throw error;
      }
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
  getGameDetails,
  getGameGenres,
  getTopRatedGames,
  getBestSellingGames,
};
