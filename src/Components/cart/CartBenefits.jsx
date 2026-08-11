import React from "react";
import {
  BadgePercent,
  Package,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const CartBenefits = () => {

  const benefits = [
    {
      icon: BadgePercent,
      title: "Best Prices",
      text: "Get the best prices on premium drinks",
    },
    {
      icon: Package,
      title: "Fast Delivery",
      text: "Get your order delivered by tomorrow",
    },
    {
      icon: ShieldCheck,
      title: "Easy Returns",
      text: "Not happy? Return within 7 days",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      text: "We are here to help you anytime",
    },
  ];


  return (

    <div
      className="
        border
        border-gray-800
        rounded-xl
        p-6
        space-y-7
      "
    >

      {benefits.map(
        ({
          icon: Icon,
          title,
          text,
        }) => (

          <div
            key={title}
            className="flex gap-4"
          >

            <Icon
              size={27}
              className="text-yellow-500 flex-shrink-0"
            />

            <div>

              <h3 className="font-semibold">
                {title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {text}
              </p>

            </div>

          </div>

        )
      )}

    </div>
  );
};

export default CartBenefits;