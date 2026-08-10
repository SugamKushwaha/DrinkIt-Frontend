import React from "react";

const SortDropdown = ({ sort, setSort }) => {
  return (
    <div className="flex items-center gap-3">

      <span className="text-gray-400 text-sm">
        Sort by:
      </span>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
          bg-[#0b0b0b]
          border
          border-gray-700
          text-white
          rounded-md
          px-4
          py-2
          text-sm
          outline-none
          cursor-pointer
          focus:border-yellow-500
        "
      >
        <option value="popular">
          Popular
        </option>

        <option value="price-low">
          Price: Low to High
        </option>

        <option value="price-high">
          Price: High to Low
        </option>

        <option value="rating">
          Rating
        </option>

      </select>

    </div>
  );
};

export default SortDropdown;