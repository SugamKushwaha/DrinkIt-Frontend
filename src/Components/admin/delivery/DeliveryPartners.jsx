import React, { useEffect, useState } from "react";
import {
  Truck,
  Search,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getDeliveryPartners,
  saveDeliveryPartners,
} from "../../../utils/adminStorage";

const DeliveryPartners = () => {
  const navigate = useNavigate();

  const [partners, setPartners] = useState([]);
  const [search, setSearch] = useState("");

  const load = () => {
    setPartners(getDeliveryPartners());
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = (id) => {
    const updated = partners.map((partner) =>
      partner.id === id
        ? {
            ...partner,
            status:
              partner.status === "ACTIVE"
                ? "INACTIVE"
                : "ACTIVE",
          }
        : partner
    );

    saveDeliveryPartners(updated);
    setPartners(updated);
  };

  const filtered = partners.filter((partner) => {

    const value = search.toLowerCase();

    return (
      partner.name?.toLowerCase().includes(value) ||
      partner.email?.toLowerCase().includes(value) ||
      partner.phone?.toLowerCase().includes(value) ||
      partner.vehicleNumber
        ?.toLowerCase()
        .includes(value)
    );

  });

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Delivery Partners
        </h1>

        <p className="text-gray-500 mt-1">
          Manage active delivery partners.
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
            placeholder="Search delivery partners..."
            className="w-full bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-500"
          />

        </div>

      </div>

      <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-white/5">

              <tr className="text-left text-sm text-gray-400">

                <th className="p-4">Partner</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((partner) => (

                <tr
                  key={partner.id}
                  className="border-t border-white/5"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

                        <Truck
                          size={18}
                          className="text-blue-400"
                        />

                      </div>

                      <div>

                        <p className="font-medium">
                          {partner.name || "-"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {partner.email || "-"}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">
                    {partner.phone || "-"}
                  </td>

                  <td className="p-4">
                    {partner.vehicleType || "-"}{" "}
                    {partner.vehicleNumber || ""}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        partner.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {partner.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/delivery-partners/${partner.id}`
                          )
                        }
                        className="p-2 rounded-lg bg-white/5"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() =>
                          toggleStatus(partner.id)
                        }
                        className="p-2 rounded-lg bg-white/5"
                      >
                        {partner.status === "ACTIVE" ? (
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

      </div>

    </div>
  );
};

export default DeliveryPartners;