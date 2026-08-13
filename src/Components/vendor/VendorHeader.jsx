import React, { useEffect, useState } from "react";
import {
  Bell,
  Store,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const VendorHeader = () => {

  // =====================================================
  // SHOP STATUS
  // =====================================================

  const [isShopOpen, setIsShopOpen] = useState(() => {
    const status = localStorage.getItem(
      "drinkit-vendor-shop-status"
    );

    return status !== "CLOSED";
  });

  // =====================================================
  // LISTEN FOR SHOP STATUS CHANGE
  // =====================================================

  useEffect(() => {

    const updateShopStatus = () => {

      const status = localStorage.getItem(
        "drinkit-vendor-shop-status"
      );

      setIsShopOpen(status !== "CLOSED");
    };

    // Custom event
    window.addEventListener(
      "drinkit-shop-status-change",
      updateShopStatus
    );

    // Storage event
    window.addEventListener(
      "storage",
      updateShopStatus
    );

    return () => {

      window.removeEventListener(
        "drinkit-shop-status-change",
        updateShopStatus
      );

      window.removeEventListener(
        "storage",
        updateShopStatus
      );

    };

  }, []);

  // =====================================================
  // HEADER
  // =====================================================

  return (
    <header
      className="
        flex
        h-[80px]
        items-center
        justify-between
        border-b
        border-gray-800
        bg-[#080808]
        px-5
        md:px-8
      "
    >

      {/* =================================================
          LEFT
      ================================================= */}

      <div>

        <p className="text-xs text-gray-500">
          Welcome back
        </p>

        <h2 className="mt-1 text-lg font-semibold">
          Vendor Dashboard
        </h2>

      </div>

      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="flex items-center gap-4">

        {/* =================================================
            SHOP STATUS
        ================================================= */}

        {isShopOpen ? (

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-green-400/20
              bg-green-400/10
              px-3
              py-2
              sm:flex
            "
          >

            <CheckCircle2
              size={14}
              className="text-green-400"
            />

            <span className="text-xs text-green-400">
              Store Open
            </span>

          </div>

        ) : (

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-red-400/20
              bg-red-400/10
              px-3
              py-2
              sm:flex
            "
          >

            <XCircle
              size={14}
              className="text-red-400"
            />

            <span className="text-xs text-red-400">
              Store Closed
            </span>

          </div>

        )}

        {/* =================================================
            NOTIFICATION
        ================================================= */}

        <button
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-gray-800
            text-gray-400
            transition
            hover:border-yellow-400
            hover:text-yellow-400
          "
        >

          <Bell size={19} />

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-yellow-400
            "
          />

        </button>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">

            <p className="text-sm font-semibold">
              DrinkIt Store
            </p>

            <p className="text-xs text-gray-500">
              Vendor
            </p>

          </div>

          <div
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              ${
                isShopOpen
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-800 text-gray-400"
              }
            `}
          >

            <Store size={19} />

          </div>

        </div>

      </div>

    </header>
  );
};

export default VendorHeader;