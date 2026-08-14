import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Package,
  Clock3,
  Truck,
  CheckCircle2,
  MapPin,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

const DeliveryOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const storedOrders = JSON.parse(
        localStorage.getItem("drinkit-orders") || "[]"
      );

      /*
       * Delivery partner should mainly see orders
       * which are ready for pickup or already assigned
       * to delivery.
       */

      const deliveryOrders = storedOrders.filter((order) =>
        [
          "READY_FOR_PICKUP",
          "OUT_FOR_DELIVERY",
          "DELIVERED",
        ].includes(order.status)
      );

      setOrders(deliveryOrders);
    } catch (error) {
      console.error("Failed to load delivery orders:", error);
      setOrders([]);
    }
  };

  // =====================================================
  // STATUS UPDATE
  // =====================================================

  const updateOrderStatus = (orderId, newStatus) => {
    const storedOrders = JSON.parse(
      localStorage.getItem("drinkit-orders") || "[]"
    );

    const updatedOrders = storedOrders.map((order) => {
      if (String(order.id) !== String(orderId)) {
        return order;
      }

      return {
        ...order,
        status: newStatus,

        // Useful for future backend integration
        deliveryPartnerStatus: newStatus,
        deliveryUpdatedAt: new Date().toISOString(),
      };
    });

    localStorage.setItem(
      "drinkit-orders",
      JSON.stringify(updatedOrders)
    );

    loadOrders();
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        String(order.id)
          .toLowerCase()
          .includes(searchText) ||
        String(
          order.customerName ||
            order.userName ||
            "Customer"
        )
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "ALL" ||
        order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return "bg-green-400/10 text-green-400";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-400/10 text-orange-400";

      case "DELIVERED":
        return "bg-blue-400/10 text-blue-400";

      default:
        return "bg-gray-400/10 text-gray-400";
    }
  };

  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText = (status) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return "Ready for Pickup";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      default:
        return status;
    }
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return <Package size={16} />;

      case "OUT_FOR_DELIVERY":
        return <Truck size={16} />;

      case "DELIVERED":
        return <CheckCircle2 size={16} />;

      default:
        return <Clock3 size={16} />;
    }
  };

  // =====================================================
  // ACTION
  // =====================================================

  const handlePrimaryAction = (order) => {
    if (order.status === "READY_FOR_PICKUP") {
      updateOrderStatus(order.id, "OUT_FOR_DELIVERY");
      return;
    }

    if (order.status === "OUT_FOR_DELIVERY") {
      updateOrderStatus(order.id, "DELIVERED");
      return;
    }

    navigate(`/delivery/orders/${order.id}`);
  };

  // =====================================================
  // ACTION TEXT
  // =====================================================

  const getActionText = (status) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return "PICKUP ORDER";

      case "OUT_FOR_DELIVERY":
        return "MARK DELIVERED";

      case "DELIVERED":
        return "VIEW DETAILS";

      default:
        return "VIEW ORDER";
    }
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const readyCount = orders.filter(
    (order) => order.status === "READY_FOR_PICKUP"
  ).length;

  const activeCount = orders.filter(
    (order) => order.status === "OUT_FOR_DELIVERY"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[1250px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-gray-500">
              Delivery Partner
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Delivery Orders
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your pickups and deliveries
            </p>

          </div>

          <button
            onClick={loadOrders}
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-gray-800
              bg-[#080808]
              px-4
              py-3
              text-sm
              font-semibold
              text-gray-300
              transition
              hover:border-yellow-400
              hover:text-yellow-400
            "
          >
            <Clock3 size={17} />

            REFRESH
          </button>

        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* READY */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Ready for Pickup
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {readyCount}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-400/10">

                <Package
                  size={22}
                  className="text-green-400"
                />

              </div>

            </div>

          </div>

          {/* ACTIVE */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Active Deliveries
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {activeCount}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10">

                <Truck
                  size={22}
                  className="text-orange-400"
                />

              </div>

            </div>

          </div>

          {/* DELIVERED */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Delivered
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {deliveredCount}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10">

                <CheckCircle2
                  size={22}
                  className="text-blue-400"
                />

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            FILTER BAR
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-800 bg-[#080808] p-4 lg:flex-row">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                h-11
                w-full
                rounded-xl
                border
                border-gray-800
                bg-[#111]
                pl-11
                pr-4
                text-sm
                text-white
                outline-none
                transition
                focus:border-yellow-400
              "
            />

          </div>

          {/* FILTER */}

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="
              h-11
              rounded-xl
              border
              border-gray-800
              bg-[#111]
              px-4
              text-sm
              text-white
              outline-none
              focus:border-yellow-400
            "
          >

            <option value="ALL">
              All Orders
            </option>

            <option value="READY_FOR_PICKUP">
              Ready for Pickup
            </option>

            <option value="OUT_FOR_DELIVERY">
              Out for Delivery
            </option>

            <option value="DELIVERED">
              Delivered
            </option>

          </select>

        </div>

        {/* =================================================
            ORDERS
        ================================================= */}

        <div className="space-y-4">

          {filteredOrders.length === 0 ? (

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-12 text-center">

              <Package
                size={45}
                className="mx-auto mb-4 text-gray-700"
              />

              <h2 className="text-lg font-semibold">
                No Delivery Orders
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Orders ready for delivery will appear here.
              </p>

            </div>

          ) : (

            filteredOrders.map((order) => {

              const items = order.items || [];

              const totalQuantity = items.reduce(
                (sum, item) =>
                  sum + Number(item.quantity || 1),
                0
              );

              return (

                <div
                  key={order.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-800
                    bg-[#080808]
                    transition
                    hover:border-gray-700
                  "
                >

                  {/* TOP */}

                  <div className="flex flex-col gap-4 border-b border-gray-800 p-5 md:flex-row md:items-center md:justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="font-semibold">
                          #{order.id}
                        </h2>

                        <span
                          className={`
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${getStatusStyle(
                              order.status
                            )}
                          `}
                        >
                          {getStatusIcon(order.status)}

                          {getStatusText(
                            order.status
                          )}
                        </span>

                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        {order.orderDate || "Recently"}
                      </p>

                    </div>

                    <div className="text-left md:text-right">

                      <p className="text-xs text-gray-500">
                        Order Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-yellow-400">
                        ₹
                        {Number(
                          order.total || 0
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[1fr_1fr_180px]">

                    {/* CUSTOMER */}

                    <div>

                      <p className="mb-3 text-xs uppercase tracking-wider text-gray-600">
                        Customer
                      </p>

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10">

                          <Package
                            size={19}
                            className="text-yellow-400"
                          />

                        </div>

                        <div>

                          <p className="text-sm font-semibold">
                            {order.customerName ||
                              order.userName ||
                              "Customer"}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {totalQuantity}{" "}
                            {totalQuantity === 1
                              ? "item"
                              : "items"}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* ADDRESS */}

                    <div>

                      <p className="mb-3 text-xs uppercase tracking-wider text-gray-600">
                        Delivery Address
                      </p>

                      <div className="flex items-start gap-3">

                        <MapPin
                          size={18}
                          className="mt-0.5 shrink-0 text-gray-500"
                        />

                        <div className="text-sm text-gray-300">

                          <p>
                            {order.address?.address ||
                              "Address not available"}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">

                            {order.address?.city || ""}
                            
                            {order.address?.pincode
                              ? ` - ${order.address.pincode}`
                              : ""}

                          </p>

                        </div>

                      </div>

                    </div>

                    {/* ACTION */}

                    <div className="flex items-center lg:justify-end">

                      <button
                        onClick={() =>
                          handlePrimaryAction(order)
                        }
                        className={`
                          flex
                          h-11
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          px-4
                          text-sm
                          font-bold
                          transition
                          lg:w-auto
                          ${
                            order.status ===
                            "DELIVERED"
                              ? "border border-gray-700 text-gray-300 hover:border-white hover:text-white"
                              : "bg-yellow-400 text-black hover:bg-yellow-300"
                          }
                        `}
                      >

                        {getActionText(
                          order.status
                        )}

                        <ArrowRight size={17} />

                      </button>

                    </div>

                  </div>

                  {/* PICKUP MESSAGE */}

                  {order.status ===
                    "READY_FOR_PICKUP" && (

                    <div className="border-t border-green-400/10 bg-green-400/5 px-5 py-3">

                      <div className="flex items-center gap-2 text-xs text-green-400">

                        <Package size={15} />

                        <span>
                          This order is ready to be picked up
                          from the vendor.
                        </span>

                      </div>

                    </div>

                  )}

                  {/* DELIVERY MESSAGE */}

                  {order.status ===
                    "OUT_FOR_DELIVERY" && (

                    <div className="border-t border-orange-400/10 bg-orange-400/5 px-5 py-3">

                      <div className="flex items-center gap-2 text-xs text-orange-400">

                        <Truck size={15} />

                        <span>
                          Order is currently out for delivery.
                        </span>

                      </div>

                    </div>

                  )}

                </div>

              );
            })

          )}

        </div>

      </div>

    </div>
  );
};

export default DeliveryOrders;