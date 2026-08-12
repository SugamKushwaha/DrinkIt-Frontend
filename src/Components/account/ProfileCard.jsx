import React, { useState } from "react";
import {
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
  Camera,
  Pencil,
  X,
} from "lucide-react";

const ProfileCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(user);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleUpdate = () => {
    setProfile({
      ...profile,
      ...form,
    });

    setIsEditing(false);
  };

  return (
    <>
      {/* PROFILE CARD */}

      <div className="border border-gray-800 rounded-2xl bg-[#080808] p-6 md:p-7">

        <div className="flex flex-col md:flex-row md:items-center gap-6">

          {/* IMAGE */}

          <div className="relative shrink-0">

            <div className="w-32 h-32 rounded-full border border-yellow-500 bg-[#111] flex items-center justify-center overflow-hidden">

              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                  <span className="text-black text-3xl font-bold">
                    {profile.name.charAt(0)}
                  </span>
                </div>
              )}

            </div>

            <button className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-yellow-400 text-black flex items-center justify-center border-4 border-black">
              <Camera size={16} />
            </button>

          </div>

          {/* DETAILS */}

          <div className="flex-1">

            <div className="flex items-center gap-3">

              <h2 className="text-2xl font-semibold">
                {profile.name}
              </h2>

              {profile.verified && (
                <span className="flex items-center gap-1 text-yellow-400 text-xs">
                  <ShieldCheck size={15} />
                  Verified User
                </span>
              )}

            </div>

            <div className="space-y-2 mt-4">

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} />
                {profile.email}
              </div>

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} />
                {profile.phone}
              </div>

              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <CalendarDays size={16} />
                Joined on {profile.joinedDate}
              </div>

            </div>

          </div>

          {/* EDIT */}

          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-2 border border-yellow-500 text-yellow-400 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-yellow-500 hover:text-black transition"
          >
            <Pencil size={16} />
            EDIT PROFILE
          </button>

        </div>
      </div>

      {/* EDIT MODAL */}

      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">

          <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-2xl p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-semibold">
                Edit Profile
              </h2>

              <button onClick={() => setIsEditing(false)}>
                <X className="text-gray-400" />
              </button>

            </div>

            {/* NAME */}

            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Full Name"
              className="w-full p-3 mb-3 bg-black border border-gray-700 rounded-lg outline-none focus:border-yellow-500"
            />

            {/* EMAIL */}

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Email"
              className="w-full p-3 mb-3 bg-black border border-gray-700 rounded-lg outline-none focus:border-yellow-500"
            />

            {/* PHONE */}

            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="Phone Number"
              className="w-full p-3 bg-black border border-gray-700 rounded-lg outline-none focus:border-yellow-500"
            />

            {/* BUTTONS */}

            <div className="flex gap-3 mt-5">

              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 border border-gray-700 py-3 rounded-lg"
              >
                CANCEL
              </button>

              <button
                onClick={handleUpdate}
                className="flex-1 bg-yellow-400 text-black font-semibold py-3 rounded-lg"
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