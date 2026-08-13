import React from "react";
import { useNavigate } from "react-router-dom";

import VendorSidebar from "../../components/vendor/VendorSidebar";
import VendorHeader from "../../components/vendor/VendorHeader";
import StatCard from "../../components/vendor/StatCard";
import RecentOrders from "../../components/vendor/RecentOrders";
import TopProducts from "../../components/vendor/TopProducts";

import {
  vendorStats,
  vendorOrders,
  topProducts,
} from "../../data/vendorData";

const VendorDashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="flex">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <VendorSidebar />

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="min-w-0 flex-1">

          {/* HEADER */}

          <VendorHeader />

          {/* CONTENT */}

          <div className="p-5 md:p-8">

            <div className="mx-auto max-w-[1400px]">

              {/* =================================================
                  PAGE TITLE
              ================================================= */}

              <div className="mb-7">

                <h1 className="text-2xl font-bold md:text-3xl">
                  Dashboard
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Manage your DrinkIt store and customer orders.
                </p>

              </div>

              {/* =================================================
                  STATS
              ================================================= */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {vendorStats.map((stat) => (

                  <StatCard
                    key={stat.id}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    type={stat.type}
                  />

                ))}

              </div>

              {/* =================================================
                  NEW ORDER ALERT
              ================================================= */}

              <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-yellow-400" />

                      <h3 className="font-semibold text-yellow-400">
                        7 orders waiting for action
                      </h3>

                    </div>

                    <p className="mt-2 text-sm text-gray-400">
                      New customer orders are waiting for you.
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate("/vendor/orders")
                    }
                    className="
                      rounded-xl
                      bg-yellow-400
                      px-5
                      py-3
                      text-sm
                      font-bold
                      text-black
                      transition
                      hover:bg-yellow-300
                    "
                  >
                    VIEW ORDERS
                  </button>

                </div>

              </div>

              {/* =================================================
                  ORDERS + PRODUCTS
              ================================================= */}

              <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">

                {/* RECENT ORDERS */}

                <RecentOrders
                  orders={vendorOrders}
                  onViewAll={() =>
                    navigate("/vendor/orders")
                  }
                />

                {/* TOP PRODUCTS */}

                <TopProducts
                  products={topProducts}
                />

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default VendorDashboard;