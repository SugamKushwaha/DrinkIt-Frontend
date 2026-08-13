import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
  User,
  MessageCircle,
  Navigation,
  User2,
} from "lucide-react";

const TrackOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  // =========================================================
  // LOAD ORDER FROM ORDER SUCCESS PAGE
  // =========================================================

  useEffect(() => {
    const savedOrder = localStorage.getItem("drinkit-last-order");

    if (!savedOrder) {
      navigate("/shop");
      return;
    }

    try {
      const parsedOrder = JSON.parse(savedOrder);
      setOrder(parsedOrder);
    } catch (error) {
      console.error("Error loading DrinkIt order:", error);
      navigate("/shop");
    }
  }, [navigate]);

  // =========================================================
  // LOADING
  // =========================================================

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

          <p className="text-sm font-medium text-gray-600">
            Loading your order...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ORDER DATA
  // =========================================================

  const items = Array.isArray(order.items) ? order.items : [];

  const address = order.address || {};

  const phone =
    order.phone ||
    address.phone ||
    "";

  const subtotal =
    Number(order.subtotal) ||
    items.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 1),
      0
    );

  const deliveryFee =
    Number(order.deliveryFee) || 0;

  const discount =
    Number(order.discount) || 0;

  const calculatedTotal =
    subtotal + deliveryFee - discount;

  const total =
    Number(order.total) || calculatedTotal;

  const totalItems = items.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const orderDate =
    order.orderDate ||
    order.date ||
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const estimatedDelivery =
    order.estimatedDelivery ||
    order.deliveryTime ||
    "20 - 30 minutes";

  const paymentMethod =
    order.paymentMethod ||
    "Cash on Delivery";

  // =========================================================
  // DELIVERY PARTNER
  // =========================================================

  const deliveryPartner = order.deliveryPartner || {
    name: "Rahul Sharma",
    phone: "+91 98765 12345",
    rating: 4.8,
    vehicle: "Bike",
    vehicleNumber: "UP32 AB 4521",
    deliveries: 1240,
    image: "/images/delivery/delivery-boy.png",
  };

  // =========================================================
  // ORDER STATUS
  // =========================================================

  const currentStatus =
    order.status || "PREPARING";

  const statusIndex = {
    PLACED: 0,
    CONFIRMED: 1,
    PREPARING: 2,
    OUT_FOR_DELIVERY: 3,
    DELIVERED: 4,
  };

  const currentIndex =
    statusIndex[currentStatus] ?? 2;

  // =========================================================
  // TRACKING STEPS
  // =========================================================

  const trackingSteps = [
    {
      id: "PLACED",
      title: "Order Placed",
      description: "We've received your order",
      icon: Package,
    },
    {
      id: "CONFIRMED",
      title: "Order Confirmed",
      description: "Your order has been confirmed",
      icon: Check,
    },
    {
      id: "PREPARING",
      title: "Preparing Your Order",
      description:
        "We're getting your drinks & snacks ready",
      icon: ShoppingBag,
    },
    {
      id: "OUT_FOR_DELIVERY",
      title: "Out for Delivery",
      description:
        "Your DrinkIt order is on the way",
      icon: Truck,
    },
    {
      id: "DELIVERED",
      title: "Delivered",
      description:
        "Enjoy your DrinkIt order!",
      icon: Check,
    },
  ];

  const currentMessage = {
    PLACED: "We've received your order",
    CONFIRMED: "Your order has been confirmed",
    PREPARING:
      "We're getting your drinks & snacks ready",
    OUT_FOR_DELIVERY:
      "Your DrinkIt order is on the way",
    DELIVERED:
      "Your order has been delivered",
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-black text-gray-900">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-black/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LEFT */}

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-gray-300 transition hover:bg-gray-400"
            >
              <ArrowLeft size={19}  />
            </button>

            <div>
              <h1 className="text-lg font-bold text-amber-600 sm:text-xl">
                Track Order
              </h1>

              <p className="text-xs text-gray-500 sm:text-sm">
                Order #{order.id || orderId}
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <button
            onClick={() => navigate("/shop")}
            className="hidden items-center gap-2 cursor-pointer rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-500 sm:flex"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* =================================================
            DELIVERY HERO
        ================================================== */}

        <section className="relative mb-6 overflow-hidden border-2 border-gray-400 rounded-[28px] bg-black text-white">

          {/* Decorative circles */}

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.04]" />

          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/[0.03]" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

              {/* STATUS */}

              <div>
                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                    <Truck size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                      DrinkIt Delivery
                    </p>

                    <p className="text-sm font-medium text-gray-200">
                      {currentMessage[currentStatus] ||
                        "Your order is being prepared"}
                    </p>
                  </div>
                </div>

                <h2 className="max-w-xl text-2xl font-bold text-amber-500 tracking-tight sm:text-3xl lg:text-4xl">
                  {currentStatus === "DELIVERED"
                    ? "Your order has arrived! 🍻"
                    : currentStatus === "OUT_FOR_DELIVERY"
                    ? "Your order is on the way 🚴"
                    : "We're getting your order ready 🍻"}
                </h2>

                <p className="mt-3 text-sm text-gray-400">
                  Estimated delivery:{" "}
                  <span className="font-medium text-gray-200">
                    {estimatedDelivery}
                  </span>
                </p>
              </div>

              {/* ORDER INFO */}

              <div className="min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur">

                <div className="flex items-center gap-3">
                  <Clock3
                    size={21}
                    className="text-gray-300"
                  />

                  <div>
                    <p className="text-xs text-gray-400">
                      Ordered on
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {orderDate}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-xs text-gray-400">
                    Total
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            TWO COLUMN LAYOUT
        ================================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.45fr_1fr]">

          {/* =================================================
              LEFT COLUMN
          ================================================== */}

          <div className="space-y-6">

            {/* =================================================
                ORDER STATUS
            ================================================== */}

            <section className="rounded-[28px] border border-gray-400 bg-black p-5 shadow-sm sm:p-7">

              <div className="mb-8">
                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl text-amber-500 font-bold">
                      Order Status
                    </h2>

                    <p className="mt-1 text-sm text-gray-200">
                      Follow your order's journey
                    </p>
                  </div>

                  <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-gray-100 sm:flex">
                    <Truck size={19} />
                  </div>
                </div>
              </div>

              <div className="relative">

                {trackingSteps.map(
                  (step, index) => {
                    const Icon = step.icon;

                    const completed =
                      index < currentIndex;

                    const active =
                      index === currentIndex;

                    const isLast =
                      index ===
                      trackingSteps.length - 1;

                    return (
                      <div
                        key={step.id}
                        className="relative flex gap-4"
                      >

                        {/* LINE */}

                        {!isLast && (
                          <div
                            className={`absolute left-[19px] top-[42px] h-[58px] w-[2px] ${
                              index < currentIndex
                                ? "bg-black"
                                : "bg-gray-200"
                            }`}
                          />
                        )}

                        {/* ICON */}

                        <div
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                            completed
                              ? "border-gray-100 bg-gray-200 text-black"
                              : active
                              ? "border-black bg-gray-300 text-black ring-4 ring-gray-100"
                              : "border-gray-200 bg-white text-black"
                          }`}
                        >
                          {completed ? (
                            <Check size={17} />
                          ) : (
                            <Icon size={17} />
                          )}
                        </div>

                        {/* TEXT */}

                        <div className="pb-8">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3
                              className={`text-sm font-semibold sm:text-base ${
                                active || completed
                                  ? "text-gray-300"
                                  : "text-gray-100"
                              }`}
                            >
                              {step.title}
                            </h3>

                            {active && (
                              <span className="rounded-full bg-black px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                                Current
                              </span>
                            )}
                          </div>

                          <p
                            className={`mt-1 text-xs sm:text-sm ${
                              active || completed
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}

              </div>
            </section>

            {/* =================================================
                YOUR ORDER
            ================================================== */}

            <section className="rounded-[28px] border border-gray-200 bg-black p-5 shadow-sm sm:p-7">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="text-xl text-amber-500 font-bold">
                    Your Order
                  </h2>

                  <p className="mt-1 text-sm text-gray-300">
                    {totalItems} products
                  </p>
                </div>

                <Package
                  size={22}
                  className="text-gray-400"
                />
              </div>

              <div className="divide-y divide-gray-100">

                {items.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-400">
                    No items found in this order.
                  </div>
                ) : (
                  items.map((item, index) => {
                    const quantity =
                      Number(item.quantity || 1);

                    const price =
                      Number(item.price || 0);

                    return (
                      <div
                        key={
                          item.id ||
                          item.productId ||
                          index
                        }
                        className="flex gap-4 py-4 first:pt-0 last:pb-0"
                      >

                        {/* IMAGE */}

                        <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-2xl bg-[#333331] p-2">

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name || "Product"}
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <Package
                              size={25}
                              className="text-gray-300"
                            />
                          )}
                        </div>

                        {/* INFO */}

                        <div className="min-w-0 flex-1">

                          <div className="flex justify-between gap-3">

                            <h3 className="line-clamp-2 text-sm text-white font-semibold sm:text-base">
                              {item.name ||
                                "DrinkIt Product"}
                            </h3>

                            <span className="shrink-0 text-sm font-semibold text-gray-300 sm:text-base">
                              ₹
                              {(
                                price * quantity
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>

                          {item.volume && (
                            <p className="mt-1 text-xs uppercase tracking-wide text-gray-300">
                              {item.volume}
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between">

                            <span className="rounded-full bg-gray-300 px-2.5 py-1 text-xs font-medium text-gray-900">
                              Qty: {quantity}
                            </span>

                            <span className="text-xs text-gray-400">
                              ₹
                              {price.toLocaleString(
                                "en-IN"
                              )}{" "}
                              each
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* =================================================
                DELIVERY PARTNER
                DIRECTLY UNDER YOUR ORDER
            ================================================== */}

            <section className="overflow-hidden rounded-[28px] border border-amber-500 bg-gray shadow-sm">

              {/* HEADER */}

              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl text-amber-500 font-bold">
                      Delivery Partner
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Your order is being delivered by
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                    <Truck size={30} color="yellow" />
                  </div>
                </div>
              </div>

              {/* PARTNER INFORMATION */}

              <div className="p-5 sm:p-7">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  {/* PROFILE */}

                  <div className="flex items-center gap-4">

                    <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 ring-4 ring-yellow-700 ">

                      {deliveryPartner.image ? (
                        <img
                          src={deliveryPartner.image}
                          alt={deliveryPartner.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <User2
                          size={28}
                          color="black"
                        />
                      )}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-base text-white font-bold">
                          {deliveryPartner.name}
                        </h3>

                        <span className="rounded-full bg-green-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-green-900">
                          {currentStatus === "DELIVERED"
                            ? "Delivered"
                            : "On the way"}
                        </span>
                      </div>

                      <div className="mt-1.5 flex items-center gap-2 text-sm">

                        <span className="font-semibold text-gray-300">
                          ★ {deliveryPartner.rating}
                        </span>

                        <span className="text-gray-300">
                          •
                        </span>

                        <span className="text-gray-400">
                          {deliveryPartner.vehicle}
                        </span>
                      </div>

                      {deliveryPartner.vehicleNumber && (
                        <p className="mt-1 text-xs text-amber-500">
                          Vehicle:{" "}
                          {deliveryPartner.vehicleNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2">

                    <a
                      href={`tel:${deliveryPartner.phone}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 border-2 border-amber-500 transition hover:border-black hover:bg-gray-800 hover:text-white"
                      title="Call Delivery Partner"
                    >
                      <Phone size={18} />
                    </a>

                    <button
                      onClick={() =>
                        alert(
                          "Chat functionality will be connected later."
                        )
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-400 transition hover:border-black hover:bg-gray-800 hover:text-white"
                      title="Chat with Delivery Partner"
                    >
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>

                {/* PARTNER STATS */}

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

                  <div className="rounded-2xl bg-[#0a0a0a] border border-amber-500 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      Rating
                    </p>

                    <p className="mt-1 text-sm  text-gray-200 font-bold">
                      ★ {deliveryPartner.rating}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-500 bg-[#0a0a0a] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      Vehicle
                    </p>

                    <p className="mt-1 text-sm text-gray-200 font-bold">
                      {deliveryPartner.vehicle}
                    </p>
                  </div>

                  <div className="col-span-2 border border-amber-500 rounded-2xl bg-[#0a0a0a] p-4 sm:col-span-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      Deliveries
                    </p>

                    <p className="mt-1 text-gray-200 text-sm font-bold">
                      {deliveryPartner.deliveries
                        ? `${deliveryPartner.deliveries}+`
                        : "1000+"}
                    </p>
                  </div>
                </div>

                {/* PHONE */}

                {deliveryPartner.phone && (
                  <div className="mt-4 flex items-center gap-3 rounded-2xl border border-amber-500 px-4 py-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <Phone size={15} />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white">
                        Contact Delivery Partner
                      </p>

                      <p className="text-sm text-gray-200 font-semibold">
                        {deliveryPartner.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================== */}

          <div className="space-y-6">

            {/* =================================================
                LIVE TRACKING MAP
            ================================================== */}

            <section className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">

              <div className="relative h-[260px] overflow-hidden bg-[#e9e9e6]">

                {/* Roads */}

                <div className="absolute left-[15%] top-[-10%] h-[120%] w-[7px] rotate-[22deg] bg-white" />

                <div className="absolute left-[47%] top-[-10%] h-[120%] w-[9px] rotate-[-20deg] bg-white" />

                <div className="absolute right-[18%] top-[-10%] h-[120%] w-[6px] rotate-[35deg] bg-white" />

                <div className="absolute left-[-10%] top-[34%] h-[8px] w-[120%] rotate-[8deg] bg-white" />

                <div className="absolute left-[-10%] top-[70%] h-[7px] w-[120%] rotate-[-10deg] bg-white" />

                {/* LIVE TRACKING */}

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold shadow-sm">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-black" />

                  Live tracking
                </div>

                {/* DESTINATION */}

                <div className="absolute right-[20%] top-[25%]">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg">
                    <MapPin size={20} />
                  </div>
                </div>

                {/* DELIVERY PARTNER LOCATION */}

                {currentStatus === "OUT_FOR_DELIVERY" && (
                  <div className="absolute bottom-[25%] left-[34%]">

                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl">

                      <div className="absolute inset-0 animate-ping rounded-full bg-black/10" />

                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">

                        <Navigation
                          size={17}
                          className="rotate-45"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">

                <div className="flex items-start gap-3">

                  <MapPin
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Delivering to
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {address.address ||
                        address.fullAddress ||
                        "Delivery address"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                DELIVERY ADDRESS
            ================================================== */}

            <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold">
                    Delivery Address
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Your selected address
                  </p>
                </div>

                <MapPin
                  size={20}
                  className="text-gray-400"
                />
              </div>

              <div className="rounded-2xl bg-[#f7f7f5] p-4">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="font-semibold">
                    {address.name ||
                      address.fullName ||
                      "Customer"}
                  </span>

                  {address.type && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                      {address.type}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {address.address ||
                    address.fullAddress ||
                    "Delivery address"}
                </p>

                {phone && (
                  <p className="mt-2 text-sm text-gray-500">
                    {phone}
                  </p>
                )}
              </div>
            </section>

            {/* =================================================
                BILL SUMMARY
            ================================================== */}

            <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-lg font-bold">
                  Bill Summary
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                  {paymentMethod}
                </span>
              </div>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Item Total
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Delivery Fee
                  </span>

                  <span>
                    ₹
                    {deliveryFee.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Discount
                    </span>

                    <span className="font-medium text-green-600">
                      -₹
                      {discount.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                )}

                <div className="my-4 border-t border-dashed border-gray-200" />

                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    Grand Total
                  </span>

                  <span className="text-xl font-bold">
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </div>
            </section>

            {/* =================================================
                ORDER DETAILS
            ================================================== */}

            <button
              onClick={() =>
                navigate(
                  `/orders/${order.id || orderId}`
                )
              }
              className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold transition hover:border-black"
            >
              <span>
                View Order Details
              </span>

              <ChevronRight size={18} />
            </button>

            {/* =================================================
                CONTINUE SHOPPING
            ================================================== */}

            <button
              onClick={() => navigate("/shop")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <ShoppingBag size={18} />

              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackOrder;