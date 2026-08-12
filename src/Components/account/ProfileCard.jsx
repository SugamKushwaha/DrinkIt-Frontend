import React from "react";

import {
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
  Camera,
  Pencil,
} from "lucide-react";

const ProfileCard = ({ user }) => {

  return (
    <div
      className="
        border
        border-gray-800
        rounded-2xl
        bg-[#080808]
        p-6
        md:p-7
      "
    >

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          gap-6
        "
      >

        {/* =========================================
            PROFILE IMAGE
        ========================================= */}

        <div className="relative shrink-0">

          <div
            className="
              w-32
              h-32
              rounded-full
              border
              border-yellow-500
              bg-[#111111]
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >

            {user.avatar ? (

              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />

            ) : (

              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-yellow-400
                  flex
                  items-center
                  justify-center
                "
              >

                <span className="text-black text-3xl font-bold">
                  {user.name.charAt(0)}
                </span>

              </div>

            )}

          </div>

          <button
            className="
              absolute
              bottom-1
              right-1
              w-9
              h-9
              rounded-full
              bg-yellow-400
              text-black
              flex
              items-center
              justify-center
              border-4
              border-black
            "
          >
            <Camera size={16} />
          </button>

        </div>

        {/* =========================================
            USER DETAILS
        ========================================= */}

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-2xl font-semibold">
              {user.name}
            </h2>

            {user.verified && (

              <span
                className="
                  flex
                  items-center
                  gap-1
                  text-yellow-400
                  text-xs
                  font-medium
                "
              >

                <ShieldCheck size={15} />

                Verified User

              </span>

            )}

          </div>

          <div className="space-y-2 mt-4">

            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <Mail size={16} />
              {user.email}
            </div>

            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <Phone size={16} />
              {user.phone}
            </div>

            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <CalendarDays size={16} />
              Joined on {user.joinedDate}
            </div>

          </div>

        </div>

        {/* =========================================
            EDIT BUTTON
        ========================================= */}

        <button
          className="
            flex
            items-center
            justify-center
            gap-2
            border
            border-yellow-500
            text-yellow-400
            px-5
            py-3
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
  );
};

export default ProfileCard;