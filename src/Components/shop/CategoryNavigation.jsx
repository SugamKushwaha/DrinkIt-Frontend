import React from "react";
import { useSearchParams } from "react-router-dom";

const categories = [
  {
    name: "All",
    slug: "all",
    icon: "▦",
  },
  {
    name: "Beer",
    slug: "beer",
    icon: "🍺",
  },
  {
    name: "Whisky",
    slug: "whisky",
    icon: "🥃",
  },
  {
    name: "Vodka",
    slug: "vodka",
    icon: "🍸",
  },
  {
    name: "Wine",
    slug: "wine",
    icon: "🍷",
  },
  {
    name: "Rum",
    slug: "rum",
    icon: "🥃",
  },
  {
    name: "Gin",
    slug: "gin",
    icon: "🍸",
  },
  {
    name: "Snacks",
    slug: "snacks",
    icon: "🍟",
  },
];

const CategoryNavigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory =
    searchParams.get("category") || "all";

  const handleCategory = (slug) => {
    if (slug === "all") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: slug,
      });
    }
  };

  return (
    <section className="bg-black border-b border-gray-800">

      <div className="max-w-[1450px] mx-auto px-5 py-5">

        <div className="flex gap-3 overflow-x-auto">

          {categories.map((category) => {
            const isActive =
              activeCategory === category.slug;

            return (
              <button
                key={category.slug}
                onClick={() =>
                  handleCategory(category.slug)
                }
                className={`
                  min-w-[105px]
                  h-12
                  px-5
                  rounded-md
                  border
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  font-medium
                  transition

                  ${
                    isActive
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                      : "border-gray-800 bg-[#0b0b0b] text-gray-300 hover:border-yellow-500 hover:text-yellow-400"
                  }
                `}
              >
                <span>
                  {category.icon}
                </span>

                <span>
                  {category.name}
                </span>
              </button>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default CategoryNavigation;