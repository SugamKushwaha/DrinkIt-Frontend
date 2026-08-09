import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import snacksData from "../../data/snacksData";
import SnackCard from "../common/SnackCard";

import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const SnackSection = () => {
  return (
    <section className="bg-black py-8">

      <div className="max-w-[1450px] mx-auto px-5">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-center mb-5">

          <h2 className="text-white text-2xl font-bold uppercase">
             <Link className="hover:text-amber-500" to="/shop?category=snacks">
 PERFECT WITH YOUR DRINK→
</Link>
          </h2>

        </div>


        {/* ================= SLIDER ================= */}

        <div className="relative">

          {/* LEFT ARROW */}

          <button
            className="
              snack-prev
              absolute
              left-[-25px]
              top-1/2
              -translate-y-1/2
              z-20
              w-8
              h-8
              flex
              items-center
              justify-center
              text-white
              hover:text-yellow-500
              transition
            "
          >
            <ChevronLeft size={22} />
          </button>


          {/* SWIPER */}

          <Swiper
            modules={[Navigation]}

            navigation={{
              prevEl: ".snack-prev",
              nextEl: ".snack-next",
            }}

            spaceBetween={8}

            slidesPerView={6}

            slidesPerGroup={1}

            speed={500}

            watchOverflow={true}

            breakpoints={{

              // Mobile
              320: {
                slidesPerView: 2,
                spaceBetween: 8,
              },

              // Small tablet
              640: {
                slidesPerView: 3,
                spaceBetween: 8,
              },

              // Tablet
              768: {
                slidesPerView: 4,
                spaceBetween: 8,
              },

              // Laptop
              1024: {
                slidesPerView: 5,
                spaceBetween: 8,
              },

              // Desktop
              1280: {
                slidesPerView: 6,
                spaceBetween: 8,
              },

            }}
          >

            {snacksData.map((product) => (

              <SwiperSlide key={product.id}>

                <SnackCard
                  product={product}
                />

              </SwiperSlide>

            ))}

          </Swiper>


          {/* RIGHT ARROW */}

          <button
            className="
              snack-next
              absolute
              right-[-25px]
              top-1/2
              -translate-y-1/2
              z-20
              w-8
              h-8
              flex
              items-center
              justify-center
              text-white
              hover:text-yellow-500
              transition
            "
          >
            <ChevronRight size={22} />
          </button>

        </div>

      </div>

    </section>
  );
};

export default SnackSection;