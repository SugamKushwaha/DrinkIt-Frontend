import blackLabel from "../assets/products/whisky/black-label.png";
import teachers from "../assets/products/whisky/teachers.jpg";
import jimBeam from "../assets/products/whisky/jim-beam.jpg";
import jameson from "../assets/products/whisky/jameson.jpg";
import pipers from "../assets/products/whisky/100-pipers.jpg";

const whiskyData = [
  {
    id: "whisky-1",
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
      "Johnnie Walker Black Label is a rich blended Scotch whisky with layers of dried fruit, spice, oak and a smooth smoky finish.",
    image: blackLabel,
  },

  {
    id: "whisky-2",
    name: "Teacher's Highland Cream",
    volume: "700ml",
    category: "whisky",
    brand: "Teacher's",
    price: 2499,
    oldPrice: 2799,
    discount: 11,
    rating: 4.5,
    reviews: 82,
    popular: true,
    inStock: true,
    description:
      "Teacher's Highland Cream is a blended Scotch whisky with a smooth, balanced character and subtle smoky notes.",
    image: teachers,
  },

  {
    id: "whisky-3",
    name: "Jim Beam",
    volume: "700ml",
    category: "whisky",
    brand: "Jim Beam",
    price: 2299,
    oldPrice: 2599,
    discount: 12,
    rating: 4.4,
    reviews: 76,
    popular: true,
    inStock: true,
    description:
      "Jim Beam is a classic Kentucky straight bourbon whiskey with sweet oak, vanilla and caramel notes.",
    image: jimBeam,
  },

  {
    id: "whisky-4",
    name: "Jameson Irish Whiskey",
    volume: "700ml",
    category: "whisky",
    brand: "Jameson",
    price: 2899,
    oldPrice: 3199,
    discount: 9,
    rating: 4.6,
    reviews: 91,
    popular: true,
    inStock: true,
    description:
      "Jameson Irish Whiskey is known for its smooth and balanced character with gentle spice, vanilla and oak notes.",
    image: jameson,
  },

  {
    id: "whisky-5",
    name: "100 Pipers",
    volume: "700ml",
    category: "whisky",
    brand: "100 Pipers",
    price: 2599,
    oldPrice: 2899,
    discount: 10,
    rating: 4.3,
    reviews: 64,
    popular: false,
    inStock: true,
    description:
      "100 Pipers is a smooth blended Scotch whisky with a balanced character and pleasant smoky finish.",
    image: pipers,
  },
];

export default whiskyData;