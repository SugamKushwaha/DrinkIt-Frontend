import React from "react";

const SortDropdown = ({ sort, setSort }) => {
  return (
    <div className="flex items-center gap-3">

      <span className="text-gray-500 text-sm hidden sm:block">
        Sort by
      </span>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
          bg-[#111]
          border
          border-gray-700
          text-white
          text-sm
          rounded-lg
          px-4
          py-2.5
          outline-none
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

        <option value="name">
          Name
        </option>
      </select>

    </div>
  );
};

export default SortDropdown;