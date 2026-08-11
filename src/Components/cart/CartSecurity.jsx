import React from "react";
import {
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";

const CartSecurity = () => {

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
        border
        border-gray-800
        rounded-xl
        p-6
        mt-5
      "
    >

      {/* SAFE */}

      <div className="flex items-center gap-4">

        <ShieldCheck
          size={30}
          className="text-yellow-500"
        />

        <div>

          <h3 className="font-semibold">
            Safe & Secure
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            100% secure payment and authentic products
          </p>

        </div>

      </div>


      {/* PACKAGING */}

      <div className="flex items-center gap-4">

        <LockKeyhole
          size={30}
          className="text-yellow-500"
        />

        <div>

          <h3 className="font-semibold">
            Secure Packaging
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Carefully packed and delivered safely
          </p>

        </div>

      </div>

    </div>

  );
};

export default CartSecurity;