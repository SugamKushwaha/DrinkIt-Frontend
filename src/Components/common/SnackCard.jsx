import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Check,
} from "lucide-react";

import {
  addToCart,
  getCart,
} from "../../utils/cartUtils";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SnackCard = ({ product }) => {

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  // =====================================================
  // CART STATE
  // =====================================================

  const [added, setAdded] = useState(false);

  // =====================================================
  // CHECK WHETHER PRODUCT IS ALREADY IN CART
  // =====================================================

  const checkCart = () => {

    const cart = getCart();

    const exists = cart.some(
      (item) =>
        String(item.id) === String(product.id)
    );

    setAdded(exists);
  };

  // =====================================================
  // CHECK ON COMPONENT LOAD
  // =====================================================

  useEffect(() => {

    checkCart();

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

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = (e) => {

    // Prevent parent click/navigation
    e.stopPropagation();

    // =================================================
    // USER NOT LOGGED IN
    // =================================================

    if (!isAuthenticated) {

      navigate("/login", {
        state: {
          message:
            "Please login to add products to your cart.",
        },
      });

      return;
    }

    // =================================================
    // USER LOGGED IN
    // =================================================

    addToCart(product);

    setAdded(true);
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
        w-full
        h-[130px]
        bg-[#0e0d07]
        border
        border-gray-700
        rounded-md
        overflow-hidden
        hover:border-yellow-500
        transition
        duration-300
      "
    >

      {/* =================================================
          CARD CONTENT
      ================================================= */}

      <div className="flex h-full">

        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            w-[65%]
            h-full
            bg-[#0e0d07]
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >

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

        {/* =================================================
            DETAILS
        ================================================= */}

        <div
          className="
            w-[55%]
            px-2
            py-1
            flex
            flex-col
            justify-between
          "
        >

          {/* NAME */}

          <h3
            className="
              text-white
              text-[14px]
              font-medium
              leading-tight
              line-clamp-2
            "
          >
            {product.name}
          </h3>

          {/* PRICE */}

          <div className="flex items-center justify-between gap-1">

            <span
              className="
                text-white
                text-[18px]
                font-semibold
              "
            >
              ₹ {product.price}
            </span>

          </div>

          {/* ADD TO CART */}

          <div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={added}
              className={`
                flex
                items-center
                justify-center
                gap-2
                border
                px-5
                py-[6px]
                rounded
                text-[12px]
                font-semibold
                transition

                ${
                  added
                    ? `
                      border-green-500
                      bg-green-500
                      text-black
                      cursor-default
                    `
                    : `
                      border-yellow-500
                      text-yellow-500
                      hover:bg-yellow-500
                      hover:text-black
                    `
                }
              `}
            >

              {added ? (
                <>
                  <Check size={17} />
                  ADDED
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  ADD
                </>
              )}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SnackCard;