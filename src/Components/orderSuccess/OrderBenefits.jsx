import React from "react";

import {
  ShieldCheck,
  Truck,
  Award,
  Headphones,
} from "lucide-react";

const benefits = [
  {
    title: "Safe & Secure",
    description: "100% secure payments",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description: "Quick & reliable delivery",
    icon: Truck,
  },
  {
    title: "Best Quality",
    description: "Original & premium products",
    icon: Award,
  },
  {
    title: "24/7 Support",
    description: "We are here to help",
    icon: Headphones,
  },
];

const OrderBenefits = () => {

  return (
    <div
      className="
        border
        border-gray-800
        rounded-xl
        bg-[#080808]
        p-6
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
    >

      {benefits.map((benefit) => {

        const Icon = benefit.icon;

        return (
          <div
            key={benefit.title}
            className="
              flex
              items-center
              gap-4
            "
          >

            <Icon
              size={28}
              className="
                text-yellow-400
                shrink-0
              "
            />

            <div>

              <h3
                className="
                  text-sm
                  font-medium
                  text-yellow-400
                "
              >
                {benefit.title}
              </h3>

              <p
                className="
                  text-xs
                  text-gray-500
                  mt-1
                "
              >
                {benefit.description}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default OrderBenefits;