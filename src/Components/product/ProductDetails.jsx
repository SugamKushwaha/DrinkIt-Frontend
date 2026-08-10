import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
} from "lucide-react";

import products from "../../data/products";

const ProductDetails = () => {

  // ================= GET PRODUCT ID =================

  const { id } = useParams();

  const navigate = useNavigate();


  // ================= FIND PRODUCT =================

  const product = products.find(
    (item) => item.id === Number(id)
  );


  // ================= PRODUCT NOT FOUND =================

  if (!product) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-3xl font-bold">
            Product Not Found
          </h1>

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
            "
          >
            Back to Shop
          </button>

        </div>

      </div>
    );
  }


  return (

    <div className="min-h-screen bg-black text-white">

      {/* ================= BACK BUTTON ================= */}

      <div className="max-w-7xl mx-auto px-5 pt-6">

        <button
          onClick={() => navigate("/shop")}
          className="
            flex
            items-center
            gap-2
            text-gray-400
            hover:text-white
            transition
          "
        >
          <ArrowLeft size={18} />

          Back to Shop

        </button>

      </div>


      {/* ================= PRODUCT SECTION ================= */}

      <section className="max-w-7xl mx-auto px-5 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">


          {/* ================= PRODUCT IMAGE ================= */}

          <div
            className="
              relative
              bg-gray-950
              border
              border-gray-800
              rounded-2xl
              min-h-[550px]
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >

            {/* WISHLIST */}

            <button
              className="
                absolute
                top-5
                right-5
                w-11
                h-11
                rounded-full
                border
                border-gray-700
                bg-black
                flex
                items-center
                justify-center
                hover:text-red-500
                hover:border-red-500
                transition
              "
            >
              <Heart size={20} />
            </button>


            {/* IMAGE */}

            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                h-[500px]
                object-contain
                p-10
              "
            />

          </div>


          {/* ================= PRODUCT INFORMATION ================= */}

          <div className="flex flex-col justify-center">


            {/* CATEGORY */}

            <p className="text-yellow-500 uppercase tracking-wider text-sm font-semibold">
              {product.category}
            </p>


            {/* NAME */}

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              {product.name}
            </h1>


            {/* BRAND */}

            <p className="text-gray-400 mt-3 text-lg">
              {product.brand}
            </p>


            {/* RATING */}

            <div className="flex items-center gap-3 mt-5">

              <div
                className="
                  flex
                  items-center
                  gap-1
                  text-yellow-400
                "
              >

                <Star
                  size={18}
                  fill="currentColor"
                />

                <span className="font-semibold">
                  {product.rating}
                </span>

              </div>

              <span className="text-gray-500">
                ({product.reviews} reviews)
              </span>

            </div>


            {/* PRICE */}

            <div className="flex items-center gap-4 mt-7">

              <span className="text-4xl font-bold">
                ₹{product.price}
              </span>

              {product.oldPrice && (
                <span className="text-gray-500 line-through text-xl">
                  ₹{product.oldPrice}
                </span>
              )}

              {product.discount && (
                <span className="text-green-500 font-semibold">
                  {product.discount}% OFF
                </span>
              )}

            </div>


            {/* VOLUME */}

            <div className="mt-7">

              <p className="text-gray-400 mb-2">
                Volume
              </p>

              <button
                className="
                  border
                  border-yellow-500
                  text-yellow-400
                  px-5
                  py-3
                  rounded-lg
                  font-semibold
                "
              >
                {product.volume}
              </button>

            </div>


            {/* QUANTITY */}

            <div className="mt-7">

              <p className="text-gray-400 mb-2">
                Quantity
              </p>

              <div className="flex items-center">

                <button
                  className="
                    w-11
                    h-11
                    border
                    border-gray-700
                    flex
                    items-center
                    justify-center
                    rounded-l-lg
                  "
                >
                  <Minus size={16} />
                </button>


                <div
                  className="
                    w-14
                    h-11
                    border-y
                    border-gray-700
                    flex
                    items-center
                    justify-center
                  "
                >
                  1
                </div>


                <button
                  className="
                    w-11
                    h-11
                    border
                    border-gray-700
                    flex
                    items-center
                    justify-center
                    rounded-r-lg
                  "
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>


            {/* BUTTONS */}

            <div className="flex gap-4 mt-8">

              <button
                className="
                  flex-1
                  flex
                  items-center
                  justify-center
                  gap-2
                  border
                  border-yellow-500
                  text-yellow-400
                  py-4
                  rounded-xl
                  font-semibold
                  hover:bg-yellow-500
                  hover:text-black
                  transition
                "
              >

                <ShoppingCart size={20} />

                Add to Cart

              </button>


              <button
                className="
                  flex-1
                  bg-yellow-500
                  text-black
                  py-4
                  rounded-xl
                  font-semibold
                  hover:bg-yellow-400
                  transition
                "
              >
                Buy Now
              </button>

            </div>


            {/* DESCRIPTION */}

            <div className="mt-8 border-t border-gray-800 pt-6">

              <h2 className="text-xl font-semibold">
                Description
              </h2>

              <p className="text-gray-400 mt-3 leading-7">
                {product.description}
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  );
};

export default ProductDetails;