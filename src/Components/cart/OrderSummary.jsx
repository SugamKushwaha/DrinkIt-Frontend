import React from "react";
import {
  LockKeyhole,
} from "lucide-react";

const OrderSummary = ({
  subtotal,
  deliveryFee,
  discount,
  total,
  onCheckout,
  onContinue,
}) => {

  return (

    <div
      className="
        border
        border-gray-800
        rounded-xl
        p-6
        bg-gray-950/30
      "
    >

      <h2 className="text-xl font-bold">
        Order Summary
      </h2>


      {/* SUBTOTAL */}

      <div className="flex justify-between mt-7">

        <span className="text-gray-400">
          Subtotal
        </span>

        <span>
          ₹{subtotal.toLocaleString("en-IN")}
        </span>

      </div>


      {/* DELIVERY */}

      <div className="flex justify-between mt-4">

        <span className="text-gray-400">
          Delivery Fee
        </span>

        <span>

          {deliveryFee === 0
            ? "FREE"
            : `₹${deliveryFee}`}

        </span>

      </div>


      {/* DISCOUNT */}

      {discount > 0 && (

        <div className="flex justify-between mt-4">

          <span className="text-green-500">
            Discount
          </span>

          <span className="text-green-500">
            -₹
            {discount.toLocaleString("en-IN")}
          </span>

        </div>

      )}


      {/* LINE */}

      <div className="border-t border-gray-800 my-6" />


      {/* TOTAL */}

      <div className="flex items-end justify-between">

        <div>

          <p className="font-semibold">
            Total Amount
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Inclusive of all taxes
          </p>

        </div>

        <span className="text-3xl font-bold">
          ₹{total.toLocaleString("en-IN")}
        </span>

      </div>


      {/* CHECKOUT */}

      <button
        onClick={onCheckout}
        className="
          w-full
          mt-7
          flex
          items-center
          justify-center
          gap-2
          bg-yellow-500
          text-black
          py-4
          rounded-lg
          font-bold
          hover:bg-yellow-400
          transition
        "
      >

        <LockKeyhole size={19} />

        PROCEED TO CHECKOUT

      </button>


      {/* CONTINUE */}

      <button
        onClick={onContinue}
        className="
          w-full
          mt-3
          border
          border-yellow-500
          text-yellow-400
          py-3
          rounded-lg
          font-semibold
          hover:bg-yellow-500
          hover:text-black
          transition
        "
      >

        CONTINUE SHOPPING

      </button>

    </div>
  );
};

export default OrderSummary;