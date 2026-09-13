import api from "./axios";

// ==========================================
// GET ALL PRODUCT IMAGES
// ==========================================

export const getAllProductImages = async () => {
  const response = await api.get(
    "/admin/product-images"
  );

  return response.data;
};

// ==========================================
// GET IMAGE BY PRODUCT NAME
// ==========================================

export const getProductImage = async (
  productName
) => {
  const response = await api.get(
    "/products/image",
    {
      params: {
        name: productName,
      },
    }
  );

  return response.data;
};

// ==========================================
// ADMIN UPLOAD / REPLACE IMAGE
// ==========================================

export const uploadProductImage = async (
  productName,
  image
) => {
  const formData = new FormData();

  formData.append(
    "productName",
    productName
  );

  formData.append(
    "image",
    image
  );

  const response = await api.post(
    "/admin/product-images/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==========================================
// ADMIN DELETE IMAGE
// ==========================================

export const deleteProductImage = async (
  id
) => {
  await api.delete(
    `/admin/product-images/${id}`
  );
};