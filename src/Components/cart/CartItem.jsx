import React from "react";
import {
  Heart,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onWishlist,
}) => {

  const itemTotal =
    item.price * item.quantity;


  return (

    <div
      className="
        py-5
        border-b
        border-gray-800
        last:border-b-0
      "
    >

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-[1fr_100px_150px_100px]
          gap-5
          items-center
        "
      >

        {/* =================================================
            PRODUCT
        ================================================= */}

        <div className="flex gap-4">

          {/* IMAGE */}

          <div
            className="
              w-[95px]
              h-[120px]
              flex-shrink-0
              bg-gray-950
              border
              border-gray-800
              rounded-lg
              flex
              items-center
              justify-center
            "
          >

            <img
              src={item.image}
              alt={item.name}
              className="
                w-full
                h-full
                object-contain
                p-2
              "
            />

          </div>


          {/* INFO */}

          <div className="flex flex-col justify-center">

            <h3 className="font-semibold text-lg">
              {item.name}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              {item.volume || item.size}
            </p>


            {/* STOCK */}

            <div className="flex items-center gap-2 mt-3">

              <span className="w-2 h-2 rounded-full bg-green-500" />

              <span className="text-green-500 text-sm">
                {item.inStock !== false
                  ? "In Stock"
                  : "Out of Stock"}
              </span>

            </div>


            {/* ACTIONS */}

            <div className="flex items-center gap-5 mt-4">

              <button
                onClick={onWishlist}
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  hover:text-red-500
                  text-sm
                  transition
                "
              >

                <Heart size={16} />

                Move to Wishlist

              </button>


              <button
                onClick={onRemove}
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  hover:text-red-500
                  text-sm
                  transition
                "
              >

                <Trash2 size={16} />

                Remove

              </button>

            </div>

          </div>

        </div>


        {/* =================================================
            PRICE
        ================================================= */}

        <div className="text-lg font-semibold">

          ₹{item.price.toLocaleString("en-IN")}

        </div>


        {/* =================================================
            QUANTITY
        ================================================= */}

        <div
          className="
            flex
            items-center
            w-fit
            border
            border-gray-700
            rounded-lg
            overflow-hidden
          "
        >

          <button
            onClick={onDecrease}
            disabled={item.quantity <= 1}
            className="
              w-11
              h-10
              flex
              items-center
              justify-center
              hover:bg-gray-900
              disabled:opacity-30
            "
          >

            <Minus size={16} />

          </button>


          <span
            className="
              w-12
              h-10
              border-x
              border-gray-700
              flex
              items-center
              justify-center
            "
          >
            {item.quantity}
          </span>


          <button
            onClick={onIncrease}
            className="
              w-11
              h-10
              flex
              items-center
              justify-center
              hover:bg-gray-900
            "
          >

            <Plus size={16} />

          </button>

        </div>


        {/* =================================================
            TOTAL
        ================================================= */}

        <div className="text-lg font-bold">

          ₹{itemTotal.toLocaleString("en-IN")}

        </div>

      </div>

    </div>
  );
};

export default CartItem;