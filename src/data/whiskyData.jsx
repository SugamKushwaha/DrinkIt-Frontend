import blackLabel from "../assets/products/whisky/black-label.png";
import teachers from "../assets/products/whisky/teachers.jpg";
import jimBeam from "../assets/products/whisky/jim-beam.jpg";
import jameson from "../assets/products/whisky/jameson.jpg";
import pipers from "../assets/products/whisky/100-pipers.jpg";

const whiskyData = [
  {
    id: 101,
    name: "Johnnie Walker Black Label",
    volume: "750ml",
    category: "whisky",
    brand: "Johnnie Walker",
    price: 29.99,
    rating: 4.7,
    reviews: 98,
    popular: true,
    image: blackLabel,
  },

  {
    id: 102,
    name: "Teacher's Highland Cream",
    volume: "700ml",
    category: "whisky",
    brand: "Teacher's",
    price: 24.99,
    rating: 4.5,
    reviews: 82,
    popular: true,
    image: teachers,
  },

  {
    id: 103,
    name: "Jim Beam",
    volume: "700ml",
    category: "whisky",
    brand: "Jim Beam",
    price: 22.99,
    rating: 4.4,
    reviews: 76,
    popular: true,
    image: jimBeam,
  },

  {
    id: 104,
    name: "Jameson Irish Whiskey",
    volume: "700ml",
    category: "whisky",
    brand: "Jameson",
    price: 28.99,
    rating: 4.6,
    reviews: 91,
    popular: true,
    image: jameson,
  },

  {
    id: 105,
    name: "100 Pipers",
    volume: "700ml",
    category: "whisky",
    brand: "100 Pipers",
    price: 25.99,
    rating: 4.3,
    reviews: 64,
    popular: false,
    image: pipers,
  },
];

export default whiskyData;