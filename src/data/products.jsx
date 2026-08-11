import kingfisher from "../assets/products/kingfisher.png";
import blackLabel from "../assets/products/black-label.png";
import belvedere from "../assets/products/belvedere.png";
import sula from "../assets/products/sula.png";

const products = [
  {
    id: "home-1",
    name: "Kingfisher Premium Beer",
    volume: "500ml",

    category: "beer",
    brand: "Kingfisher",

    price: 399,
    oldPrice: 449,
    discount: 11,

    rating: 4.4,
    reviews: 128,

    popular: true,
    inStock: true,

    description:
      "Kingfisher Premium Beer is a refreshing lager with a crisp taste and smooth finish, perfect for parties, celebrations and relaxed evenings.",

    image: kingfisher,
  },

  {
    id: "home-2",
    name: "Johnnie Walker Black Label",
    volume: "750ml",

    category: "whisky",
    brand: "Johnnie Walker",

    price: 2999,
    oldPrice: 3299,
    discount: 9,

    rating: 4.7,
    reviews: 98,

    popular: true,
    inStock: true,

    description:
      "Johnnie Walker Black Label is a premium blended Scotch whisky with rich dried fruit, spice, oak and a smooth smoky finish.",

    image: blackLabel,
  },

  {
    id: "home-3",
    name: "Belvedere Vodka",
    volume: "750ml",

    category: "vodka",
    brand: "Belvedere",

    price: 2499,
    oldPrice: 2799,
    discount: 11,

    rating: 4.6,
    reviews: 89,

    popular: true,
    inStock: true,

    description:
      "Belvedere Vodka is a premium Polish vodka known for its clean, smooth character and subtle notes of vanilla and cream.",

    image: belvedere,
  },

  {
    id: "home-4",
    name: "Sula Cabernet Sauvignon",
    volume: "750ml",

    category: "wine",
    brand: "Sula",

    price: 1999,
    oldPrice: 2299,
    discount: 13,

    rating: 4.5,
    reviews: 76,

    popular: true,
    inStock: true,

    description:
      "Sula Cabernet Sauvignon is a rich Indian red wine with fruity flavors, balanced tannins and a smooth finish.",

    image: sula,
  },
];

export default products;