import React from "react";
import { ShoppingBag, ChevronRight } from "lucide-react";

import buildNightImage from "../../assets/images/build-night.jpg";

const BuildNightSection = () => {
  return (
    <section className="bg-black py-6">

      <div className="max-w-[1450px] mx-auto px-5">

        <div
          className="
            relative
            w-full
            min-h-[190px]
            bg-black
            border
            border-gray-700
            rounded-lg
            overflow-hidden
          "
        >

          {/* ================= HEADER ================= */}

          <div className="absolute  left-0 right-0 z-20 ml-40 ">

            <h2 className="text-white text-2xl  font-bold uppercase">
              BUILD YOUR NIGHT
            </h2>

          </div>


          {/* ================= CONTENT ================= */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] mt-1 min-h-[170px]">


            {/* ================= STEPS ================= */}

            <div className="flex items-center px-4 lg:px-5 pt-5">

              <div className="grid grid-cols-3 gap-3 w-full">

                {/* STEP 1 */}

                <div className="bg-[#111111] border  rounded-md p-3">

                  <div className="text-yellow-500 text-sm font-bold">
                    01
                  </div>

                  <p className="text-white text-[9px] uppercase font-semibold mt-1">
                    Choose Your Drink
                  </p>

                  <div className="mt-3 space-y-2">

                    <p className="text-gray-300 text-[10px]">
                      🍺 Beer
                    </p>

                    <p className="text-gray-300 text-[10px]">
                      🥃 Whisky
                    </p>

                    <p className="text-gray-300 text-[10px]">
                      🍷 Wine
                    </p>

                  </div>

                </div>


                {/* STEP 2 */}

                <div className="bg-[#111111] border  rounded-md p-3">

                  <div className="text-yellow-500 text-sm font-bold">
                    02
                  </div>

                  <p className="text-white text-[9px] uppercase font-semibold mt-1">
                    Add Snacks
                  </p>

                  <div className="mt-3 space-y-2">

                    <p className="text-gray-300 text-[10px]">
                      🥔 Chips
                    </p>

                    <p className="text-gray-300 text-[10px]">
                      🌮 Nachos
                    </p>

                    <p className="text-gray-300 text-[10px]">
                      🥜 Namkeen
                    </p>

                  </div>

                </div>


                {/* STEP 3 */}

                <div className="bg-[#111111] border  rounded-md p-3">

                  <div className="text-yellow-500 text-sm font-bold">
                    03
                  </div>

                  <p className="text-white text-[9px] uppercase font-semibold mt-1">
                    Add Essentials
                  </p>

                  <div className="mt-3 space-y-2">

                    <p className="text-gray-300 text-[10px]">
                      🧊 Ice
                    </p>

                    <p className="text-gray-300 text-[10px]">
                      🥤 Mixers
                    </p>

                    <p className="text-gray-300 text-[10px]">
                      🍹 Soft Drinks
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= IMAGE + BUTTON ================= */}

            <div className="relative flex items-center justify-center">

              <img
                src={buildNightImage}
                alt="Build your night"
                className="
                  absolute
                  inset-0
                  w-full
                  h-47
                  object-cover
                  opacity-80
                "
              />

              <div className="relative z-10 flex items-end justify-center h-full pb-4">

                <button
                  className="
                    bg-[#F5B400]
                    hover:bg-yellow-400
                    text-black
                    font-bold
                    px-7
                    py-2.5
                    rounded-md
                    flex
                    items-center
                    gap-2
                    text-sm
                    transition
                  "
                >

                  <ShoppingBag size={15} />

                  BUILD MY ORDER

                  <ChevronRight size={16} />

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default BuildNightSection;