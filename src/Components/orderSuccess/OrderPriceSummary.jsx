import React from "react";

const OrderPriceSummary = ({
  subtotal,
  deliveryFee,
  discount,
  total,
}) => {

  return (
    <div
      className="
        border
        border-gray-800
        rounded-xl
        bg-[#080808]
        p-6
      "
    >

      {/* SUBTOTAL */}

      <div
        className="
          flex
          justify-between
          text-sm
          text-gray-400
        "
      >

        <span>
          Subtotal
        </span>

        <span className="text-white">
          ₹{subtotal.toLocaleString("en-IN")}
        </span>

      </div>

      {/* DELIVERY */}

      <div
        className="
          flex
          justify-between
          text-sm
          text-gray-400
          mt-4
        "
      >

        <span>
          Delivery Fee
        </span>

        <span
          className={
            deliveryFee === 0
              ? "text-green-500"
              : "text-white"
          }
        >
          {deliveryFee === 0
            ? "FREE"
            : `₹${deliveryFee.toLocaleString("en-IN")}`}
        </span>

      </div>

      {/* DISCOUNT */}

      {discount > 0 && (

        <div
          className="
            flex
            justify-between
            text-sm
            mt-4
          "
        >

          <span className="text-green-500">
            Discount
          </span>

          <span className="text-green-500">
            -₹{discount.toLocaleString("en-IN")}
          </span>

        </div>

      )}

      {/* LINE */}

      <div
        className="
          border-t
          border-gray-800
          my-6
        "
      />

      {/* TOTAL */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <span className="font-semibold">
          Total Paid
        </span>

        <span
          className="
            text-3xl
            font-bold
            text-yellow-400
          "
        >
          ₹{total.toLocaleString("en-IN")}
        </span>

      </div>

      <p className="text-xs text-gray-600 mt-2">
        Inclusive of all taxes
      </p>

    </div>
  );
};

export default OrderPriceSummary;