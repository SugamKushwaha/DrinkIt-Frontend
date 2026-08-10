import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const ProductSlider = ({
  title,
  icon,
  products,
  prevClass,
  nextClass,
  viewAllText,
  viewAllLink,
}) => {
  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">

        {/* TITLE */}
        <div className="flex items-center gap-2">

          <span className="text-xl">
            {icon}
          </span>

          <h2 className="text-white font-bold text-2xl uppercase">
            {title}
          </h2>

        </div>


        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* VIEW ALL */}
          <Link
            to={viewAllLink}
            className="
              text-yellow-500
              text-xs
              font-semibold
              hover:text-yellow-400
              transition
            "
          >
            {viewAllText} →
          </Link>


          {/* PREVIOUS */}
          <button
            className={`
              ${prevClass}
              w-9
              h-9
              border
              border-gray-700
              rounded-full
              flex
              items-center
              justify-center
              text-white
              hover:bg-yellow-500
              hover:text-black
              transition
            `}
          >
            <ChevronLeft size={18} />
          </button>


          {/* NEXT */}
          <button
            className={`
              ${nextClass}
              w-9
              h-9
              border
              border-gray-700
              rounded-full
              flex
              items-center
              justify-center
              text-white
              hover:bg-yellow-500
              hover:text-black
              transition
            `}
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>


      {/* SLIDER */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={4}

        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}

        breakpoints={{
          320: {
            slidesPerView: 2,
          },

          640: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },

          1400: {
            slidesPerView: 4,
          },
        }}
      >

        {products.map((product) => (
          <SwiperSlide key={product.id}>

            <ProductCard
              product={product}
              showButton={false}
              imageHeight="h-55"
              cardHeight="h-[310px]"
            />

          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
};

export default ProductSlider;