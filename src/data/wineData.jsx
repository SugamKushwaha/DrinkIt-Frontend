import jacobCreek from "../assets/products/wine/jacob-creek.jpg";
import yellowTail from "../assets/products/wine/yellow-tail.jpg";
import yellowTailMerlot from "../assets/products/wine/yellow-tail-merlot.jpg";
import wines7 from "../assets/products/wine/wines7.jpg";
import campoViejo from "../assets/products/wine/campo-viejo.jpg";
import campoViejoRioja from "../assets/products/wine/campo-viejo-rioja.jpg";
import fratelli from "../assets/products/wine/fratelli.jpg";
import hardy from "../assets/products/wine/hardy.jpg";

const wineData = [
  {
    id: 301,
    name: "Jacob's Creek Chardonnay",
    volume: "750ml",
    category: "wine",
    brand: "Jacob's Creek",
    price: 14.99,
    rating: 4.4,
    reviews: 72,
    popular: true,
    image: jacobCreek,
  },

  {
    id: 302,
    name: "Jacob's Creek Shiraz",
    volume: "750ml",
    category: "wine",
    brand: "Jacob's Creek",
    price: 19.99,
    rating: 4.5,
    reviews: 81,
    popular: true,
    image: yellowTail,
  },

  {
    id: 303,
    name: "Yellow Tail",
    volume: "750ml",
    category: "wine",
    brand: "Yellow Tail",
    price: 21.99,
    rating: 4.4,
    reviews: 65,
    popular: true,
    image: yellowTailMerlot,
  },

  {
    id: 304,
    name: "Yellow Tail Merlot",
    volume: "750ml",
    category: "wine",
    brand: "Yellow Tail",
    price: 21.99,
    rating: 4.5,
    reviews: 74,
    popular: true,
    image: wines7,
  },

  {
    id: 305,
    name: "Wines7",
    volume: "750ml",
    category: "wine",
    brand: "Wines7",
    price: 16.99,
    rating: 4.2,
    reviews: 48,
    popular: false,
    image: campoViejo,
  },

  {
    id: 306,
    name: "Campo Viejo Rioja",
    volume: "750ml",
    category: "wine",
    brand: "Campo Viejo",
    price: 16.99,
    rating: 4.6,
    reviews: 93,
    popular: true,
    image: campoViejoRioja,
  },

  {
    id: 307,
    name: "Campo Viejo Rioja",
    volume: "750ml",
    category: "wine",
    brand: "Campo Viejo",
    price: 16.99,
    rating: 4.5,
    reviews: 67,
    popular: true,
    image: fratelli,
  },

  {
    id: 308,
    name: "Fratelli Cabernet",
    volume: "750ml",
    category: "wine",
    brand: "Fratelli",
    price: 16.99,
    rating: 4.4,
    reviews: 59,
    popular: false,
    image: hardy,
  },
];

export default wineData;