import React from "react";

import {
  Package,
  MapPin,
  Clock3,
  CheckCircle2,
  XCircle,
  Truck,
  ChevronRight,
} from "lucide-react";

const VendorOrderCard = ({
  order,
  onAccept,
  onReject,
  onPrepare,
  onReady,
  onView,
}) => {
  const items = order.items || [];

  const totalQuantity = items.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "NEW":
        return "bg-purple-400/10 text-purple-400 border-purple-400/20";

      case "ACCEPTED":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20";

      case "PREPARING":
        return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";

      case "READY":
        return "bg-orange-400/10 text-orange-400 border-orange-400/20";

      case "OUT_FOR_DELIVERY":
        return "bg-cyan-400/10 text-cyan-400 border-cyan-400/20";

      case "DELIVERED":
        return "bg-green-400/10 text-green-400 border-green-400/20";

      case "CANCELLED":
        return "bg-red-400/10 text-red-400 border-red-400/20";

      default:
        return "bg-gray-400/10 text-gray-400 border-gray-400/20";
    }
  };

  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText = (status) => {
    switch (status) {
      case "NEW":
        return "New Order";

      case "ACCEPTED":
        return "Accepted";

      case "PREPARING":
        return "Preparing";

      case "READY":
        return "Ready for Pickup";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Delivered";

      case "CANCELLED":
        return "Cancelled";

      default:
        return status || "New Order";
    }
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle2 size={15} />;

      case "OUT_FOR_DELIVERY":
        return <Truck size={15} />;

      case "READY":
        return <Package size={15} />;

      case "PREPARING":
        return <Clock3 size={15} />;

      case "CANCELLED":
        return <XCircle size={15} />;

      default:
        return <Clock3 size={15} />;
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#0b0b0b] transition hover:border-gray-700">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 border-b border-gray-800 p-5 sm:flex-row sm:items-center sm:justify-between">

        {/* ORDER INFO */}

        <div>

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-base font-semibold">
              #{order.id}
            </h3>

            <span
              className={`
                flex
                items-center
                gap-1.5
                rounded-full
                border
                px-3
                py-1
                text-[11px]
                font-semibold
                ${getStatusStyle(order.status)}
              `}
            >
              {getStatusIcon(order.status)}

              {getStatusText(order.status)}
            </span>

          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">

            <span className="flex items-center gap-1.5">
              <Clock3 size={13} />
              {order.orderDate || order.date || "Recently"}
            </span>

            <span>
              {totalQuantity}{" "}
              {totalQuantity === 1 ? "item" : "items"}
            </span>

          </div>

        </div>

        {/* TOTAL */}

        <div className="text-left sm:text-right">

          <p className="text-xs text-gray-500">
            Order Total
          </p>

          <p className="mt-1 text-lg font-bold text-white">
            ₹
            {Number(order.total || 0).toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

      </div>

      {/* =====================================================
          CUSTOMER
      ===================================================== */}

      <div className="border-b border-gray-800 p-5">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* CUSTOMER */}

          <div>

            <p className="mb-2 text-xs uppercase tracking-wider text-gray-600">
              Customer
            </p>

            <p className="text-sm font-medium">
              {order.customerName ||
                order.customer ||
                order.address?.name ||
                "Customer"}
            </p>

            {(order.customerPhone ||
              order.address?.phone) && (
              <p className="mt-1 text-xs text-gray-500">
                {order.customerPhone ||
                  order.address?.phone}
              </p>
            )}

          </div>

          {/* ADDRESS */}

          <div>

            <p className="mb-2 text-xs uppercase tracking-wider text-gray-600">
              Delivery Address
            </p>

            <div className="flex items-start gap-2">

              <MapPin
                size={15}
                className="mt-0.5 shrink-0 text-gray-500"
              />

              <p className="text-xs leading-5 text-gray-400">

                {order.address?.address ||
                  order.address?.fullAddress ||
                  order.address?.street ||
                  "Address not available"}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <div className="p-5">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold">
              Ordered Products
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {totalQuantity}{" "}
              {totalQuantity === 1 ? "item" : "items"}
            </p>

          </div>

          <Package
            size={18}
            className="text-gray-600"
          />

        </div>

        <div className="space-y-3">

          {items.length > 0 ? (

            items.slice(0, 3).map((item, index) => {

              const quantity = Number(
                item.quantity || 1
              );

              const price = Number(
                item.price || 0
              );

              return (
                <div
                  key={
                    item.id ||
                    item.productId ||
                    index
                  }
                  className="flex items-center gap-3 rounded-xl bg-[#111111] p-3"
                >

                  {/* IMAGE */}

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#181818] p-2">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />

                    ) : (

                      <Package
                        size={22}
                        className="text-gray-600"
                      />

                    )}

                  </div>

                  {/* INFO */}

                  <div className="min-w-0 flex-1">

                    <p className="line-clamp-1 text-sm font-medium">
                      {item.name || "Product"}
                    </p>

                    {item.volume && (
                      <p className="mt-1 text-xs text-gray-500">
                        {item.volume}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {quantity}
                    </p>

                  </div>

                  {/* PRICE */}

                  <div className="text-right">

                    <p className="text-sm font-semibold">
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
            })

          ) : (

            <div className="rounded-xl bg-[#111111] p-5 text-center">

              <p className="text-sm text-gray-500">
                No product information available
              </p>

            </div>

          )}

        </div>

        {/* MORE PRODUCTS */}

        {items.length > 3 && (
          <p className="mt-3 text-xs text-gray-500">
            + {items.length - 3} more{" "}
            {items.length - 3 === 1
              ? "product"
              : "products"}
          </p>
        )}

      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="border-t border-gray-800 bg-[#090909] p-4">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* VIEW */}

          <button
            onClick={() =>
    navigate(`/vendor/orders/${order.id}`)
  }
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-gray-700
              px-4
              py-2.5
              text-sm
              font-semibold
              text-gray-300
              transition
              hover:border-gray-500
              hover:text-white
            "
          >
            VIEW ORDER

            <ChevronRight size={16} />

          </button>

          {/* STATUS ACTIONS */}

          <div className="flex flex-wrap gap-2">

            {/* NEW */}

            {order.status === "NEW" && (
              <>
                <button
                  onClick={() => onReject(order.id)}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-red-400/30
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-red-400
                    transition
                    hover:bg-red-400/10
                  "
                >
                  <XCircle size={16} />
                  REJECT
                </button>

                <button
                  onClick={() => onAccept(order.id)}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-yellow-400
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-black
                    transition
                    hover:bg-yellow-300
                  "
                >
                  <CheckCircle2 size={16} />
                  ACCEPT ORDER
                </button>
              </>
            )}

            {/* ACCEPTED */}

            {order.status === "ACCEPTED" && (
              <button
                onClick={() => onPrepare(order.id)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-yellow-400
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-black
                  transition
                  hover:bg-yellow-300
                "
              >
                <Package size={16} />
                START PREPARING
              </button>
            )}

            {/* PREPARING */}

            {order.status === "PREPARING" && (
              <button
                onClick={() => onReady(order.id)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-yellow-400
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-black
                  transition
                  hover:bg-yellow-300
                "
              >
                <CheckCircle2 size={16} />
                MARK READY
              </button>
            )}

            {/* READY */}

            {order.status === "READY" && (
              <div className="flex items-center gap-2 rounded-lg bg-orange-400/10 px-4 py-2.5 text-sm font-semibold text-orange-400">
                <Truck size={16} />
                Waiting for Delivery Partner
              </div>
            )}

            {/* OUT FOR DELIVERY */}

            {order.status === "OUT_FOR_DELIVERY" && (
              <div className="flex items-center gap-2 rounded-lg bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-400">
                <Truck size={16} />
                Out for Delivery
              </div>
            )}

            {/* DELIVERED */}

            {order.status === "DELIVERED" && (
              <div className="flex items-center gap-2 rounded-lg bg-green-400/10 px-4 py-2.5 text-sm font-semibold text-green-400">
                <CheckCircle2 size={16} />
                Order Delivered
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default VendorOrderCard;