import React from "react";
import { Link } from "react-router-dom";

import navLogo from "../../assets/logos/navLogo.png";

const AuthHeader = () => {
  return (
    <header
      className="
        h-20
        bg-black
        border-b
        border-neutral-800
        flex
        items-center
        justify-between
        px-6
        md:px-10
      "
    >

      {/* =========================================
          LOGO
      ========================================= */}

      <Link
        to="/"
        className="
          flex
          items-center
          gap-2
        "
      >

        <img
          src={navLogo}
          alt="DrinkIt"
          className="w-10 h-12 object-contain"
        />

        <h1
          className="
            text-white
            text-2xl
            md:text-3xl
            font-bold
            tracking-wide
          "
        >
          DRINK
          <span className="text-yellow-500">
            IT
          </span>
        </h1>

      </Link>


      {/* =========================================
          BACK TO HOME
      ========================================= */}

      <Link
        to="/"
        className="
          text-sm
          text-gray-400
          hover:text-yellow-400
          transition
        "
      >
        Back to Home
      </Link>

    </header>
  );
};

export default AuthHeader;