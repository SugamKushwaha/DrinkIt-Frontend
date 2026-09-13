import api from "./axios";


// =====================================================
// ADMIN
// =====================================================

export const getAdminProducts = async () => {

  const response =
    await api.get("/admin/products");

  return response.data;
};


export const getAdminProduct = async (id) => {

  const response =
    await api.get(`/admin/products/${id}`);

  return response.data;
};


export const addAdminProduct = async (product) => {

  const response =
    await api.post(
      "/admin/products",
      product
    );

  return response.data;
};


export const updateAdminProduct = async (
  id,
  product
) => {

  const response =
    await api.put(
      `/admin/products/${id}`,
      product
    );

  return response.data;
};


export const deleteAdminProduct = async (
  id
) => {

  await api.delete(
    `/admin/products/${id}`
  );
};


export const toggleAdminProductStatus = async (
  id
) => {

  const response =
    await api.patch(
      `/admin/products/${id}/toggle-status`
    );

  return response.data;
};

// =====================================================
// ADMIN PRODUCT IMAGE
// =====================================================

export const uploadProductImage = async (
  productName,
  imageFile
) => {

  const formData = new FormData();

  formData.append(
    "productName",
    productName
  );

  formData.append(
    "image",
    imageFile
  );


  const response =
    await api.post(
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


// =====================================================
// GET PRODUCT IMAGE
// =====================================================

export const getProductImage = async (
  productName
) => {

  const response =
    await api.get(
      "/products/image",
      {
        params: {
          name: productName,
        },
      }
    );

  return response.data;
};



// =====================================================
// CUSTOMER
// =====================================================

export const getProducts = async () => {

  const response =
    await api.get("/products");

  return response.data;
};


export const getProduct = async (id) => {

  const response =
    await api.get(`/products/${id}`);

  return response.data;
};


export const getProductsByCategory =
  async (category) => {

    const response =
      await api.get(
        `/products/category/${category}`
      );

    return response.data;
  };