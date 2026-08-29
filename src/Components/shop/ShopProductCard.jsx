import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Heart,
  ShoppingCart,
  Star,
  Check,
} from "lucide-react";

import {
  addToCart,
  getCart,
} from "../../utils/cartUtils";
import { useAuth } from "../../context/AuthContext";

const ShopProductCard = ({ product }) => {
  const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

  // ================================
  // STATE
  // ================================

  const [addedToCart, setAddedToCart] = useState(false);

  // ================================
  // CHECK CART ON LOAD
  // ================================

  useEffect(() => {
    const checkCart = () => {
      const cart = getCart();

      const exists = cart.some(
        (item) =>
          String(item.id) === String(product.id)
      );

      setAddedToCart(exists);
    };

    checkCart();

    // Listen for cart changes
    window.addEventListener(
      "cartUpdated",
      checkCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        checkCart
      );
    };
  }, [product.id]);

  // ================================
  // PRODUCT DETAILS
  // ================================

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  // ================================
  // ADD TO CART
  // ================================

 const handleAddToCart = (e) => {

  // Stop parent div from opening product page
  e.stopPropagation();

  // User is not logged in
  if (!isAuthenticated) {
    navigate("/login", {
      state: {
        message: "Please login to add products to your cart.",
      },
    });

    return;
  }

  // User is logged in → add product
  addToCart(product);

  // Change button to ADDED
  setAdded(true);
};

  // ================================
  // WISHLIST
  // ================================

  const handleWishlist = (e) => {
    e.stopPropagation();

    console.log("Wishlist:", product);
  };

  // ================================
  // RETURN
  // ================================

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

          {/* PRICE */}

          <span className="text-white text-xl font-bold">
            ₹{product.price}
          </span>

          {/* ADD BUTTON */}

          <button
            onClick={handleAddToCart}
            className={`
              flex
              items-center
              gap-2
              rounded-md
              px-4
              py-2
              text-sm
              font-semibold
              transition

              ${
                addedToCart
                  ? `
                    bg-green-500
                    text-white
                    border
                    border-green-500
                    hover:bg-green-400
                  `
                  : `
                    border
                    border-yellow-500
                    text-yellow-400
                    hover:bg-yellow-500
                    hover:text-black
                  `
              }
            `}
          >

            {addedToCart ? (
              <>
                <Check size={16} />
                ADDED
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                ADD
              </>
            )}

          </button>

        </div>

      </div>

    </div>
  );
};

export default ShopProductCard;