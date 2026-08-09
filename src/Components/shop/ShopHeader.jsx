import React from "react";

const ShopHeader = ({ category }) => {
  const titles = {
    all: "Shop All",
    beer: "Beer",
    whisky: "Whisky",
    vodka: "Vodka",
    wine: "Wine",
    rum: "Rum",
    gin: "Gin",
    snacks: "Snacks",
  };

  const title = titles[category] || "Shop";

  return (
    <div className="mb-8">

      <p className="text-gray-500 text-sm mb-2">
        Home / Shop / {title}
      </p>

      <div className="flex items-end justify-between">

        <div>

          <h1 className="text-white text-4xl md:text-5xl font-bold uppercase">
            {title}
          </h1>

          <p className="text-gray-400 mt-2">
            Discover drinks, snacks and party essentials.
          </p>

        </div>

      </div>

    </div>
  );
};

export default ShopHeader;