import kingfisher from "../assets/products/kingfisher.png";
import blackLabel from "../assets/products/black-label.png";
import belvedere from "../assets/products/belvedere.png";
import sula from "../assets/products/sula.png";

const products = [
  {
    id: 1,
    name: "Kingfisher Premium Beer",
    volume: "500ml",
    price: 3.99,
     rating: 4.4,
    image: kingfisher,
  },
  {
    id: 2,
    name: "Johnnie Walker Black Label",
    volume: "750ml",
    price: 29.99,
    image: blackLabel,
  },
  {
    id: 3,
    name: "Belvedere Vodka",
    volume: "750ml",
    price: 24.99,
    image: belvedere,
  },
  {
    id: 4,
    name: "Sula Cabernet Sauvignon",
    volume: "750ml",
    price: 19.99,
    image: sula,
  },
];

export default products;