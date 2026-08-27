import api from "./axios";

// ==========================================
// ADMIN - GET PENDING VENDOR REQUESTS
// ==========================================

export const getVendorRequests = async () => {
  const response = await api.get("/admin/vendor-requests");

  return response.data;
};

// ==========================================
// ADMIN - GET SINGLE VENDOR REQUEST
// ==========================================

export const getVendorRequest = async (id) => {
  const response = await api.get(
    `/admin/vendor-requests/${id}`
  );

  return response.data;
};

// ==========================================
// ADMIN - APPROVE VENDOR REQUEST
// ==========================================

export const approveVendorRequest = async (id) => {
  const response = await api.put(
    `/admin/vendor-requests/${id}/approve`
  );

  return response.data;
};

// ==========================================
// ADMIN - REJECT VENDOR REQUEST
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
// VENDOR - APPLY
// ==========================================

export const applyVendorRequest = async (data) => {
  const response = await api.post(
    "/vendor-requests",
    data
  );

  return response.data;
};

// ==========================================
// VENDOR - GET MY REQUEST
// ==========================================

export const getMyVendorRequest = async () => {
  const response = await api.get(
    "/vendor-requests/my"
  );

  return response.data;
};