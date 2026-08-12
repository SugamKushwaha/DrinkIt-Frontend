import React from "react";

import {
  Package,
  MapPin,
  CreditCard,
  Heart,
  Bell,
  Headphones,
  ChevronRight,
} from "lucide-react";

const AccountOverviewCard = ({
  icon: Icon,
  title,
  description,
  onClick,
}) => {

  return (
    <button
      onClick={onClick}
      className="
        w-full
        text-left
        border
        border-gray-800
        rounded-xl
        bg-[#080808]
        p-5
        flex
        items-center
        gap-4
        hover:border-yellow-500/50
        hover:bg-[#0d0d0d]
        transition
        group
      "
    >

      {/* ICON */}

      <div
        className="
          w-12
          h-12
          rounded-lg
          bg-yellow-500/10
          text-yellow-400
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        <Icon size={24} />
      </div>

      {/* CONTENT */}

      <div className="flex-1">

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>

      </div>

      {/* ARROW */}

      <ChevronRight
        size={20}
        className="
          text-gray-500
          group-hover:text-yellow-400
          transition
        "
      />

    </button>
  );
};

export default AccountOverviewCard;