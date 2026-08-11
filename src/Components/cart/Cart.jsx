import React, { useEffect, useState } from "react";

import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Lock,
  ShieldCheck,
  PackageCheck,
  Headphones,
  Tag,
  Truck,
} from "lucide-react";

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../../utils/cartUtils";

import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // =====================================================
  // LOAD CART
  // =====================================================

  useEffect(() => {
    setCart(getCart());
  }, []);

  // =====================================================
  // REMOVE PRODUCT
  // =====================================================

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      return;
    }

    updateCartQuantity(
      item.id,
      item.quantity - 1
    );

    setCart(getCart());
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const handleIncrease = (item) => {
    updateCartQuantity(
      item.id,
      item.quantity + 1
    );

    setCart(getCart());
  };

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * item.quantity,
    0
  );

  // =====================================================
  // DELIVERY FEE
  // =====================================================

  const deliveryFee = subtotal >= 999 ? 0 : 50;

  // =====================================================
  // DISCOUNT
  // =====================================================

  const discount =
    subtotal >= 3000
      ? Math.round(subtotal * 0.05)
      : 0;

  // =====================================================
  // FINAL TOTAL
  // =====================================================

  const total =
    subtotal +
    deliveryFee -
    discount;

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-5">

        <div className="text-center max-w-md">

          <div
            className="
              w-24
              h-24
              mx-auto
              rounded-full
              border
              border-gray-800
              bg-[#0d0d0d]
              flex
              items-center
              justify-center
            "
          >
            <ShoppingCart
              size={42}
              className="text-yellow-500"
            />
          </div>

          <h1 className="text-3xl font-bold mt-7">
            Your cart is empty
          </h1>

          <p className="text-gray-500 mt-3">
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="
              mt-7
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-semibold
              px-8
              py-3
              rounded-lg
              transition
            "
          >
            START SHOPPING
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-5 py-8 md:px-8 lg:px-10">

      <div className="max-w-[1400px] mx-auto">

        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <div className="flex items-center gap-6 mb-8">

          <button
            onClick={() => navigate("/shop")}
            className="
              flex
              items-center
              gap-2
              text-yellow-500
              hover:text-yellow-400
              transition
              text-sm
              font-medium
            "
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>

          <div className="hidden md:flex items-center gap-3 text-sm">

            <span className="text-gray-500">
              Home
            </span>

            <span className="text-gray-700">
              ›
            </span>

            <span className="text-white">
              Your Cart
            </span>

          </div>

        </div>

        {/* =====================================================
            TITLE
        ===================================================== */}

        <div className="mb-7">

          <h1 className="text-4xl md:text-5xl font-semibold">

            Your Cart

            <span className="text-gray-500 text-2xl md:text-3xl ml-3">
              ({cart.length})
            </span>

          </h1>

          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Review your items and proceed to checkout
          </p>

        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_310px]
            gap-5
            items-start
          "
        >

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div>

            {/* =================================================
                PRODUCT BOX
            ================================================= */}

            <div
              className="
                border
                border-gray-800
                rounded-lg
                bg-[#080808]
                overflow-hidden
              "
            >

              {/* HEADER */}

              <div
                className="
                  hidden
                  md:grid
                  grid-cols-[1fr_100px_150px_100px]
                  gap-5
                  px-5
                  py-5
                  border-b
                  border-gray-800
                  text-gray-400
                  text-xs
                  uppercase
                  tracking-wide
                "
              >
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>

              {/* CART PRODUCTS */}

              <div className="px-5">

                {cart.map((item, index) => {

                  const itemTotal =
                    Number(item.price || 0) *
                    item.quantity;

                  return (
                    <div
                      key={item.id}
                      className={`
                        py-5
                        flex
                        flex-col
                        md:grid
                        md:grid-cols-[1fr_100px_150px_100px]
                        gap-5
                        md:items-center
                        ${
                          index !== cart.length - 1
                            ? "border-b border-gray-800"
                            : ""
                        }
                      `}
                    >

                      {/* ======================================
                          PRODUCT
                      ====================================== */}

                      <div
                        className="
                          flex
                          gap-4
                          items-center
                          min-w-0
                        "
                      >

                        {/* IMAGE */}

                        <div
                          className="
                            w-24
                            h-32
                            shrink-0
                            rounded-lg
                            border
                            border-gray-800
                            bg-[#0d0d0d]
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                          "
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                            className="
                              w-full
                              h-full
                              object-contain
                              p-2
                            "
                          />

                        </div>

                        {/* INFO */}

                        <div className="min-w-0">

                          <h2
                            className="
                              text-lg
                              font-semibold
                              text-white
                              leading-tight
                            "
                          >
                            {item.name}
                          </h2>

                          <p
                            className="
                              text-gray-400
                              text-sm
                              mt-2
                            "
                          >
                            {item.volume ||
                              item.size ||
                              "Standard"}
                          </p>

                          {/* STOCK */}

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              mt-2
                            "
                          >

                            <span
                              className="
                                w-2
                                h-2
                                rounded-full
                                bg-green-500
                              "
                            />

                            <span
                              className="
                                text-green-500
                                text-xs
                              "
                            >
                              In Stock
                            </span>

                          </div>

                          {/* REMOVE */}

                          <button
                            onClick={() =>
                              handleRemove(item.id)
                            }
                            className="
                              flex
                              items-center
                              gap-2
                              text-gray-500
                              hover:text-red-500
                              text-xs
                              mt-5
                              transition
                            "
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>

                        </div>

                      </div>

                      {/* ======================================
                          PRICE
                      ====================================== */}

                      <div
                        className="
                          flex
                          justify-between
                          md:block
                        "
                      >

                        <span
                          className="
                            md:hidden
                            text-gray-500
                            text-sm
                          "
                        >
                          Price
                        </span>

                        <span
                          className="
                            text-white
                            font-semibold
                          "
                        >
                          ₹{formatPrice(item.price)}
                        </span>

                      </div>

                      {/* ======================================
                          QUANTITY
                      ====================================== */}

                      <div
                        className="
                          flex
                          justify-between
                          md:justify-start
                          items-center
                        "
                      >

                        <span
                          className="
                            md:hidden
                            text-gray-500
                            text-sm
                          "
                        >
                          Quantity
                        </span>

                        <div
                          className="
                            flex
                            items-center
                            border
                            border-gray-700
                            rounded-lg
                            overflow-hidden
                          "
                        >

                          <button
                            onClick={() =>
                              handleDecrease(item)
                            }
                            className="
                              w-10
                              h-10
                              flex
                              items-center
                              justify-center
                              text-gray-300
                              hover:bg-gray-800
                              transition
                            "
                          >
                            <Minus size={15} />
                          </button>

                          <span
                            className="
                              w-10
                              text-center
                              text-sm
                            "
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleIncrease(item)
                            }
                            className="
                              w-10
                              h-10
                              flex
                              items-center
                              justify-center
                              text-gray-300
                              hover:bg-gray-800
                              transition
                            "
                          >
                            <Plus size={15} />
                          </button>

                        </div>

                      </div>

                      {/* ======================================
                          TOTAL
                      ====================================== */}

                      <div
                        className="
                          flex
                          justify-between
                          md:block
                          text-right
                        "
                      >

                        <span
                          className="
                            md:hidden
                            text-gray-500
                            text-sm
                          "
                        >
                          Total
                        </span>

                        <span
                          className="
                            text-white
                            font-semibold
                          "
                        >
                          ₹{formatPrice(itemTotal)}
                        </span>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* =================================================
                SECURITY
            ================================================= */}

            <div
              className="
                border
                border-gray-800
                rounded-lg
                bg-[#080808]
                mt-5
                p-6
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >

              <div className="flex items-center gap-4">

                <ShieldCheck
                  size={30}
                  className="text-yellow-500 shrink-0"
                />

                <div>

                  <h3 className="text-sm font-medium">
                    Safe & Secure
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    100% secure payment and authentic products
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <Lock
                  size={30}
                  className="text-yellow-500 shrink-0"
                />

                <div>

                  <h3 className="text-sm font-medium">
                    Secure Packaging
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Carefully packed and delivered safely
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div
            className="
              space-y-5
              lg:sticky
              lg:top-5
            "
          >

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <div
              className="
                border
                border-gray-800
                rounded-lg
                bg-[#080808]
                p-5
              "
            >

              <h2
                className="
                  text-xl
                  font-semibold
                  mb-7
                "
              >
                Order Summary
              </h2>

              {/* SUBTOTAL */}

              <div
                className="
                  flex
                  justify-between
                  text-sm
                  text-gray-400
                "
              >

                <span>
                  Subtotal ({totalItems} items)
                </span>

                <span className="text-white">
                  ₹{formatPrice(subtotal)}
                </span>

              </div>

              {/* DELIVERY */}

              <div
                className="
                  flex
                  justify-between
                  text-sm
                  text-gray-400
                  mt-4
                "
              >

                <span>
                  Delivery Fee
                </span>

                <span
                  className={
                    deliveryFee === 0
                      ? "text-green-500"
                      : "text-white"
                  }
                >
                  {deliveryFee === 0
                    ? "FREE"
                    : `₹${formatPrice(deliveryFee)}`}
                </span>

              </div>

              {/* DISCOUNT */}

              {discount > 0 && (
                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    mt-4
                  "
                >

                  <span className="text-green-500">
                    Discount
                  </span>

                  <span className="text-green-500">
                    -₹{formatPrice(discount)}
                  </span>

                </div>
              )}

              <div
                className="
                  border-t
                  border-gray-800
                  my-6
                "
              />

              {/* TOTAL */}

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <h3 className="text-base font-medium">
                    Total Amount
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Inclusive of all taxes
                  </p>

                </div>

                <span
                  className="
                    text-3xl
                    font-medium
                  "
                >
                  ₹{formatPrice(total)}
                </span>

              </div>

              {/* CHECKOUT */}

              <button
                onClick={() => navigate("/checkout")}
                className="
                  w-full
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  py-4
                  rounded-lg
                  font-semibold
                  mt-7
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >
                <Lock size={18} />
                PROCEED TO CHECKOUT
              </button>

              {/* CONTINUE SHOPPING */}

              <button
                onClick={() => navigate("/shop")}
                className="
                  w-full
                  border
                  border-yellow-500
                  text-yellow-500
                  hover:bg-yellow-500
                  hover:text-black
                  py-3
                  rounded-lg
                  font-semibold
                  mt-3
                  transition
                "
              >
                CONTINUE SHOPPING
              </button>

            </div>

            {/* =================================================
                BENEFITS
            ================================================= */}

            <div
              className="
                border
                border-gray-800
                rounded-lg
                bg-[#080808]
                p-5
                space-y-6
              "
            >

              {/* BEST PRICES */}

              <div className="flex gap-4">

                <Tag
                  size={27}
                  className="text-yellow-500 shrink-0"
                />

                <div>

                  <h3
                    className="
                      text-sm
                      text-yellow-500
                      font-medium
                    "
                  >
                    Best Prices
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      mt-1
                    "
                  >
                    Get the best prices on premium drinks
                  </p>

                </div>

              </div>

              {/* FAST DELIVERY */}

              <div className="flex gap-4">

                <Truck
                  size={27}
                  className="text-yellow-500 shrink-0"
                />

                <div>

                  <h3
                    className="
                      text-sm
                      text-yellow-500
                      font-medium
                    "
                  >
                    Fast Delivery
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      mt-1
                    "
                  >
                    Get your order delivered quickly
                  </p>

                </div>

              </div>

              {/* RETURNS */}

              <div className="flex gap-4">

                <PackageCheck
                  size={27}
                  className="text-yellow-500 shrink-0"
                />

                <div>

                  <h3
                    className="
                      text-sm
                      text-yellow-500
                      font-medium
                    "
                  >
                    Easy Returns
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      mt-1
                    "
                  >
                    Not happy? Return within 7 days
                  </p>

                </div>

              </div>

              {/* SUPPORT */}

              <div className="flex gap-4">

                <Headphones
                  size={27}
                  className="text-yellow-500 shrink-0"
                />

                <div>

                  <h3
                    className="
                      text-sm
                      text-yellow-500
                      font-medium
                    "
                  >
                    24/7 Support
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      mt-1
                    "
                  >
                    We are here to help you anytime
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
        

      </div>

    </div>
  );
};

export default CartPage;