import { ShoppingCart } from "lucide-react";

const ProductCard = ({
  product,
  showButton = false,
  bordered = false,
}) => {
  return (
    <div
      className={`
        w-full
        bg-black
        overflow-hidden
        ${bordered ? "border border-gray-700 rounded-lg" : ""}
      `}
    >

      {/* IMAGE AREA */}
      <div className="w-full h-[230px] bg-black flex items-center justify-center overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-full
            object-contain
            transition
            duration-300
            hover:scale-110
          "
        />

      </div>

      {/* GRAY LINE BETWEEN IMAGE AND TEXT */}
      <div className="border-t border-gray-700">

        {/* TEXT AREA */}
        <div className="bg-black px-3 py-1">

          <h3 className="text-white text-[15px] font-medium truncate">
            {product.name}
          </h3>

          <p className="text-gray-400 text-[13px] mt-1">
            {product.volume}
          </p>

          <div className="flex justify-between items-center mt-1">

            <span className="text-white text-lg font-bold">
              ${product.price}
            </span>

            {showButton && (
              <button className="border border-yellow-500 text-yellow-500 px-2 py-1 text-lg rounded">
                ADD
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;