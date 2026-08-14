import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Wallet,
  User,
  Truck,
} from "lucide-react";

const DeliverySidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/delivery",
      icon: LayoutDashboard,
    },
    {
      name: "Deliveries",
      path: "/delivery/orders",
      icon: Package,
    },
    {
      name: "Earnings",
      path: "/delivery/earnings",
      icon: Wallet,
    },
    {
      name: "Profile",
      path: "/delivery/profile",
      icon: User,
    },
  ];

  return (
    <aside
      className="
        hidden
        min-h-screen
        w-[250px]
        shrink-0
        border-r
        border-gray-800
        bg-[#080808]
        lg:block
      "
    >
      {/* LOGO */}

      <div className="flex h-[80px] items-center gap-3 border-b border-gray-800 px-6">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-yellow-400
            text-black
          "
        >
          <Truck size={21} />
        </div>

        <div>
          <h1 className="font-bold">
            DrinkIt
          </h1>

          <p className="text-xs text-gray-500">
            Delivery Partner
          </p>
        </div>

      </div>

      {/* NAVIGATION */}

      <nav className="space-y-2 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/delivery"}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition
                ${
                  isActive
                    ? "bg-yellow-400 text-black"
                    : "text-gray-400 hover:bg-[#151515] hover:text-white"
                }
                `
              }
            >
              <Icon size={19} />

              {item.name}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
};

export default DeliverySidebar;