const ORDERS_KEY = "drinkit_orders";

/**
 * Get all orders
 */
export const getOrders = () => {
  try {
    const data = localStorage.getItem(ORDERS_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting orders:", error);
    return [];
  }
};

/**
 * Get one order by ID
 */
export const getOrderById = (orderId) => {
  const orders = getOrders();

  return orders.find(
    (order) => String(order.id) === String(orderId)
  );
};

/**
 * Get latest order
 */
export const getLatestOrder = () => {
  const orders = getOrders();

  return orders.length ? orders[0] : null;
};

/**
 * Save order
 */
export const saveOrder = (order) => {
  try {
    const existingOrders = getOrders();

    const updatedOrders = [
      order,
      ...existingOrders.filter(
        (item) => String(item.id) !== String(order.id)
      ),
    ];

    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(updatedOrders)
    );

    return order;
  } catch (error) {
    console.error("Error saving order:", error);
    return null;
  }
};

/**
 * Update order
 */
export const updateOrder = (orderId, updates) => {
  try {
    const orders = getOrders();

    const updatedOrders = orders.map((order) => {
      if (String(order.id) === String(orderId)) {
        return {
          ...order,
          ...updates,
        };
      }

      return order;
    });

    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(updatedOrders)
    );

    return updatedOrders.find(
      (order) => String(order.id) === String(orderId)
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
};