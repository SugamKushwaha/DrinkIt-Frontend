import React from "react";

const CheckoutSection = ({
  number,
  title,
  icon,
  children,
}) => {

  return (
    <section className="rounded-2xl border border-white/10 bg-[#111111] overflow-hidden">

      <div className="px-5 lg:px-6 py-4 border-b border-white/10 flex items-center gap-3">

        <div className="
          w-8
          h-8
          rounded-full
          bg-yellow-400
          text-black
          flex
          items-center
          justify-center
          font-bold
          text-sm
        ">
          {number}
        </div>

        <div className="flex items-center gap-2">

          <span className="text-yellow-400">
            {icon}
          </span>

          <h2 className="font-semibold text-lg">
            {title}
          </h2>

        </div>

      </div>

      <div className="p-5 lg:p-6">
        {children}
      </div>

    </section>
  );
};

export default CheckoutSection;