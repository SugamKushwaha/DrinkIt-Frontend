import React from "react";

import {
  MapPin,
  Store,
  Package,
  ArrowRight,
} from "lucide-react";

const DeliveryOrderCard = ({
  order,
  onClick,
}) => {

  const getStatusStyle = (status) => {

    switch (status) {

      case "READY_FOR_PICKUP":
        return "bg-green-400/10 text-green-400";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-400/10 text-orange-400";

      case "DELIVERED":
        return "bg-blue-400/10 text-blue-400";

      default:
        return "bg-gray-400/10 text-gray-400";
    }
  };

  const getStatusText = (status) => {

    switch (status) {

      case "READY_FOR_PICKUP":
        return "Ready for Pickup";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      default:
        return status;
    }
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-800
        bg-[#080808]
        p-5
      "
    >

      {/* TOP */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-xs text-gray-500">
            Delivery Order
          </p>

          <h3 className="mt-1 font-semibold">
            #{order.id}
          </h3>

        </div>

        <span
          className={`
            w-fit
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${getStatusStyle(order.status)}
          `}
        >
          {getStatusText(order.status)}
        </span>

      </div>

      <div className="my-5 border-t border-gray-800" />

      {/* STORE */}

      <div className="flex items-start gap-3">

        <Store
          size={18}
          className="mt-1 text-yellow-400"
        />

        <div>

          <p className="text-xs text-gray-500">
            Pickup From
          </p>

          <p className="mt-1 text-sm font-medium">
            {order.storeName}
          </p>

          <p className="text-xs text-gray-500">
            {order.storeAddress}
          </p>

        </div>

      </div>

      {/* ARROW */}

      <div className="my-4 flex items-center gap-3">

        <div className="h-px flex-1 bg-gray-800" />

        <ArrowRight
          size={17}
          className="text-gray-600"
        />

        <div className="h-px flex-1 bg-gray-800" />

      </div>

      {/* CUSTOMER */}

      <div className="flex items-start gap-3">

        <MapPin
          size={18}
          className="mt-1 text-green-400"
        />

        <div>

          <p className="text-xs text-gray-500">
            Deliver To
          </p>

          <p className="mt-1 text-sm font-medium">
            {order.customerName}
          </p>

          <p className="text-xs text-gray-500">
            {order.deliveryAddress.address},{" "}
            {order.deliveryAddress.city}
          </p>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="mt-5 flex flex-col gap-3 border-t border-gray-800 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2">

            <Package
              size={16}
              className="text-gray-500"
            />

            <span className="text-xs text-gray-400">
              {order.items.length} items
            </span>

          </div>

          <span className="font-semibold">
            ₹{order.total.toLocaleString("en-IN")}
          </span>

        </div>

        <button
          onClick={onClick}
          className="
            rounded-xl
            bg-yellow-400
            px-4
            py-2.5
            text-sm
            font-bold
            text-black
            transition
            hover:bg-yellow-300
          "
        >
          VIEW DELIVERY
        </button>

      </div>

    </div>
  );
};

export default DeliveryOrderCard;