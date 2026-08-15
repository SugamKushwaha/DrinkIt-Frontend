import React, { useEffect, useState } from "react";
import { Eye, Search, Store, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getVendors,
  saveVendors,
} from "../../../utils/adminStorage";

const Vendors = () => {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");

  const loadVendors = () => {
    setVendors(getVendors());
  };

  useEffect(() => {
    loadVendors();

    window.addEventListener(
      "drinkit-admin-data-updated",
      loadVendors
    );

    return () =>
      window.removeEventListener(
        "drinkit-admin-data-updated",
        loadVendors
      );
  }, []);

  const toggleStatus = (id) => {
    const updated = vendors.map((vendor) =>
      vendor.id === id
        ? {
            ...vendor,
            status:
              vendor.status === "ACTIVE"
                ? "INACTIVE"
                : "ACTIVE",
          }
        : vendor
    );

    saveVendors(updated);
    setVendors(updated);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const value = search.toLowerCase();

    return (
      vendor.businessName?.toLowerCase().includes(value) ||
      vendor.ownerName?.toLowerCase().includes(value) ||
      vendor.email?.toLowerCase().includes(value) ||
      vendor.phone?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Vendor Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage approved DrinkIt vendors.
        </p>
      </div>

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="w-full bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-500"
          />

        </div>

      </div>

      <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-white/5">

              <tr className="text-left text-sm text-gray-400">

                <th className="p-4">Vendor</th>
                <th className="p-4">Owner</th>
                <th className="p-4">Phone</th>
                <th className="p-4">City</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredVendors.map((vendor) => (

                <tr
                  key={vendor.id}
                  className="border-t border-white/5"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <Store
                          size={19}
                          className="text-red-500"
                        />
                      </div>

                      <div>
                        <p className="font-medium">
                          {vendor.businessName || "Unnamed Vendor"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {vendor.email}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    {vendor.ownerName || "-"}
                  </td>

                  <td className="p-4">
                    {vendor.phone || "-"}
                  </td>

                  <td className="p-4">
                    {vendor.city || "-"}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        vendor.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {vendor.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/vendors/${vendor.id}`
                          )
                        }
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() =>
                          toggleStatus(vendor.id)
                        }
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                      >
                        {vendor.status === "ACTIVE" ? (
                          <XCircle
                            size={17}
                            className="text-red-400"
                          />
                        ) : (
                          <CheckCircle
                            size={17}
                            className="text-green-400"
                          />
                        )}
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredVendors.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No vendors found.
          </div>
        )}

      </div>

    </div>
  );
};

export default Vendors;