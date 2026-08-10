import products from "./products";

import beerData from "./beerData";
import whiskyData from "./whiskyData";
import vodkaData from "./vodkaData";
import wineData from "./wineData";
import rumData from "./rumData";
import ginData from "./ginData";
import snacksData from "./snacksData";

const allProducts = [
  ...products,

  ...beerData,
  ...whiskyData,
  ...vodkaData,
  ...wineData,
  ...rumData,
  ...ginData,
  ...snacksData,
];

export default allProducts;