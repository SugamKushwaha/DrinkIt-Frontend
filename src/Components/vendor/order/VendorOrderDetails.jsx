import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  ShoppingBag,
} from "lucide-react";

const VendorOrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  // =====================================================
  // LOAD ORDER
  // =====================================================

  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem("drinkit-orders") || "[]"
    );

    const foundOrder = storedOrders.find(
      (item) => String(item.id) === String(orderId)
    );

    if (!foundOrder) {
      navigate("/vendor/orders");
      return;
    }

    setOrder(foundOrder);
  }, [orderId, navigate]);

  // =====================================================
  // UPDATE ORDER
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
      case "PLACED":
        return "bg-purple-400/10 text-purple-400";

      case "CONFIRMED":
        return "bg-blue-400/10 text-blue-400";

      case "PREPARING":
        return "bg-yellow-400/10 text-yellow-400";

      case "READY_FOR_PICKUP":
        return "bg-green-400/10 text-green-400";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-400/10 text-orange-400";

      case "DELIVERED":
        return "bg-green-400/10 text-green-400";

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
      case "PLACED":
        return "Order Placed";

      case "CONFIRMED":
        return "Confirmed";

      case "PREPARING":
        return "Preparing";

      case "READY_FOR_PICKUP":
        return "Ready for Pickup";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      case "CANCELLED":
        return "Cancelled";

      default:
        return "Unknown";
    }
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle2 size={16} />;

      case "READY_FOR_PICKUP":
        return <Truck size={16} />;

      case "PREPARING":
        return <Package size={16} />;

      case "CANCELLED":
        return <XCircle size={16} />;

      default:
        return <Clock3 size={16} />;
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
          onClick={() => navigate("/vendor/orders")}
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

          Back to Orders
        </button>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-gray-500">
              Order Details
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
            ACTION BUTTONS
        ================================================= */}

        <div className="mb-6 rounded-2xl border border-gray-800 bg-[#080808] p-5">

          <p className="mb-4 text-sm font-semibold">
            Order Actions
          </p>

          <div className="flex flex-wrap gap-3">

            {/* ACCEPT */}

            {order.status === "PLACED" && (
              <button
                onClick={() =>
                  updateOrderStatus("CONFIRMED")
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
                <CheckCircle2 size={18} />

                ACCEPT ORDER
              </button>
            )}

            {/* PREPARING */}

            {order.status === "CONFIRMED" && (
              <button
                onClick={() =>
                  updateOrderStatus("PREPARING")
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
                <Package size={18} />

                START PREPARING
              </button>
            )}

            {/* READY */}

            {order.status === "PREPARING" && (
              <button
                onClick={() =>
                  updateOrderStatus(
                    "READY_FOR_PICKUP"
                  )
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
                <Truck size={18} />

                READY FOR PICKUP
              </button>
            )}

            {/* CANCEL */}

            {[
              "PLACED",
              "CONFIRMED",
              "PREPARING",
            ].includes(order.status) && (
              <button
                onClick={() =>
                  updateOrderStatus("CANCELLED")
                }
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-red-500/40
                  px-5
                  py-3
                  font-semibold
                  text-red-400
                  transition
                  hover:bg-red-500/10
                "
              >
                <XCircle size={18} />

                CANCEL ORDER
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
                    Customer details
                  </p>

                </div>

              </div>

              <div className="space-y-4">

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
                    Customer delivery location
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
                      Order Items
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

                      <div className="
                        flex
                        h-[75px]
                        w-[75px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#151515]
                        p-2
                      ">

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
                          {item.name ||
                            "Product"}
                        </h3>

                        {item.volume && (
                          <p className="mt-1 text-xs text-gray-500">
                            {item.volume}
                          </p>
                        )}

                        <div className="mt-3 flex items-center gap-3">

                          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-400">
                            Qty: {quantity}
                          </span>

                          <span className="text-xs text-gray-500">
                            ₹
                            {price.toLocaleString(
                              "en-IN"
                            )}{" "}
                            each
                          </span>

                        </div>

                      </div>

                      {/* TOTAL */}

                      <div className="text-right">

                        <p className="font-semibold">
                          ₹
                          {(
                            price * quantity
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="space-y-5 lg:sticky lg:top-6">

            {/* =================================================
                PRICE
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <h2 className="mb-5 font-semibold">
                Payment Summary
              </h2>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {Number(
                      order.subtotal || 0
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Delivery Fee
                  </span>

                  <span>
                    ₹
                    {Number(
                      order.deliveryFee || 0
                    ).toLocaleString("en-IN")}
                  </span>

                </div>

                {Number(order.discount || 0) > 0 && (
                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Discount
                    </span>

                    <span className="text-green-400">
                      -₹
                      {Number(
                        order.discount
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>
                )}

              </div>

              <div className="my-5 border-t border-gray-800" />

              <div className="flex items-center justify-between">

                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold text-yellow-400">
                  ₹
                  {Number(
                    order.total || 0
                  ).toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            {/* =================================================
                ORDER TIMELINE
            ================================================= */}

            <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

              <h2 className="mb-5 font-semibold">
                Order Progress
              </h2>

              <div className="space-y-5">

                {/* PLACED */}

                <TimelineItem
                  title="Order Placed"
                  active={true}
                  completed={
                    [
                      "CONFIRMED",
                      "PREPARING",
                      "READY_FOR_PICKUP",
                      "OUT_FOR_DELIVERY",
                      "DELIVERED",
                    ].includes(order.status)
                  }
                />

                {/* CONFIRMED */}

                <TimelineItem
                  title="Order Accepted"
                  active={[
                    "CONFIRMED",
                    "PREPARING",
                    "READY_FOR_PICKUP",
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                  completed={[
                    "PREPARING",
                    "READY_FOR_PICKUP",
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                />

                {/* PREPARING */}

                <TimelineItem
                  title="Preparing"
                  active={[
                    "PREPARING",
                    "READY_FOR_PICKUP",
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                  completed={[
                    "READY_FOR_PICKUP",
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                />

                {/* READY */}

                <TimelineItem
                  title="Ready for Pickup"
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

                {/* DELIVERY */}

                <TimelineItem
                  title="Delivery"
                  active={[
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                  ].includes(order.status)}
                  completed={
                    order.status === "DELIVERED"
                  }
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

// =========================================================
// TIMELINE COMPONENT
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

export default VendorOrderDetails;