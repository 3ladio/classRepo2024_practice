import {api} from './index'

const getGames = async (searchQuery = "") => {
  const response = await api.get("api/games", {
    params: { search: searchQuery },
  });
  return response.data;
};

const getMonthlyGames = async () => {
  const response = await api.get("api/monthly");
  return response.data;
};

const getGameTagz = async (id) => {
  const response = await api.get(`api/getTags/${id}`);
  return response.data;
};

export { getGames, getMonthlyGames, getGameTagz };