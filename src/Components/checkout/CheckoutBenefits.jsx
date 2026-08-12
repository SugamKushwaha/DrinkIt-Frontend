import React from "react";

import {
  Zap,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "10–20 mins",
    subtitle: "Fast Delivery",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
    subtitle: "Payments",
  },
  {
    icon: BadgeCheck,
    title: "Best Prices",
    subtitle: "Guaranteed",
  },
];

const CheckoutBenefits = () => {
  return (
    <div className="flex flex-wrap gap-4">

      {benefits.map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              flex
              items-center
              gap-3
              px-5
              py-3
              rounded-xl
              border
              border-white/10
              bg-[#111111]
              min-w-[170px]
            "
          >

            <Icon
              size={21}
              className="text-yellow-400"
            />

            <div>

              <p className="font-semibold text-sm">
                {item.title}
              </p>

              <p className="text-xs text-gray-500">
                {item.subtitle}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default CheckoutBenefits;