import beerData from "./beerData";
import whiskyData from "./whiskyData";
import wineData from "./wineData";
import popularProducts from "./products";

const addCategory = (products, category) => {
  return products.map((product) => ({
    ...product,
    category,
  }));
};

const shopProducts = [
  ...addCategory(beerData, "beer"),
  ...addCategory(whiskyData, "whisky"),
  ...addCategory(wineData, "wine"),

  // Your popular products
  ...popularProducts
    .filter(
      (product) =>
        !product.name.toLowerCase().includes("beer") &&
        !product.name.toLowerCase().includes("wine")
    )
    .map((product) => ({
      ...product,
      category: "popular",
    })),
];

export default shopProducts;