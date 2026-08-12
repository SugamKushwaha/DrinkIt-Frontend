import React from "react";
import { CheckCircle2 } from "lucide-react";

const SuccessHeader = ({ orderId, deliveryTime }) => {
  return (
    <div className="text-center mb-8">

      {/* SUCCESS ICON */}

      <div className="relative w-24 h-24 mx-auto">

        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-yellow-400/10
            blur-xl
          "
        />

        <div
          className="
            relative
            w-24
            h-24
            rounded-full
            border-2
            border-yellow-400
            flex
            items-center
            justify-center
          "
        >

          <CheckCircle2
            size={48}
            className="text-yellow-400"
          />

        </div>

      </div>

      {/* TITLE */}

      <h1
        className="
          text-4xl
          md:text-5xl
          font-bold
          mt-7
        "
      >
        ORDER PLACED
      </h1>

      <h2
        className="
          text-4xl
          md:text-5xl
          font-bold
          text-yellow-400
          mt-1
        "
      >
        SUCCESSFULLY!
      </h2>

      <p
        className="
          text-gray-400
          mt-4
          text-sm
          md:text-base
        "
      >
        Thank you for shopping with DrinkIt.
      </p>

      <p
        className="
          text-gray-500
          text-sm
          mt-1
        "
      >
        Your order has been confirmed.
      </p>

      {/* ORDER META */}

      <div
        className="
          max-w-3xl
          mx-auto
          mt-8
          border
          border-gray-800
          rounded-xl
          bg-[#080808]
          p-5
          md:p-6
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          text-left
        "
      >

        {/* ORDER ID */}

        <div>

          <p
            className="
              text-xs
              uppercase
              tracking-wider
              text-gray-500
            "
          >
            Order ID
          </p>

          <p
            className="
              text-yellow-400
              font-semibold
              text-lg
              mt-2
            "
          >
            {orderId}
          </p>

        </div>

        {/* DELIVERY */}

        <div className="md:border-l md:border-gray-800 md:pl-6">

          <p
            className="
              text-xs
              uppercase
              tracking-wider
              text-gray-500
            "
          >
            Estimated Delivery
          </p>

          <p
            className="
              text-yellow-400
              font-semibold
              text-lg
              mt-2
            "
          >
            {deliveryTime}
          </p>

        </div>

      </div>

    </div>
  );
};

export default SuccessHeader;