import lays from "../assets/products/snacks/lays.png";
import doritos from "../assets/products/snacks/doritos.png";
import kurkure from "../assets/products/snacks/kurkure.png";
import haldiram from "../assets/products/snacks/haldiram.png";
import roasted from "../assets/products/snacks/roasted.png";
import pringles from "../assets/products/snacks/pringles.png";

const snacksData = [
  {
    id: 201,
    name: "Lay's Classic",
    volume: "90g",
    category: "snacks",
    brand: "Lay's",
    price: 1.99,
    rating: 4.5,
    reviews: 120,
    popular: true,
    image: lays,
  },

  {
    id: 202,
    name: "Doritos Nacho Cheese",
    volume: "240g",
    category: "snacks",
    brand: "Doritos",
    price: 2.49,
    rating: 4.6,
    reviews: 105,
    popular: true,
    image: doritos,
  },

  {
    id: 203,
    name: "Kurkure Masala",
    volume: "90g",
    category: "snacks",
    brand: "Kurkure",
    price: 1.49,
    rating: 4.4,
    reviews: 89,
    popular: true,
    image: kurkure,
  },

  {
    id: 204,
    name: "Haldiram's Mixture",
    volume: "200g",
    category: "snacks",
    brand: "Haldiram's",
    price: 2.29,
    rating: 4.5,
    reviews: 93,
    popular: true,
    image: haldiram,
  },

  {
    id: 205,
    name: "Roasted Peanuts",
    volume: "200g",
    category: "snacks",
    brand: "Roasted",
    price: 1.79,
    rating: 4.2,
    reviews: 54,
    popular: false,
    image: roasted,
  },

  {
    id: 206,
    name: "Pringles Original",
    volume: "165g",
    category: "snacks",
    brand: "Pringles",
    price: 2.49,
    rating: 4.6,
    reviews: 112,
    popular: true,
    image: pringles,
  },
];

export default snacksData;