import React, { useEffect, useState } from "react";
import {
  LockKeyhole,
  ShoppingBag,
  Check,
} from "lucide-react";

import CheckoutItem from "./CheckoutItem";
import PriceSummary from "./PriceSummary";

import { getCart } from "../../utils/cartUtils";
import { calculateCartTotals } from "../../utils/priceUtils";

const OrderSummary = ({
  onPlaceOrder,
}) => {

  // ==================================================
  // CART STATE
  // ==================================================

  const [cartItems, setCartItems] = useState([]);

  // ==================================================
  // LOAD CART
  // ==================================================

  const loadCart = () => {

    const cart = getCart();

    setCartItems(cart);

  };

  // ==================================================
  // LOAD CART WHEN COMPONENT MOUNTS
  // ==================================================

  useEffect(() => {

    // Load initial cart
    loadCart();

    // Listen for cart changes
    window.addEventListener(
      "cartUpdated",
      loadCart
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "cartUpdated",
        loadCart
      );
    };

  }, []);

  // ==================================================
  // SUBTOTAL
  // ==================================================
// ==================================================
// CART TOTALS
// ==================================================

const {
  subtotal,
  deliveryFee,
  discount,
  total,
} = calculateCartTotals(cartItems);
  // const subtotal = cartItems.reduce(
  //   (total, item) =>
  //     total +
  //     Number(item.price) *
  //     Number(item.quantity),
  //   0
  // );

  // ==================================================
  // DELIVERY
  // ==================================================

  // const deliveryFee =
  //   subtotal >= 500
  //     ? 0
  //     : 40;

  // ==================================================
  // DISCOUNT
  // ==================================================

  // Keep 0 for now.
  // Coupon system can be added later.

  // const discount = subtotal >= 1000 ? 200 : 0;

  // ==================================================
  // FINAL TOTAL
  // ==================================================

  // const total =
  //   subtotal +
  //   deliveryFee -
  //   discount;

  // ==================================================
  // EMPTY CART
  // ==================================================

  if (cartItems.length === 0) {

    return (
      <aside className="
        xl:sticky
        xl:top-6
        h-fit
      ">

        <div className="
          rounded-2xl
          border
          border-white/10
          bg-[#111111]
          p-6
          text-center
        ">

          <ShoppingBag
            size={40}
            className="
              mx-auto
              text-gray-600
              mb-4
            "
          />

          <h2 className="
            text-lg
            font-semibold
          ">
            Your cart is empty
          </h2>

          <p className="
            text-sm
            text-gray-500
            mt-2
          ">
            Add some products before checkout.
          </p>

        </div>

      </aside>
    );
  }

  // ==================================================
  // MAIN
  // ==================================================

  return (
    <aside className="
      xl:sticky
      xl:top-6
      h-fit
    ">

      <div className="
        rounded-2xl
        border
        border-white/10
        bg-[#111111]
        overflow-hidden
      ">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="
          p-6
          border-b
          border-white/10
          flex
          items-center
          gap-3
        ">

          <ShoppingBag
            size={21}
            className="text-yellow-400"
          />

          <div>

            <h2 className="
              text-xl
              font-semibold
            ">
              Order Summary
            </h2>

            <p className="
              text-xs
              text-gray-500
              mt-1
            ">
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item"
                : "items"}
            </p>

          </div>

        </div>

        {/* ==========================================
            ITEMS
        ========================================== */}

        <div className="
          p-5
          space-y-5
        ">

          {cartItems.map((item) => (

            <CheckoutItem
              key={item.id}
              item={item}
            />

          ))}

        </div>

        {/* ==========================================
            PRICE
        ========================================== */}

        <PriceSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          discount={discount}
          total={total}
        />

        {/* ==========================================
            SAVING
        ========================================== */}

        {discount > 0 && (

          <div className="
            mx-5
            mb-5
            rounded-xl
            border
            border-green-500/20
            bg-green-500/5
            px-4
            py-3
            flex
            gap-2
            items-center
            text-green-400
            text-sm
          ">

            <Check size={17} />

            <span>
              Yay! You saved ₹
              {discount.toLocaleString("en-IN")}
            </span>

          </div>

        )}

        {/* ==========================================
            PLACE ORDER
        ========================================== */}

        <div className="
          px-5
          pb-5
        ">

          <button 
            onClick={onPlaceOrder}
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

            <LockKeyhole size={19} />

            Place Order

          </button>

          <p className="
            text-[11px]
            text-gray-600
            text-center
            mt-4
          ">
            By placing this order, you agree to
            DrinkIt's Terms & Conditions and
            Privacy Policy.
          </p>

        </div>

      </div>

    </aside>
  );
};

export default OrderSummary;