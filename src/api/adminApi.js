import api from "./axios";

// ==========================================
// GET ALL CUSTOMERS
// ==========================================

export const getUsers = async () => {
  const response = await api.get("/admin/users");

  return response.data;
};