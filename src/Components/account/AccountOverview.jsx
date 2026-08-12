import React from "react";

import {
  Package,
  MapPin,
  CreditCard,
  Heart,
  Bell,
  Headphones,
} from "lucide-react";

import AccountOverviewCard from "./AccountOverviewCard";

const AccountOverview = ({ onNavigate }) => {

  const cards = [
    {
      id: "orders",
      icon: Package,
      title: "My Orders",
      description: "Track and manage your orders",
    },
    {
      id: "addresses",
      icon: MapPin,
      title: "Addresses",
      description: "Manage your saved addresses",
    },
    {
      id: "payments",
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage cards and payment options",
    },
    {
      id: "wishlist",
      icon: Heart,
      title: "Wishlist",
      description: "View and manage your wishlist items",
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Notifications",
      description: "Manage account notifications",
    },
    {
      id: "support",
      icon: Headphones,
      title: "Help & Support",
      description: "Get help and view FAQs",
    },
  ];

  return (
    <section>

      <h2 className="text-2xl font-semibold mb-5">
        Account Overview
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        "
      >

        {cards.map((card) => (

          <AccountOverviewCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            onClick={() =>
              onNavigate(card.id)
            }
          />

        ))}

      </div>

    </section>
  );
};

export default AccountOverview;