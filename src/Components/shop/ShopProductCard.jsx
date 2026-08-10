import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";


const ShopProductCard = ({ product }) => {

  const navigate = useNavigate();


  // ================= PRODUCT DETAILS =================

  const handleProductClick = () => {

    navigate(`/product/${product.id}`);

  };


  // ================= ADD TO CART =================

  const handleAddToCart = (e) => {

    e.stopPropagation();

    console.log("Add to cart:", product);

  };


  // ================= WISHLIST =================

  const handleWishlist = (e) => {

    e.stopPropagation();

    console.log("Wishlist:", product);

  };


  return (

    <div
      onClick={handleProductClick}
      className="
        group
        bg-black
        border
        border-gray-800
        rounded-xl
        overflow-hidden
        cursor-pointer
        hover:border-gray-600
        transition
        duration-300
      "
    >

      {/* ================= IMAGE ================= */}

      <div
        className="
          relative
          w-full
          h-[260px]
          bg-black
          overflow-hidden
        "
      >

        {/* HEART */}

        <button
          onClick={handleWishlist}
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


        {/* PRICE + ADD */}

        <div className="flex justify-between items-center mt-4">

          <span className="text-white text-xl font-bold">
            ₹{product.price}
          </span>


          <button
            onClick={handleAddToCart}
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