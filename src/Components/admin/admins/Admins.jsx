import React, { useEffect, useState } from "react";

import {
  ShieldCheck,
  Plus,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getAdmins,
  saveAdmins,
} from "../../../utils/adminStorage";

const Admins = () => {

  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);

  const load = () => {
    setAdmins(getAdmins());
  };

  useEffect(() => {
    load();
  }, []);

  const removeAdmin = (id) => {

    if (
      !window.confirm(
        "Remove this admin?"
      )
    ) {
      return;
    }

    const updated = admins.filter(
      (admin) => admin.id !== id
    );

    saveAdmins(updated);

    setAdmins(updated);
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Admin Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage DrinkIt administrators.
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/admin/admins/add")
          }
          className="bg-red-600 px-5 py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Admin
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {admins.map((admin) => (

          <div
            key={admin.id}
            className="bg-[#151515] border border-white/10 rounded-2xl p-5"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">

                <ShieldCheck
                  className="text-red-500"
                  size={22}
                />

              </div>

              <div>

                <h3 className="font-semibold">
                  {admin.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {admin.email}
                </p>

              </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <span className="px-3 py-1 rounded-full bg-white/5 text-xs">
                {admin.role || "ADMIN"}
              </span>

              {admin.role !== "SUPER_ADMIN" && (

                <button
                  onClick={() =>
                    removeAdmin(admin.id)
                  }
                  className="p-2 rounded-lg bg-red-500/10 text-red-400"
                >
                  <Trash2 size={17} />
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Admins;