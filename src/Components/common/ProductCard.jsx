import { ShoppingCart, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  addToCart,
  getCart,
} from "../../utils/cartUtils";


const ProductCard = ({
  product,
  showButton = false,
  bordered = false,
}) => {

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [added, setAdded] = useState(false);


  // =====================================================
  // CHECK IF PRODUCT IS ALREADY IN CART
  // =====================================================

  useEffect(() => {

    const cart = getCart();

    const exists = cart.some(
      (item) =>
        String(item.id) === String(product.id)
    );

    setAdded(exists);

  }, [product.id]);


  // =====================================================
  // PRODUCT CLICK
  // =====================================================

  const handleProductClick = () => {

    navigate(`/product/${product.id}`);

  };


  // =====================================================
  // ADD TO CART
  // =====================================================

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


  return (

    <div
      onClick={handleProductClick}
      className={`
        w-full
        bg-black
        overflow-hidden
        cursor-pointer
        ${bordered
          ? "border border-gray-700 rounded-lg"
          : ""
        }
        hover:border-gray-500
        transition
        duration-300
      `}
    >

      {/* =================================================
          IMAGE
      ================================================= */}

      <div
        className="
          w-full
          h-[230px]
          bg-black
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
            transition
            duration-300
            hover:scale-110
          "
        />

      </div>


      {/* =================================================
          SEPARATOR
      ================================================= */}

      <div className="border-t border-gray-700">


        {/* =================================================
            PRODUCT INFO
        ================================================= */}

        <div className="bg-black px-3 py-2">


          {/* NAME */}

          <h3
            className="
              text-white
              text-[15px]
              font-medium
              truncate
            "
          >
            {product.name}
          </h3>


          {/* VOLUME */}

          <p
            className="
              text-gray-400
              text-[13px]
              mt-1
            "
          >
            {product.volume || product.size}
          </p>


          {/* =================================================
              PRICE + BUTTON
          ================================================= */}

          <div
            className="
              flex
              justify-between
              items-center
              mt-2
            "
          >

            {/* PRICE */}

            <span
              className="
                text-white
                text-lg
                font-bold
              "
            >
              ₹ {product.price}
            </span>


            {/* ADD BUTTON */}

            {showButton && (

              <button
                onClick={handleAddToCart}
                className={`
                  flex
                  items-center
                  gap-1
                  px-3
                  py-1
                  text-sm
                  rounded
                  transition

                  ${
                    added
                      ? `
                        bg-green-500
                        text-black
                        border
                        border-green-500
                      `
                      : `
                        border
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
                    <Check size={15} />
                    ADDED
                  </>
                ) : (
                  <>
                    <ShoppingCart size={15} />
                    ADD
                  </>
                )}

              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default ProductCard;