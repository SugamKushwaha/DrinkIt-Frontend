import React, { useEffect, useState } from "react";

import {
  Store,
  Truck,
  Package,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getVendorRequests,
  getVendors,
  getDeliveryRequests,
  getDeliveryPartners,
  getAdminProducts,
  getUsers,
} from "../../utils/adminStorage";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    vendorRequests: 0,
    vendors: 0,
    deliveryRequests: 0,
    deliveryPartners: 0,
    products: 0,
    users: 0,
  });

  const loadStats = () => {

    const vendorRequests = getVendorRequests();
    const vendors = getVendors();

    const deliveryRequests = getDeliveryRequests();
    const deliveryPartners = getDeliveryPartners();

    const products = getAdminProducts();
    const users = getUsers();

    setStats({
      vendorRequests: vendorRequests.filter(
        (item) => item.status === "PENDING"
      ).length,

      vendors: vendors.filter(
        (item) => item.status === "ACTIVE"
      ).length,

      deliveryRequests: deliveryRequests.filter(
        (item) => item.status === "PENDING"
      ).length,

      deliveryPartners: deliveryPartners.filter(
        (item) => item.status === "ACTIVE"
      ).length,

      products: products.filter(
        (item) => item.active !== false
      ).length,

      users: users.length,
    });
  };

  useEffect(() => {

    loadStats();

    const handleUpdate = () => {
      loadStats();
    };

    window.addEventListener(
      "drinkit-admin-data-updated",
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        "drinkit-admin-data-updated",
        handleUpdate
      );
    };

  }, []);

  const cards = [
    {
      title: "Active Vendors",
      value: stats.vendors,
      icon: Store,
      path: "/admin/vendors",
    },
    {
      title: "Delivery Partners",
      value: stats.deliveryPartners,
      icon: Truck,
      path: "/admin/delivery-partners",
    },
    {
      title: "Products",
      value: stats.products,
      icon: Package,
      path: "/admin/products",
    },
    {
      title: "Customers",
      value: stats.users,
      icon: Users,
      path: "/admin/users",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <p className="text-sm text-gray-500 mb-1">
          Welcome back
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your DrinkIt platform from one place.
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <button
              key={card.title}
              onClick={() => navigate(card.path)}
              className="text-left bg-[#151515] border border-white/10 rounded-2xl p-5 hover:border-red-500/40 transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">

                  <Icon
                    size={21}
                    className="text-red-500"
                  />

                </div>

                <ArrowRight
                  size={18}
                  className="text-gray-600"
                />

              </div>

              <p className="text-gray-500 text-sm mt-5">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {card.value}
              </h2>

            </button>
          );

        })}

      </div>

      {/* REQUESTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* VENDOR REQUEST */}

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">

                <Clock
                  size={20}
                  className="text-yellow-500"
                />

              </div>

              <div>

                <h3 className="font-semibold">
                  Vendor Requests
                </h3>

                <p className="text-xs text-gray-500">
                  Waiting for admin approval
                </p>

              </div>

            </div>

            <span className="text-2xl font-bold">
              {stats.vendorRequests}
            </span>

          </div>

          <button
            onClick={() =>
              navigate("/admin/vendors/requests")
            }
            className="mt-6 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition"
          >
            Review Vendor Requests
          </button>

        </div>

        {/* DELIVERY REQUEST */}

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

                <Clock
                  size={20}
                  className="text-blue-500"
                />

              </div>

              <div>

                <h3 className="font-semibold">
                  Delivery Partner Requests
                </h3>

                <p className="text-xs text-gray-500">
                  Waiting for admin approval
                </p>

              </div>

            </div>

            <span className="text-2xl font-bold">
              {stats.deliveryRequests}
            </span>

          </div>

          <button
            onClick={() =>
              navigate(
                "/admin/delivery-partners/requests"
              )
            }
            className="mt-6 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition"
          >
            Review Partner Requests
          </button>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div>

        <h2 className="text-xl font-semibold mb-4">
          Quick Management
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <button
            onClick={() =>
              navigate("/admin/products/add")
            }
            className="p-5 rounded-2xl border border-white/10 bg-[#151515] hover:border-red-500/40 transition text-left"
          >

            <Package
              size={22}
              className="text-red-500"
            />

            <h3 className="font-semibold mt-4">
              Add Product
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Add a new product to the DrinkIt catalog.
            </p>

          </button>

          <button
            onClick={() =>
              navigate("/admin/admins/add")
            }
            className="p-5 rounded-2xl border border-white/10 bg-[#151515] hover:border-red-500/40 transition text-left"
          >

            <Users
              size={22}
              className="text-red-500"
            />

            <h3 className="font-semibold mt-4">
              Add Admin
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Create another administrator account.
            </p>

          </button>

          <button
            onClick={() =>
              navigate("/admin/vendors/requests")
            }
            className="p-5 rounded-2xl border border-white/10 bg-[#151515] hover:border-red-500/40 transition text-left"
          >

            <Store
              size={22}
              className="text-red-500"
            />

            <h3 className="font-semibold mt-4">
              Vendor Requests
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Review and approve vendor applications.
            </p>

          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;