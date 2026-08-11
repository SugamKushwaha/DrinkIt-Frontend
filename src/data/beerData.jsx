import budweiser from "../assets/products/beer/budweiser.jpg";
import corona from "../assets/products/beer/corona.jpg";
import heineken from "../assets/products/beer/heineken.jpg";
import hoegaarden from "../assets/products/beer/hoegaarden.jpg";
import kingfisher from "../assets/products/beer/kingfisher.jpg";

const beerData = [
  {
    id: "beer-1",
    name: "Budweiser",
    volume: "500ml",
    category: "beer",
    brand: "Budweiser",
    price: 200,
    oldPrice: 230,
    discount: 13,
    rating: 4.4,
    reviews: 98,
    popular: true,
    inStock: true,
    description:
      "Budweiser is a crisp and refreshing lager with a smooth finish, making it a popular choice for casual evenings and celebrations.",
    image: budweiser,
  },

  {
    id: "beer-2",
    name: "Corona Extra",
    volume: "330ml",
    category: "beer",
    brand: "Corona",
    price: 329,
    oldPrice: 359,
    discount: 8,
    rating: 4.5,
    reviews: 110,
    popular: true,
    inStock: true,
    description:
      "Corona Extra is a refreshing pale lager known for its light, crisp character and smooth finish.",
    image: corona,
  },

  {
    id: "beer-3",
    name: "Heineken Original",
    volume: "500ml",
    category: "beer",
    brand: "Heineken",
    price: 349,
    oldPrice: 399,
    discount: 13,
    rating: 4.6,
    reviews: 156,
    popular: true,
    inStock: true,
    description:
      "Heineken Original is a well-balanced lager with a refreshing taste and distinctive smooth finish.",
    image: heineken,
  },

  {
    id: "beer-4",
    name: "Hoegaarden Witbier",
    volume: "330ml",
    category: "beer",
    brand: "Hoegaarden",
    price: 425,
    oldPrice: 475,
    discount: 11,
    rating: 4.3,
    reviews: 87,
    popular: false,
    inStock: true,
    description:
      "Hoegaarden Witbier is a Belgian-style wheat beer with a light, refreshing character and subtle citrus notes.",
    image: hoegaarden,
  },

  {
    id: "beer-5",
    name: "Kingfisher Premium Beer",
    volume: "500ml",
    category: "beer",
    brand: "Kingfisher",
    price: 400,
    oldPrice: 450,
    discount: 11,
    rating: 4.5,
    reviews: 128,
    popular: true,
    inStock: true,
    description:
      "Kingfisher Premium is a refreshing Indian lager with a crisp taste and smooth finish, ideal for relaxed occasions.",
    image: kingfisher,
  },
];

export default beerData;