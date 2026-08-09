import React from "react";

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
}) => {
  const categories = [
    "all",
    "beer",
    "whisky",
    "vodka",
    "wine",
    "rum",
    "gin",
    "snacks",
  ];

  return (
    <aside className="w-full lg:w-[240px] shrink-0">

      <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">

        {/* FILTER HEADER */}

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-white font-bold uppercase">
            Filters
          </h2>

          <button
            onClick={() => {
              setSelectedCategory("all");
              setMaxPrice(5000);
            }}
            className="text-yellow-500 text-xs hover:text-yellow-400"
          >
            CLEAR
          </button>

        </div>


        {/* CATEGORY */}

        <div className="border-b border-gray-800 pb-5">

          <h3 className="text-white font-semibold text-sm mb-4">
            Category
          </h3>

          <div className="space-y-3">

            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer"
              >

                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="accent-yellow-500"
                />

                <span className="text-gray-400 text-sm capitalize hover:text-white">
                  {category === "all" ? "All Products" : category}
                </span>

              </label>
            ))}

          </div>

        </div>


        {/* PRICE */}

        <div className="pt-5">

          <h3 className="text-white font-semibold text-sm mb-4">
            Maximum Price
          </h3>

          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />

          <div className="flex justify-between mt-3">

            <span className="text-gray-500 text-xs">
              ₹0
            </span>

            <span className="text-yellow-500 text-sm font-semibold">
              ₹{maxPrice}
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
};

export default FilterSidebar;