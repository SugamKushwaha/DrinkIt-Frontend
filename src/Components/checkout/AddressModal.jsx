import React, { useState } from "react";
import { X } from "lucide-react";

const AddressModal = ({
  onClose,
  onSave,
}) => {

  const [form, setForm] = useState({
    type: "HOME",
    name: "",
    address: "",
    city: "",
    country: "India",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.address ||
      !form.city
    ) {
      alert("Please fill all required fields");
      return;
    }

    onSave(form);
  };

  return (
    <div className="
      fixed
      inset-0
      z-50
      bg-black/80
      backdrop-blur-sm
      flex
      items-center
      justify-center
      px-4
    ">

      <div className="
        w-full
        max-w-lg
        bg-[#111111]
        border
        border-white/10
        rounded-2xl
      ">

        {/* HEADER */}

        <div className="flex items-center justify-between p-5 border-b border-white/10">

          <h2 className="text-xl font-bold">
            Add New Address
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >

          <div>

            <label className="text-sm text-gray-400">
              Address Type
            </label>

            <div className="flex gap-2 mt-2">

              {["HOME", "WORK", "OTHER"].map(
                (type) => (

                  <button
                    type="button"
                    key={type}
                    onClick={() =>
                      updateField(
                        "type",
                        type
                      )
                    }
                    className={`
                      px-4
                      py-2
                      rounded-lg
                      border
                      text-sm
                      ${
                        form.type === type
                          ? "border-yellow-400 text-yellow-400"
                          : "border-white/10 text-gray-400"
                      }
                    `}
                  >
                    {type}
                  </button>

                )
              )}

            </div>

          </div>

          <Input
            label="Full Name"
            value={form.name}
            onChange={(value) =>
              updateField("name", value)
            }
            placeholder="Enter your name"
          />

          <Input
            label="Address"
            value={form.address}
            onChange={(value) =>
              updateField("address", value)
            }
            placeholder="House no, street, area"
          />

          <Input
            label="City / State / PIN"
            value={form.city}
            onChange={(value) =>
              updateField("city", value)
            }
            placeholder="City, State - PIN"
          />

          {/* ACTIONS */}

          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                h-12
                rounded-xl
                border
                border-white/10
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex-1
                h-12
                rounded-xl
                bg-yellow-400
                text-black
                font-semibold
              "
            >
              Save Address
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
}) => {

  return (
    <div>

      <label className="block text-sm text-gray-400 mb-2">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="
          w-full
          h-11
          px-4
          rounded-xl
          bg-[#0b0b0b]
          border
          border-white/10
          focus:border-yellow-400
          outline-none
          placeholder:text-gray-600
        "
      />

    </div>
  );
};

export default AddressModal;