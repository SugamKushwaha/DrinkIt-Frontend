import api from "./axios";

/**
 * REGISTER
 */
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
  });

  return response.data;
};

/**
 * LOGIN
 */
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", {
    email: data.email,
    password: data.password,
  });

  return response.data;
};

/**
 * CURRENT LOGGED-IN USER
 */
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

/**
 * LOGOUT
 */
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};