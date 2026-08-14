import React from "react";

import {
  Package,
  Truck,
  CheckCircle2,
  Wallet,
} from "lucide-react";

const DeliveryStats = ({
  totalDeliveries,
  activeDeliveries,
  completedDeliveries,
  todayEarnings,
}) => {

  const stats = [
    {
      title: "Total Deliveries",
      value: totalDeliveries,
      icon: Package,
      iconClass: "text-yellow-400",
    },
    {
      title: "Active Delivery",
      value: activeDeliveries,
      icon: Truck,
      iconClass: "text-orange-400",
    },
    {
      title: "Completed",
      value: completedDeliveries,
      icon: CheckCircle2,
      iconClass: "text-green-400",
    },
    {
      title: "Today's Earnings",
      value: `₹${todayEarnings.toLocaleString("en-IN")}`,
      icon: Wallet,
      iconClass: "text-blue-400",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      {stats.map((stat) => {

        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {stat.value}
                </h2>

              </div>

              <Icon
                size={25}
                className={stat.iconClass}
              />

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default DeliveryStats;