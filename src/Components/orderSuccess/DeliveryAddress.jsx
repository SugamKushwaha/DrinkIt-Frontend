import React from "react";
import {
  MapPin,
  Phone,
} from "lucide-react";

const DeliveryAddress = ({ address }) => {

  if (!address) return null;

  return (
    <div
      className="
        border
        border-gray-800
        rounded-xl
        bg-[#080808]
        p-6
      "
    >

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-6">

        <div
          className="
            w-10
            h-10
            rounded-lg
            border
            border-gray-800
            flex
            items-center
            justify-center
          "
        >

          <MapPin
            size={20}
            className="text-yellow-400"
          />

        </div>

        <h2 className="text-lg font-semibold">
          Delivery Address
        </h2>

      </div>

      {/* ADDRESS */}

      <div className="ml-0">

        <h3 className="font-semibold text-lg">
          {address.name}
        </h3>

        <p className="text-gray-400 text-sm mt-2">
          {address.address}
        </p>

        <p className="text-gray-400 text-sm">
          {address.city}
        </p>

        <p className="text-gray-400 text-sm">
          {address.country}
        </p>

        {address.phone && (
          <div
            className="
              flex
              items-center
              gap-2
              text-gray-400
              text-sm
              mt-3
            "
          >

            <Phone size={14} />

            {address.phone}

          </div>
        )}

      </div>

    </div>
  );
};

export default DeliveryAddress;