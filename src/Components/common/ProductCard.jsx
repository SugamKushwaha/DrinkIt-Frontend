import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#0f0f0f] border border-gray-700 rounded-lg overflow-hidden hover:border-yellow-500 transition">

      <div className="bg-black h-60 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 object-contain transition duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">

        <h3 className="text-white text-base font-medium line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-500 mt-1">
          {product.volume}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-semibold text-white">
            ${product.price}
          </span>

          <button className="flex items-center gap-2 border border-yellow-600 text-yellow-600 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition">

            <ShoppingCart size={18} />

            ADD

          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;