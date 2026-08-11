import React, { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import allProducts from "../../data/allProducts";
import {
  getWishlist,
  removeFromWishlist,
} from "../../utils/wishlist";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlistProducts, setWishlistProducts] = useState([]);

  // Load wishlist
  const loadWishlist = () => {
    const wishlistIds = getWishlist();

    const products = allProducts.filter((product) =>
      wishlistIds.some(
        (id) => String(id) === String(product.id)
      )
    );

    setWishlistProducts(products);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  // Remove product
  const handleRemove = (id) => {
    removeFromWishlist(id);
    loadWishlist();
  };

  return (
    <div className="min-h-screen bg-black text-white px-5 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center gap-3 mb-8">

          <Heart
            size={30}
            className="text-yellow-500"
            fill="currentColor"
          />

          <div>
            <h1 className="text-3xl font-bold">
              My Wishlist
            </h1>

            <p className="text-gray-500 mt-1">
              {wishlistProducts.length} products saved
            </p>
          </div>

        </div>


        {/* EMPTY WISHLIST */}

        {wishlistProducts.length === 0 && (

          <div className="
            min-h-[400px]
            flex
            flex-col
            items-center
            justify-center
            border
            border-gray-800
            rounded-2xl
          ">

            <Heart
              size={60}
              className="text-gray-700"
            />

            <h2 className="text-2xl font-semibold mt-5">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Save products you love here.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="
                mt-6
                bg-yellow-500
                text-black
                px-6
                py-3
                rounded-lg
                font-semibold
                hover:bg-yellow-400
              "
            >
              Continue Shopping
            </button>

          </div>

        )}


        {/* PRODUCTS */}

        {wishlistProducts.length > 0 && (

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
          ">

            {wishlistProducts.map((product) => (

              <div
                key={product.id}
                className="
                  border
                  border-gray-800
                  rounded-xl
                  overflow-hidden
                  bg-gray-950
                  hover:border-gray-600
                  transition
                "
              >

                {/* IMAGE */}

                <div
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                  className="
                    relative
                    h-[280px]
                    bg-black
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                  "
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full
                      h-full
                      object-contain
                      p-8
                    "
                  />


                  {/* REMOVE */}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(product.id);
                    }}
                    className="
                      absolute
                      top-4
                      right-4
                      w-10
                      h-10
                      rounded-full
                      bg-black
                      border
                      border-gray-700
                      flex
                      items-center
                      justify-center
                      text-red-500
                      hover:border-red-500
                    "
                  >
                    <Trash2 size={17} />
                  </button>

                </div>


                {/* INFORMATION */}

                <div className="p-5">

                  <p className="text-yellow-500 text-sm">
                    {product.brand}
                  </p>

                  <h2 className="
                    text-lg
                    font-semibold
                    mt-1
                    truncate
                  ">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {product.volume}
                  </p>


                  {/* RATING */}

                  <div className="flex items-center gap-2 mt-3">

                    <span className="text-yellow-400">
                      ★
                    </span>

                    <span>
                      {product.rating}
                    </span>

                    <span className="text-gray-500">
                      ({product.reviews})
                    </span>

                  </div>


                  {/* PRICE */}

                  <div className="
                    flex
                    items-center
                    justify-between
                    mt-4
                  ">

                    <span className="text-xl font-bold">
                      ₹{product.price}
                    </span>

                    {product.discount && (
                      <span className="text-green-500 text-sm">
                        {product.discount}% OFF
                      </span>
                    )}

                  </div>


                  {/* BUTTON */}

                  <button
                    onClick={() =>
                      navigate(`/product/${product.id}`)
                    }
                    className="
                      w-full
                      mt-5
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-yellow-500
                      text-black
                      py-3
                      rounded-lg
                      font-semibold
                      hover:bg-yellow-400
                    "
                  >

                    <ShoppingCart size={18} />

                    View Product

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Wishlist;