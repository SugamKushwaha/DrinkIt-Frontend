const KEYS = {
  vendorRequests: "drinkit-vendor-requests",
  vendors: "drinkit-vendors",

  deliveryRequests: "drinkit-delivery-requests",
  deliveryPartners: "drinkit-delivery-partners",

  products: "drinkit-admin-products",

  admins: "drinkit-admins",

  users: "drinkit-users",
};

// ------------------------------------
// GENERIC STORAGE
// ------------------------------------

const getData = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${key}`, error);
    return fallback;
  }
};

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));

  window.dispatchEvent(
    new CustomEvent("drinkit-admin-data-updated", {
      detail: {
        key,
        data,
      },
    })
  );
};

// ------------------------------------
// VENDOR REQUESTS
// ------------------------------------

export const getVendorRequests = () =>
  getData(KEYS.vendorRequests);

export const saveVendorRequests = (requests) =>
  saveData(KEYS.vendorRequests, requests);

export const addVendorRequest = (request) => {
  const requests = getVendorRequests();

  const newRequest = {
    id: `VR-${Date.now()}`,
    ...request,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  saveVendorRequests([...requests, newRequest]);

  return newRequest;
};

// ------------------------------------
// VENDORS
// ------------------------------------

export const getVendors = () =>
  getData(KEYS.vendors);

export const saveVendors = (vendors) =>
  saveData(KEYS.vendors, vendors);

export const addVendor = (vendor) => {
  const vendors = getVendors();

  const newVendor = {
    id: `VEN-${Date.now()}`,
    ...vendor,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };

  saveVendors([...vendors, newVendor]);

  return newVendor;
};

// ------------------------------------
// DELIVERY REQUESTS
// ------------------------------------

export const getDeliveryRequests = () =>
  getData(KEYS.deliveryRequests);

export const saveDeliveryRequests = (requests) =>
  saveData(KEYS.deliveryRequests, requests);

export const addDeliveryRequest = (request) => {
  const requests = getDeliveryRequests();

  const newRequest = {
    id: `DR-${Date.now()}`,
    ...request,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  saveDeliveryRequests([...requests, newRequest]);

  return newRequest;
};

// ------------------------------------
// DELIVERY PARTNERS
// ------------------------------------

export const getDeliveryPartners = () =>
  getData(KEYS.deliveryPartners);

export const saveDeliveryPartners = (partners) =>
  saveData(KEYS.deliveryPartners, partners);

export const addDeliveryPartner = (partner) => {
  const partners = getDeliveryPartners();

  const newPartner = {
    id: `DP-${Date.now()}`,
    ...partner,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };

  saveDeliveryPartners([...partners, newPartner]);

  return newPartner;
};

// ------------------------------------
// PRODUCTS
// ------------------------------------

export const getAdminProducts = () =>
  getData(KEYS.products);

export const saveAdminProducts = (products) =>
  saveData(KEYS.products, products);

export const addAdminProduct = (product) => {
  const products = getAdminProducts();

  const newProduct = {
    id: `PROD-${Date.now()}`,
    ...product,
    active: true,
    createdAt: new Date().toISOString(),
  };

  saveAdminProducts([...products, newProduct]);

  return newProduct;
};

export const updateAdminProduct = (id, updates) => {
  const products = getAdminProducts();

  const updatedProducts = products.map((product) =>
    product.id === id
      ? {
          ...product,
          ...updates,
        }
      : product
  );

  saveAdminProducts(updatedProducts);

  return updatedProducts;
};

export const deleteAdminProduct = (id) => {
  const products = getAdminProducts();

  const updatedProducts = products.filter(
    (product) => product.id !== id
  );

  saveAdminProducts(updatedProducts);

  return updatedProducts;
};

// ------------------------------------
// ADMINS
// ------------------------------------

export const getAdmins = () =>
  getData(KEYS.admins);

export const saveAdmins = (admins) =>
  saveData(KEYS.admins, admins);

export const addAdmin = (admin) => {
  const admins = getAdmins();

  const newAdmin = {
    id: `ADM-${Date.now()}`,
    ...admin,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };

  saveAdmins([...admins, newAdmin]);

  return newAdmin;
};

// ------------------------------------
// USERS
// ------------------------------------

export const getUsers = () =>
  getData(KEYS.users);

export const saveUsers = (users) =>
  saveData(KEYS.users, users);