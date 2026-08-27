import React, { useEffect, useState } from "react";

import {
  Eye,
  Search,
  Store,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getVendors } from "../../../api/adminApi";

const Vendors = () => {

  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // LOAD VENDORS
  // ==========================================

  const loadVendors = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getVendors();

      setVendors(data || []);

    } catch (error) {

      console.error(
        "Failed to load vendors:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to load vendors."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD ON PAGE OPEN
  // ==========================================

  useEffect(() => {

    loadVendors();

  }, []);


  // ==========================================
  // SEARCH
  // ==========================================

  const filteredVendors = vendors.filter(
    (vendor) => {

      const value = search.toLowerCase();

      return (

        vendor.name
          ?.toLowerCase()
          .includes(value) ||

        vendor.email
          ?.toLowerCase()
          .includes(value) ||

        vendor.phone
          ?.toLowerCase()
          .includes(value)

      );

    }
  );


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="flex items-center justify-center py-20">

        <p className="text-gray-400">
          Loading vendors...
        </p>

      </div>

    );

  }


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Vendor Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage registered DrinkIt vendors.
        </p>

      </div>


      {/* ERROR */}

      {error && (

        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3">

          {error}

        </div>

      )}


      {/* SEARCH */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search vendors..."
            className="w-full bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-500"
          />

        </div>

      </div>


      {/* TABLE */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-white/5">

              <tr className="text-left text-sm text-gray-400">

                <th className="p-4">
                  Vendor
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Phone
                </th>

                <th className="p-4">
                  Joined
                </th>

                <th className="p-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredVendors.map(
                (vendor) => (

                  <tr
                    key={vendor.id}
                    className="border-t border-white/5"
                  >


                    {/* VENDOR */}

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

                            {vendor.name ||
                              "Unnamed Vendor"}

                          </p>

                          <p className="text-xs text-gray-500">

                            ID: {vendor.id}

                          </p>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="p-4">

                      {vendor.email || "-"}

                    </td>


                    {/* PHONE */}

                    <td className="p-4">

                      {vendor.phone || "-"}

                    </td>


                    {/* JOINED */}

                    <td className="p-4 text-gray-500">

                      {vendor.createdAt
                        ? new Date(
                            vendor.createdAt
                          ).toLocaleDateString()
                        : "-"}

                    </td>


                    {/* ACTION */}

                    <td className="p-4">

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

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>


        {/* EMPTY */}

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