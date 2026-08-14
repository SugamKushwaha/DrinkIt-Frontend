import React, { useEffect, useState } from "react";

import {
  User,
  Phone,
  Mail,
  MapPin,
  Bike,
  Save,
  CheckCircle2,
  ShieldCheck,
  Edit3,
  Wifi,
  WifiOff,
} from "lucide-react";

// =====================================================
// SHARED STATUS SETTINGS
// =====================================================

const DELIVERY_STATUS_KEY = "drinkit-delivery-online";

const DELIVERY_STATUS_EVENT = "delivery-status-change";

// =====================================================
// DEFAULT PROFILE
// =====================================================

const defaultProfile = {
  name: "Rahul Kumar",
  email: "rahul@drinkit.com",
  phone: "9876543210",

  address: "MG Road",
  city: "Kanpur",
  state: "Uttar Pradesh",
  pincode: "208001",

  vehicleType: "Bike",
  vehicleNumber: "UP78 AB 1234",

  joiningDate: "10 August 2026",

  status: "ONLINE",
};

// =====================================================
// GET INITIAL STATUS
// =====================================================

const getOnlineStatus = () => {
  const storedStatus = localStorage.getItem(
    DELIVERY_STATUS_KEY
  );

  // If nothing exists, default to ONLINE
  if (storedStatus === null) {
    return true;
  }

  return storedStatus === "true";
};

// =====================================================
// COMPONENT
// =====================================================

