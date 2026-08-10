import budweiser from "../assets/products/beer/budweiser.jpg";
import corona from "../assets/products/beer/corona.jpg";
import heineken from "../assets/products/beer/heineken.jpg";
import hoegaarden from "../assets/products/beer/hoegaarden.jpg";
import kingfisher from "../assets/products/beer/kingfisher.jpg";

const beerData = [
  {
    id: 1,
    name: "Budweiser",
    volume: "500ml",
    category: "beer",
    brand: "Budweiser",
    price: 200,
    rating: 4.4,
    reviews: 98,
    popular: true,
    image: budweiser,
  },

  {
    id: 2,
    name: "Corona Extra",
    volume: "330ml",
    category: "beer",
    brand: "Corona",
    price: 329,
    rating: 4.5,
    reviews: 110,
    popular: true,
    image: corona,
  },

  {
    id: 3,
    name: "Heineken Original",
    volume: "500ml",
    category: "beer",
    brand: "Heineken",
    price: 349,
    rating: 4.6,
    reviews: 156,
    popular: true,
    image: heineken,
  },

  {
    id: 4,
    name: "Hoegaarden Witbier",
    volume: "330ml",
    category: "beer",
    brand: "Hoegaarden",
    price: 425,
    rating: 4.3,
    reviews: 87,
    popular: false,
    image: hoegaarden,
  },

  {
    id: 5,
    name: "Kingfisher Premium Beer",
    volume: "500ml",
    category: "beer",
    brand: "Kingfisher",
    price: 400,
    rating: 4.5,
    reviews: 128,
    popular: true,
    image: kingfisher,
  },
];

export default beerData;