import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Package,
  ShoppingBag,
} from "lucide-react";

import SuccessHeader from "../../components/orderSuccess/SuccessHeader";
import DeliveryAddress from "../../components/orderSuccess/DeliveryAddress";
import OrderItems from "../../components/orderSuccess/OrderItems";
import OrderPriceSummary from "../../components/orderSuccess/OrderPriceSummary";
import OrderBenefits from "../../components/orderSuccess/OrderBenefits";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  // =====================================================
  // LOAD ORDER
  // =====================================================

  useEffect(() => {
    const storedOrder = localStorage.getItem(
      "drinkit-last-order"
    );

    if (!storedOrder) {
      navigate("/shop");
      return;
    }

    try {
      const parsedOrder = JSON.parse(storedOrder);

      console.log(
        "ORDER FROM ORDER SUCCESS:",
        parsedOrder
      );

      // =================================================
      // SET CURRENT ORDER
      // =================================================

      setOrder(parsedOrder);

      // =================================================
      // SAVE ORDER TO MY ORDERS
      // =================================================

      const existingOrders = JSON.parse(
        localStorage.getItem("drinkit-orders") || "[]"
      );

      // Check if this order already exists
      const orderAlreadyExists = existingOrders.some(
        (existingOrder) =>
          String(existingOrder.id) ===
          String(parsedOrder.id)
      );

      // Add only if it doesn't already exist
      if (!orderAlreadyExists) {
        const updatedOrders = [
          parsedOrder,
          ...existingOrders,
        ];

        localStorage.setItem(
          "drinkit-orders",
          JSON.stringify(updatedOrders)
        );

        console.log(
          "ORDER SAVED TO MY ORDERS:",
          updatedOrders
        );
      }
    } catch (error) {
      console.error(
        "Failed to load order:",
        error
      );

      navigate("/shop");
    }
  }, [navigate]);

  // =====================================================
  // LOADING
  // =====================================================

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-gray-500">
          Loading order...
        </p>
      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div
      className="
        min-h-screen
        bg-black
        px-5
        py-10
        text-white
        md:px-8
        lg:px-10
      "
    >
      <div className="mx-auto max-w-[1100px]">

        {/* =================================================
            SUCCESS HEADER
        ================================================= */}

        <SuccessHeader
          orderId={order.id}
          deliveryTime={
            order.deliveryTime ||
            order.estimatedDelivery ||
            "20 - 30 minutes"
          }
        />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-5
            lg:grid-cols-[1fr_360px]
          "
        >

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-5">

            {/* DELIVERY ADDRESS */}

            <DeliveryAddress
              address={order.address || {}}
            />

            {/* ORDER ITEMS */}

            <OrderItems
              items={order.items || []}
            />

          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div
            className="
              space-y-5
              lg:sticky
              lg:top-6
            "
          >

            {/* PRICE */}

            <OrderPriceSummary
              subtotal={Number(order.subtotal || 0)}
              deliveryFee={Number(
                order.deliveryFee || 0
              )}
              discount={Number(
                order.discount || 0
              )}
              total={Number(
                order.total || 0
              )}
            />

            {/* =================================================
                TRACK ORDER
            ================================================= */}

            <button
              onClick={() =>
                navigate(
                  `/track-order/${order.id}`
                )
              }
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-yellow-400
                font-bold
                text-black
                transition
                hover:bg-yellow-300
              "
            >
              <Package size={19} />

              TRACK ORDER
            </button>

            {/* =================================================
                MY ORDERS
            ================================================= */}

            <button
              onClick={() =>
                navigate("/orders")
              }
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-yellow-400
                font-bold
                text-yellow-400
                transition
                hover:bg-yellow-400
                hover:text-black
              "
            >
              <Package size={19} />

              MY ORDERS
            </button>

            {/* =================================================
                CONTINUE SHOPPING
            ================================================= */}

            <button
              onClick={() =>
                navigate("/shop")
              }
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-700
                font-bold
                text-white
                transition
                hover:border-white
                hover:bg-white
                hover:text-black
              "
            >
              <ShoppingBag size={19} />

              CONTINUE SHOPPING
            </button>

          </div>

        </div>

        {/* =================================================
            BENEFITS
        ================================================= */}

        <div className="mt-6">
          <OrderBenefits />
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;