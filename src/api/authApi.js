import api from "./axios";

// ==========================================
// LOGIN
// ==========================================

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", {
    email: data.email.trim().toLowerCase(),
    password: data.password,
  });

  return response.data;
};

// ==========================================
// REGISTER
// ==========================================

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    password: data.password,
  });

  return response.data;
};

// ==========================================
// CURRENT USER
// ==========================================

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

// ==========================================
// LOGOUT
// ==========================================

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};