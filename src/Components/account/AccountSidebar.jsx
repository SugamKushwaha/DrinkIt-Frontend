import React from "react";

import {
  UserRound,
  MapPin,
  Package,
  Heart,
  CreditCard,
  Bell,
  Lock,
  Headphones,
  LogOut,
} from "lucide-react";

const AccountSidebar = ({
  activeSection,
  onNavigate,
  onLogout,
}) => {

  const menuItems = [
    {
      id: "profile",
      label: "Profile Information",
      icon: UserRound,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      id: "payments",
      label: "Payment Methods",
      icon: CreditCard,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
    {
      id: "support",
      label: "Help & Support",
      icon: Headphones,
    },
  ];

  return (
    <aside
      className="
        hidden
        lg:block
        w-[260px]
        shrink-0
        border-r
        border-gray-900
        min-h-[calc(100vh-80px)]
        px-5
        py-8
      "
    >

      {/* TITLE */}

      <p
        className="
          text-xs
          uppercase
          tracking-wider
          text-gray-500
          px-3
          mb-5
        "
      >
        My Account
      </p>

      {/* MENU */}

      <div className="space-y-1">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active =
            activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full
                flex
                items-center
                gap-4
                px-4
                py-3.5
                rounded-xl
                text-left
                transition
                ${
                  active
                    ? `
                      bg-yellow-500/10
                      text-yellow-400
                      border-l-4
                      border-yellow-400
                    `
                    : `
                      text-gray-400
                      hover:text-white
                      hover:bg-white/[0.03]
                    `
                }
              `}
            >

              <Icon size={20} />

              <span className="text-sm">
                {item.label}
              </span>

            </button>
          );
        })}

      </div>

      {/* DIVIDER */}

      <div className="border-t border-gray-900 my-6" />

      {/* LOGOUT */}

      <button
        onClick={onLogout}
        className="
          w-full
          flex
          items-center
          gap-4
          px-4
          py-3.5
          text-red-500
          hover:bg-red-500/5
          rounded-xl
          transition
        "
      >

        <LogOut size={20} />

        <span className="text-sm">
          Logout
        </span>

      </button>

      {/* PROMO */}

      <div
        className="
          mt-8
          rounded-xl
          border
          border-gray-800
          bg-[#080808]
          p-5
          text-center
        "
      >

        <div className="text-3xl mb-3">
          🛵
        </div>

        <h3 className="font-semibold">
          FREE DELIVERY
        </h3>

        <p className="text-xs text-gray-500 mt-2">
          On orders above ₹799
        </p>

        <button
          className="
            w-full
            mt-4
            border
            border-yellow-500
            text-yellow-400
            py-2
            rounded-lg
            text-xs
            font-semibold
            hover:bg-yellow-500
            hover:text-black
            transition
          "
        >
          SHOP NOW
        </button>

      </div>

    </aside>
  );
};

export default AccountSidebar;