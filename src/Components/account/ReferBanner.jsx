import React from "react";

import {
  Gift,
  ArrowRight,
} from "lucide-react";

const ReferBanner = () => {

  return (
    <div
      className="
        border
        border-yellow-500/70
        rounded-xl
        bg-[#0b0b0b]
        p-5
        md:px-7
        flex
        flex-col
        md:flex-row
        md:items-center
        justify-between
        gap-5
      "
    >

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <div
          className="
            w-12
            h-12
            rounded-lg
            bg-yellow-500/10
            text-yellow-400
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Gift size={25} />
        </div>

        <div>

          <h3 className="font-semibold text-lg">
            Refer & Earn Rewards!
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Invite your friends and earn exciting rewards.
          </p>

        </div>

      </div>

      {/* BUTTON */}

      <button
        className="
          flex
          items-center
          justify-center
          gap-2
          bg-yellow-400
          hover:bg-yellow-300
          text-black
          px-6
          py-3
          rounded-lg
          font-semibold
          transition
          shrink-0
        "
      >

        REFER NOW

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default ReferBanner;