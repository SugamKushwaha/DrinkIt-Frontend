import React from "react";
import { Link } from "react-router-dom";

import shopBg from "../../assets/images/shop-bg.png";

const ShopHeader = () => {
  return (
    <section className="relative h-[220px] overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-right
          ml-100
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${shopBg})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/80
          to-black/20
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1450px] mx-auto px-5 py-7">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs mb-2">

          <Link
            to="/"
            className="text-yellow-500 hover:text-yellow-400"
          >
            Home
          </Link>

          <span className="text-gray-500">
            /
          </span>

          <span className="text-gray-400">
            Shop
          </span>

        </div>


        {/* TITLE */}
        <h1 className="text-white text-5xl font-extrabold">
          SHOP
        </h1>


        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm mt-2">
          Explore our wide range of drinks, snacks and party essentials.
        </p>

      </div>

    </section>
  );
};

export default ShopHeader;