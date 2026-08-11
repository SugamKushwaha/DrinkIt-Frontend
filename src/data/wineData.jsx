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
    id: "wine-1",
    name: "Jacob's Creek Chardonnay",
    volume: "750ml",
    category: "wine",
    brand: "Jacob's Creek",
    price: 1499,
    oldPrice: 1699,
    discount: 12,
    rating: 4.4,
    reviews: 72,
    popular: true,
    inStock: true,
    description:
      "Jacob's Creek Chardonnay is a smooth white wine with a balanced fruit-forward character and a refreshing finish.",
    image: jacobCreek,
  },

  {
    id: "wine-2",
    name: "Jacob's Creek Shiraz",
    volume: "750ml",
    category: "wine",
    brand: "Jacob's Creek",
    price: 1999,
    oldPrice: 2299,
    discount: 13,
    rating: 4.5,
    reviews: 81,
    popular: true,
    inStock: true,
    description:
      "Jacob's Creek Shiraz is a rich red wine with ripe fruit flavors, gentle spice and a smooth finish.",
    image: yellowTail,
  },

  {
    id: "wine-3",
    name: "Yellow Tail",
    volume: "750ml",
    category: "wine",
    brand: "Yellow Tail",
    price: 2199,
    oldPrice: 2499,
    discount: 12,
    rating: 4.4,
    reviews: 65,
    popular: true,
    inStock: true,
    description:
      "Yellow Tail is an approachable wine with a fruity character and smooth finish, making it suitable for casual occasions.",
    image: yellowTailMerlot,
  },

  {
    id: "wine-4",
    name: "Yellow Tail Merlot",
    volume: "750ml",
    category: "wine",
    brand: "Yellow Tail",
    price: 2199,
    oldPrice: 2499,
    discount: 12,
    rating: 4.5,
    reviews: 74,
    popular: true,
    inStock: true,
    description:
      "Yellow Tail Merlot is a smooth red wine with ripe berry flavors and a soft, easy-drinking character.",
    image: wines7,
  },

  {
    id: "wine-5",
    name: "Wines7",
    volume: "750ml",
    category: "wine",
    brand: "Wines7",
    price: 1699,
    oldPrice: 1899,
    discount: 11,
    rating: 4.2,
    reviews: 48,
    popular: false,
    inStock: true,
    description:
      "Wines7 offers a balanced wine profile with fruity flavors and a pleasant finish for relaxed occasions.",
    image: campoViejo,
  },

  {
    id: "wine-6",
    name: "Campo Viejo Rioja",
    volume: "750ml",
    category: "wine",
    brand: "Campo Viejo",
    price: 1699,
    oldPrice: 1999,
    discount: 15,
    rating: 4.6,
    reviews: 93,
    popular: true,
    inStock: true,
    description:
      "Campo Viejo Rioja is a Spanish red wine with a balanced combination of ripe fruit, oak and subtle spice.",
    image: campoViejoRioja,
  },

  {
    id: "wine-7",
    name: "Campo Viejo Rioja",
    volume: "750ml",
    category: "wine",
    brand: "Campo Viejo",
    price: 1699,
    oldPrice: 1999,
    discount: 15,
    rating: 4.5,
    reviews: 67,
    popular: true,
    inStock: true,
    description:
      "Campo Viejo Rioja delivers a smooth and balanced red wine experience with fruity and gently spiced notes.",
    image: fratelli,
  },

  {
    id: "wine-8",
    name: "Fratelli Cabernet",
    volume: "750ml",
    category: "wine",
    brand: "Fratelli",
    price: 1699,
    oldPrice: 1899,
    discount: 11,
    rating: 4.4,
    reviews: 59,
    popular: false,
    inStock: true,
    description:
      "Fratelli Cabernet is a rich Indian red wine with fruity character, gentle tannins and a smooth finish.",
    image: hardy,
  },
];

export default wineData;