import React from "react";
import {
  ChevronRight,
} from "lucide-react";

const RecentOrders = ({ orders, onViewAll }) => {

  const getStatusStyle = (status) => {
    switch (status) {

      case "NEW":
        return "bg-purple-400/10 text-purple-400";

      case "PREPARING":
        return "bg-blue-400/10 text-blue-400";

      case "READY":
        return "bg-yellow-400/10 text-yellow-400";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-400/10 text-orange-400";

      case "DELIVERED":
        return "bg-green-400/10 text-green-400";

      default:
        return "bg-gray-400/10 text-gray-400";
    }
  };

  const getStatusText = (status) => {

    switch (status) {

      case "NEW":
        return "New";

      case "PREPARING":
        return "Preparing";

      case "READY":
        return "Ready";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      default:
        return status;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#0b0b0b]">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-gray-800 p-5">

        <div>

          <h3 className="font-semibold">
            Recent Orders
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Latest customer orders
          </p>

        </div>

        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm text-yellow-400 hover:text-yellow-300"
        >
          View All
          <ChevronRight size={16} />
        </button>

      </div>

      {/* ORDERS */}

      <div className="divide-y divide-gray-800">

        {orders.map((order) => (

          <div
            key={order.id}
            className="flex flex-col gap-4 p-5 transition hover:bg-white/[0.02] md:flex-row md:items-center md:justify-between"
          >

            {/* ORDER */}

            <div>

              <div className="flex items-center gap-3">

                <h4 className="font-semibold">
                  #{order.id}
                </h4>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>

              </div>

              <p className="mt-1 text-xs text-gray-500">
                {order.customer}
              </p>

            </div>

            {/* ITEMS */}

            <div className="text-sm text-gray-400">

              {order.items}{" "}
              {order.items === 1
                ? "item"
                : "items"}

            </div>

            {/* TIME */}

            <div className="text-xs text-gray-500">
              {order.time}
            </div>

            {/* AMOUNT */}

            <div className="font-semibold">
              ₹{order.amount.toLocaleString("en-IN")}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentOrders;