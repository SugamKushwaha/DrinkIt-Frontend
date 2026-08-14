const deliveryOrders = [
  {
    id: "ORD-1001",
    customerName: "Rahul Sharma",
    customerPhone: "9876543210",

    storeName: "DrinkIt Store",
    storeAddress: "MG Road, Kanpur",

    deliveryAddress: {
      name: "Rahul Sharma",
      address: "Civil Lines",
      city: "Kanpur",
      state: "Uttar Pradesh",
      pincode: "208001",
    },

    items: [
      {
        id: 1,
        name: "Johnnie Walker Black Label",
        volume: "750 ML",
        quantity: 1,
        price: 3200,
        image: "/images/products/black-label.png",
      },
      {
        id: 2,
        name: "Lay's Classic",
        volume: "100 GM",
        quantity: 2,
        price: 40,
        image: "/images/products/lays.png",
      },
    ],

    total: 3280,

    status: "READY_FOR_PICKUP",

    deliveryFee: 50,

    createdAt: new Date().toISOString(),

    estimatedDelivery: "30 minutes",
  },

  {
    id: "ORD-1002",
    customerName: "Aman Verma",
    customerPhone: "9988776655",

    storeName: "DrinkIt Store",
    storeAddress: "Mall Road, Kanpur",

    deliveryAddress: {
      name: "Aman Verma",
      address: "Swaroop Nagar",
      city: "Kanpur",
      state: "Uttar Pradesh",
      pincode: "208002",
    },

    items: [
      {
        id: 3,
        name: "Kingfisher Premium",
        volume: "650 ML",
        quantity: 4,
        price: 180,
        image: "/images/products/kingfisher.png",
      },
    ],

    total: 720,

    status: "OUT_FOR_DELIVERY",

    deliveryFee: 40,

    createdAt: new Date().toISOString(),

    estimatedDelivery: "15 minutes",
  },

  {
    id: "ORD-1003",
    customerName: "Vikas Singh",
    customerPhone: "9123456789",

    storeName: "DrinkIt Store",
    storeAddress: "Kakadeo, Kanpur",

    deliveryAddress: {
      name: "Vikas Singh",
      address: "Kakadeo",
      city: "Kanpur",
      state: "Uttar Pradesh",
      pincode: "208025",
    },

    items: [
      {
        id: 4,
        name: "Belvedere Vodka",
        volume: "750 ML",
        quantity: 1,
        price: 4200,
        image: "/images/products/belvedere.png",
      },
    ],

    total: 4200,

    status: "DELIVERED",

    deliveryFee: 60,

    createdAt: new Date().toISOString(),

    estimatedDelivery: "Delivered",
  },
];

export default deliveryOrders;