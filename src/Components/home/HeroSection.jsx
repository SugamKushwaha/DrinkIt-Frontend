import React from 'react'
import { ChevronRight, ShoppingBag } from "lucide-react";
import heroImg from "../../assets/hero-bg.png"

const HeroSection = () => {
  return (
    <section className="bg-black">
      <div className="w-full pl-14 pr-0 py-0">

        <div className="grid lg:grid-cols-[35%_65%] items-center">

          {/* LEFT */}

          <div>

            <h3 className="text-white font-extrabold leading-none text-2xl lg:text-7xl">
              YOUR NIGHT.
            </h3>

            <h3 className="text-[#F5B400] font-bold leading-none  lg:text-8xl mt-2">
              DELIVERED.
            </h3>

            <p className="text-gray-300 text-lg mt-8 max-w-md leading-8">
              Drinks, snacks & party <br /> essentials delivered fast.
            </p>

            <div className="flex gap-5 mt-10">

              <button className="bg-[#F5B400] text-black font-bold px-8 py-4 rounded-lg flex items-center gap-3 hover:bg-yellow-400 transition">

                <ShoppingBag size={20} />

                SHOP DRINKS

                <ChevronRight size={20} />

              </button>

              <button className="border border-[#F5B400] text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 hover:bg-[#F5B400] hover:text-black transition">

                <ShoppingBag size={20} />

                SHOP SNACKS

                <ChevronRight size={20} />

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-end">

           <img
  src={heroImg}
  alt="DrinkIt Hero"
  className="w-full h-[470px] object-contain"
/>

          </div>

        </div>

      </div>
    </section>
  )
}

export default HeroSection
