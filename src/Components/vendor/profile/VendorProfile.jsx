import React, { useEffect, useState } from "react";

import {
  User,
  Store,
  Phone,
  Mail,
  MapPin,
  Save,
  Building2,
  Clock3,
  CheckCircle2,
  XCircle,
  Power,
} from "lucide-react";

const VendorProfile = () => {
  // =====================================================
  // DEFAULT VENDOR DATA
  // =====================================================

  const defaultVendor = {
    ownerName: "Sugam Kushwaha",
    storeName: "DrinkIt Store",
    email: "vendor@drinkit.com",
    phone: "9876543210",
    address: "MG Road",
    city: "Kanpur",
    state: "Uttar Pradesh",
    pincode: "208001",
    description:
      "Premium drinks and snacks delivered quickly to customers.",
    openingTime: "10:00 AM",
    closingTime: "11:00 PM",
  };

  // =====================================================
  // VENDOR STATE
  // =====================================================

  const [vendor, setVendor] = useState(defaultVendor);

  // =====================================================
  // SHOP STATUS
  // =====================================================

  const [isShopOpen, setIsShopOpen] = useState(true);

  // =====================================================
  // SAVED STATE
  // =====================================================

  const [saved, setSaved] = useState(false);

  // =====================================================
  // LOAD VENDOR DATA
  // =====================================================

  useEffect(() => {
    try {
      // -------------------------------------------------
      // LOAD PROFILE
      // -------------------------------------------------

      const storedVendor = localStorage.getItem(
        "drinkit-vendor-profile"
      );

      if (storedVendor) {
        const parsedVendor = JSON.parse(storedVendor);

        setVendor({
          ...defaultVendor,
          ...parsedVendor,
        });
      }

      // -------------------------------------------------
      // LOAD SHOP STATUS
      // -------------------------------------------------

      const storedShopStatus = localStorage.getItem(
        "drinkit-vendor-shop-status"
      );

      if (storedShopStatus !== null) {
        setIsShopOpen(
          storedShopStatus === "OPEN"
        );
      }
    } catch (error) {
      console.error(
        "Failed to load vendor profile:",
        error
      );
    }
  }, []);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVendor((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = () => {
    try {
      localStorage.setItem(
        "drinkit-vendor-profile",
        JSON.stringify(vendor)
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error(
        "Failed to save vendor profile:",
        error
      );
    }
  };

  // =====================================================
  // OPEN SHOP
  // =====================================================

  const handleOpenShop = () => {
  setIsShopOpen(true);

  localStorage.setItem(
    "drinkit-vendor-shop-status",
    "OPEN"
  );

  window.dispatchEvent(
    new Event("drinkit-shop-status-change")
  );
};

const handleCloseShop = () => {
  const confirmClose = window.confirm(
    "Are you sure you want to close your shop?"
  );

  if (!confirmClose) return;

  setIsShopOpen(false);

  localStorage.setItem(
    "drinkit-vendor-shop-status",
    "CLOSED"
  );

  window.dispatchEvent(
    new Event("drinkit-shop-status-change")
  );
};

  // =====================================================
  // INPUT CLASS
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
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[1100px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-semibold">
            Vendor Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your store and business information
          </p>

        </div>

        {/* =================================================
            PROFILE HEADER
        ================================================= */}

        <div className="mb-5 rounded-2xl border border-gray-800 bg-[#080808] p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            {/* STORE ICON */}

            <div
              className={`
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-2xl
                ${
                  isShopOpen
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-gray-500"
                }
              `}
            >
              <Store size={35} />
            </div>

            {/* STORE INFO */}

            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-2xl font-semibold">
                  {vendor.storeName}
                </h2>

                {/* DYNAMIC STATUS */}

                {isShopOpen ? (
                  <span className="flex items-center gap-1 rounded-full bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-400">

                    <CheckCircle2 size={13} />

                    Open

                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-red-400/10 px-3 py-1 text-xs font-semibold text-red-400">

                    <XCircle size={13} />

                    Closed

                  </span>
                )}

              </div>

              <p className="mt-2 text-sm text-gray-500">
                {vendor.ownerName}
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Vendor Account
              </p>

            </div>

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
                BUSINESS INFORMATION
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-6">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">

                  <Building2
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Business Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your store details
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* OWNER */}

                <div>

                  <label className="text-sm text-gray-400">
                    Owner Name
                  </label>

                  <div className="relative">

                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      name="ownerName"
                      value={vendor.ownerName}
                      onChange={handleChange}
                      className={`${inputClass} pl-11`}
                    />

                  </div>

                </div>

                {/* STORE */}

                <div>

                  <label className="text-sm text-gray-400">
                    Store Name
                  </label>

                  <div className="relative">

                    <Store
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      name="storeName"
                      value={vendor.storeName}
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      type="email"
                      name="email"
                      value={vendor.email}
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <input
                      name="phone"
                      value={vendor.phone}
                      onChange={handleChange}
                      className={`${inputClass} pl-11`}
                    />

                  </div>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="mt-5">

                <label className="text-sm text-gray-400">
                  Store Description
                </label>

                <textarea
                  name="description"
                  value={vendor.description}
                  onChange={handleChange}
                  rows={4}
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-gray-800
                    bg-[#111]
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    focus:border-yellow-400
                  "
                />

              </div>

            </div>

            {/* =================================================
                STORE ADDRESS
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-6">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">

                  <MapPin
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Store Address
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your business location
                  </p>

                </div>

              </div>

              {/* ADDRESS */}

              <div>

                <label className="text-sm text-gray-400">
                  Address
                </label>

                <input
                  name="address"
                  value={vendor.address}
                  onChange={handleChange}
                  className={inputClass}
                />

              </div>

              {/* CITY / STATE / PINCODE */}

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">

                <div>

                  <label className="text-sm text-gray-400">
                    City
                  </label>

                  <input
                    name="city"
                    value={vendor.city}
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
                    value={vendor.state}
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
                    value={vendor.pincode}
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
                STORE STATUS
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

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
                      isShopOpen
                        ? "bg-green-400/10"
                        : "bg-red-400/10"
                    }
                  `}
                >

                  {isShopOpen ? (
                    <CheckCircle2
                      size={20}
                      className="text-green-400"
                    />
                  ) : (
                    <XCircle
                      size={20}
                      className="text-red-400"
                    />
                  )}

                </div>

                <div>

                  <h2 className="font-semibold">
                    Store Status
                  </h2>

                  <p
                    className={`text-xs ${
                      isShopOpen
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {isShopOpen
                      ? "Currently Open"
                      : "Currently Closed"}
                  </p>

                </div>

              </div>

              {/* =================================================
                  STATUS INFO
              ================================================= */}

              <div className="flex items-center gap-3 rounded-xl bg-[#111] p-4">

                <Clock3
                  size={19}
                  className="text-yellow-400"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Store Hours
                  </p>

                  <p className="mt-1 text-sm">
                    {vendor.openingTime} -{" "}
                    {vendor.closingTime}
                  </p>

                </div>

              </div>

              {/* =================================================
                  OPEN / CLOSE BUTTON
              ================================================= */}

              <div className="mt-4">

                {isShopOpen ? (

                  <button
                    onClick={handleCloseShop}
                    className="
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-red-500/40
                      bg-red-500/10
                      font-semibold
                      text-red-400
                      transition
                      hover:bg-red-500
                      hover:text-white
                    "
                  >

                    <Power size={18} />

                    CLOSE SHOP

                  </button>

                ) : (

                  <button
                    onClick={handleOpenShop}
                    className="
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-green-500
                      font-bold
                      text-black
                      transition
                      hover:bg-green-400
                    "
                  >

                    <Power size={18} />

                    OPEN SHOP

                  </button>

                )}

              </div>

            </div>

            {/* =================================================
                CONTACT DETAILS
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <h2 className="mb-5 font-semibold">
                Contact Details
              </h2>

              <div className="space-y-4">

                {/* EMAIL */}

                <div className="flex items-center gap-3">

                  <Mail
                    size={18}
                    className="text-gray-500"
                  />

                  <div className="min-w-0">

                    <p className="text-xs text-gray-500">
                      Email
                    </p>

                    <p className="truncate text-sm">
                      {vendor.email}
                    </p>

                  </div>

                </div>

                {/* PHONE */}

                <div className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="text-gray-500"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Phone
                    </p>

                    <p className="text-sm">
                      {vendor.phone}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                SAVE PROFILE
            ================================================= */}

            <button
              onClick={handleSave}
              className="
                flex
                h-13
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
                Your vendor profile has been updated.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default VendorProfile;