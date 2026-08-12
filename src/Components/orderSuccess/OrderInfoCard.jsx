import React from "react";
import { MapPin, CalendarDays } from "lucide-react";

const OrderInfoCard = ({
  orderId,
  orderDate,
  deliveryTime,
}) => {

  return (
    <div
      className="
        border
        border-gray-800
        rounded-xl
        bg-[#080808]
        p-5
        md:p-6
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
    >

      {/* ORDER ID */}

      <div>

        <p className="text-xs text-gray-500 uppercase">
          Order ID
        </p>

        <p className="text-white font-semibold mt-2">
          {orderId}
        </p>

      </div>

      {/* ORDER DATE */}

      <div>

        <div className="flex items-center gap-2">

          <CalendarDays
            size={16}
            className="text-yellow-400"
          />

          <p className="text-xs text-gray-500 uppercase">
            Ordered On
          </p>

        </div>

        <p className="text-white font-medium mt-2">
          {orderDate}
        </p>

      </div>

      {/* DELIVERY */}

      <div>

        <div className="flex items-center gap-2">

          <MapPin
            size={16}
            className="text-yellow-400"
          />

          <p className="text-xs text-gray-500 uppercase">
            Delivery
          </p>

        </div>

        <p className="text-yellow-400 font-medium mt-2">
          {deliveryTime}
        </p>

      </div>

    </div>
  );
};

export default OrderInfoCard;