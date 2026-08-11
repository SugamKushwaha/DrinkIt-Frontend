import bacardi from "../assets/categories/rum.png";
// import captainMorgan from "../assets/products/rum/captain-morgan.png";
// import oldMonk from "../assets/products/rum/old-monk.png";

const rumData = [
  {
    id: "rum-1",
    name: "Bacardi White Rum",
    volume: "750ml",
    category: "rum",
    brand: "Bacardi",

    price: 1999,
    oldPrice: 2299,
    discount: 13,

    rating: 4.4,
    reviews: 82,

    popular: true,
    inStock: true,

    description:
      "Bacardi White Rum is a light and smooth rum with a clean character and subtle sweetness. It is a versatile choice for cocktails, mixed drinks, and relaxed occasions.",

    image: bacardi,
  },

  // ================= CAPTAIN MORGAN =================

  // Uncomment when you add the image

  // {
  //   id: "rum-2",
  //   name: "Captain Morgan",
  //   volume: "750ml",
  //   category: "rum",
  //   brand: "Captain Morgan",

  //   price: 2199,
  //   oldPrice: 2499,
  //   discount: 12,

  //   rating: 4.5,
  //   reviews: 76,

  //   popular: true,
  //   inStock: true,

  //   description:
  //     "Captain Morgan is a rich and flavorful rum with a smooth character and warm spice notes, making it a popular choice for mixed drinks and cocktails.",

  //   image: captainMorgan,
  // },


  // ================= OLD MONK =================

  // Uncomment when you add the image

  // {
  //   id: "rum-3",
  //   name: "Old Monk",
  //   volume: "750ml",
  //   category: "rum",
  //   brand: "Old Monk",

  //   price: 1899,
  //   oldPrice: 2199,
  //   discount: 14,

  //   rating: 4.3,
  //   reviews: 91,

  //   popular: false,
  //   inStock: true,

  //   description:
  //     "Old Monk is a classic Indian dark rum known for its rich character, caramel notes, and smooth warming finish.",

  //   image: oldMonk,
  // },
];

export default rumData;