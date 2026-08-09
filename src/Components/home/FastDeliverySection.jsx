import React from "react";
import { Zap, ChevronRight } from "lucide-react";

import deliveryImage from "../../assets/images/delivery.jpg";

const FastDeliverySection = () => {
  return (
    <section className="bg-black py-6">

      <div className="max-w-[1450px] mx-auto px-5">

        <div
          className="
            relative
            w-full
            min-h-[190px]
            bg-[#080808]
            border
            border-gray-700
            rounded-lg
            overflow-hidden
          "
        >

          {/* IMAGE */}

          <img
            src={deliveryImage}
            alt="Fast delivery"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              opacity-75
            "
          />

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-black/20" />


          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              min-h-[170px]
              flex
              flex-col
              justify-center
              px-7
              lg:px-10
              max-w-[420px]
            "
          >

            {/* TITLE */}

            <div className="flex items-center gap-2">

              <Zap
                size={18}
                className="text-yellow-500"
                fill="currentColor"
              />

              <h2 className="text-white text-xl font-bold uppercase">
                FAST DELIVERY
              </h2>

            </div>


            {/* DESCRIPTION */}

            <p className="text-gray-300 text-sm mt-2 leading-5">

              Your drinks and snacks,
              <br />
              delivered quickly.

            </p>


            {/* BUTTON */}

            <button
              className="
                mt-4
                w-fit
                bg-[#F5B400]
                hover:bg-yellow-400
                text-black
                font-bold
                px-5
                py-2.5
                rounded-md
                flex
                items-center
                gap-2
                text-xs
                transition
              "
            >

              CHECK AVAILABILITY

              <ChevronRight size={15} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default FastDeliverySection;