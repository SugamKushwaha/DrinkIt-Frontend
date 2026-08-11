import lays from "../assets/products/snacks/lays.png";
import doritos from "../assets/products/snacks/doritos.png";
import kurkure from "../assets/products/snacks/kurkure.png";
import haldiram from "../assets/products/snacks/haldiram.png";
import roasted from "../assets/products/snacks/roasted.png";
import pringles from "../assets/products/snacks/pringles.png";

const snacksData = [
  {
    id: "snacks-1",
    name: "Lay's Classic",
    volume: "90g",
    category: "snacks",
    brand: "Lay's",
    price: 30,
    oldPrice: 35,
    discount: 14,
    rating: 4.5,
    reviews: 120,
    popular: true,
    inStock: true,
    description:
      "Classic crispy potato chips with a delicious salted flavor, perfect for casual snacking and sharing.",
    image: lays,
  },

  {
    id: "snacks-2",
    name: "Doritos Nacho Cheese",
    volume: "240g",
    category: "snacks",
    brand: "Doritos",
    price: 60,
    oldPrice: 70,
    discount: 14,
    rating: 4.6,
    reviews: 105,
    popular: true,
    inStock: true,
    description:
      "Crunchy corn chips with a bold nacho cheese flavor, perfect for parties, movie nights and casual snacking.",
    image: doritos,
  },

  {
    id: "snacks-3",
    name: "Kurkure Masala",
    volume: "90g",
    category: "snacks",
    brand: "Kurkure",
    price: 20,
    oldPrice: 25,
    discount: 20,
    rating: 4.4,
    reviews: 89,
    popular: true,
    inStock: true,
    description:
      "Crunchy and flavorful masala snack with a spicy Indian-inspired taste.",
    image: kurkure,
  },

  {
    id: "snacks-4",
    name: "Haldiram's Mixture",
    volume: "200g",
    category: "snacks",
    brand: "Haldiram's",
    price: 75,
    oldPrice: 85,
    discount: 12,
    rating: 4.5,
    reviews: 93,
    popular: true,
    inStock: true,
    description:
      "A crunchy Indian-style mixture combining savory ingredients and spices for a flavorful snacking experience.",
    image: haldiram,
  },

  {
    id: "snacks-5",
    name: "Roasted Peanuts",
    volume: "200g",
    category: "snacks",
    brand: "Roasted",
    price: 50,
    oldPrice: 60,
    discount: 17,
    rating: 4.2,
    reviews: 54,
    popular: false,
    inStock: true,
    description:
      "Crunchy roasted peanuts with a savory flavor, ideal for everyday snacking and sharing.",
    image: roasted,
  },

  {
    id: "snacks-6",
    name: "Pringles Original",
    volume: "165g",
    category: "snacks",
    brand: "Pringles",
    price: 120,
    oldPrice: 140,
    discount: 14,
    rating: 4.6,
    reviews: 112,
    popular: true,
    inStock: true,
    description:
      "Crispy, stackable potato crisps with a classic savory flavor, perfect for parties and movie nights.",
    image: pringles,
  },
];

export default snacksData;