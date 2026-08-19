import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export const loginApi = async (data) => {

  const response = await API.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const registerApi = async (data) => {

  const response = await API.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const getCurrentUserApi = async () => {

  const response = await API.get(
    "/auth/me"
  );

  return response.data;
};

export const logoutApi = async () => {

  const response = await API.post(
    "/auth/logout"
  );

  return response.data;
};

export default API;