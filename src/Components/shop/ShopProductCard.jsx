import React from "react";
import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

const ShopProductCard = ({ product }) => {
  return (
    <div
      className="
      mt-2
        group
        bg-[#080808]
        border
        border-gray-800
        rounded-lg
        overflow-hidden
        hover:border-yellow-500/60
        transition
        duration-300
      "
    >
      {/* ================= IMAGE ================= */}
      <div
        className="
          relative
          h-[220px]
          bg-gradient-to-b
          from-[#111]
          to-black
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >

        {/* HEART */}
        <button
          className="
            absolute
            top-3
            right-3
            z-10
            w-9
            h-9
            rounded-full
            border
            border-gray-700
            bg-black/60
            flex
            items-center
            justify-center
            text-white
            hover:text-red-500
            hover:border-red-500
            transition
          "
        >
          <Heart size={18} />
        </button>

        {/* PRODUCT IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-full
            object-contain
            p-5
            group-hover:scale-105
            transition-transform
            duration-300
          "
        />
      </div>


      {/* ================= INFORMATION ================= */}
      <div className="p-3">

        {/* NAME */}
        <h3
          className="
            text-white
            font-semibold
            text-base
            truncate
          "
        >
          {product.name}
        </h3>


        {/* VOLUME */}
        <p className="text-gray-400 text-sm mt-1">
          {product.volume}
        </p>


        {/* RATING */}
        <div className="flex items-center gap-2 mt-2">

          <div className="flex items-center gap-1 text-yellow-400">

            <Star
              size={15}
              fill="currentColor"
            />

            <span className="text-sm">
              {product.rating || "4.5"}
            </span>

          </div>

          <span className="text-gray-500 text-sm">
            ({product.reviews || "128"})
          </span>

        </div>


        {/* PRICE + ADD BUTTON */}
        <div className="flex justify-between items-center mt-4">

          <span className="text-white text-xl font-bold">
            ₹{product.price}
          </span>


          <button
            className="
              flex
              items-center
              gap-2
              border
              border-yellow-500
              text-yellow-400
              rounded-md
              px-4
              py-2
              text-sm
              font-semibold
              hover:bg-yellow-500
              hover:text-black
              transition
            "
          >
            <ShoppingCart size={16} />

            ADD
          </button>

        </div>

      </div>

    </div>
  );
};

export default ShopProductCard;