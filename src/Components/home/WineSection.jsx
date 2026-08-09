import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import wineData from "../../data/wineData";
import ProductCard from "../common/ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const WineSection = () => {
  return (
    <section className="bg-black py-8">

      <div className="max-w-[1500px] mx-auto px-5">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between mb-3">

          {/* LEFT SIDE */}

          <div className="flex items-center gap-2">

            <span className="text-lg">
              🍷
            </span>

            <h2 className="text-white text-xl font-bold uppercase">
              Wine
            </h2>

          </div>


          {/* RIGHT SIDE */}

          <div className="flex items-center gap-4">

            {/* VIEW ALL */}

            <button
              className="
                text-yellow-500
                text-xs
                font-semibold
                hover:text-yellow-400
                transition
              "
            >
              VIEW ALL WINE →
            </button>


            {/* LEFT ARROW */}

            <button
              className="
                wine-prev
                w-7
                h-7
                flex
                items-center
                justify-center
                text-white
                hover:text-yellow-500
                transition
                cursor-pointer
              "
            >
              <ChevronLeft size={20} />
            </button>


            {/* RIGHT ARROW */}

            <button
              className="
                wine-next
                w-7
                h-7
                flex
                items-center
                justify-center
                text-white
                hover:text-yellow-500
                transition
                cursor-pointer
              "
            >
              <ChevronRight size={20} />
            </button>

          </div>

        </div>


        {/* ================= WINE SLIDER ================= */}

        <Swiper
          modules={[Navigation]}

          navigation={{
            prevEl: ".wine-prev",
            nextEl: ".wine-next",
          }}

          spaceBetween={6}

          slidesPerView={6}

          slidesPerGroup={1}

          speed={500}

          breakpoints={{

            // Mobile
            320: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 6,
            },

            // Small tablet
            640: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 6,
            },

            // Tablet
            768: {
              slidesPerView: 4,
              slidesPerGroup: 1,
              spaceBetween: 6,
            },

            // Laptop
            1024: {
              slidesPerView: 5,
              slidesPerGroup: 1,
              spaceBetween: 6,
            },

            // Desktop
            1280: {
              slidesPerView: 6,
              slidesPerGroup: 1,
              spaceBetween: 6,
            },

          }}
        >

          {wineData.map((product) => (

            <SwiperSlide key={product.id}>

              <ProductCard
                product={product}
                showButton={false}
              />

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
};

export default WineSection;