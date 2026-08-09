import React from "react";
import partyBanner from "../../assets/images/party-banner.png";
import { ShoppingBag, ChevronRight } from "lucide-react";

const PartyBanner = () => {
  return (
    <section className="bg-black py-6">

      <div className="max-w-[1450px] mx-auto px-5">

        <div className="
          relative
          min-h-[180px]
          overflow-hidden
          rounded-lg
          border
          border-gray-700
          bg-[#080808]
        ">

          {/* BACKGROUND IMAGE */}
         <div
  className="
    absolute
    inset-0
    bg-cover
    bg-no-repeat
    opacity-80
  "
  style={{
    backgroundImage: `url(${partyBanner})`,
    backgroundPosition: "60% center",
  }}
/>


          

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/30" />


          {/* CONTENT */}
          <div className="
            relative
            z-10
            min-h-[180px]
            flex
            items-center
            justify-end
            px-8
            lg:px-24
          ">

            <div className="text-center">

              <h2 className="
                text-white
                text-2xl
                lg:text-3xl
                font-extrabold
                uppercase
              ">
                EVERYTHING FOR THE PERFECT NIGHT
              </h2>

              <p className="
                text-gray-300
                text-sm
                lg:text-base
                mt-1
              ">
                Drinks • Snacks • Ice • Mixers • More
              </p>

              <button className="
                mt-4
                bg-[#F5B400]
                hover:bg-yellow-400
                text-black
                font-bold
                px-7
                py-3
                rounded-md
                flex
                items-center
                gap-2
                mx-auto
                transition
              ">

                <ShoppingBag size={16} />

                SHOP PARTY ESSENTIALS

                <ChevronRight size={17} />

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PartyBanner;