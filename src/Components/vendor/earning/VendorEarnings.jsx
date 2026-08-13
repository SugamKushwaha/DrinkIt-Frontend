import React, { useMemo } from "react";
import {
  IndianRupee,
  TrendingUp,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  CalendarDays,
  Wallet,
  CreditCard,
} from "lucide-react";

const VendorEarnings = () => {
  // =====================================================
  // LOAD ORDERS
  // =====================================================

  const orders = JSON.parse(
    localStorage.getItem("drinkit-orders") || "[]"
  );

  // =====================================================
  // CALCULATE EARNINGS
  // =====================================================

  const completedOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  );

  const pendingOrders = orders.filter(
    (order) =>
      !["DELIVERED", "CANCELLED"].includes(order.status)
  );

  const cancelledOrders = orders.filter(
    (order) => order.status === "CANCELLED"
  );

  const totalRevenue = completedOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pendingRevenue = pendingOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const cancelledRevenue = cancelledOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const averageOrderValue =
    completedOrders.length > 0
      ? totalRevenue / completedOrders.length
      : 0;

  // =====================================================
  // RECENT ORDERS
  // =====================================================

  const recentOrders = useMemo(() => {
    return [...orders].slice(0, 8);
  }, [orders]);

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-400/10 text-green-400";

      case "CANCELLED":
        return "bg-red-400/10 text-red-400";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-400/10 text-orange-400";

      case "READY_FOR_PICKUP":
        return "bg-blue-400/10 text-blue-400";

      case "PREPARING":
        return "bg-yellow-400/10 text-yellow-400";

      case "CONFIRMED":
        return "bg-purple-400/10 text-purple-400";

      default:
        return "bg-gray-400/10 text-gray-400";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "DELIVERED":
        return "Delivered";

      case "CANCELLED":
        return "Cancelled";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "READY_FOR_PICKUP":
        return "Ready for Pickup";

      case "PREPARING":
        return "Preparing";

      case "CONFIRMED":
        return "Confirmed";

      case "PLACED":
        return "Order Placed";

      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[1300px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-semibold">
            Earnings
          </h1>

          <p className="mt-2 text-gray-500">
            Track your store revenue and earnings
          </p>

        </div>

        {/* =================================================
            EARNING CARDS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL REVENUE */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total Earnings
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {formatMoney(totalRevenue)}
                </h2>

                <div className="mt-3 flex items-center gap-1 text-xs text-green-400">
                  <ArrowUpRight size={14} />
                  Completed sales
                </div>

              </div>

              <div className="rounded-xl bg-green-400/10 p-3">
                <IndianRupee
                  size={22}
                  className="text-green-400"
                />
              </div>

            </div>

          </div>

          {/* PENDING */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Pending Earnings
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {formatMoney(pendingRevenue)}
                </h2>

                <p className="mt-3 text-xs text-yellow-400">
                  Awaiting completion
                </p>

              </div>

              <div className="rounded-xl bg-yellow-400/10 p-3">
                <Clock3
                  size={22}
                  className="text-yellow-400"
                />
              </div>

            </div>

          </div>

          {/* ORDERS */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Completed Orders
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {completedOrders.length}
                </h2>

                <p className="mt-3 text-xs text-gray-500">
                  Successfully delivered
                </p>

              </div>

              <div className="rounded-xl bg-blue-400/10 p-3">
                <ShoppingBag
                  size={22}
                  className="text-blue-400"
                />
              </div>

            </div>

          </div>

          {/* AVERAGE */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Average Order
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {formatMoney(averageOrderValue)}
                </h2>

                <p className="mt-3 text-xs text-gray-500">
                  Per completed order
                </p>

              </div>

              <div className="rounded-xl bg-purple-400/10 p-3">
                <TrendingUp
                  size={22}
                  className="text-purple-400"
                />
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              LEFT - RECENT TRANSACTIONS
          ================================================= */}

          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#080808]">

            <div className="flex items-center justify-between border-b border-gray-800 p-5">

              <div>

                <h2 className="font-semibold">
                  Recent Transactions
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Latest order earnings
                </p>

              </div>

              <Wallet
                size={20}
                className="text-gray-600"
              />

            </div>

            {recentOrders.length === 0 ? (

              <div className="p-10 text-center">

                <Wallet
                  size={40}
                  className="mx-auto mb-3 text-gray-700"
                />

                <p className="text-gray-500">
                  No transactions yet
                </p>

              </div>

            ) : (

              <div className="divide-y divide-gray-800">

                {recentOrders.map((order) => (

                  <div
                    key={order.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#151515]">

                        {order.status === "DELIVERED" ? (
                          <CheckCircle2
                            size={20}
                            className="text-green-400"
                          />
                        ) : (
                          <CreditCard
                            size={20}
                            className="text-gray-500"
                          />
                        )}

                      </div>

                      <div>

                        <p className="text-sm font-semibold">
                          Order #{order.id}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {order.orderDate || "Recently"}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${getStatusStyle(order.status)}
                        `}
                      >
                        {getStatusText(order.status)}
                      </span>

                      <span className="font-semibold">
                        {formatMoney(order.total)}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* =================================================
              RIGHT - PAYOUT
          ================================================= */}

          <div className="space-y-5">

            {/* PAYOUT CARD */}

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
                    Payout Summary
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your current balance
                  </p>

                </div>

              </div>

              <p className="text-sm text-gray-500">
                Available Balance
              </p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                {formatMoney(totalRevenue)}
              </h2>

              <button
                className="
                  mt-5
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-yellow-400
                  font-bold
                  text-black
                  transition
                  hover:bg-yellow-300
                "
              >
                REQUEST PAYOUT
              </button>

            </div>

            {/* SUMMARY */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <h2 className="mb-5 font-semibold">
                Earnings Summary
              </h2>

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Completed Orders
                  </span>

                  <span className="font-semibold">
                    {completedOrders.length}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Pending Orders
                  </span>

                  <span className="font-semibold">
                    {pendingOrders.length}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Cancelled Orders
                  </span>

                  <span className="font-semibold text-red-400">
                    {cancelledOrders.length}
                  </span>

                </div>

                <div className="border-t border-gray-800 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-gray-500">
                      Cancelled Value
                    </span>

                    <span className="text-red-400">
                      {formatMoney(cancelledRevenue)}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            INFO
        ================================================= */}

        <div className="mt-5 rounded-2xl border border-gray-800 bg-[#080808] p-5">

          <div className="flex items-start gap-3">

            <CalendarDays
              size={20}
              className="mt-0.5 text-yellow-400"
            />

            <div>

              <h3 className="font-semibold">
                Earnings Information
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Earnings are calculated from successfully
                delivered orders. Cancelled orders are not
                included in your available earnings.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VendorEarnings;