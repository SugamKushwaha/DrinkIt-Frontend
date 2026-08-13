import React from "react";
import {
  Bell,
  Store,
} from "lucide-react";

const VendorHeader = () => {
  return (
    <header className="flex h-[80px] items-center justify-between border-b border-gray-800 bg-[#080808] px-5 md:px-8">

      {/* LEFT */}

      <div>

        <p className="text-xs text-gray-500">
          Welcome back
        </p>

        <h2 className="mt-1 text-lg font-semibold">
          Vendor Dashboard
        </h2>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* STORE STATUS */}

        <div className="hidden items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-2 sm:flex">

          <span className="h-2 w-2 rounded-full bg-green-400" />

          <span className="text-xs text-green-400">
            Store Open
          </span>

        </div>

        {/* NOTIFICATION */}

        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 text-gray-400 hover:border-yellow-400 hover:text-yellow-400">

          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-yellow-400" />

        </button>

        {/* PROFILE */}

        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">

            <p className="text-sm font-semibold">
              DrinkIt Store
            </p>

            <p className="text-xs text-gray-500">
              Vendor
            </p>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black">

            <Store size={19} />

          </div>

        </div>

      </div>

    </header>
  );
};

export default VendorHeader;