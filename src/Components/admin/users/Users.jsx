import React, { useEffect, useState } from "react";

import {
  Users as UsersIcon,
  Search,
} from "lucide-react";

import {
  getUsers,
} from "../../../utils/adminStorage";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const filtered = users.filter((user) => {

    const value = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.phone?.toLowerCase().includes(value)
    );

  });

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-gray-500 mt-1">
          View registered DrinkIt customers.
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
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search customers..."
            className="w-full bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none"
          />

        </div>

      </div>

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

                  <td className="p-4">
                    {user.email || "-"}
                  </td>

                  <td className="p-4">
                    {user.phone || "-"}
                  </td>

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

      </div>

    </div>
  );
};

export default Users;