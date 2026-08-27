import React, { useEffect, useState } from "react";

import {
  Users as UsersIcon,
  Search,
} from "lucide-react";

import {
  getUsers,
} from "../../../api/adminApi";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD USERS
  // ==========================================

  const loadUsers = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data || []);

    } catch (error) {

      console.error(
        "Failed to load customers:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to load customers."
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // LOAD ON PAGE OPEN
  // ==========================================

  useEffect(() => {

    loadUsers();

  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const filtered = users.filter((user) => {

    const value = search.toLowerCase();

    return (
      user.name
        ?.toLowerCase()
        .includes(value) ||

      user.email
        ?.toLowerCase()
        .includes(value) ||

      user.phone
        ?.toLowerCase()
        .includes(value)
    );

  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="flex items-center justify-center py-20">

        <p className="text-gray-400">
          Loading customers...
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
          Customers
        </h1>

        <p className="text-gray-500 mt-1">
          View registered DrinkIt customers.
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
            placeholder="Search customers..."
            className="w-full bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none"
          />

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-white/5">

              <tr className="text-left text-sm text-gray-400">

                <th className="p-4">
                  Customer
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

              </tr>

            </thead>

            <tbody>

              {filtered.map((user, index) => (

                <tr
                  key={user.id || index}
                  className="border-t border-white/5"
                >

                  {/* CUSTOMER */}

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">

                        <UsersIcon
                          size={18}
                          className="text-gray-400"
                        />

                      </div>

                      <span>
                        {user.name || "Customer"}
                      </span>

                    </div>

                  </td>

                  {/* EMAIL */}

                  <td className="p-4">

                    {user.email || "-"}

                  </td>

                  {/* PHONE */}

                  <td className="p-4">

                    {user.phone || "-"}

                  </td>

                  {/* JOINED */}

                  <td className="p-4 text-gray-500">

                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "-"}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY */}

        {filtered.length === 0 && (

          <div className="p-12 text-center text-gray-500">

            No customers found.

          </div>

        )}

      </div>

    </div>

  );

};

export default Users;