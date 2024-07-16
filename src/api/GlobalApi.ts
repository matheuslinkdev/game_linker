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

const getAllGames = async () => {
  return await fetchData("");
};

const getGameDetails = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}games/${id}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os dados:", error);
    throw error;
  }
};

const searchGame = async (term: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}games?key=${API_KEY}&search=${term}?ordering=-metacritic&search_exact=false&search_precise=false`
    );
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os dados:", error);
    throw error;
  }
};

const getGameAdditions = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}games/${id}/additions?key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os dados:", error);
    throw error;
  }
};

const getGameGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}genres?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os dados:", error);
    throw error;
  }
};

const getGamesByGenre = async (genreId: string, page = 1, pageSize = 20) => {
  try {
    const response = await axios.get(
      `${BASE_URL}games?key=${API_KEY}&genres=${genreId}&page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os jogos por gênero:", error);
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
  getAllGames,
  getGameDetails,
  getGameGenres,
  getTopRatedGames,
  getBestSellingGames,
  getGameAdditions,
  searchGame,
  getGamesByGenre,
};
