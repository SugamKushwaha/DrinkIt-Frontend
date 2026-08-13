import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  Wallet,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VendorSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/vendor",
    },
    {
      name: "Orders",
      icon: ShoppingBag,
      path: "/vendor/orders",
    },
    {
      name: "Products",
      icon: Package,
      path: "/vendor/products",
    },
    {
      name: "Inventory",
      icon: Boxes,
      path: "/vendor/inventory",
    },
    {
      name: "Earnings",
      icon: Wallet,
      path: "/vendor/earnings",
    },
    {
      name: "Profile",
      icon: User,
      path: "/vendor/profile",
    },
  ];

  return (
    <aside className="hidden min-h-screen w-[250px] shrink-0 border-r border-gray-800 bg-[#080808] lg:block">

      {/* LOGO */}

      <div className="flex h-[80px] items-center border-b border-gray-800 px-6">

        <h1 className="text-2xl font-black text-yellow-400">
          DrinkIt
        </h1>

        <span className="ml-2 rounded-md bg-gray-800 px-2 py-1 text-[10px] font-semibold text-gray-400">
          VENDOR
        </span>

      </div>

      {/* MENU */}

      <nav className="p-4">

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-600">
          Management
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  text-gray-400
                  transition
                  hover:bg-yellow-400/10
                  hover:text-yellow-400
                "
              >

                <Icon size={19} />

                {item.name}

              </button>
            );
          })}

        </div>

      </nav>

      {/* BOTTOM */}

      <div className="absolute bottom-0 w-[250px] border-t border-gray-800 p-4">

        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-sm
            text-gray-500
            transition
            hover:bg-red-400/10
            hover:text-red-400
          "
        >
          <LogOut size={19} />

          Logout
        </button>

      </div>

    </aside>
  );
};

export default VendorSidebar;