import { useNavigate } from "react-router-dom";

const CategoryCard = ({ item }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?category=${item.title.toLowerCase()}`);
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
      "
    >

      <img
        src={item.image}
        alt={item.title}
        className="
          h-52
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-105
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

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