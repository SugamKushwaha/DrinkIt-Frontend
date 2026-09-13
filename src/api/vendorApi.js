import api from "./axios";

// =====================================================
// SUBMIT VENDOR APPLICATION
// =====================================================

export const submitVendorRequest = async (data) => {
  const response = await api.post("/vendor-requests", {
    businessName: data.businessName?.trim() || "",
    businessAddress: data.businessAddress?.trim() || "",
     businessType:data.businessType?.trim() ,
    city: data.city?.trim() || "",
    state: data.state?.trim() || "",
    pincode: data.pincode?.trim() || "",

    gstNumber: data.gstNumber?.trim() || "",
    licenseNumber: data.licenseNumber?.trim() || "",
  });

  return response.data;
};

// =====================================================
// GET MY VENDOR APPLICATION
// =====================================================

export const getMyVendorRequest = async () => {
  const response = await api.get("/vendor-requests/my");

  return response.data;
};



// =====================================================
// VENDOR PRODUCT
// =====================================================

export const getVendorProducts = async () => {

  const response =
    await api.get("/vendor/products");

  return response.data;
};


export const getVendorProduct = async (id) => {

  const response =
    await api.get(
      `/vendor/products/${id}`
    );

  return response.data;
};


export const addVendorProduct = async (
  product
) => {

  const response =
    await api.post(
      "/vendor/products",
      product
    );

  return response.data;
};


export const updateVendorProduct = async (
  id,
  product
) => {

  const response =
    await api.put(
      `/vendor/products/${id}`,
      product
    );

  return response.data;
};


export const deleteVendorProduct = async (
  id
) => {

  await api.delete(
    `/vendor/products/${id}`
  );
};


export const toggleVendorProductStatus =
  async (id) => {

    const response =
      await api.patch(
        `/vendor/products/${id}/toggle-status`
      );

    return response.data;
  };