const DeliveryProfile = () => {
  // =====================================================
  // PARTNER
  // =====================================================

  const [partner, setPartner] = useState(() => {
    const storedProfile = localStorage.getItem(
      "drinkit-delivery-profile"
    );

    let profile = {
      ...defaultProfile,
      status: getOnlineStatus() ? "ONLINE" : "OFFLINE",
    };

    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);

        profile = {
          ...profile,
          ...parsedProfile,

          // IMPORTANT:
          // Shared online status always wins
          status: getOnlineStatus()
            ? "ONLINE"
            : "OFFLINE",
        };
      } catch (error) {
        console.error(
          "Failed to load delivery profile:",
          error
        );
      }
    }

    return profile;
  });

  // =====================================================
  // SAVED MESSAGE
  // =====================================================

  const [saved, setSaved] = useState(false);

  // =====================================================
  // ONLINE STATUS
  // =====================================================

  const isOnline = partner.status === "ONLINE";

  // =====================================================
  // SYNC STATUS FROM HEADER
  // =====================================================

  useEffect(() => {
    const syncStatus = () => {
      const online = getOnlineStatus();

      setPartner((prev) => ({
        ...prev,
        status: online ? "ONLINE" : "OFFLINE",
      }));
    };

    // Custom event
    window.addEventListener(
      DELIVERY_STATUS_EVENT,
      syncStatus
    );

    // Browser storage event
    window.addEventListener(
      "storage",
      syncStatus
    );

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
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPartner((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  // =====================================================
  // CHANGE ONLINE / OFFLINE
  // =====================================================

  const toggleStatus = () => {
    const newOnlineStatus = !isOnline;

    // ---------------------------------------------
    // Update profile state
    // ---------------------------------------------

    setPartner((prev) => ({
      ...prev,
      status: newOnlineStatus
        ? "ONLINE"
        : "OFFLINE",
    }));

    // ---------------------------------------------
    // Save shared status
    // ---------------------------------------------

    localStorage.setItem(
      DELIVERY_STATUS_KEY,
      String(newOnlineStatus)
    );

    // ---------------------------------------------
    // Notify DeliveryHeader
    // ---------------------------------------------

    window.dispatchEvent(
      new Event(DELIVERY_STATUS_EVENT)
    );

    setSaved(false);
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = () => {
    const profileToSave = {
      ...partner,

      // Always save current shared status
      status: isOnline
        ? "ONLINE"
        : "OFFLINE",
    };

    // Save complete profile
    localStorage.setItem(
      "drinkit-delivery-profile",
      JSON.stringify(profileToSave)
    );

    // Save online status separately
    localStorage.setItem(
      DELIVERY_STATUS_KEY,
      String(isOnline)
    );

    // Notify header
    window.dispatchEvent(
      new Event(DELIVERY_STATUS_EVENT)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // =====================================================
  // INPUT STYLE
  // =====================================================

  const inputClass = `
    mt-2
    h-12
    w-full
    rounded-xl
    border
    border-gray-800
    bg-[#111]
    px-4
    text-sm
    text-white
    outline-none
    transition
    focus:border-yellow-400
  `;

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[1100px]">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-8">

          <p className="text-xs uppercase tracking-wider text-gray-500">
            Delivery Partner
          </p>

          <h1 className="mt-1 text-3xl font-semibold">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your personal and delivery information
          </p>

        </div>

        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <div className="mb-5 rounded-2xl border border-gray-800 bg-[#080808] p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* LEFT */}

            <div className="flex items-center gap-4">

              {/* AVATAR */}

              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-yellow-400
                  text-black
                "
              >
                <User size={34} />
              </div>

              {/* INFO */}

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-2xl font-semibold">
                    {partner.name}
                  </h2>

                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      rounded-full
                      bg-green-400/10
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-green-400
                    "
                  >
                    <CheckCircle2 size={13} />
                    Verified
                  </span>

                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Delivery Partner
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Joined {partner.joiningDate}
                </p>

              </div>

            </div>

            {/* =================================================
                TOP STATUS BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={toggleStatus}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                border
                px-4
                py-3
                transition

                ${
                  isOnline
                    ? `
                      border-green-400/20
                      bg-green-400/10
                      hover:border-green-400/40
                    `
                    : `
                      border-red-400/20
                      bg-red-400/10
                      hover:border-red-400/40
                    `
                }
              `}
            >

              <span
                className={`
                  h-2.5
                  w-2.5
                  rounded-full

                  ${
                    isOnline
                      ? "bg-green-400"
                      : "bg-red-400"
                  }
                `}
              />

              <span
                className={`
                  text-sm
                  font-semibold

                  ${
                    isOnline
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}
              >
                {isOnline
                  ? "Online"
                  : "Offline"}
              </span>

              {isOnline ? (
                <Wifi
                  size={17}
                  className="text-green-400"
                />
              ) : (
                <WifiOff
                  size={17}
                  className="text-red-400"
                />
              )}

            </button>

          </div>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-6
            ">

              <div className="mb-6 flex items-center gap-3">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-yellow-400/10
                ">

                  <User
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Personal Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your basic account information
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="text-sm text-gray-400">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-600
                      "
                    />

                    <input
                      name="name"
                      value={partner.name}
                      onChange={handleChange}
                      className={`${inputClass} pl-11`}
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label className="text-sm text-gray-400">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-600
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      value={partner.email}
                      onChange={handleChange}
                      className={`${inputClass} pl-11`}
                    />

                  </div>

                </div>

                {/* PHONE */}

                <div>

                  <label className="text-sm text-gray-400">
                    Phone
                  </label>

                  <div className="relative">

                    <Phone
                      size={17}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-600
                      "
                    />

                    <input
                      name="phone"
                      value={partner.phone}
                      onChange={handleChange}
                      className={`${inputClass} pl-11`}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                ADDRESS
            ================================================= */}

            <div className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-6
            ">

              <div className="mb-6 flex items-center gap-3">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-yellow-400/10
                ">

                  <MapPin
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Address
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your current address
                  </p>

                </div>

              </div>

              <div>

                <label className="text-sm text-gray-400">
                  Address
                </label>

                <input
                  name="address"
                  value={partner.address}
                  onChange={handleChange}
                  className={inputClass}
                />

              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">

                <div>

                  <label className="text-sm text-gray-400">
                    City
                  </label>

                  <input
                    name="city"
                    value={partner.city}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-400">
                    State
                  </label>

                  <input
                    name="state"
                    value={partner.state}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-400">
                    Pincode
                  </label>

                  <input
                    name="pincode"
                    value={partner.pincode}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                VEHICLE INFORMATION
            ================================================= */}

            <div className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-6
            ">

              <div className="mb-6 flex items-center gap-3">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-yellow-400/10
                ">

                  <Bike
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Vehicle Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Vehicle used for deliveries
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>

                  <label className="text-sm text-gray-400">
                    Vehicle Type
                  </label>

                  <select
                    name="vehicleType"
                    value={partner.vehicleType}
                    onChange={handleChange}
                    className={inputClass}
                  >

                    <option value="Bike">
                      Bike
                    </option>

                    <option value="Scooter">
                      Scooter
                    </option>

                    <option value="Cycle">
                      Cycle
                    </option>

                    <option value="Electric Bike">
                      Electric Bike
                    </option>

                  </select>

                </div>

                <div>

                  <label className="text-sm text-gray-400">
                    Vehicle Number
                  </label>

                  <input
                    name="vehicleNumber"
                    value={partner.vehicleNumber}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                AVAILABILITY
            ================================================= */}

            <div className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-5
            ">

              <div className="mb-5 flex items-center gap-3">

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl

                    ${
                      isOnline
                        ? "bg-green-400/10"
                        : "bg-red-400/10"
                    }
                  `}
                >

                  {isOnline ? (
                    <Wifi
                      size={20}
                      className="text-green-400"
                    />
                  ) : (
                    <WifiOff
                      size={20}
                      className="text-red-400"
                    />
                  )}

                </div>

                <div>

                  <h2 className="font-semibold">
                    Availability
                  </h2>

                  <p
                    className={`text-xs ${
                      isOnline
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {isOnline
                      ? "Available for deliveries"
                      : "Not available for deliveries"}
                  </p>

                </div>

              </div>

              {/* STATUS TOGGLE */}

              <button
                type="button"
                onClick={toggleStatus}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                  transition

                  ${
                    isOnline
                      ? "border-green-400/20 bg-green-400/10"
                      : "border-red-400/20 bg-red-400/10"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <span
                    className={`
                      h-3
                      w-3
                      rounded-full
                      ${
                        isOnline
                          ? "bg-green-400"
                          : "bg-red-400"
                      }
                    `}
                  />

                  <div className="text-left">

                    <p className="text-xs text-gray-500">
                      Current Status
                    </p>

                    <p
                      className={`
                        mt-1
                        text-sm
                        font-semibold
                        ${
                          isOnline
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      `}
                    >
                      {isOnline
                        ? "ONLINE"
                        : "OFFLINE"}
                    </p>

                  </div>

                </div>

                {/* SWITCH */}

                <div
                  className={`
                    relative
                    h-6
                    w-11
                    rounded-full
                    transition

                    ${
                      isOnline
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      transition

                      ${
                        isOnline
                          ? "left-6"
                          : "left-1"
                      }
                    `}
                  />

                </div>

              </button>

              <p className="mt-3 text-xs leading-5 text-gray-600">
                Turn yourself offline when you don't want to
                receive new delivery assignments.
              </p>

            </div>

            {/* =================================================
                VERIFICATION
            ================================================= */}

            <div className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-5
            ">

              <div className="mb-5 flex items-center gap-3">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-400/10
                ">

                  <ShieldCheck
                    size={20}
                    className="text-green-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Verification
                  </h2>

                  <p className="text-xs text-green-400">
                    Account verified
                  </p>

                </div>

              </div>

              <div className="
                rounded-xl
                bg-[#111]
                p-4
              ">

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    size={20}
                    className="text-green-400"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Partner Verification
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Verified Partner
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                VEHICLE SUMMARY
            ================================================= */}

            <div className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-5
            ">

              <h2 className="mb-5 font-semibold">
                Vehicle
              </h2>

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <Bike
                    size={19}
                    className="text-gray-500"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Vehicle Type
                    </p>

                    <p className="mt-1 text-sm">
                      {partner.vehicleType}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Edit3
                    size={18}
                    className="text-gray-500"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Registration
                    </p>

                    <p className="mt-1 text-sm">
                      {partner.vehicleNumber}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                SAVE BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={handleSave}
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-yellow-400
                px-5
                py-3
                font-bold
                text-black
                transition
                hover:bg-yellow-300
              "
            >

              <Save size={18} />

              {saved
                ? "PROFILE SAVED"
                : "SAVE CHANGES"}

            </button>

            {saved && (
              <p className="text-center text-xs text-green-400">
                Your profile has been updated successfully.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default DeliveryProfile;