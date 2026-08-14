import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Truck,
  MapPin,
  ArrowRight,
  Clock3,
} from "lucide-react";

import DeliveryStats from "./DeliveryStats";
import DeliveryOrderCard from "./DeliveryOrderCard";

import deliveryOrders from "../../utils/deliveryOrders";

const DeliveryDashboard = () => {

  const navigate = useNavigate();

  // =====================================================
  // STATS
  // =====================================================

  const totalDeliveries =
    deliveryOrders.length;

  const activeDeliveries =
    deliveryOrders.filter(
      (order) =>
        order.status ===
        "OUT_FOR_DELIVERY"
    ).length;

  const completedDeliveries =
    deliveryOrders.filter(
      (order) =>
        order.status === "DELIVERED"
    ).length;

  const todayEarnings =
    deliveryOrders.reduce(
      (sum, order) =>
        sum + Number(order.deliveryFee || 0),
      0
    );

  // =====================================================
  // ACTIVE ORDER
  // =====================================================

  const activeOrder = useMemo(() => {

    return deliveryOrders.find(
      (order) =>
        order.status ===
        "OUT_FOR_DELIVERY"
    );

  }, []);

  // =====================================================
  // READY ORDERS
  // =====================================================

  const readyOrders =
    deliveryOrders.filter(
      (order) =>
        order.status ===
        "READY_FOR_PICKUP"
    );

  return (
    <div
      className="
        min-h-screen
        bg-black
        px-4
        py-6
        text-white
        sm:px-6
        md:px-10
      "
    >

      <div className="mx-auto max-w-[1300px]">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-8">

          <p className="text-xs uppercase tracking-wider text-gray-500">
            Delivery Partner
          </p>

          <h1 className="mt-1 text-3xl font-semibold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your deliveries and earnings
          </p>

        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <DeliveryStats
          totalDeliveries={
            totalDeliveries
          }
          activeDeliveries={
            activeDeliveries
          }
          completedDeliveries={
            completedDeliveries
          }
          todayEarnings={
            todayEarnings
          }
        />

        {/* =================================================
            ACTIVE DELIVERY
        ================================================= */}

        {activeOrder && (

          <div className="mt-6">

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-yellow-400/30
                bg-[#080808]
              "
            >

              <div className="border-b border-gray-800 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-wider text-yellow-400">
                      Active Delivery
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      #{activeOrder.id}
                    </h2>

                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">

                    <Truck size={21} />

                  </div>

                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">

                {/* PICKUP */}

                <div className="rounded-xl bg-[#111] p-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400/10">

                      <Truck
                        size={18}
                        className="text-yellow-400"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-gray-500">
                        Pickup
                      </p>

                      <p className="mt-1 font-medium">
                        {activeOrder.storeName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {activeOrder.storeAddress}
                      </p>

                    </div>

                  </div>

                </div>

                {/* DELIVERY */}

                <div className="rounded-xl bg-[#111] p-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400/10">

                      <MapPin
                        size={18}
                        className="text-green-400"
                      />

                    </div>

                    <div>

                      <p className="text-xs text-gray-500">
                        Deliver To
                      </p>

                      <p className="mt-1 font-medium">
                        {activeOrder.customerName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {activeOrder.deliveryAddress.address},{" "}
                        {activeOrder.deliveryAddress.city}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              <div className="flex flex-col gap-3 border-t border-gray-800 p-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-2 text-sm text-gray-400">

                  <Clock3 size={17} />

                  Estimated delivery:
                  <span className="font-semibold text-white">
                    {activeOrder.estimatedDelivery}
                  </span>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/delivery/orders/${activeOrder.id}`
                    )
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-yellow-400
                    px-5
                    py-3
                    font-bold
                    text-black
                    transition
                    hover:bg-yellow-300
                  "
                >
                  CONTINUE DELIVERY
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            NEW DELIVERY REQUESTS
        ================================================= */}

        <div className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold">
                New Delivery Requests
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Orders ready for pickup
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/delivery/orders")
              }
              className="
                flex
                items-center
                gap-1
                text-sm
                font-semibold
                text-yellow-400
                hover:text-yellow-300
              "
            >
              View All
              <ArrowRight size={16} />
            </button>

          </div>

          {readyOrders.length === 0 ? (

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-10 text-center">

              <Truck
                size={40}
                className="mx-auto mb-3 text-gray-600"
              />

              <p className="text-gray-500">
                No new delivery requests
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {readyOrders.map((order) => (

                <DeliveryOrderCard
                  key={order.id}
                  order={order}
                  onClick={() =>
                    navigate(
                      `/delivery/orders/${order.id}`
                    )
                  }
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default DeliveryDashboard;