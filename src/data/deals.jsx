import beerDeal from "../assets/deals/beer-deal.jpg";
import whiskyDeal from "../assets/deals/whisky-deal.jpg";
import wineDeal from "../assets/deals/wine-deal.jpg";

const deals = [
  {
    id: 1,
    type: "20% OFF",
    title: "ON SELECT BEERS",
    action: "SHOP NOW",
    image: beerDeal,
    theme: "yellow",
  },

  {
    id: 2,
    type: "BUY 2",
    title: "GET 1 FREE",
    subtitle: "ON SELECT WHISKY",
    action: "SHOP NOW",
    image: whiskyDeal,
    theme: "yellow",
  },

  {
    id: 3,
    type: "SPECIAL PRICE",
    title: "ON WINE COLLECTION",
    action: "SHOP NOW",
    image: wineDeal,
    theme: "red",
  },
];

export default deals;