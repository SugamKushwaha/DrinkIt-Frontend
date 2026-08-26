import React, {
  useEffect,
  useState,
} from "react";

import {
  Mail,
  Phone,
  CalendarDays,
  Camera,
  Pencil,
  X,
} from "lucide-react";

import {
  updateCurrentUser,
} from "../../api/userApi";

import { useAuth } from "../../context/AuthContext";

const ProfileCard = ({ user }) => {

  const {
    checkAuth,
  } = useAuth();

  const [isEditing, setIsEditing] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // ==========================================
  // LOAD USER INTO FORM
  // ==========================================

  useEffect(() => {

    if (user) {

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

    }

  }, [user]);

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleUpdate = async () => {

    try {

      await updateCurrentUser({

        name: form.name,

        email: form.email,

        phone: form.phone,

      });

      /*
       * Reload current user from backend.
       */

      await checkAuth();

      setIsEditing(false);

    } catch (error) {

      console.error(
        "Profile update failed:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to update profile"
      );

    }

  };

  // ==========================================
  // JOIN DATE
  // ==========================================

  const formattedDate =
    user?.createdAt
      ? new Date(
          user.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "Date not available";

  return (
    <>
      {/* PROFILE CARD */}

      <div className="
        border border-gray-800
        rounded-2xl
        bg-[#080808]
        p-6 md:p-7
      ">

        <div className="
          flex flex-col
          md:flex-row
          md:items-center
          gap-6
        ">

          {/* IMAGE */}

          <div className="relative shrink-0">

            <div className="
              w-32 h-32
              rounded-full
              border border-yellow-500
              bg-[#111]
              flex items-center
              justify-center
              overflow-hidden
            ">

              {user?.avatar ? (

                <img
                  src={user.avatar}
                  alt={user.name}
                  className="
                    w-full h-full
                    object-cover
                  "
                />

              ) : (

                <div className="
                  w-16 h-16
                  rounded-full
                  bg-yellow-400
                  flex items-center
                  justify-center
                ">

                  <span className="
                    text-black
                    text-3xl
                    font-bold
                  ">
                    {user?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </span>

                </div>

              )}

            </div>

            <button
              type="button"
              className="
                absolute
                bottom-1
                right-1
                w-9 h-9
                rounded-full
                bg-yellow-400
                text-black
                flex items-center
                justify-center
                border-4
                border-black
              "
            >
              <Camera size={16} />
            </button>

          </div>

          {/* DETAILS */}

          <div className="flex-1">

            <h2 className="
              text-2xl
              font-semibold
            ">
              {user?.name || "User"}
            </h2>

            <div className="
              space-y-2
              mt-4
            ">

              <div className="
                flex items-center
                gap-3
                text-gray-400
                text-sm
              ">
                <Mail size={16} />

                {user?.email ||
                  "Email not available"}
              </div>

              <div className="
                flex items-center
                gap-3
                text-gray-400
                text-sm
              ">
                <Phone size={16} />

                {user?.phone ||
                  "Phone not available"}
              </div>

              <div className="
                flex items-center
                gap-3
                text-gray-400
                text-sm
              ">
                <CalendarDays size={16} />

                Joined on {formattedDate}
              </div>

            </div>

          </div>

          {/* EDIT */}

          <button
            onClick={() =>
              setIsEditing(true)
            }
            className="
              flex items-center
              justify-center
              gap-2
              border border-yellow-500
              text-yellow-400
              px-5 py-3
              rounded-lg
              text-sm
              font-semibold
              hover:bg-yellow-500
              hover:text-black
              transition
            "
          >

            <Pencil size={16} />

            EDIT PROFILE

          </button>

        </div>

      </div>

      {/* EDIT MODAL */}

      {isEditing && (

        <div className="
          fixed inset-0
          z-50
          bg-black/70
          flex items-center
          justify-center
          px-4
        ">

          <div className="
            w-full
            max-w-md
            bg-[#111]
            border border-gray-800
            rounded-2xl
            p-6
          ">

            <div className="
              flex
              justify-between
              items-center
              mb-5
            ">

              <h2 className="
                text-xl
                font-semibold
              ">
                Edit Profile
              </h2>

              <button
                onClick={() =>
                  setIsEditing(false)
                }
              >
                <X className="
                  text-gray-400
                " />
              </button>

            </div>

            {/* NAME */}

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Full Name"
              className="
                w-full
                p-3
                mb-3
                bg-black
                border border-gray-700
                rounded-lg
                outline-none
                focus:border-yellow-500
              "
            />

            {/* EMAIL */}

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              className="
                w-full
                p-3
                mb-3
                bg-black
                border border-gray-700
                rounded-lg
                outline-none
                focus:border-yellow-500
              "
            />

            {/* PHONE */}

            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              placeholder="Phone Number"
              className="
                w-full
                p-3
                bg-black
                border border-gray-700
                rounded-lg
                outline-none
                focus:border-yellow-500
              "
            />

            {/* BUTTONS */}

            <div className="
              flex
              gap-3
              mt-5
            ">

              <button
                onClick={() =>
                  setIsEditing(false)
                }
                className="
                  flex-1
                  border border-gray-700
                  py-3
                  rounded-lg
                "
              >
                CANCEL
              </button>

              <button
                onClick={handleUpdate}
                className="
                  flex-1
                  bg-yellow-400
                  text-black
                  font-semibold
                  py-3
                  rounded-lg
                "
              >
                UPDATE
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default ProfileCard;