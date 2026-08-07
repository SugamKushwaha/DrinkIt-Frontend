import beerBites from "../assets/pairings/beer-bites.png";
import whiskyNight from "../assets/pairings/whisky-night.png";
import wineEvening from "../assets/pairings/wine-evening.jpg";

const pairings = [
  {
    id: 1,
    title: "BEER & BITES",
    drink: "Beer",
    snacks: ["Chips", "Nachos"],
    image: beerBites,
  },
  {
    id: 2,
    title: "WHISKY NIGHT",
    drink: "Whisky",
    snacks: ["Peanuts", "Namkeen"],
    image: whiskyNight,
  },
  {
    id: 3,
    title: "WINE EVENING",
    drink: "Wine",
    snacks: ["Cheese", "Crackers"],
    image: wineEvening,
  },
];

export default pairings;