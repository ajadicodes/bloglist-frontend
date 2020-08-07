import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const create = async (newBlogPost) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newBlogPost, config);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
};

export default { getAll, create, setToken };
