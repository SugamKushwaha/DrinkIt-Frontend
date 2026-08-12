import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
} from "lucide-react";

const AddressCard = ({
  address,
  selected,
  onSelect,
  onUpdate,
}) => {

  // --------------------------------------------------
  // EDIT MODE
  // --------------------------------------------------

  const [isEditing, setIsEditing] = useState(false);

  // --------------------------------------------------
  // LOCAL EDITABLE DATA
  // --------------------------------------------------

  const [formData, setFormData] = useState({
    type: address.type,
    name: address.name,
    address: address.address,
    city: address.city,
    country: address.country,
  });

  // --------------------------------------------------
  // HANDLE INPUT CHANGE
  // --------------------------------------------------

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // --------------------------------------------------
  // EDIT BUTTON
  // --------------------------------------------------

  const handleEdit = (e) => {
    e.stopPropagation();

    // Make sure latest address data is loaded
    setFormData({
      type: address.type,
      name: address.name,
      address: address.address,
      city: address.city,
      country: address.country,
    });

    setIsEditing(true);
  };

  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  const handleSave = (e) => {
    e.stopPropagation();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.country.trim()
    ) {
      alert("Please fill all address fields");
      return;
    }

    // Send updated address to parent
    onUpdate({
      ...address,
      ...formData,
    });

    setIsEditing(false);
  };

  // --------------------------------------------------
  // CANCEL
  // --------------------------------------------------

  const handleCancel = (e) => {
    e.stopPropagation();

    // Reset data
    setFormData({
      type: address.type,
      name: address.name,
      address: address.address,
      city: address.city,
      country: address.country,
    });

    setIsEditing(false);
  };

  // --------------------------------------------------
  // SELECT ADDRESS
  // --------------------------------------------------

  const handleSelect = () => {
    if (!isEditing) {
      onSelect();
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={`
        w-full
        text-left
        rounded-xl
        p-4
        border
        transition
        cursor-pointer
        ${
          selected
            ? "border-yellow-400 bg-yellow-400/[0.04]"
            : "border-white/10 bg-[#0d0d0d] hover:border-white/20"
        }
      `}
    >

      {/* ==================================================
          TOP SECTION
      ================================================== */}

      <div className="flex gap-4">

        {/* RADIO */}

        <div className="pt-1">

          <div
            className={`
              w-5
              h-5
              rounded-full
              border
              flex
              items-center
              justify-center
              ${
                selected
                  ? "border-yellow-400"
                  : "border-gray-600"
              }
            `}
          >

            {selected && (
              <div className="
                w-2.5
                h-2.5
                rounded-full
                bg-yellow-400
              " />
            )}

          </div>

        </div>

        {/* ==================================================
            ADDRESS CONTENT
        ================================================== */}

        <div className="flex-1 min-w-0">

          {/* BADGES */}

          <div className="flex gap-2 mb-3">

            <span className="
              px-2
              py-1
              rounded-md
              bg-yellow-400
              text-black
              text-[10px]
              font-bold
            ">
              {address.type}
            </span>

            {address.default && (
              <span className="
                px-2
                py-1
                rounded-md
                border
                border-yellow-400/30
                text-yellow-400
                text-[10px]
              ">
                DEFAULT
              </span>
            )}

          </div>

          {/* ==================================================
              VIEW MODE
          ================================================== */}

          {!isEditing && (
            <>

              <h3 className="font-semibold">
                {address.name}
              </h3>

              <p className="
                text-sm
                text-gray-400
                mt-1
              ">
                {address.address}
              </p>

              <p className="text-sm text-gray-400">
                {address.city}
              </p>

              <p className="text-sm text-gray-400">
                {address.country}
              </p>

            </>
          )}

          {/* ==================================================
              EDIT MODE
          ================================================== */}

          {isEditing && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="space-y-3"
            >

              {/* NAME */}

              <div>

                <label className="
                  block
                  text-xs
                  text-gray-500
                  mb-1
                ">
                  Full Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    bg-[#080808]
                    border
                    border-white/10
                    focus:border-yellow-400
                    outline-none
                    text-sm
                    text-white
                  "
                />

              </div>

              {/* ADDRESS */}

              <div>

                <label className="
                  block
                  text-xs
                  text-gray-500
                  mb-1
                ">
                  Address
                </label>

                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    handleChange(
                      "address",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    bg-[#080808]
                    border
                    border-white/10
                    focus:border-yellow-400
                    outline-none
                    text-sm
                    text-white
                  "
                />

              </div>

              {/* CITY */}

              <div>

                <label className="
                  block
                  text-xs
                  text-gray-500
                  mb-1
                ">
                  City / State / PIN
                </label>

                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    handleChange(
                      "city",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    bg-[#080808]
                    border
                    border-white/10
                    focus:border-yellow-400
                    outline-none
                    text-sm
                    text-white
                  "
                />

              </div>

              {/* COUNTRY */}

              <div>

                <label className="
                  block
                  text-xs
                  text-gray-500
                  mb-1
                ">
                  Country
                </label>

                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    handleChange(
                      "country",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    bg-[#080808]
                    border
                    border-white/10
                    focus:border-yellow-400
                    outline-none
                    text-sm
                    text-white
                  "
                />

              </div>

            </div>
          )}

        </div>

        {/* ==================================================
            EDIT / SAVE BUTTONS
        ================================================== */}

        <div className="flex gap-2 self-start">

          {!isEditing ? (

            /* EDIT BUTTON */

            <button
              type="button"
              onClick={handleEdit}
              className="
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                text-gray-500
                hover:text-yellow-400
                hover:bg-yellow-400/10
                transition
              "
              title="Edit address"
            >

              <Edit size={17} />

            </button>

          ) : (

            <>

              {/* SAVE */}

              <button
                type="button"
                onClick={handleSave}
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-green-400
                  hover:bg-green-400/10
                  transition
                "
                title="Save changes"
              >

                <Save size={17} />

              </button>

              {/* CANCEL */}

              <button
                type="button"
                onClick={handleCancel}
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:text-red-400
                  hover:bg-red-400/10
                  transition
                "
                title="Cancel"
              >

                <X size={17} />

              </button>

            </>

          )}

        </div>

      </div>

    </div>
  );
};

export default AddressCard;