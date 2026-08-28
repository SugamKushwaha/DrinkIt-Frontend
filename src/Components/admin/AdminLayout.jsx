import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Store,
  Truck,
  Package,
  ShieldCheck,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Vendor Management",
      path: "/admin/vendors",
      icon: Store,
    },
    {
      label: "Delivery Partners",
      path: "/admin/delivery-partners",
      icon: Truck,
    },
    {
      label: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      label: "Admin Management",
      path: "/admin/admins",
      icon: ShieldCheck,
    },
    {
      label: "Customers",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

 const handleLogout = async () => {
    await logout();       // calls /api/auth/logout, clears the cookie, resets user to null
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* MOBILE HEADER */}

      <div className="lg:hidden h-16 bg-black border-b border-white/10 flex items-center justify-between px-4">

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-bold">
          Drink<span className="text-red-500">It</span>
        </h1>

        <div className="w-8" />

      </div>

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          z-50
          top-0
          left-0
          h-screen
          w-72
          bg-black
          border-r
          border-white/10
          transition-transform
          duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* LOGO */}

        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">

          <div>

            <h1 className="text-2xl font-bold">
              Drink<span className="text-red-500">It</span>
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              ADMIN PANEL
            </p>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>

        </div>

        {/* MENU */}

        <nav className="p-4 space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition
                  ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                  `
                }
              >

                <Icon size={19} />

                <span className="text-sm font-medium">
                  {item.label}
                </span>

              </NavLink>
            );

          })}

        </nav>

        {/* LOGOUT */}

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
          >

            <LogOut size={19} />

            <span className="text-sm">
              Logout
            </span>

          </button>

        </div>

      </aside>

      {/* CONTENT */}

      <main className="lg:ml-72 min-h-screen">

        <div className="p-4 sm:p-6 lg:p-8">

          <Outlet />

        </div>

      </main>

    </div>
  );
};

export default AdminLayout;