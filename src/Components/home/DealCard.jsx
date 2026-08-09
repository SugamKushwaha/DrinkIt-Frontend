import React from "react";
import { ChevronRight } from "lucide-react";

const DealCard = ({ deal }) => {
  return (
    <div
      className="
        relative
        h-[150px]
        overflow-hidden
        rounded-md
        border
        border-gray-700
        bg-[#080808]
        group
      "
    >

      {/* ================= BACKGROUND IMAGE ================= */}

      <img
        src={deal.image}
        alt={deal.title}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
          transition
          duration-500
          group-hover:scale-105
        "
      />

      {/* ================= DARK OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/70
          to-transparent
        "
      />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 h-full flex flex-col justify-center px-4">

        {/* DEAL TYPE */}

        <h2
          className={`text-sm font-extrabold uppercase ${
            deal.theme === "red"
              ? "text-red-500"
              : "text-yellow-400"
          }`}
        >
          {deal.type}
        </h2>


        {/* TITLE */}

        <p className="text-white text-[15px] font-semibold uppercase mt-1">
          {deal.title}
        </p>


        {/* SUBTITLE */}

        {deal.subtitle && (
          <p className="text-gray-300 text-[12px] uppercase mt-0.5">
            {deal.subtitle}
          </p>
        )}


        {/* BUTTON */}

        <button
          className="
            flex
            items-center
            gap-1
            w-fit
            mt-3
            text-yellow-400
            text-[10px]
            font-bold
            uppercase
            hover:text-yellow-300
            transition
          "
        >
          {deal.action}

          <ChevronRight size={12} />
        </button>

      </div>

    </div>
  );
};

export default DealCard;