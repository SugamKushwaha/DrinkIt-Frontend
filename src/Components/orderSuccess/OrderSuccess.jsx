import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Package,
  ShoppingBag,
} from "lucide-react";

import { getCart } from "../../utils/cartUtils";
import { calculateCartTotals } from "../../utils/priceUtils";

import SuccessHeader from "../../components/orderSuccess/SuccessHeader";
import DeliveryAddress from "../../components/orderSuccess/DeliveryAddress";
import OrderItems from "../../components/orderSuccess/OrderItems";
import OrderPriceSummary from "../../components/orderSuccess/OrderPriceSummary";
import OrderBenefits from "../../components/orderSuccess/OrderBenefits";

const OrderSuccess = () => {

  const navigate = useNavigate();

  // =====================================================
  // ORDER STATE
  // =====================================================

  const [order, setOrder] = useState(null);

  // =====================================================
  // LOAD ORDER
  // =====================================================

  useEffect(() => {

    /*
      For now we are using localStorage.

      Later this will come from:
      
      Spring Boot
          ↓
      GET /api/orders/{orderId}
    */

    const storedOrder =
      localStorage.getItem("drinkit-last-order");

    if (storedOrder) {

      setOrder(
        JSON.parse(storedOrder)
      );

      return;
    }

    /*
      TEMPORARY FALLBACK

      This allows you to see the page
      even before order creation is connected.
    */

    const cart = getCart();

    if (cart.length === 0) {
      navigate("/shop");
      return;
    }

    const totals =
      calculateCartTotals(cart);

    const temporaryOrder = {

      id: `DI-${Date.now()}`,

      items: cart,

      ...totals,

      address: {
        name: "Your Name",
        address: "Your Address",
        city: "Your City",
        country: "India",
        phone: "",
      },

      orderDate:
        new Date().toLocaleDateString(
          "en-IN"
        ),

      deliveryTime:
        "Today • 7:30 PM",
    };

    setOrder(temporaryOrder);

  }, [navigate]);

  // =====================================================
  // LOADING
  // =====================================================

  if (!order) {

    return (
      <div
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        "
      >

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
        text-white
        px-5
        py-10
        md:px-8
        lg:px-10
      "
    >

      <div
        className="
          max-w-[1100px]
          mx-auto
        "
      >

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
            lg:grid-cols-[1fr_360px]
            gap-5
            items-start
          "
        >

          {/* ==============================================
              LEFT
          ============================================== */}

          <div className="space-y-5">

            {/* DELIVERY ADDRESS */}

            <DeliveryAddress
              address={order.address}
            />

            {/* ORDER ITEMS */}

            <OrderItems
              items={order.items}
            />

          </div>

          {/* ==============================================
              RIGHT
          ============================================== */}

          <div
            className="
              space-y-5
              lg:sticky
              lg:top-6
            "
          >

            {/* PRICE */}

            <OrderPriceSummary
              subtotal={order.subtotal}
              deliveryFee={order.deliveryFee}
              discount={order.discount}
              total={order.total}
            />

            {/* TRACK */}

            <button
              // onClick={() =>
              //   navigate(
              //     `/orders/${order.id}`
              //   )
              // }
              className="
                w-full
                h-14
                rounded-xl
                bg-yellow-400
                hover:bg-yellow-300
                text-black
                font-bold
                flex
                items-center
                justify-center
                gap-2
                transition
              "
            >

              <Package size={19} />

              TRACK ORDER

            </button>

            {/* CONTINUE SHOPPING */}

            <button
              onClick={() =>
                navigate("/shop")
              }
              className="
                w-full
                h-14
                rounded-xl
                border
                border-yellow-400
                text-yellow-400
                hover:bg-yellow-400
                hover:text-black
                font-bold
                flex
                items-center
                justify-center
                gap-2
                transition
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