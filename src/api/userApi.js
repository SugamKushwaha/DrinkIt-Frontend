import api from "./axios";

// ==========================================
// UPDATE CURRENT USER
// ==========================================

export const updateCurrentUser = async (data) => {

  const response = await api.put(
    "/users/me",
    data
  );

  return response.data;
};

// ==========================================
// SAVE ADDRESS
// ==========================================

export const saveAddress = async (addressData) => {

  const response = await api.post(
    "/users/addresses",
    addressData
  );

  return response.data;
};

// ==========================================
// GET USER ADDRESSES
// ==========================================

export const getAddresses = async () => {
  const response = await api.get(
    "/users/addresses"
  );

  return response.data;
};

// ==========================================
// UPDATE ADDRESS
// ==========================================

export const updateAddress = async (
  addressId,
  addressData
) => {

  const response = await api.put(
    `/users/addresses/${addressId}`,
    addressData
  );

  return response.data;
};

// ==========================================
// DELETE ADDRESS
// ==========================================

export const deleteAddress = async (addressId) => {

  const response = await api.delete(
    `/users/addresses/${addressId}`
  );

  return response.data;
};