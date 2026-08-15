import React, { useEffect, useState } from "react";
import {
  Check,
  X,
  Eye,
  Clock,
  Store,
} from "lucide-react";

import {
  getVendorRequests,
  saveVendorRequests,
  addVendor,
} from "../../../utils/adminStorage";

const VendorRequests = () => {
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    setRequests(getVendorRequests());
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const approveRequest = (request) => {
    const updatedRequests = requests.map((item) =>
      item.id === request.id
        ? {
            ...item,
            status: "APPROVED",
            reviewedAt: new Date().toISOString(),
          }
        : item
    );

    saveVendorRequests(updatedRequests);

    addVendor({
      ...request,
      requestId: request.id,
      status: "ACTIVE",
    });

    setRequests(updatedRequests);
  };

  const rejectRequest = (id) => {
    const updatedRequests = requests.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "REJECTED",
            reviewedAt: new Date().toISOString(),
          }
        : item
    );

    saveVendorRequests(updatedRequests);
    setRequests(updatedRequests);
  };

  const pending = requests.filter(
    (item) => item.status === "PENDING"
  );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Vendor Requests
        </h1>

        <p className="text-gray-500 mt-1">
          Review vendor registration requests.
        </p>
      </div>

      <div className="grid gap-5">

        {pending.map((request) => (

          <div
            key={request.id}
            className="bg-[#151515] border border-white/10 rounded-2xl p-6"
          >

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <Store
                    className="text-red-500"
                    size={22}
                  />
                </div>

                <div>

                  <h3 className="font-semibold text-lg">
                    {request.businessName ||
                      "Vendor Request"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Owner: {request.ownerName || "-"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {request.email || "-"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {request.phone || "-"}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-2"
                >
                  <Eye size={17} />
                  Details
                </button>

                <button
                  onClick={() =>
                    approveRequest(request)
                  }
                  className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <Check size={17} />
                  Accept
                </button>

                <button
                  onClick={() =>
                    rejectRequest(request.id)
                  }
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 flex items-center gap-2"
                >
                  <X size={17} />
                  Reject
                </button>

              </div>

            </div>

            <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-gray-500">

              <Clock size={14} />

              Submitted{" "}
              {request.createdAt
                ? new Date(
                    request.createdAt
                  ).toLocaleString()
                : "-"}

            </div>

          </div>

        ))}

      </div>

      {pending.length === 0 && (
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-12 text-center">

          <Check
            size={40}
            className="mx-auto text-green-500"
          />

          <h3 className="mt-4 font-semibold">
            No pending requests
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            All vendor requests have been reviewed.
          </p>

        </div>
      )}

    </div>
  );
};

export default VendorRequests;