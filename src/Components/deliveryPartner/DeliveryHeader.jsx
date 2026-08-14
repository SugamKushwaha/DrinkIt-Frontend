import React, { useEffect, useState } from "react";

import {
  Bell,
  CircleUserRound,
} from "lucide-react";

// =====================================================
// SHARED STATUS SETTINGS
// =====================================================

const DELIVERY_STATUS_KEY =
  "drinkit-delivery-online";

const DELIVERY_STATUS_EVENT =
  "delivery-status-change";

// =====================================================
// GET INITIAL STATUS
// =====================================================

const getOnlineStatus = () => {
  const storedStatus = localStorage.getItem(
    DELIVERY_STATUS_KEY
  );

  // Default = ONLINE
  if (storedStatus === null) {
    return true;
  }

  return storedStatus === "true";
};

// =====================================================
// DELIVERY HEADER
// =====================================================

const DeliveryHeader = () => {

  // =====================================================
  // ONLINE STATUS
  // =====================================================

  const [isOnline, setIsOnline] = useState(
    getOnlineStatus
  );

  // =====================================================
  // SYNC STATUS
  // =====================================================

  useEffect(() => {

    const syncStatus = () => {

      const online = getOnlineStatus();

      setIsOnline(online);

    };

    // ---------------------------------------------
    // Listen to profile page
    // ---------------------------------------------

    window.addEventListener(
      DELIVERY_STATUS_EVENT,
      syncStatus
    );

    // ---------------------------------------------
    // Listen to localStorage changes
    // ---------------------------------------------

    window.addEventListener(
      "storage",
      syncStatus
    );

    // ---------------------------------------------
    // Cleanup
    // ---------------------------------------------

    return () => {

      window.removeEventListener(
        DELIVERY_STATUS_EVENT,
        syncStatus
      );

      window.removeEventListener(
        "storage",
        syncStatus
      );

    };

  }, []);

  // =====================================================
  // TOGGLE ONLINE / OFFLINE
  // =====================================================

  const toggleOnline = () => {

    const newStatus = !isOnline;

    // ---------------------------------------------
    // Update Header
    // ---------------------------------------------

    setIsOnline(newStatus);

    // ---------------------------------------------
    // Save shared status
    // ---------------------------------------------

    localStorage.setItem(
      DELIVERY_STATUS_KEY,
      String(newStatus)
    );

    // ---------------------------------------------
    // Notify Profile
    // ---------------------------------------------

    window.dispatchEvent(
      new Event(DELIVERY_STATUS_EVENT)
    );

  };

  // =====================================================
  // UI
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
          Delivery Dashboard
        </h2>

      </div>

      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="flex items-center gap-3">

        {/* =================================================
            ONLINE / OFFLINE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={toggleOnline}
          className={`
            hidden
            items-center
            gap-2
            rounded-full
            border
            px-4
            py-2
            text-xs
            font-semibold
            transition
            sm:flex

            ${
              isOnline
                ? `
                  border-green-400/20
                  bg-green-400/10
                  text-green-400
                  hover:border-green-400/40
                `
                : `
                  border-red-400/20
                  bg-red-400/10
                  text-red-400
                  hover:border-red-400/40
                `
            }
          `}
        >

          {/* STATUS DOT */}

          <span
            className={`
              h-2
              w-2
              rounded-full

              ${
                isOnline
                  ? "bg-green-400"
                  : "bg-red-400"
              }
            `}
          />

          {/* STATUS TEXT */}

          {isOnline
            ? "ONLINE"
            : "OFFLINE"}

        </button>

        {/* =================================================
            NOTIFICATION
        ================================================= */}

        <button
          type="button"
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
              Delivery Partner
            </p>

            <p className="text-xs text-gray-500">
              Sugam
            </p>

          </div>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-yellow-400
              text-black
            "
          >

            <CircleUserRound size={20} />

          </div>

        </div>

      </div>

    </header>
  );
};

export default DeliveryHeader;