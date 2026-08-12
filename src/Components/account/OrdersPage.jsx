import React, { useEffect, useState } from "react";

import {
  Package,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {
    loadOrders();

    // If another page changes localStorage
    // update this page also
    const handleStorageChange = () => {
      loadOrders();
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // =====================================================
  // GET ORDERS
  // =====================================================

  const loadOrders = () => {
    try {
      const storedOrders =
        localStorage.getItem(
          "drinkit-orders"
        );

      if (!storedOrders) {
        setOrders([]);
        return;
      }

      const parsedOrders =
        JSON.parse(storedOrders);

      if (Array.isArray(parsedOrders)) {
        setOrders(parsedOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );

      setOrders([]);
    }
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-400 bg-green-400/10";

      case "OUT_FOR_DELIVERY":
        return "text-yellow-400 bg-yellow-400/10";

      case "PREPARING":
        return "text-blue-400 bg-blue-400/10";

      case "CONFIRMED":
        return "text-purple-400 bg-purple-400/10";

      case "CANCELLED":
        return "text-red-400 bg-red-400/10";

      case "PLACED":
        return "text-yellow-400 bg-yellow-400/10";

      default:
        return "text-yellow-400 bg-yellow-400/10";
    }
  };

  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText = (status) => {
    switch (status) {
      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "PREPARING":
        return "Preparing";

      case "CONFIRMED":
        return "Confirmed";

      case "DELIVERED":
        return "Delivered";

      case "CANCELLED":
        return "Cancelled";

      case "PLACED":
        return "Order Placed";

      default:
        return "Confirmed";
    }
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return (
          <CheckCircle2 size={15} />
        );

      case "OUT_FOR_DELIVERY":
        return (
          <Truck size={15} />
        );

      case "PREPARING":
        return (
          <Package size={15} />
        );

      default:
        return (
          <Clock3 size={15} />
        );
    }
  };

  // =====================================================
  // VIEW ORDER
  // =====================================================

  const handleViewOrder = (order) => {
    /*
      Save selected order as the current order.

      This is useful because your TrackOrder page
      currently reads "drinkit-last-order".
    */

    localStorage.setItem(
      "drinkit-last-order",
      JSON.stringify(order)
    );

    navigate(
      `/track-order/${order.id}`
    );
  };

  // =====================================================
  // EMPTY ORDERS
  // =====================================================

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">
        <div className="mx-auto max-w-[1100px]">

          {/* HEADER */}

          <div className="mb-8">
            <h1 className="text-3xl font-semibold">
              My Orders
            </h1>

            <p className="mt-2 text-gray-500">
              Track and manage your DrinkIt
              orders
            </p>
          </div>

          {/* EMPTY */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-10 text-center">

            <Package
              size={45}
              className="mx-auto mb-4 text-gray-600"
            />

            <h2 className="text-xl font-semibold">
              No Orders Yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your orders will appear here.
            </p>

            <button
              onClick={() =>
                navigate("/shop")
              }
              className="
                mt-5
                rounded-lg
                bg-yellow-400
                px-6
                py-3
                font-semibold
                text-black
                transition
                hover:bg-yellow-300
              "
            >
              START SHOPPING
            </button>

          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[1100px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-semibold">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Track and manage your DrinkIt
            orders
          </p>

        </div>

        {/* =================================================
            ORDERS
        ================================================= */}

        <div className="space-y-5">

          {orders.map((order, orderIndex) => {

            /*
              VERY IMPORTANT

              Your OrderSuccess page stores:

              {
                id,
                items,
                address,
                subtotal,
                deliveryFee,
                discount,
                total,
                status,
                orderDate
              }

              Therefore we read order.items directly.
            */

            const items = Array.isArray(
              order.items
            )
              ? order.items
              : [];

            // =================================================
            // TOTAL QUANTITY
            // =================================================

            const totalQuantity =
              items.reduce(
                (sum, item) =>
                  sum +
                  Number(
                    item.quantity || 1
                  ),
                0
              );

            // =================================================
            // ORDER STATUS
            // =================================================

            const status =
              order.status ||
              "CONFIRMED";

            // =================================================
            // ORDER ID
            // =================================================

            const orderId =
              order.id ||
              `DRINKIT-${orderIndex + 1}`;

            return (

              <div
                key={orderId}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-800
                  bg-[#080808]
                "
              >

                {/* =================================================
                    ORDER HEADER
                ================================================= */}

                <div className="p-5">

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >

                    {/* ORDER ID */}

                    <div>

                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Order ID
                      </p>

                      <h3 className="mt-1 font-semibold">
                        {orderId}
                      </h3>

                    </div>

                    {/* STATUS */}

                    <div
                      className={`
                        flex
                        w-fit
                        items-center
                        gap-2
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        ${getStatusStyle(status)}
                      `}
                    >

                      {getStatusIcon(status)}

                      {getStatusText(status)}

                    </div>

                  </div>

                </div>

                {/* =================================================
                    PRODUCTS
                ================================================= */}

                <div className="border-y border-gray-800 px-5 py-4">

                  {/* PRODUCTS HEADER */}

                  <div className="mb-4 flex items-center justify-between">

                    <div>

                      <p className="text-sm font-semibold">
                        Ordered Products
                      </p>

                      <p className="mt-1 text-xs text-gray-500">

                        {totalQuantity}

                        {" "}

                        {totalQuantity === 1
                          ? "item"
                          : "items"}

                      </p>

                    </div>

                    <Package
                      size={19}
                      className="text-gray-600"
                    />

                  </div>

                  {/* =================================================
                      PRODUCT LIST
                  ================================================= */}

                  {items.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-gray-800 p-5 text-center">

                      <Package
                        size={30}
                        className="mx-auto mb-2 text-gray-700"
                      />

                      <p className="text-sm text-gray-500">
                        Product information
                        unavailable
                      </p>

                    </div>

                  ) : (

                    <div className="space-y-3">

                      {items.map(
                        (item, index) => {

                          const quantity =
                            Number(
                              item.quantity ||
                                1
                            );

                          const price =
                            Number(
                              item.price ||
                                0
                            );

                          const productId =
                            item.id ||
                            item.productId ||
                            index;

                          return (

                            <div
                              key={
                                productId
                              }
                              className="
                                flex
                                items-center
                                gap-4
                                rounded-xl
                                bg-[#101010]
                                p-3
                              "
                            >

                              {/* =================================================
                                  IMAGE
                              ================================================= */}

                              <div
                                className="
                                  flex
                                  h-[65px]
                                  w-[65px]
                                  shrink-0
                                  items-center
                                  justify-center
                                  overflow-hidden
                                  rounded-xl
                                  bg-[#181818]
                                  p-2
                                "
                              >

                                {item.image ? (

                                  <img
                                    src={
                                      item.image
                                    }
                                    alt={
                                      item.name ||
                                      "Product"
                                    }
                                    className="
                                      h-full
                                      w-full
                                      object-contain
                                    "
                                    onError={(
                                      e
                                    ) => {
                                      e.currentTarget.style.display =
                                        "none";
                                    }}
                                  />

                                ) : (

                                  <Package
                                    size={25}
                                    className="text-gray-600"
                                  />

                                )}

                              </div>

                              {/* =================================================
                                  PRODUCT INFO
                              ================================================= */}

                              <div className="min-w-0 flex-1">

                                <h4 className="line-clamp-2 text-sm font-medium">

                                  {item.name ||
                                    "Product"}

                                </h4>

                                {/* VOLUME */}

                                {item.volume && (

                                  <p className="mt-1 text-xs uppercase text-gray-500">

                                    {
                                      item.volume
                                    }

                                  </p>

                                )}

                                {/* QUANTITY */}

                                <div className="mt-2 flex flex-wrap items-center gap-3">

                                  <span className="
                                    rounded-full
                                    bg-gray-800
                                    px-2
                                    py-1
                                    text-[11px]
                                    text-gray-400
                                  ">
                                    Qty:{" "}
                                    {quantity}
                                  </span>

                                  <span className="text-xs text-gray-500">

                                    ₹
                                    {price.toLocaleString(
                                      "en-IN"
                                    )}

                                    {" "}each

                                  </span>

                                </div>

                              </div>

                              {/* =================================================
                                  PRODUCT TOTAL
                              ================================================= */}

                              <div className="shrink-0 text-right">

                                <p className="text-sm font-semibold">

                                  ₹
                                  {(
                                    price *
                                    quantity
                                  ).toLocaleString(
                                    "en-IN"
                                  )}

                                </p>

                              </div>

                            </div>

                          );
                        }
                      )}

                    </div>

                  )}

                </div>

                {/* =================================================
                    ORDER FOOTER
                ================================================= */}

                <div className="p-5">

                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >

                    {/* DATE */}

                    <div>

                      <p className="text-xs text-gray-500">
                        Order Date
                      </p>

                      <p className="mt-1 text-sm">

                        {order.orderDate ||
                          order.date ||
                          "Recently"}

                      </p>

                    </div>

                    {/* TOTAL */}

                    <div>

                      <p className="text-xs text-gray-500">
                        Total
                      </p>

                      <p className="mt-1 font-semibold">

                        ₹
                        {Number(
                          order.total ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>

                    {/* VIEW ORDER */}

                    <button
                      onClick={() =>
                        handleViewOrder(
                          order
                        )
                      }
                      className="
                        flex
                        items-center
                        justify-center
                        gap-1
                        rounded-lg
                        border
                        border-gray-700
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-yellow-400
                        transition
                        hover:border-yellow-400
                        hover:bg-yellow-400/10
                      "
                    >

                      VIEW ORDER

                      <ChevronRight
                        size={17}
                      />

                    </button>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </div>

    </div>
  );
};

export default OrdersPage;