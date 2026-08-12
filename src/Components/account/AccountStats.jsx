import React from "react";

import {
  ShoppingBag,
  IndianRupee,
  Heart,
  MapPin,
} from "lucide-react";

const AccountStats = ({ stats }) => {

  const items = [
    {
      label: "Orders Placed",
      value: stats.orders,
      icon: ShoppingBag,
    },
    {
      label: "Total Spent",
      value: `₹${stats.totalSpent.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
    {
      label: "Wishlist Items",
      value: stats.wishlist,
      icon: Heart,
    },
    {
      label: "Saved Addresses",
      value: stats.addresses,
      icon: MapPin,
    },
  ];

  return (
    <div
      className="
        border
        border-gray-800
        rounded-2xl
        bg-[#080808]
        grid
        grid-cols-2
        xl:grid-cols-4
        overflow-hidden
      "
    >

      {items.map((item, index) => {

        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`
              flex
              items-center
              gap-4
              p-5
              ${
                index !== items.length - 1
                  ? "border-r border-gray-800"
                  : ""
              }
            `}
          >

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-yellow-500/10
                flex
                items-center
                justify-center
                text-yellow-400
                shrink-0
              "
            >
              <Icon size={22} />
            </div>

            <div>

              <p className="text-2xl font-semibold">
                {item.value}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {item.label}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default AccountStats;