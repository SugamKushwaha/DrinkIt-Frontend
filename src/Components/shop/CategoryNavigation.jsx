import React from "react";

const categories = [
  {
    id: "all",
    name: "All",
    icon: "🛍️",
  },
  {
    id: "beer",
    name: "Beer",
    icon: "🍺",
  },
  {
    id: "whisky",
    name: "Whisky",
    icon: "🥃",
  },
  {
    id: "vodka",
    name: "Vodka",
    icon: "🍸",
  },
  {
    id: "wine",
    name: "Wine",
    icon: "🍷",
  },
  {
    id: "rum",
    name: "Rum",
    icon: "🥃",
  },
  {
    id: "gin",
    name: "Gin",
    icon: "🍸",
  },
  {
    id: "snacks",
    name: "Snacks",
    icon: "🍿",
  },
];

const CategoryNavigation = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">

      <div className="flex gap-3 min-w-max pb-2">

        {categories.map((category) => {
          const active = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-lg
                border
                transition
                whitespace-nowrap
                ${
                  active
                    ? "bg-yellow-500 border-yellow-500 text-black"
                    : "bg-[#111] border-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-400"
                }
              `}
            >
              <span>{category.icon}</span>

              <span className="font-semibold text-sm uppercase">
                {category.name}
              </span>
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default CategoryNavigation;