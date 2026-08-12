import React from "react";
import { Link } from "react-router-dom";

import navLogo from "../../assets/logos/navLogo.png";

const AuthLayout = ({
  title,
  subtitle,
  children,
  bottomText,
  bottomLinkText,
  bottomLink,
}) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="h-20 border-b border-neutral-800 flex items-center px-6 md:px-10">

        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <img
            src={navLogo}
            alt="DrinkIt"
            className="w-9 h-12 object-contain"
          />

          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            DRINK
            <span className="text-yellow-500">
              IT
            </span>
          </h1>

        </Link>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="flex-1 flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-[450px]">

          {/* TITLE */}

          <div className="text-center mb-8">

            <h1 className="text-3xl md:text-4xl font-bold">
              {title}
            </h1>

            <p className="text-gray-500 mt-3 text-sm">
              {subtitle}
            </p>

          </div>


          {/* FORM */}

          <div
            className="
              border
              border-white/10
              bg-[#0d0d0d]
              rounded-2xl
              p-6
              md:p-8
              shadow-2xl
            "
          >

            {children}

          </div>


          {/* BOTTOM */}

          <p className="text-center text-sm text-gray-500 mt-6">

            {bottomText}{" "}

            <Link
              to={bottomLink}
              className="
                text-yellow-400
                hover:text-yellow-300
                font-medium
                transition
              "
            >
              {bottomLinkText}
            </Link>

          </p>

        </div>

      </main>


      {/* FOOTER */}

      <footer className="text-center py-5 text-xs text-gray-600">
        © {new Date().getFullYear()} DrinkIt. Drink responsibly.
      </footer>

    </div>
  );
};

export default AuthLayout;