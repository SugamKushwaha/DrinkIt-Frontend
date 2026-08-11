const WISHLIST_KEY = "drinkit-wishlist";

// Get wishlist
export const getWishlist = () => {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
};

// Check if product is wishlisted
export const isWishlisted = (productId) => {
  const wishlist = getWishlist();

  return wishlist.some(
    (id) => String(id) === String(productId)
  );
};

// Add product
export const addToWishlist = (productId) => {
  const wishlist = getWishlist();

  if (!isWishlisted(productId)) {
    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify([...wishlist, productId])
    );
  }
};

// Remove product
export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();

  const updatedWishlist = wishlist.filter(
    (id) => String(id) !== String(productId)
  );

  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(updatedWishlist)
  );
};

// Toggle product
export const toggleWishlist = (productId) => {
  if (isWishlisted(productId)) {
    removeFromWishlist(productId);
    return false;
  }

  addToWishlist(productId);
  return true;
};