import React from "react";

import {
  ShoppingBag,
  IndianRupee,
  Clock3,
  Package,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  type,
}) => {
  const getIcon = () => {
    switch (type) {
      case "orders":
        return <ShoppingBag size={22} />;

      case "revenue":
        return <IndianRupee size={22} />;

      case "pending":
        return <Clock3 size={22} />;

      case "products":
        return <Package size={22} />;

      default:
        return <Package size={22} />;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#0b0b0b] p-5 transition hover:border-yellow-400/40">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {value}
          </h2>

          <p className="mt-2 text-xs text-yellow-400">
            {change}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
          {getIcon()}
        </div>

      </div>
    </div>
  );
};

export default StatCard;