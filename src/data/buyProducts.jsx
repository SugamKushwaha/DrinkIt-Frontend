import blackLabel from "../assets/products/whisky/black-label.png";
import belvedere from "../assets/categories/vodka.png";
import sula from "../assets/products/sula.png";
import bacardi from "../assets/categories/rum.png";
import tanqueray from "../assets/categories/gin.png";
import lays from "../assets/products/snacks/lays.png";

const buyProducts = [
  {
    id: 1,
    name: "Johnnie Walker Black Label",
    category: "Whisky",
    brand: "Johnnie Walker",
    price: 3999,
    oldPrice: 4499,
    discount: 11,
    rating: 4.8,
    reviews: 124,
    size: "750ml",
    image: blackLabel,

    description:
      "A rich and smooth blended Scotch whisky with deep and complex flavors.",

    inStock: true,
  },

  {
    id: 2,
    name: "Belvedere Vodka",
    category: "Vodka",
    brand: "Belvedere",
    price: 4999,
    oldPrice: 5499,
    discount: 9,
    rating: 4.7,
    reviews: 98,
    size: "750ml",
    image: belvedere,

    description:
      "A premium Polish vodka known for its smooth and refined character.",

    inStock: true,
  },

  {
    id: 3,
    name: "Sula Brut",
    category: "Wine",
    brand: "Sula",
    price: 899,
    oldPrice: 999,
    discount: 10,
    rating: 4.5,
    reviews: 76,
    size: "750ml",
    image: sula,

    description:
      "A refreshing sparkling wine with crisp and fruity notes.",

    inStock: true,
  },

  {
    id: 4,
    name: "Bacardi",
    category: "Rum",
    brand: "Havana Club",
    price: 1299,
    oldPrice: 1499,
    discount: 13,
    rating: 4.6,
    reviews: 84,
    size: "750ml",
    image: bacardi,

    description:
      "A smooth Caribbean rum with a balanced and flavorful profile.",

    inStock: true,
  },

  {
    id: 5,
    name: "Bombay Sapphire Gin",
    category: "Gin",
    brand: "Bombay Sapphire",
    price: 1799,
    oldPrice: 1999,
    discount: 10,
    rating: 4.7,
    reviews: 91,
    size: "750ml",
    image: tanqueray,

    description:
      "A premium London dry gin with a distinctive botanical character.",

    inStock: true,
  },

  {
    id: 6,
    name: "Lay's Classic Salted",
    category: "Snacks",
    brand: "Lay's",
    price: 30,
    oldPrice: 35,
    discount: 14,
    rating: 4.4,
    reviews: 210,
    size: "52g",
    image: lays,

    description:
      "Classic crispy potato chips with a delicious salted flavor.",

    inStock: true,
  },
];

export default buyProducts;