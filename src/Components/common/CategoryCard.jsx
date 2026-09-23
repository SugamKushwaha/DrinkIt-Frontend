import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ item }) => {
  const navigate = useNavigate();

  const categoryName = item?.categoryName || "";
  const imageUrl = item?.imageUrl || "";

  const handleClick = () => {
    if (!categoryName) return;

    navigate(
      `/shop?category=${encodeURIComponent(categoryName)}`
    );
  };

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={categoryName}
        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      <h3 className="absolute top-5 left-5 text-3xl font-bold uppercase text-white">
        {categoryName}
      </h3>
    </div>
  );
};

export default CategoryCard;