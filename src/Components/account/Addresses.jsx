import React, { useState } from "react";
import { MapPin, Pencil, Trash2, Plus, X } from "lucide-react";
import Navbar from "../layout/Navbar";

const Addresses = () => {
  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem("drinkit-addresses") || "[]")
  );

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    type: "HOME",
    name: "",
    address: "",
    city: "",
    country: "India",
    phone: "",
  });

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      type: "HOME",
      name: "",
      address: "",
      city: "",
      country: "India",
      phone: "",
    });

    setShowModal(true);
  };

  const openEditModal = (address) => {
    setEditingId(address.id);
    setForm(address);
    setShowModal(true);
  };

  const saveAddress = () => {
    if (!form.name || !form.address || !form.city || !form.phone) {
      alert("Please fill all required fields");
      return;
    }

    let updated;

    if (editingId) {
      updated = addresses.map((address) =>
        address.id === editingId
          ? { ...form, id: editingId }
          : address
      );
    } else {
      updated = [
        ...addresses,
        {
          ...form,
          id: Date.now(),
          default: addresses.length === 0,
        },
      ];
    }

    setAddresses(updated);

    localStorage.setItem(
      "drinkit-addresses",
      JSON.stringify(updated)
    );

    setShowModal(false);
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter(
      (address) => address.id !== id
    );

    setAddresses(updated);

    localStorage.setItem(
      "drinkit-addresses",
      JSON.stringify(updated)
    );
  };

  return (
    
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
       
      <div className="max-w-[1000px] mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-semibold">
              My Addresses
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your delivery addresses
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-3 rounded-lg font-semibold"
          >
            <Plus size={18} />
            ADD ADDRESS
          </button>

        </div>

        {/* ADDRESSES */}

        {addresses.length === 0 ? (

          <div className="border border-gray-800 rounded-2xl p-10 text-center">

            <MapPin
              size={42}
              className="mx-auto text-gray-600 mb-4"
            />

            <h2 className="text-xl font-semibold">
              No Saved Addresses
            </h2>

            <p className="text-gray-500 mt-2">
              Add an address for faster checkout.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-5">

            {addresses.map((address) => (

              <div
                key={address.id}
                className="border border-gray-800 bg-[#080808] rounded-2xl p-6"
              >

                <div className="flex justify-between">

                  <div className="flex items-center gap-3">
                    <MapPin
                      size={20}
                      className="text-yellow-400"
                    />

                    <h3 className="font-semibold">
                      {address.type}
                    </h3>
                  </div>

                  {address.default && (
                    <span className="text-xs text-yellow-400">
                      DEFAULT
                    </span>
                  )}

                </div>

                <div className="mt-5 text-gray-400 text-sm space-y-1">

                  <p className="text-white font-medium">
                    {address.name}
                  </p>

                  <p>{address.address}</p>
                  <p>{address.city}</p>
                  <p>{address.country}</p>
                  <p>{address.phone}</p>

                </div>

                <div className="flex gap-4 mt-5">

                  <button
                    onClick={() => openEditModal(address)}
                    className="flex items-center gap-2 text-yellow-400 text-sm"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="flex items-center gap-2 text-red-400 text-sm"
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

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">

          <div className="w-full max-w-lg bg-[#111] border border-gray-800 rounded-2xl p-6">

            {/* MODAL HEADER */}

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Address" : "Add Address"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

            </div>

            {/* TYPE */}

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
              className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 outline-none"
            >
              <option value="HOME">HOME</option>
              <option value="WORK">WORK</option>
              <option value="OTHER">OTHER</option>
            </select>

            {/* NAME */}

            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Full Name"
              className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 outline-none focus:border-yellow-500"
            />

            {/* ADDRESS */}

            <textarea
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
              placeholder="Complete Address"
              rows="3"
              className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 outline-none focus:border-yellow-500"
            />

            {/* CITY */}

            <input
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              placeholder="City / State / PIN Code"
              className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 outline-none focus:border-yellow-500"
            />

            {/* PHONE */}

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="Phone Number"
              className="w-full p-3 rounded-lg bg-black border border-gray-700 outline-none focus:border-yellow-500"
            />

            {/* BUTTONS */}

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-700 py-3 rounded-lg"
              >
                CANCEL
              </button>

              <button
                onClick={saveAddress}
                className="flex-1 bg-yellow-400 text-black font-semibold py-3 rounded-lg"
              >
                {editingId ? "UPDATE" : "SAVE ADDRESS"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Addresses;