// =====================================================
// CALCULATE CART TOTALS
// =====================================================

export const calculateCartTotals = (cartItems = []) => {

  // ===================================================
  // SUBTOTAL
  // ===================================================

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
      Number(item.quantity || 0),
    0
  );

  // ===================================================
  // DELIVERY FEE
  // ===================================================

  const deliveryFee =
    subtotal >= 999
      ? 0
      : 50;

  // ===================================================
  // DISCOUNT
  // ===================================================

  // 5% discount for orders of ₹3000+
  const discount =
    subtotal >= 3000
      ? Math.round(subtotal * 0.05)
      : 0;

  // ===================================================
  // FINAL TOTAL
  // ===================================================

  const total =
    subtotal +
    deliveryFee -
    discount;

  // ===================================================
  // RETURN
  // ===================================================

  return {
    subtotal,
    deliveryFee,
    discount,
    total,
  };
};