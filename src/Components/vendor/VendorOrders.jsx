import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Search,
  RefreshCw,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Package,
  Truck,
} from "lucide-react";

import VendorSidebar from "../../components/vendor/VendorSidebar";
import VendorHeader from "../../components/vendor/VendorHeader";
import VendorOrderCard from "../../components/vendor/VendorOrderCard";

const VendorOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [activeTab, setActiveTab] =
    useState("ALL");

  const [search, setSearch] = useState("");

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  const loadOrders = () => {
    try {
      const storedOrders = JSON.parse(
        localStorage.getItem(
          "drinkit-orders"
        ) || "[]"
      );

      /*
       * Your customer side currently saves orders
       * inside "drinkit-orders".
       *
       * We use those same orders for the vendor
       * panel for now.
       */

      const normalizedOrders =
        storedOrders.map((order) => ({
          ...order,

          /*
           * If the order does not have a vendor
           * status yet, show it as NEW.
           */
          status:
            order.status || "NEW",
        }));

      setOrders(normalizedOrders);

    } catch (error) {

      console.error(
        "Failed to load vendor orders:",
        error
      );

      setOrders([]);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadOrders();
  }, []);

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {

    const updatedOrders = orders.map(
      (order) => {

        if (
          String(order.id) ===
          String(orderId)
        ) {
          return {
            ...order,
            status: newStatus,
          };
        }

        return order;
      }
    );

    setOrders(updatedOrders);

    /*
     * Save updated status so Customer
     * My Orders can also see the change.
     */

    localStorage.setItem(
      "drinkit-orders",
      JSON.stringify(updatedOrders)
    );

    /*
     * Update last order too if this is
     * the currently stored order.
     */

    try {

      const lastOrder = JSON.parse(
        localStorage.getItem(
          "drinkit-last-order"
        ) || "null"
      );

      if (
        lastOrder &&
        String(lastOrder.id) ===
          String(orderId)
      ) {

        const updatedLastOrder = {
          ...lastOrder,
          status: newStatus,
        };

        localStorage.setItem(
          "drinkit-last-order",
          JSON.stringify(
            updatedLastOrder
          )
        );
      }

    } catch (error) {

      console.error(
        "Failed to update last order:",
        error
      );
    }
  };

  // =====================================================
  // ACCEPT
  // =====================================================

  const handleAccept = (orderId) => {
    updateOrderStatus(
      orderId,
      "ACCEPTED"
    );
  };

  // =====================================================
  // REJECT
  // =====================================================

  const handleReject = (orderId) => {
    updateOrderStatus(
      orderId,
      "CANCELLED"
    );
  };

  // =====================================================
  // START PREPARING
  // =====================================================

  const handlePrepare = (orderId) => {
    updateOrderStatus(
      orderId,
      "PREPARING"
    );
  };

  // =====================================================
  // MARK READY
  // =====================================================

  const handleReady = (orderId) => {
    updateOrderStatus(
      orderId,
      "READY"
    );
  };

  // =====================================================
  // VIEW ORDER
  // =====================================================

  const handleView = (order) => {

    navigate(
      `/vendor/orders/${order.id}`
    );
  };

  // =====================================================
  // TABS
  // =====================================================

  const tabs = [
    {
      id: "ALL",
      label: "All Orders",
      icon: ShoppingBag,
    },
    {
      id: "NEW",
      label: "New",
      icon: Clock3,
    },
    {
      id: "ACCEPTED",
      label: "Accepted",
      icon: CheckCircle2,
    },
    {
      id: "PREPARING",
      label: "Preparing",
      icon: Package,
    },
    {
      id: "READY",
      label: "Ready",
      icon: CheckCircle2,
    },
    {
      id: "OUT_FOR_DELIVERY",
      label: "Out for Delivery",
      icon: Truck,
    },
    {
      id: "DELIVERED",
      label: "Delivered",
      icon: CheckCircle2,
    },
  ];

  // =====================================================
  // FILTER ORDERS
  // =====================================================

  const filteredOrders = useMemo(() => {

    let result = [...orders];

    // STATUS FILTER

    if (activeTab !== "ALL") {

      result = result.filter(
        (order) =>
          order.status === activeTab
      );
    }

    // SEARCH FILTER

    if (search.trim()) {

      const query =
        search.toLowerCase();

      result = result.filter(
        (order) => {

          const orderId =
            String(
              order.id || ""
            ).toLowerCase();

          const customer =
            String(
              order.customerName ||
                order.customer ||
                order.address?.name ||
                ""
            ).toLowerCase();

          return (
            orderId.includes(query) ||
            customer.includes(query)
          );
        }
      );
    }

    return result;

  }, [
    orders,
    activeTab,
    search,
  ]);

  // =====================================================
  // COUNTS
  // =====================================================

  const getCount = (status) => {

    if (status === "ALL") {
      return orders.length;
    }

    return orders.filter(
      (order) =>
        order.status === status
    ).length;
  };

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="flex">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <VendorSidebar />

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="min-w-0 flex-1">

          <VendorHeader />

          <div className="p-5 md:p-8">

            <div className="mx-auto max-w-[1400px]">

              {/* =================================================
                  PAGE HEADER
              ================================================= */}

              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                <div>

                  <h1 className="text-2xl font-bold md:text-3xl">
                    Orders
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Manage customer orders and prepare them for delivery.
                  </p>

                </div>

                {/* REFRESH */}

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
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-400
                    transition
                    hover:border-yellow-400
                    hover:text-yellow-400
                  "
                >
                  <RefreshCw size={16} />

                  Refresh Orders
                </button>

              </div>

              {/* =================================================
                  SUMMARY
              ================================================= */}

              <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">

                <div className="rounded-2xl border border-gray-800 bg-[#0b0b0b] p-4">

                  <p className="text-xs text-gray-500">
                    Total Orders
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {orders.length}
                  </p>

                </div>

                <div className="rounded-2xl border border-purple-400/20 bg-purple-400/[0.04] p-4">

                  <p className="text-xs text-gray-500">
                    New Orders
                  </p>

                  <p className="mt-2 text-2xl font-bold text-purple-400">
                    {getCount("NEW")}
                  </p>

                </div>

                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.04] p-4">

                  <p className="text-xs text-gray-500">
                    Preparing
                  </p>

                  <p className="mt-2 text-2xl font-bold text-yellow-400">
                    {getCount("PREPARING")}
                  </p>

                </div>

                <div className="rounded-2xl border border-green-400/20 bg-green-400/[0.04] p-4">

                  <p className="text-xs text-gray-500">
                    Delivered
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-400">
                    {getCount("DELIVERED")}
                  </p>

                </div>

              </div>

              {/* =================================================
                  SEARCH
              ================================================= */}

              <div className="mt-7">

                <div className="relative max-w-[500px]">

                  <Search
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-600
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Search order ID or customer..."
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-gray-800
                      bg-[#0b0b0b]
                      pl-11
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      focus:border-yellow-400
                    "
                  />

                </div>

              </div>

              {/* =================================================
                  ORDER TABS
              ================================================= */}

              <div className="mt-6 overflow-x-auto">

                <div className="flex min-w-max gap-2">

                  {tabs.map((tab) => {

                    const Icon =
                      tab.icon;

                    const isActive =
                      activeTab ===
                      tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() =>
                          setActiveTab(
                            tab.id
                          )
                        }
                        className={`
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          px-4
                          py-2.5
                          text-sm
                          font-semibold
                          transition
                          ${
                            isActive
                              ? "bg-yellow-400 text-black"
                              : "border border-gray-800 bg-[#0b0b0b] text-gray-500 hover:border-gray-700 hover:text-white"
                          }
                        `}
                      >

                        <Icon size={16} />

                        {tab.label}

                        <span
                          className={`
                            rounded-full
                            px-2
                            py-0.5
                            text-[10px]
                            ${
                              isActive
                                ? "bg-black/10"
                                : "bg-gray-800"
                            }
                          `}
                        >
                          {getCount(
                            tab.id
                          )}
                        </span>

                      </button>
                    );
                  })}

                </div>

              </div>

              {/* =================================================
                  ORDERS
              ================================================= */}

              <div className="mt-6">

                {filteredOrders.length ===
                0 ? (

                  <div className="rounded-2xl border border-gray-800 bg-[#0b0b0b] p-12 text-center">

                    <ShoppingBag
                      size={45}
                      className="mx-auto text-gray-700"
                    />

                    <h2 className="mt-5 text-lg font-semibold">
                      No Orders Found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      There are no orders matching your current filter.
                    </p>

                    {search && (
                      <button
                        onClick={() =>
                          setSearch("")
                        }
                        className="mt-5 text-sm font-semibold text-yellow-400 hover:text-yellow-300"
                      >
                        Clear Search
                      </button>
                    )}

                  </div>

                ) : (

                  <div className="space-y-5">

                    {filteredOrders.map(
                      (order) => (

                        <VendorOrderCard
                          key={order.id}
                          order={order}
                          onAccept={
                            handleAccept
                          }
                          onReject={
                            handleReject
                          }
                          onPrepare={
                            handlePrepare
                          }
                          onReady={
                            handleReady
                          }
                          onView={
                            handleView
                          }
                        />

                      )
                    )}

                  </div>

                )}

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default VendorOrders;