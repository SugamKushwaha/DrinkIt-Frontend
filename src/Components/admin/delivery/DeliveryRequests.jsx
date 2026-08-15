import React, { useEffect, useState } from "react";
import {
  Truck,
  Check,
  X,
} from "lucide-react";

import {
  getDeliveryRequests,
  saveDeliveryRequests,
  addDeliveryPartner,
} from "../../../utils/adminStorage";

const DeliveryRequests = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(getDeliveryRequests());
  }, []);

  const approve = (request) => {

    const updated = requests.map((item) =>
      item.id === request.id
        ? {
            ...item,
            status: "APPROVED",
            reviewedAt: new Date().toISOString(),
          }
        : item
    );

    saveDeliveryRequests(updated);

    addDeliveryPartner({
      ...request,
      requestId: request.id,
      status: "ACTIVE",
    });

    setRequests(updated);
  };

  const reject = (id) => {

    const updated = requests.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "REJECTED",
          }
        : item
    );

    saveDeliveryRequests(updated);
    setRequests(updated);
  };

  const pending = requests.filter(
    (item) => item.status === "PENDING"
  );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Delivery Partner Requests
        </h1>

        <p className="text-gray-500 mt-1">
          Review delivery partner applications.
        </p>
      </div>

      {pending.map((request) => (

        <div
          key={request.id}
          className="bg-[#151515] border border-white/10 rounded-2xl p-6"
        >

          <div className="flex flex-col lg:flex-row justify-between gap-5">

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">

                <Truck
                  className="text-blue-400"
                  size={22}
                />

              </div>

              <div>

                <h3 className="text-lg font-semibold">
                  {request.name || "Delivery Partner"}
                </h3>

                <p className="text-sm text-gray-500">
                  {request.email}
                </p>

                <p className="text-sm text-gray-500">
                  {request.phone}
                </p>

                <p className="text-sm text-gray-500">
                  Vehicle:{" "}
                  {request.vehicleType || "-"}{" "}
                  {request.vehicleNumber || ""}
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => approve(request)}
                className="px-4 py-2 rounded-xl bg-green-600 flex items-center gap-2"
              >
                <Check size={17} />
                Accept
              </button>

              <button
                onClick={() => reject(request.id)}
                className="px-4 py-2 rounded-xl bg-red-600 flex items-center gap-2"
              >
                <X size={17} />
                Reject
              </button>

            </div>

          </div>

        </div>

      ))}

      {pending.length === 0 && (
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-12 text-center text-gray-500">
          No pending delivery partner requests.
        </div>
      )}

    </div>
  );
};

export default DeliveryRequests;