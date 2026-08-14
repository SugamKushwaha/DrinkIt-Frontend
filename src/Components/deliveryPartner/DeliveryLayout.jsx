import React from "react";
import { Outlet } from "react-router-dom";

import DeliverySidebar from "./DeliverySidebar";
import DeliveryHeader from "./DeliveryHeader";

const DeliveryLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">

      <DeliverySidebar />

      <div className="min-w-0 flex-1">

        <DeliveryHeader />

        <main>
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DeliveryLayout;