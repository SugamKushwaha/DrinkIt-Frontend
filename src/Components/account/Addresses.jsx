import React, { useEffect, useState } from "react";

import {
  MapPin,
  Pencil,
  Trash2,
  Plus,
  X,
} from "lucide-react";

import {
  getAddresses,
  saveAddress as saveAddressApi,
  updateAddress as updateAddressApi,
  deleteAddress as deleteAddressApi,
} from "../../api/userApi";

const Addresses = () => {

  // ==========================================
  // STATES
  // ==========================================

  const [addresses, setAddresses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    addressType: "HOME",
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ==========================================
  // LOAD ADDRESSES
  // ==========================================

  const loadAddresses = async () => {

    try {

      setLoading(true);

      const data = await getAddresses();

      setAddresses(data);

    } catch (error) {

      console.error(
        "Failed to load addresses:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to load addresses"
      );

    } finally {

      setLoading(false);

    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {

    loadAddresses();

  }, []);

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {

    setForm({
      addressType: "HOME",
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    });

  };

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const openAddModal = () => {

    setEditingId(null);

    resetForm();

    setShowModal(true);

  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  const openEditModal = (address) => {

    setEditingId(address.id);

    setForm({
      addressType:
        address.addressType || "HOME",

      fullName:
        address.fullName || "",

      phone:
        address.phone || "",

      addressLine:
        address.addressLine || "",

      city:
        address.city || "",

      state:
        address.state || "",

      pincode:
        address.pincode || "",
    });

    setShowModal(true);
  };

  // ==========================================
  // HANDLE FORM CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  // ==========================================
  // SAVE / UPDATE ADDRESS
  // ==========================================

  const handleSaveAddress = async () => {

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.addressLine.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim()
    ) {

      alert(
        "Please fill all required fields"
      );

      return;
    }

    try {

      setSaving(true);

      if (editingId) {

        // UPDATE

        await updateAddressApi(
          editingId,
          form
        );

      } else {

        // CREATE

        await saveAddressApi(form);

      }

      // Reload addresses from database

      await loadAddresses();

      setShowModal(false);

      setEditingId(null);

      resetForm();

    } catch (error) {

      console.error(
        "Address save failed:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to save address"
      );

    } finally {

      setSaving(false);

    }
  };

  // ==========================================
  // DELETE ADDRESS
  // ==========================================

  const handleDeleteAddress = async (
    addressId
  ) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) {
      return;
    }

    try {

      await deleteAddressApi(addressId);

      // Remove from UI immediately

      setAddresses((previous) =>
        previous.filter(
          (address) =>
            address.id !== addressId
        )
      );

    } catch (error) {

      console.error(
        "Delete address failed:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to delete address"
      );

    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">

        <p className="text-yellow-400">
          Loading addresses...
        </p>

      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      p-6
      md:p-10
    ">

      <div className="
        max-w-[1000px]
        mx-auto
      ">

        {/* HEADER */}

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-4
          mb-8
        ">

          <div>

            <h1 className="
              text-3xl
              font-semibold
            ">
              My Addresses
            </h1>

            <p className="
              text-gray-500
              mt-2
            ">
              Manage your delivery addresses
            </p>

          </div>

          <button
            onClick={openAddModal}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-yellow-400
              text-black
              px-5
              py-3
              rounded-lg
              font-semibold
            "
          >

            <Plus size={18} />

            ADD ADDRESS

          </button>

        </div>

        {/* ADDRESSES */}

        {addresses.length === 0 ? (

          <div className="
            border
            border-gray-800
            rounded-2xl
            p-10
            text-center
          ">

            <MapPin
              size={42}
              className="
                mx-auto
                text-gray-600
                mb-4
              "
            />

            <h2 className="
              text-xl
              font-semibold
            ">
              No Saved Addresses
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Add an address for faster checkout.
            </p>

          </div>

        ) : (

          <div className="
            grid
            md:grid-cols-2
            gap-5
          ">

            {addresses.map((address) => (

              <div
                key={address.id}
                className="
                  border
                  border-gray-800
                  bg-[#080808]
                  rounded-2xl
                  p-6
                "
              >

                {/* HEADER */}

                <div className="
                  flex
                  justify-between
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <MapPin
                      size={20}
                      className="
                        text-yellow-400
                      "
                    />

                    <h3 className="
                      font-semibold
                    ">
                      {address.addressType}
                    </h3>

                  </div>

                  {address.isDefault && (

                    <span className="
                      text-xs
                      text-yellow-400
                    ">
                      DEFAULT
                    </span>

                  )}

                </div>

                {/* DETAILS */}

                <div className="
                  mt-5
                  text-gray-400
                  text-sm
                  space-y-1
                ">

                  <p className="
                    text-white
                    font-medium
                  ">
                    {address.fullName}
                  </p>

                  <p>
                    {address.addressLine}
                  </p>

                  <p>
                    {address.city}
                  </p>

                  <p>
                    {address.state}
                  </p>

                  <p>
                    {address.pincode}
                  </p>

                  <p>
                    {address.phone}
                  </p>

                </div>

                {/* ACTIONS */}

                <div className="
                  flex
                  gap-4
                  mt-5
                ">

                  <button
                    onClick={() =>
                      openEditModal(address)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      text-yellow-400
                      text-sm
                    "
                  >

                    <Pencil size={15} />

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      handleDeleteAddress(
                        address.id
                      )
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      text-red-400
                      text-sm
                    "
                  >

                    <Trash2 size={15} />

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ==========================================
          ADD / EDIT MODAL
      ========================================== */}

      {showModal && (

        <div className="
          fixed
          inset-0
          z-50
          bg-black/70
          flex
          items-center
          justify-center
          px-4
        ">

          <div className="
            w-full
            max-w-lg
            bg-[#111]
            border
            border-gray-800
            rounded-2xl
            p-6
            max-h-[90vh]
            overflow-y-auto
          ">

            {/* HEADER */}

            <div className="
              flex
              justify-between
              items-center
              mb-6
            ">

              <h2 className="
                text-xl
                font-semibold
              ">

                {editingId
                  ? "Edit Address"
                  : "Add Address"}

              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  text-gray-400
                  hover:text-white
                "
              >

                <X size={20} />

              </button>

            </div>

            {/* ADDRESS TYPE */}

            <select
              name="addressType"
              value={form.addressType}
              onChange={handleChange}
              className="
                w-full
                p-3
                mb-3
                rounded-lg
                bg-black
                border
                border-gray-700
                outline-none
              "
            >

              <option value="HOME">
                HOME
              </option>

              <option value="WORK">
                WORK
              </option>

              <option value="OTHER">
                OTHER
              </option>

            </select>

            {/* FULL NAME */}

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="
                w-full
                p-3
                mb-3
                rounded-lg
                bg-black
                border
                border-gray-700
                outline-none
                focus:border-yellow-500
              "
            />

            {/* PHONE */}

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="
                w-full
                p-3
                mb-3
                rounded-lg
                bg-black
                border
                border-gray-700
                outline-none
                focus:border-yellow-500
              "
            />

            {/* ADDRESS */}

            <textarea
              name="addressLine"
              value={form.addressLine}
              onChange={handleChange}
              placeholder="Complete Address"
              rows="3"
              className="
                w-full
                p-3
                mb-3
                rounded-lg
                bg-black
                border
                border-gray-700
                outline-none
                focus:border-yellow-500
              "
            />

            {/* CITY */}

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="
                w-full
                p-3
                mb-3
                rounded-lg
                bg-black
                border
                border-gray-700
                outline-none
                focus:border-yellow-500
              "
            />

            {/* STATE */}

            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="
                w-full
                p-3
                mb-3
                rounded-lg
                bg-black
                border
                border-gray-700
                outline-none
                focus:border-yellow-500
              "
            />

            {/* PINCODE */}

            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="
                w-full
                p-3
                rounded-lg
                bg-black
                border
                border-gray-700
                outline-none
                focus:border-yellow-500
              "
            />

            {/* BUTTONS */}

            <div className="
              flex
              gap-3
              mt-6
            ">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                disabled={saving}
                className="
                  flex-1
                  border
                  border-gray-700
                  py-3
                  rounded-lg
                "
              >
                CANCEL
              </button>

              <button
                onClick={handleSaveAddress}
                disabled={saving}
                className="
                  flex-1
                  bg-yellow-400
                  text-black
                  font-semibold
                  py-3
                  rounded-lg
                  disabled:opacity-50
                "
              >

                {saving
                  ? "SAVING..."
                  : editingId
                  ? "UPDATE"
                  : "SAVE ADDRESS"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Addresses;