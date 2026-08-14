import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  User,
  Store,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  Navigation,
  ShoppingBag,
} from "lucide-react";

const DeliveryOrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  // =====================================================
  // LOAD ORDER
  // =====================================================

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = () => {
    try {
      const storedOrders = JSON.parse(
        localStorage.getItem("drinkit-orders") || "[]"
      );

      const foundOrder = storedOrders.find(
        (item) => String(item.id) === String(orderId)
      );

      if (!foundOrder) {
        navigate("/delivery/orders");
        return;
      }

      setOrder(foundOrder);
    } catch (error) {
      console.error("Failed to load order:", error);
      navigate("/delivery/orders");
    }
  };

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const updateOrderStatus = (newStatus) => {
    if (!order) return;

    const storedOrders = JSON.parse(
      localStorage.getItem("drinkit-orders") || "[]"
    );

    const updatedOrders = storedOrders.map((item) => {
      if (String(item.id) !== String(order.id)) {
        return item;
      }

      return {
        ...item,
        status: newStatus,
        deliveryPartnerStatus: newStatus,
        deliveryUpdatedAt: new Date().toISOString(),
      };
    });

    localStorage.setItem(
      "drinkit-orders",
      JSON.stringify(updatedOrders)
    );

    const updatedOrder = updatedOrders.find(
      (item) => String(item.id) === String(order.id)
    );

    setOrder(updatedOrder);
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return "bg-green-400/10 text-green-400";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-400/10 text-orange-400";

      case "DELIVERED":
        return "bg-blue-400/10 text-blue-400";

      case "CANCELLED":
        return "bg-red-400/10 text-red-400";

      default:
        return "bg-gray-400/10 text-gray-400";
    }
  };

  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText = (status) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return "Ready for Pickup";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      case "CANCELLED":
        return "Cancelled";

      default:
        return status;
    }
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return <Package size={17} />;

      case "OUT_FOR_DELIVERY":
        return <Truck size={17} />;

      case "DELIVERED":
        return <CheckCircle2 size={17} />;

      case "CANCELLED":
        return <XCircle size={17} />;

      default:
        return <Clock3 size={17} />;
    }
  };

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

  const items = order.items || [];

  const totalQuantity = items.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 1),
    0
  );

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[1200px]">

        {/* =================================================
            BACK
        ================================================= */}

        <button
          onClick={() =>
            navigate("/delivery/orders")
          }
          className="
            mb-6
            flex
            items-center
            gap-2
            text-sm
            text-gray-400
            transition
            hover:text-white
          "
        >
          <ArrowLeft size={18} />

          Back to Delivery Orders
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-gray-500">
              Delivery Order
            </p>

            <h1 className="mt-1 text-3xl font-semibold">
              #{order.id}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {order.orderDate || "Recently"}
            </p>

          </div>

          <div
            className={`
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              ${getStatusStyle(order.status)}
            `}
          >
            {getStatusIcon(order.status)}

            {getStatusText(order.status)}
          </div>

        </div>

        {/* =================================================
            DELIVERY ACTIONS
        ================================================= */}

        <div className="mb-6 rounded-2xl border border-gray-800 bg-[#080808] p-5">

          <p className="mb-4 text-sm font-semibold">
            Delivery Actions
          </p>

          <div className="flex flex-wrap gap-3">

            {/* ACCEPT / PICKUP */}

            {order.status === "READY_FOR_PICKUP" && (
              <button
                onClick={() =>
                  updateOrderStatus(
                    "OUT_FOR_DELIVERY"
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-yellow-400
                  px-5
                  py-3
                  font-bold
                  text-black
                  transition
                  hover:bg-yellow-300
                "
              >
                <Truck size={18} />

                ACCEPT & PICKUP ORDER
              </button>
            )}

            {/* OUT FOR DELIVERY */}

            {order.status === "OUT_FOR_DELIVERY" && (
              <button
                onClick={() =>
                  updateOrderStatus("DELIVERED")
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-green-500
                  px-5
                  py-3
                  font-bold
                  text-black
                  transition
                  hover:bg-green-400
                "
              >
                <CheckCircle2 size={18} />

                MARK AS DELIVERED
              </button>
            )}

            {/* DELIVERED */}

            {order.status === "DELIVERED" && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-green-400/10
                  px-5
                  py-3
                  font-semibold
                  text-green-400
                "
              >
                <CheckCircle2 size={18} />

                DELIVERY COMPLETED
              </div>
            )}

            {/* NAVIGATE */}

            {order.status !== "DELIVERED" && (
              <button
                onClick={() => {
                  alert(
                    "Navigation will be connected with Google Maps later."
                  );
                }}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-700
                  px-5
                  py-3
                  font-semibold
                  text-gray-300
                  transition
                  hover:border-yellow-400
                  hover:text-yellow-400
                "
              >
                <Navigation size={18} />

                NAVIGATE
              </button>
            )}

          </div>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                CUSTOMER
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">

                  <User
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Customer Information
                  </h2>

                  <p className="text-xs text-gray-500">
                    Delivery customer
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                {/* NAME */}

                <div className="flex items-center gap-3">

                  <User
                    size={17}
                    className="text-gray-500"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Customer
                    </p>

                    <p className="text-sm">
                      {order.customerName ||
                        order.userName ||
                        "Customer"}
                    </p>

                  </div>

                </div>

                {/* PHONE */}

                <div className="flex items-center gap-3">

                  <Phone
                    size={17}
                    className="text-gray-500"
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Phone
                    </p>

                    <p className="text-sm">
                      {order.phone ||
                        order.customerPhone ||
                        "Not available"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                VENDOR / PICKUP
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10">

                  <Store
                    size={20}
                    className="text-blue-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Pickup Location
                  </h2>

                  <p className="text-xs text-gray-500">
                    Vendor store
                  </p>

                </div>

              </div>

              <div className="rounded-xl bg-[#111] p-4">

                <p className="font-semibold">
                  {order.vendorName ||
                    "DrinkIt Store"}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {order.vendorAddress ||
                    "Vendor pickup location"}
                </p>

                {order.vendorPhone && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">

                    <Phone size={16} />

                    {order.vendorPhone}

                  </div>
                )}

              </div>

            </div>

            {/* =================================================
                DELIVERY ADDRESS
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">

                  <MapPin
                    size={20}
                    className="text-yellow-400"
                  />

                </div>

                <div>

                  <h2 className="font-semibold">
                    Delivery Address
                  </h2>

                  <p className="text-xs text-gray-500">
                    Customer destination
                  </p>

                </div>

              </div>

              <div className="rounded-xl bg-[#111] p-4 text-sm leading-6 text-gray-300">

                {order.address?.name && (
                  <p className="font-semibold text-white">
                    {order.address.name}
                  </p>
                )}

                {order.address?.address && (
                  <p>
                    {order.address.address}
                  </p>
                )}

                {order.address?.city && (
                  <p>
                    {order.address.city}

                    {order.address.state
                      ? `, ${order.address.state}`
                      : ""}
                  </p>
                )}

                {order.address?.pincode && (
                  <p>
                    PIN: {order.address.pincode}
                  </p>
                )}

                {!order.address && (
                  <p className="text-gray-500">
                    Address not available
                  </p>
                )}

              </div>

            </div>

            {/* =================================================
                ORDER ITEMS
            ================================================= */}

            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#080808]">

              <div className="border-b border-gray-800 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="font-semibold">
                      Parcel Items
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {totalQuantity}{" "}
                      {totalQuantity === 1
                        ? "item"
                        : "items"}
                    </p>

                  </div>

                  <ShoppingBag
                    size={20}
                    className="text-gray-600"
                  />

                </div>

              </div>

              <div className="divide-y divide-gray-800">

                {items.map((item, index) => {

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
                      className="flex gap-4 p-5"
                    >

                      {/* IMAGE */}

                      <div
                        className="
                          flex
                          h-[70px]
                          w-[70px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#151515]
                          p-2
                        "
                      >

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Package
                            size={28}
                            className="text-gray-600"
                          />
                        )}

                      </div>

                      {/* INFO */}

                      <div className="min-w-0 flex-1">

                        <h3 className="font-medium">
                          {item.name || "Product"}
                        </h3>

                        {item.volume && (
                          <p className="mt-1 text-xs text-gray-500">
                            {item.volume}
                          </p>
                        )}

                        <div className="mt-3">

                          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-400">
                            Qty: {quantity}
                          </span>

                        </div>

                      </div>

                      {/* PRICE */}

                      <div className="text-right">

                        <p className="font-semibold">
                          ₹
                          {(
                            price * quantity
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <div className="space-y-5 lg:sticky lg:top-6">

            {/* =================================================
                DELIVERY SUMMARY
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <h2 className="mb-5 font-semibold">
                Delivery Summary
              </h2>

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Order ID
                  </span>

                  <span className="text-sm font-semibold">
                    #{order.id}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Items
                  </span>

                  <span className="text-sm">
                    {totalQuantity}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Order Total
                  </span>

                  <span className="font-bold text-yellow-400">
                    ₹
                    {Number(
                      order.total || 0
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                DELIVERY PROGRESS
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <h2 className="mb-5 font-semibold">
                Delivery Progress
              </h2>

              <div className="space-y-5">

                <TimelineItem
                  title="Order Ready"
                  active={[
                    "READY_FOR_PICKUP",
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                  completed={[
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                />

                <TimelineItem
                  title="Parcel Picked Up"
                  active={[
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                  completed={
                    order.status === "DELIVERED"
                  }
                />

                <TimelineItem
                  title="Out for Delivery"
                  active={[
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                  completed={
                    order.status === "DELIVERED"
                  }
                />

                <TimelineItem
                  title="Delivered"
                  active={
                    order.status === "DELIVERED"
                  }
                  completed={
                    order.status === "DELIVERED"
                  }
                />

              </div>

            </div>

            {/* =================================================
                CUSTOMER CONTACT
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <h2 className="mb-4 font-semibold">
                Customer Contact
              </h2>

              <a
                href={`tel:${
                  order.phone ||
                  order.customerPhone ||
                  ""
                }`}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-700
                  text-sm
                  font-semibold
                  text-gray-300
                  transition
                  hover:border-yellow-400
                  hover:text-yellow-400
                "
              >
                <Phone size={17} />

                CALL CUSTOMER
              </a>

            </div>

            {/* =================================================
                BACK
            ================================================= */}

            <button
              onClick={() =>
                navigate("/delivery/orders")
              }
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-800
                text-sm
                font-semibold
                text-gray-400
                transition
                hover:border-white
                hover:text-white
              "
            >
              <ArrowLeft size={17} />

              BACK TO ORDERS
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

// =========================================================
// TIMELINE
// =========================================================

const TimelineItem = ({
  title,
  active,
  completed,
}) => {
  return (
    <div className="flex items-start gap-3">

      <div
        className={`
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          ${
            active
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-gray-600"
          }
        `}
      >
        {completed ? (
          <CheckCircle2 size={16} />
        ) : (
          <Clock3 size={15} />
        )}
      </div>

      <div>

        <p
          className={`text-sm ${
            active
              ? "font-semibold text-white"
              : "text-gray-600"
          }`}
        >
          {title}
        </p>

        {active && !completed && (
          <p className="mt-1 text-xs text-yellow-400">
            Current step
          </p>
        )}

      </div>

    </div>
  );
};

export default DeliveryOrderDetails;