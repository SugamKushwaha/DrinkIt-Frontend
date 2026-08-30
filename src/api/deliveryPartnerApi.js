import api from "./axios";

// ======================================================
// SUBMIT DELIVERY PARTNER APPLICATION
// ======================================================

export const submitDeliveryPartnerRequest = async (data) => {
  const response = await api.post(
    "/delivery-partner-requests",
    {
      address: data.address?.trim() || "",
      city: data.city?.trim() || "",
      state: data.state?.trim() || "",
      pincode: data.pincode?.trim() || "",

      vehicleType:
        data.vehicleType?.trim() || "",

      vehicleNumber:
        data.vehicleNumber?.trim() || "",

      drivingLicenseNumber:
        data.drivingLicenseNumber?.trim() || "",

      aadhaarNumber:
        data.aadhaarNumber?.trim() || "",
    }
  );

  return response.data;
};

// ======================================================
// GET CURRENT USER DELIVERY PARTNER APPLICATION
// ======================================================

export const getMyDeliveryPartnerRequest = async () => {
  const response = await api.get(
    "/delivery-partner-requests/my"
  );

  return response.data;
};