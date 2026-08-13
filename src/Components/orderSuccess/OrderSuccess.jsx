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
  // CREATE DELIVERY TIME
  // 30 MINUTES AFTER ORDER
  // =====================================================

  const calculateDeliveryTime = (orderTime) => {
    const orderDate = new Date(orderTime);

    // If orderTime is invalid, use current time
    if (isNaN(orderDate.getTime())) {
      orderDate.setTime(Date.now());
    }

    // Add 30 minutes
    orderDate.setMinutes(orderDate.getMinutes() + 30);

    // Format time according to user's local time
    return orderDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

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
        "ORIGINAL ORDER:",
        parsedOrder
      );

      // =================================================
      // GET ORDER TIME
      // =================================================

      const orderTime =
        parsedOrder.createdAt ||
        parsedOrder.orderTime ||
        parsedOrder.createdDate ||
        new Date().toISOString();

      // =================================================
      // CALCULATE DELIVERY TIME
      // 30 MINUTES AFTER ORDER
      // =================================================

      const deliveryTime =
        calculateDeliveryTime(orderTime);

      // =================================================
      // CREATE UPDATED ORDER
      // =================================================

      const updatedOrder = {
        ...parsedOrder,

        // Keep exact order creation time
        createdAt: orderTime,

        // Delivery is exactly 30 minutes after order
        deliveryTime: deliveryTime,

        // Optional readable delivery text
        estimatedDelivery: deliveryTime,

        // Default status
        status: parsedOrder.status || "CONFIRMED",
      };

      console.log(
        "UPDATED ORDER:",
        updatedOrder
      );

      // =================================================
      // SET CURRENT ORDER
      // =================================================

      setOrder(updatedOrder);

      // =================================================
      // SAVE UPDATED LAST ORDER
      // =================================================

      localStorage.setItem(
        "drinkit-last-order",
        JSON.stringify(updatedOrder)
      );

      // =================================================
      // SAVE TO MY ORDERS
      // =================================================

      const existingOrders = JSON.parse(
        localStorage.getItem(
          "drinkit-orders"
        ) || "[]"
      );

      // =================================================
      // CHECK IF ORDER ALREADY EXISTS
      // =================================================

      const orderAlreadyExists =
        existingOrders.some(
          (existingOrder) =>
            String(existingOrder.id) ===
            String(updatedOrder.id)
        );

      let updatedOrders;

      if (orderAlreadyExists) {

        // =================================================
        // UPDATE EXISTING ORDER
        // =================================================

        updatedOrders =
          existingOrders.map(
            (existingOrder) =>
              String(existingOrder.id) ===
              String(updatedOrder.id)
                ? updatedOrder
                : existingOrder
          );

      } else {

        // =================================================
        // ADD NEW ORDER
        // =================================================

        updatedOrders = [
          updatedOrder,
          ...existingOrders,
        ];
      }

      // =================================================
      // SAVE ORDERS
      // =================================================

      localStorage.setItem(
        "drinkit-orders",
        JSON.stringify(updatedOrders)
      );

      console.log(
        "ORDERS SAVED:",
        updatedOrders
      );

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
          deliveryTime={order.deliveryTime}
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

            {/* =================================================
                PRICE
            ================================================= */}

            <OrderPriceSummary
              subtotal={Number(
                order.subtotal || 0
              )}

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