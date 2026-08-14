import React, { useEffect, useMemo, useState } from "react";

import {
  IndianRupee,
  TrendingUp,
  Package,
  CheckCircle2,
  CalendarDays,
  Wallet,
  ArrowUpRight,
  Clock3,
  Truck,
} from "lucide-react";

const DeliveryEarnings = () => {
  const [orders, setOrders] = useState([]);

  const [selectedPeriod, setSelectedPeriod] =
    useState("WEEK");

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {
    loadOrders();

    const handleStorageChange = () => {
      loadOrders();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =====================================================
  // LOAD ORDERS FUNCTION
  // =====================================================

  const loadOrders = () => {
    try {
      const storedOrders = JSON.parse(
        localStorage.getItem("drinkit-orders") || "[]"
      );

      setOrders(
        Array.isArray(storedOrders)
          ? storedOrders
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load delivery orders:",
        error
      );

      setOrders([]);
    }
  };

  // =====================================================
  // ONLY DELIVERED ORDERS
  // =====================================================

  const deliveredOrders = useMemo(() => {
    return orders.filter(
      (order) => order.status === "DELIVERED"
    );
  }, [orders]);

  // =====================================================
  // DATE HELPERS
  // =====================================================

  const getOrderDate = (order) => {
    /*
      Supports multiple possible date fields
      from your existing order structure.
    */

    const dateValue =
      order.deliveredAt ||
      order.completedAt ||
      order.orderDate ||
      order.createdAt;

    if (!dateValue) {
      return null;
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  const isToday = (date) => {
    if (!date) return false;

    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isWithinDays = (date, days) => {
    if (!date) return false;

    const now = new Date();

    const start = new Date(now);

    start.setHours(0, 0, 0, 0);

    start.setDate(
      start.getDate() - (days - 1)
    );

    return date >= start && date <= now;
  };

  // =====================================================
  // DELIVERY EARNING
  // =====================================================

  const getDeliveryEarning = (order) => {
    /*
      If your future backend provides a delivery fee
      for the partner, this will use it.

      Otherwise we calculate a simple partner earning
      from the order delivery fee.
    */

    const partnerEarning =
      Number(order.deliveryPartnerEarning);

    if (
      Number.isFinite(partnerEarning) &&
      partnerEarning > 0
    ) {
      return partnerEarning;
    }

    const deliveryFee =
      Number(order.deliveryFee || 0);

    /*
      For frontend/demo mode:

      Partner receives the delivery fee.

      Later, when Spring Boot is connected,
      replace this with backend-calculated
      delivery partner earnings.
    */

    return deliveryFee;
  };

  // =====================================================
  // TODAY'S ORDERS
  // =====================================================

  const todayOrders = useMemo(() => {
    return deliveredOrders.filter((order) =>
      isToday(getOrderDate(order))
    );
  }, [deliveredOrders]);

  // =====================================================
  // WEEK ORDERS
  // =====================================================

  const weekOrders = useMemo(() => {
    return deliveredOrders.filter((order) =>
      isWithinDays(getOrderDate(order), 7)
    );
  }, [deliveredOrders]);

  // =====================================================
  // MONTH ORDERS
  // =====================================================

  const monthOrders = useMemo(() => {
    return deliveredOrders.filter((order) =>
      isWithinDays(getOrderDate(order), 30)
    );
  }, [deliveredOrders]);

  // =====================================================
  // EARNINGS CALCULATOR
  // =====================================================

  const calculateEarnings = (orderList) => {
    return orderList.reduce(
      (total, order) =>
        total + getDeliveryEarning(order),
      0
    );
  };

  // =====================================================
  // BASIC STATS
  // =====================================================

  const todayEarnings =
    calculateEarnings(todayOrders);

  const weekEarnings =
    calculateEarnings(weekOrders);

  const monthEarnings =
    calculateEarnings(monthOrders);

  const totalEarnings =
    calculateEarnings(deliveredOrders);

  // =====================================================
  // SELECTED PERIOD
  // =====================================================

  const selectedOrders =
    selectedPeriod === "TODAY"
      ? todayOrders
      : selectedPeriod === "MONTH"
      ? monthOrders
      : weekOrders;

  const selectedEarnings =
    calculateEarnings(selectedOrders);

  // =====================================================
  // AVERAGE EARNING
  // =====================================================

  const averageEarning =
    selectedOrders.length > 0
      ? selectedEarnings /
        selectedOrders.length
      : 0;

  // =====================================================
  // CHART DATA
  // =====================================================

  const chartData = useMemo(() => {
    const days = [];

    const numberOfDays =
      selectedPeriod === "TODAY"
        ? 1
        : selectedPeriod === "MONTH"
        ? 30
        : 7;

    for (
      let i = numberOfDays - 1;
      i >= 0;
      i--
    ) {
      const date = new Date();

      date.setDate(
        date.getDate() - i
      );

      date.setHours(0, 0, 0, 0);

      const dayOrders =
        deliveredOrders.filter((order) => {
          const orderDate =
            getOrderDate(order);

          if (!orderDate) return false;

          return (
            orderDate.getDate() ===
              date.getDate() &&
            orderDate.getMonth() ===
              date.getMonth() &&
            orderDate.getFullYear() ===
              date.getFullYear()
          );
        });

      const earning =
        calculateEarnings(dayOrders);

      days.push({
        date,
        earning,
      });
    }

    return days;
  }, [
    deliveredOrders,
    selectedPeriod,
  ]);

  const maxChartValue = Math.max(
    ...chartData.map(
      (item) => item.earning
    ),
    100
  );

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "Recently";

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // FORMAT CHART DATE
  // =====================================================

  const formatChartDate = (date) => {
    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
      }
    );
  };

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[1250px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-gray-500">
              Delivery Partner
            </p>

            <h1 className="mt-1 text-3xl font-semibold">
              Earnings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Track your delivery earnings and payouts
            </p>

          </div>

          {/* PERIOD */}

          <div className="flex rounded-xl border border-gray-800 bg-[#080808] p-1">

            <button
              onClick={() =>
                setSelectedPeriod("TODAY")
              }
              className={`
                rounded-lg
                px-4
                py-2
                text-xs
                font-semibold
                transition
                ${
                  selectedPeriod === "TODAY"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-500 hover:text-white"
                }
              `}
            >
              Today
            </button>

            <button
              onClick={() =>
                setSelectedPeriod("WEEK")
              }
              className={`
                rounded-lg
                px-4
                py-2
                text-xs
                font-semibold
                transition
                ${
                  selectedPeriod === "WEEK"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-500 hover:text-white"
                }
              `}
            >
              7 Days
            </button>

            <button
              onClick={() =>
                setSelectedPeriod("MONTH")
              }
              className={`
                rounded-lg
                px-4
                py-2
                text-xs
                font-semibold
                transition
                ${
                  selectedPeriod === "MONTH"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-500 hover:text-white"
                }
              `}
            >
              30 Days
            </button>

          </div>

        </div>

        {/* =================================================
            EARNING CARDS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* TODAY */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Today's Earnings
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {formatCurrency(
                    todayEarnings
                  )}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10">

                <IndianRupee
                  size={21}
                  className="text-yellow-400"
                />

              </div>

            </div>

            <p className="mt-4 text-xs text-gray-600">
              {todayOrders.length} completed{" "}
              {todayOrders.length === 1
                ? "delivery"
                : "deliveries"}
            </p>

          </div>

          {/* WEEK */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  This Week
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {formatCurrency(
                    weekEarnings
                  )}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-400/10">

                <TrendingUp
                  size={21}
                  className="text-green-400"
                />

              </div>

            </div>

            <p className="mt-4 text-xs text-gray-600">
              {weekOrders.length} completed{" "}
              {weekOrders.length === 1
                ? "delivery"
                : "deliveries"}
            </p>

          </div>

          {/* MONTH */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  This Month
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {formatCurrency(
                    monthEarnings
                  )}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10">

                <CalendarDays
                  size={21}
                  className="text-blue-400"
                />

              </div>

            </div>

            <p className="mt-4 text-xs text-gray-600">
              {monthOrders.length} completed{" "}
              {monthOrders.length === 1
                ? "delivery"
                : "deliveries"}
            </p>

          </div>

          {/* TOTAL */}

          <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total Earnings
                </p>

                <h2 className="mt-2 text-2xl font-bold text-yellow-400">
                  {formatCurrency(
                    totalEarnings
                  )}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400">

                <Wallet
                  size={21}
                  className="text-black"
                />

              </div>

            </div>

            <p className="mt-4 text-xs text-gray-600">
              {deliveredOrders.length} completed{" "}
              {deliveredOrders.length === 1
                ? "delivery"
                : "deliveries"}
            </p>

          </div>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_350px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                EARNING CHART
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-6">

              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="font-semibold">
                    Earnings Overview
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Your delivery earnings
                  </p>

                </div>

                <div className="flex items-center gap-2 text-xs text-green-400">

                  <TrendingUp size={15} />

                  {formatCurrency(
                    selectedEarnings
                  )}

                </div>

              </div>

              {/* CHART */}

              {selectedOrders.length === 0 ? (

                <div className="flex h-[260px] flex-col items-center justify-center">

                  <TrendingUp
                    size={40}
                    className="mb-3 text-gray-700"
                  />

                  <p className="text-sm text-gray-500">
                    No earnings data yet
                  </p>

                  <p className="mt-1 text-xs text-gray-700">
                    Complete deliveries to see your
                    earnings chart.
                  </p>

                </div>

              ) : (

                <div className="overflow-x-auto">

                  <div
                    className={`
                      flex
                      h-[260px]
                      min-w-[${
                        chartData.length * 70
                      }px]
                      items-end
                      gap-3
                      border-b
                      border-gray-800
                      px-2
                      pb-0
                    `}
                  >

                    {chartData.map(
                      (item, index) => {

                        const height =
                          item.earning > 0
                            ? Math.max(
                                12,
                                (item.earning /
                                  maxChartValue) *
                                  190
                              )
                            : 4;

                        return (
                          <div
                            key={index}
                            className="
                              flex
                              h-full
                              min-w-[50px]
                              flex-1
                              flex-col
                              items-center
                              justify-end
                              gap-2
                            "
                          >

                            {/* VALUE */}

                            {item.earning > 0 && (
                              <span className="text-[10px] text-gray-500">
                                {formatCurrency(
                                  item.earning
                                )}
                              </span>
                            )}

                            {/* BAR */}

                            <div
                              style={{
                                height: `${height}px`,
                              }}
                              className="
                                w-8
                                rounded-t-lg
                                bg-yellow-400
                                transition-all
                                hover:bg-yellow-300
                              "
                            />

                            {/* DATE */}

                            <span className="mb-2 whitespace-nowrap text-[10px] text-gray-600">
                              {formatChartDate(
                                item.date
                              )}
                            </span>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>

              )}

            </div>

            {/* =================================================
                RECENT DELIVERIES
            ================================================= */}

            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#080808]">

              <div className="flex items-center justify-between border-b border-gray-800 p-5">

                <div>

                  <h2 className="font-semibold">
                    Recent Deliveries
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Completed delivery earnings
                  </p>

                </div>

                <Package
                  size={20}
                  className="text-gray-600"
                />

              </div>

              {deliveredOrders.length === 0 ? (

                <div className="p-10 text-center">

                  <Package
                    size={38}
                    className="mx-auto mb-3 text-gray-700"
                  />

                  <p className="text-sm text-gray-500">
                    No completed deliveries yet
                  </p>

                </div>

              ) : (

                <div className="divide-y divide-gray-800">

                  {deliveredOrders
                    .slice(0, 8)
                    .map((order) => {

                      const earning =
                        getDeliveryEarning(
                          order
                        );

                      const items =
                        order.items || [];

                      const quantity =
                        items.reduce(
                          (sum, item) =>
                            sum +
                            Number(
                              item.quantity ||
                                1
                            ),
                          0
                        );

                      return (
                        <div
                          key={order.id}
                          className="
                            flex
                            flex-col
                            gap-4
                            p-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                          "
                        >

                          <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-400/10">

                              <CheckCircle2
                                size={20}
                                className="text-green-400"
                              />

                            </div>

                            <div>

                              <p className="text-sm font-semibold">
                                Order #{order.id}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {formatDate(
                                  getOrderDate(
                                    order
                                  )
                                )}
                              </p>

                              <p className="mt-1 text-xs text-gray-600">
                                {quantity}{" "}
                                {quantity === 1
                                  ? "item"
                                  : "items"}
                              </p>

                            </div>

                          </div>

                          <div className="text-left sm:text-right">

                            <p className="font-bold text-green-400">
                              +{" "}
                              {formatCurrency(
                                earning
                              )}
                            </p>

                            <p className="mt-1 text-xs text-gray-600">
                              Delivery earning
                            </p>

                          </div>

                        </div>
                      );
                    })}

                </div>

              )}

            </div>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                SELECTED PERIOD SUMMARY
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">

                  <Wallet
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Earnings Summary
                  </h2>

                  <p className="text-xs text-gray-500">
                    Selected period
                  </p>

                </div>

              </div>

              <div className="rounded-xl bg-[#111] p-5">

                <p className="text-xs text-gray-500">
                  Total Earnings
                </p>

                <p className="mt-2 text-3xl font-bold text-yellow-400">
                  {formatCurrency(
                    selectedEarnings
                  )}
                </p>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-[#111] p-4">

                  <p className="text-xs text-gray-500">
                    Deliveries
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    {selectedOrders.length}
                  </p>

                </div>

                <div className="rounded-xl bg-[#111] p-4">

                  <p className="text-xs text-gray-500">
                    Avg. Earning
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    {formatCurrency(
                      averageEarning
                    )}
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                PAYOUT
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-400/10">

                  <IndianRupee
                    size={20}
                    className="text-green-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Payout
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your payout information
                  </p>

                </div>

              </div>

              <div className="rounded-xl bg-[#111] p-4">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-gray-500">
                    Available Balance
                  </span>

                  <span className="text-sm font-semibold text-green-400">
                    {formatCurrency(
                      totalEarnings
                    )}
                  </span>

                </div>

                <div className="my-4 border-t border-gray-800" />

                <div className="flex items-center gap-3">

                  <Clock3
                    size={17}
                    className="text-yellow-400"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Payout Status
                    </p>

                    <p className="mt-1 text-sm">
                      Pending backend setup
                    </p>

                  </div>

                </div>

              </div>

              <p className="mt-4 text-xs leading-5 text-gray-600">
                Payout processing will be connected
                to your backend when the delivery
                partner payment system is implemented.
              </p>

            </div>

            {/* =================================================
                DELIVERY PERFORMANCE
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10">

                  <Truck
                    size={20}
                    className="text-blue-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Delivery Performance
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your delivery activity
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                <div>

                  <div className="mb-2 flex justify-between text-xs">

                    <span className="text-gray-500">
                      Completed Deliveries
                    </span>

                    <span className="font-semibold">
                      {deliveredOrders.length}
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-800">

                    <div
                      style={{
                        width:
                          deliveredOrders.length > 0
                            ? "100%"
                            : "0%",
                      }}
                      className="h-full rounded-full bg-green-400"
                    />

                  </div>

                </div>

                <div>

                  <div className="mb-2 flex justify-between text-xs">

                    <span className="text-gray-500">
                      This Week
                    </span>

                    <span className="font-semibold">
                      {weekOrders.length}
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-800">

                    <div
                      style={{
                        width:
                          weekOrders.length > 0
                            ? `${Math.min(
                                weekOrders.length *
                                  10,
                                100
                              )}%`
                            : "0%",
                      }}
                      className="h-full rounded-full bg-yellow-400"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                INFO
            ================================================= */}

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">

              <div className="flex items-start gap-3">

                <ArrowUpRight
                  size={19}
                  className="mt-0.5 shrink-0 text-yellow-400"
                />

                <div>

                  <p className="text-sm font-semibold text-yellow-400">
                    Keep delivering
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Complete more deliveries to
                    increase your earnings.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DeliveryEarnings;