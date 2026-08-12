import React from "react";

const CheckoutItem = ({ item }) => {

  return (
    <div className="flex gap-3">

      {/* IMAGE */}

      <div className="
        w-[72px]
        h-[80px]
        rounded-xl
        bg-[#080808]
        border
        border-white/10
        flex
        items-center
        justify-center
        shrink-0
      ">

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

      {/* DETAILS */}

      <div className="flex-1 min-w-0">

        <div className="flex justify-between gap-2">

          <div>

            <h3 className="
              text-sm
              font-semibold
              leading-5
            ">
              {item.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {item.volume}
            </p>

          </div>

          <span className="
            font-semibold
            text-sm
            whitespace-nowrap
          ">
            ₹
            {(item.price * item.quantity)
              .toLocaleString("en-IN")}
          </span>

        </div>

        <div className="
          flex
          justify-between
          items-center
          mt-3
        ">

          <span className="text-xs text-gray-500">
            Qty: {item.quantity}
          </span>

        </div>

      </div>

    </div>
  );
};

export default CheckoutItem;