import { useNavigate } from "react-router-dom";

const CategoryCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/shop?category=${encodeURIComponent(
        item.title
      )}`
    );
  };

  return (
    <div
      onClick={handleClick}
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-gray-700
        bg-[#111]
        cursor-pointer
        hover:border-yellow-500/50
        transition
      "
    >

      {/* IMAGE */}

      <img
        src={item.image}
        alt={item.title}
        onError={(e) => {
          e.currentTarget.src =
            "/images/category-placeholder.png";
        }}
        className="
          h-52
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-105
        "
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/20
          to-transparent
        "
      />

      {/* TITLE */}

      <h2
        className="
          absolute
          top-5
          left-5
          text-3xl
          font-extrabold
          uppercase
          text-white
        "
      >
        {item.title}
      </h2>

    </div>
  );
};

export default CategoryCard;
