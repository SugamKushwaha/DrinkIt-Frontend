import api from "./axios";

// =====================================================
// CUSTOMER - GET ACTIVE CATEGORIES
// GET /api/categories
//
// NOTE: The backend does not currently expose a
// customer-facing "/api/categories" endpoint — only
// admin endpoints under "/api/admin/categories" exist
// right now (see AdminCategoryController). This function
// is kept here for when that endpoint is added, but it
// will 404 until then. Nothing in the app currently
// depends on it.
// =====================================================

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// =====================================================
// ADMIN - GET ALL CATEGORIES
// GET /api/admin/categories
// =====================================================

export const getAdminCategories = async () => {
  const response = await api.get("/admin/categories");
  return response.data;
};

// =====================================================
// ADMIN - GET CATEGORY BY NAME
// GET /api/admin/categories/by-name?name=...
//
// (The backend has no GET-by-id endpoint, only by-name.)
// =====================================================

export const getAdminCategoryByName = async (name) => {
  const response = await api.get("/admin/categories/by-name", {
    params: { name },
  });

  return response.data;
};

// =====================================================
// ADMIN - CREATE / REPLACE CATEGORY
// POST /api/admin/categories/upload
//
// Backend behavior (upsert by categoryName):
// - if a category with this name already exists,
//   its image is replaced in place
// - otherwise a brand-new category is created
//
// Both categoryName and image are REQUIRED by the
// backend on every call (there's no "image optional"
// path server-side).
// =====================================================

export const createCategory = async (categoryName, imageFile) => {
  const formData = new FormData();

  formData.append("categoryName", categoryName);
  formData.append("image", imageFile);

  const response = await api.post(
    "/admin/categories/upload",
    formData,
    {
      // The axios instance sets a default
      // "Content-Type: application/json" header.
      // Explicitly clearing it here lets the browser
      // set the correct "multipart/form-data; boundary=..."
      // header itself for this request.
      headers: { "Content-Type": undefined },
    }
  );

  return response.data;
};

// =====================================================
// ADMIN - UPDATE (REPLACE IMAGE) CATEGORY
//
// There is no rename/update-by-id endpoint on the
// backend — "updating" a category means re-uploading
// the SAME categoryName with a new image, which the
// backend matches and replaces in place.
//
// IMPORTANT: if categoryName is changed here, the
// backend will NOT find the old row — it will create a
// brand-new category instead of renaming the old one.
// Keep the category name locked while editing unless
// you also add a proper rename endpoint on the backend.
// =====================================================

export const updateCategory = async (categoryName, imageFile) => {
  return createCategory(categoryName, imageFile);
};

// =====================================================
// ADMIN - DELETE CATEGORY
// DELETE /api/admin/categories/{id}
// =====================================================

export const deleteCategory = async (id) => {
  const response = await api.delete(`/admin/categories/${id}`);
  return response.data;
};