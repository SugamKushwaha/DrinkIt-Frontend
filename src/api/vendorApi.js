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