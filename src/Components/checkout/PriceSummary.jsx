import React from "react";

const PriceSummary = ({
  subtotal,
  deliveryFee,
  discount,
  total,
}) => {

  return (
    <div className="
      border-t
      border-white/10
      p-5
      space-y-4
    ">

      <PriceRow
        label="Subtotal"
        value={`₹${subtotal.toLocaleString("en-IN")}`}
      />

      <PriceRow
        label="Delivery Fee"
        value={
          deliveryFee === 0
            ? "FREE"
            : `₹${deliveryFee}`
        }
        valueClass={
          deliveryFee === 0
            ? "text-green-400"
            : ""
        }
      />

      <PriceRow
        label="Discount"
        value={`-₹${discount.toLocaleString("en-IN")}`}
        valueClass="text-green-400"
      />

      {/* TOTAL */}

      <div className="
        border-t
        border-dashed
        border-white/10
        pt-4
        flex
        items-center
        justify-between
      ">

        <span className="font-semibold">
          Total Amount
        </span>

        <span className="
          text-2xl
          font-bold
          text-yellow-400
        ">
          ₹{total.toLocaleString("en-IN")}
        </span>

      </div>

    </div>
  );
};

const PriceRow = ({
  label,
  value,
  valueClass = "",
}) => {

  return (
    <div className="
      flex
      items-center
      justify-between
      text-sm
    ">

      <span className="text-gray-400">
        {label}
      </span>

      <span className={`font-medium ${valueClass}`}>
        {value}
      </span>

    </div>
  );
};

export default PriceSummary;