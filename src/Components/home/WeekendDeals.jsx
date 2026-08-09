import React from "react";
import { Flame } from "lucide-react";

import deals from "../../data/deals";
import DealCard from "./DealCard";

const WeekendDeals = () => {
  return (
    <section className="bg-black py-8">

      <div className="max-w-[1450px] mx-auto px-5">

        {/* ================= SECTION HEADER ================= */}

        <div className="flex items-center justify-center gap-3 mb-4">

          <div className="hidden sm:block w-16 h-[2px] bg-yellow-500" />

          <div className="flex items-center gap-2">

            <Flame
              size={22}
              className="text-orange-500"
              fill="currentColor"
            />

            <h2
              className="
                text-white
                text-xl
                sm:text-2xl
                font-bold
                uppercase
              "
            >
              Weekend Deals
            </h2>

          </div>

          <div className="hidden sm:block w-16 h-[2px] bg-yellow-500" />

        </div>


        {/* ================= DEAL CARDS ================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-4
          "
        >

          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default WeekendDeals;