import api from "./axios";

// ==========================================
// GET ALL CUSTOMERS
// ==========================================

export const getUsers = async () => {
  const response = await api.get("/admin/users");

  return response.data;
};


// ==========================================
// GET ALL VENDORS
// ==========================================

export const getVendors = async () => {
  const response = await api.get("/admin/vendors");

  return response.data;
};

// ==========================================
// GET ALL VENDOR REQUESTS
// ==========================================

export const getVendorRequests = async () => {
  const response = await api.get("/admin/vendor-requests");

  return response.data;
};

// ==========================================
// GET SINGLE VENDOR REQUEST
// ==========================================

export const getVendorRequest = async (id) => {
  const response = await api.get(
    `/admin/vendor-requests/${id}`
  );

  return response.data;
};

// ==========================================
// APPROVE VENDOR REQUEST
// ==========================================

export const approveVendorRequest = async (id) => {
  const response = await api.put(
    `/admin/vendor-requests/${id}/approve`
  );

  return response.data;
};

// ==========================================
// REJECT VENDOR REQUEST
// ==========================================

export const rejectVendorRequest = async (
  id,
  reason
) => {
  const response = await api.put(
    `/admin/vendor-requests/${id}/reject`,
    null,
    {
      params: {
        reason,
      },
    }
  );

  return response.data;
};

// ==========================================
// GET APPROVED VENDOR
// ==========================================

export const getVendor = async (id) => {

  const response = await api.get(
    `/admin/vendors/${id}`
  );

  return response.data;
};
