import React from "react";

const FilterSidebar = ({
  filters,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onClear,
}) => {

  const categories = [
    "beer",
    "whisky",
    "vodka",
    "wine",
    "rum",
    "gin",
    "snacks",
  ];

  const brands = [
    "Kingfisher",
    "Budweiser",
    "Heineken",
    "Johnnie Walker",
    "Sula",
  ];


  return (
    <aside className="w-[250px] flex-shrink-0">

      <div
        className="
          bg-[#0b0b0b]
          border
          border-gray-800
          rounded-lg
          p-5
          sticky
          top-24
        "
      >

        {/* ================= HEADER ================= */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-white font-bold text-lg">
            FILTERS
          </h2>

          <button
            onClick={onClear}
            className="
              text-yellow-500
              text-xs
              hover:text-yellow-400
            "
          >
            CLEAR
          </button>

        </div>


        {/* ================= CATEGORY ================= */}

        <div className="mb-7">

          <h3 className="text-white font-semibold mb-4">
            Category
          </h3>

          <div className="space-y-3">

            {categories.map((category) => {

              const checked =
                filters.categories.includes(category);

              return (
                <label
                  key={category}
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-400
                    text-sm
                    cursor-pointer
                    hover:text-white
                  "
                >

                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      onCategoryChange(category)
                    }
                    className="
                      w-4
                      h-4
                      accent-yellow-500
                    "
                  />

                  <span className="capitalize">
                    {category}
                  </span>

                </label>
              );

            })}

          </div>

        </div>


        {/* ================= PRICE ================= */}

        <div className="mb-7">

          <h3 className="text-white font-semibold mb-4">
            Price
          </h3>

          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.maxPrice}
            onChange={(e) =>
              onPriceChange(e.target.value)
            }
            className="
              w-full
              accent-yellow-500
              cursor-pointer
            "
          />


          <div className="flex justify-between text-xs text-gray-500 mt-2">

            <span>
              ₹0
            </span>

            <span>
              ₹{filters.maxPrice}
            </span>

          </div>

        </div>


        {/* ================= BRAND ================= */}

        <div>

          <h3 className="text-white font-semibold mb-4">
            Brand
          </h3>

          <div className="space-y-3">

            {brands.map((brand) => {

              const checked =
                filters.brands.includes(brand);

              return (
                <label
                  key={brand}
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-400
                    text-sm
                    cursor-pointer
                    hover:text-white
                  "
                >

                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      onBrandChange(brand)
                    }
                    className="
                      w-4
                      h-4
                      accent-yellow-500
                    "
                  />

                  {brand}

                </label>
              );

            })}

          </div>

        </div>

      </div>

    </aside>
  );
};

export default FilterSidebar;