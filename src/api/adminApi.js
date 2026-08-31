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


// =====================================================
// GET DELIVERY PARTNER REQUESTS
// =====================================================


// ==========================================
// GET ALL DELIVERY PARTNERS
// ==========================================

export const getDeliveryPartners =
  async () => {

    const response = await api.get(
      "/admin/delivery-partners"
    );

    return response.data;
  };


// ==========================================
// GET DELIVERY PARTNER BY ID
// ==========================================

export const getDeliveryPartnerById =
  async (id) => {

    const response = await api.get(
      `/admin/delivery-partners/${id}`
    );

    return response.data;
  };

  
export const getDeliveryPartnerRequests = async () => {
  const response = await api.get(
    "/admin/delivery-partner-requests"
  );

  return response.data;
};


// =====================================================
// GET DELIVERY PARTNER REQUEST BY ID
// =====================================================

export const getDeliveryPartnerRequestById = async (id) => {
  const response = await api.get(
    `/admin/delivery-partner-requests/${id}`
  );

  return response.data;
};


// =====================================================
// APPROVE DELIVERY PARTNER
// =====================================================

export const approveDeliveryPartner = async (id) => {
  const response = await api.put(
    `/admin/delivery-partner-requests/${id}/approve`
  );

  return response.data;
};


// =====================================================
// REJECT DELIVERY PARTNER
// =====================================================

export const rejectDeliveryPartner = async (
  id,
  reason
) => {
  const response = await api.put(
    `/admin/delivery-partner-requests/${id}/reject`,
    null,
    {
      params: {
        reason,
      },
    }
  );

  return response.data;
};