// Get cart from localStorage
export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("drinkit-cart")) || [];
  } catch (error) {
    return [];
  }
};


// Save cart to localStorage
export const saveCart = (cart) => {
  localStorage.setItem(
    "drinkit-cart",
    JSON.stringify(cart)
  );

  // Tell Navbar and other components that cart changed
  window.dispatchEvent(new Event("cartUpdated"));
};


// Add product to cart
export const addToCart = (product) => {
  const cart = getCart();

  const existingProduct = cart.find(
    (item) => String(item.id) === String(product.id)
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1,
    });

  }

  saveCart(cart);

  return cart;
};


// Remove product
export const removeFromCart = (productId) => {
  const cart = getCart();

  const updatedCart = cart.filter(
    (item) => String(item.id) !== String(productId)
  );

  saveCart(updatedCart);
};


// Update quantity
export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();

  const updatedCart = cart.map((item) =>
    String(item.id) === String(productId)
      ? {
          ...item,
          quantity: Math.max(1, quantity),
        }
      : item
  );

  saveCart(updatedCart);
};


// Get total quantity
export const getCartCount = () => {
  const cart = getCart();

  return cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
};
