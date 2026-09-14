import api from "./axios";

// =====================================================
// CUSTOMER
// =====================================================

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// =====================================================
// ADMIN
// =====================================================

export const getAdminCategories = async () => {
  const response = await api.get("/categories/admin");
  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post(
    "/categories/admin",
    data
  );

  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await api.put(
    `/categories/admin/${id}`,
    data
  );

  return response.data;
};

export const deleteCategory = async (id) => {
  await api.delete(
    `/categories/admin/${id}`
  );
};