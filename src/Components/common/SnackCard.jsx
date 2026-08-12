import React from "react";
import { ShoppingCart } from "lucide-react";

const SnackCard = ({ product }) => {
  return (
    <div className="w-full h-[130px] bg-[#0e0d07] border border-gray-700 rounded-md overflow-hidden hover:border-yellow-500 transition duration-300">

      {/* CARD CONTENT */}
      <div className="flex h-full">

        {/* IMAGE */}
        <div className="w-[65%] h-full bg-[#0e0d07] flex items-center justify-center overflow-hidden">

          <img
            src={product.image}
            alt={product.name}
            className="
              w-full
              h-full
              object-contain
              p-1
              transition
              duration-300
              hover:scale-110
            "
          />

        </div>

        {/* DETAILS */}
        <div className="w-[55%] px-2 py-1 flex flex-col justify-between">

          {/* NAME */}
          <h3 className="text-white text-[14px] font-medium leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* PRICE + BUTTON */}
          <div className="flex items-center justify-between gap-1">

            <span className="text-white text-[18px] font-semibold">
              ₹ {product.price}
            </span>
          </div>
          <div>
            <button
              className="
                flex
                items-center
                gap-2
                border
                border-yellow-500
                text-yellow-500
                px-5
                py-[6px]
                rounded
                text-[12px]
                font-semibold
                hover:bg-yellow-500
                hover:text-black
                transition
              "
            >
              <ShoppingCart size={18} />
              ADD
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SnackCard;