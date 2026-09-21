import api from "./axios";

// =====================================================
// CUSTOMER
// =====================================================

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

// =====================================================
// ADMIN - GET ALL
// =====================================================

export const getAdminCategories = async () => {
  const response = await api.get("/categories/admin");

  return response.data;
};

// =====================================================
// ADMIN - GET ONE
// =====================================================

export const getAdminCategory = async (id) => {
  const response = await api.get(
    `/categories/admin/${id}`
  );

  return response.data;
};

// =====================================================
// ADMIN - CREATE
// =====================================================

export const createCategory = async (formData) => {
  const response = await api.post(
    "/categories/admin",
    formData
  );

  return response.data;
};

// =====================================================
// ADMIN - UPDATE
// =====================================================

export const updateCategory = async (
  id,
  formData
) => {
  const response = await api.put(
    `/categories/admin/${id}`,
    formData
  );

  return response.data;
};

// =====================================================
// ADMIN - DELETE
// =====================================================

export const deleteCategory = async (id) => {
  await api.delete(
    `/categories/admin/${id}`
  );
};