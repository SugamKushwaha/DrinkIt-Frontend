import React from "react";

import BuildNightSection from "./BuildNightSection";
import FastDeliverySection from "./FastDeliverySection";

const BuildNightAndDelivery = () => {
  return (
    <section className="bg-black py-6">

      <div className="max-w-[1500px] mx-auto px-5">

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-1">

          {/* LEFT */}

          <BuildNightSection />

          {/* RIGHT */}

          <FastDeliverySection />

        </div>

      </div>

    </section>
  );
};

export default BuildNightAndDelivery;