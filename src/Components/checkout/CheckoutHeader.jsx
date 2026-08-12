import React from "react";
import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutHeader = () => {

  const navigate = useNavigate();

  return (
    <header className="border-b border-white/10 bg-[#0b0b0b]">

      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 h-[72px] flex items-center justify-between">

        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold"
        >
          Drink
          <span className="text-yellow-400">
            It
          </span>
        </button>

        <div className="flex items-center gap-2 text-gray-400">

          <LockKeyhole
            size={17}
            className="text-yellow-400"
          />

          <span className="hidden sm:block">
            Secure Checkout
          </span>

        </div>

      </div>

    </header>
  );
};

export default CheckoutHeader;