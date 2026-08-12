import React from "react";
import { ShoppingBag } from "lucide-react";

const OrderItems = ({ items }) => {

  return (
    <div
      className="
        border
        border-gray-800
        rounded-xl
        bg-[#080808]
        overflow-hidden
      "
    >

      {/* HEADER */}

      <div
        className="
          p-6
          border-b
          border-gray-800
          flex
          items-center
          gap-3
        "
      >

        <ShoppingBag
          size={21}
          className="text-yellow-400"
        />

        <h2 className="text-lg font-semibold">
          Order Summary
        </h2>

      </div>

      {/* ITEMS */}

      <div className="px-6">

        {items.map((item, index) => {

          const itemTotal =
            Number(item.price || 0) *
            Number(item.quantity || 0);

          return (
            <div
              key={item.id}
              className={`
                py-5
                flex
                items-center
                gap-4
                ${
                  index !== items.length - 1
                    ? "border-b border-gray-800"
                    : ""
                }
              `}
            >

              {/* IMAGE */}

              <div
                className="
                  w-16
                  h-20
                  shrink-0
                  rounded-lg
                  border
                  border-gray-800
                  bg-[#0d0d0d]
                  flex
                  items-center
                  justify-center
                  overflow-hidden
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

              <div className="flex-1 min-w-0">

                <h3
                  className="
                    font-medium
                    text-sm
                    md:text-base
                  "
                >
                  {item.name}
                </h3>

                <p className="text-gray-500 text-xs mt-1">
                  {item.volume ||
                    item.size ||
                    "Standard"}
                </p>

                <p className="text-gray-500 text-xs mt-2">
                  Qty: {item.quantity}
                </p>

              </div>

              {/* PRICE */}

              <div className="text-right">

                <p className="font-semibold">
                  ₹
                  {itemTotal.toLocaleString("en-IN")}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default OrderItems;