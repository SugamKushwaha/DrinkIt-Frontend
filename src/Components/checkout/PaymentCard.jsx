import React from "react";

const PaymentCard = ({
  selected,
  onClick,
  icon,
  title,
  subtitle,
}) => {

  return (
    <button
      onClick={onClick}
      className={`
        text-left
        rounded-xl
        p-4
        border
        transition
        ${
          selected
            ? "border-yellow-400 bg-yellow-400/[0.04]"
            : "border-white/10 bg-[#0d0d0d] hover:border-white/20"
        }
      `}
    >

      <div className="flex justify-between mb-4">

        <div
          className={`
            w-5
            h-5
            rounded-full
            border
            flex
            items-center
            justify-center
            ${
              selected
                ? "border-yellow-400"
                : "border-gray-600"
            }
          `}
        >

          {selected && (
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          )}

        </div>

        <div
          className={
            selected
              ? "text-yellow-400"
              : "text-gray-400"
          }
        >
          {icon}
        </div>

      </div>

      <h3 className="font-semibold text-sm">
        {title}
      </h3>

      <p className="text-xs text-gray-500 mt-1">
        {subtitle}
      </p>

    </button>
  );
};

export default PaymentCard;