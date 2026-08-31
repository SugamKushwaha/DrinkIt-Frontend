import React, {
  useEffect,
  useState,
} from "react";

import {
  Truck,
  Check,
  X,
} from "lucide-react";

import {
  getDeliveryPartnerRequests,
  approveDeliveryPartner,
  rejectDeliveryPartner,
} from "../../../api/adminApi";


const DeliveryRequests = () => {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [processingId, setProcessingId] =
    useState(null);


  // =====================================================
  // LOAD DELIVERY REQUESTS
  // =====================================================

  const loadRequests = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getDeliveryPartnerRequests();

      setRequests(response || []);

    } catch (err) {

      console.error(
        "Failed to load delivery requests:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load delivery partner requests."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOAD ON PAGE OPEN
  // =====================================================

  useEffect(() => {

    loadRequests();

  }, []);


  // =====================================================
  // APPROVE REQUEST
  // =====================================================

  const approve = async (request) => {

    try {

      setProcessingId(
        request.requestId
      );

      await approveDeliveryPartner(
        request.requestId
      );


      // Remove approved request
      // because backend returns only PENDING requests

      setRequests((prev) =>
        prev.filter(
          (item) =>
            item.requestId !==
            request.requestId
        )
      );


    } catch (err) {

      console.error(
        "Approval failed:",
        err
      );

      alert(
        err.response?.data?.message ||
        "Unable to approve delivery partner."
      );

    } finally {

      setProcessingId(null);

    }
  };


  // =====================================================
  // REJECT REQUEST
  // =====================================================

  const reject = async (request) => {

    const reason =
      window.prompt(
        "Enter rejection reason:"
      );

    if (!reason) {
      return;
    }


    try {

      setProcessingId(
        request.requestId
      );

      await rejectDeliveryPartner(
        request.requestId,
        reason
      );


      // Remove rejected request

      setRequests((prev) =>
        prev.filter(
          (item) =>
            item.requestId !==
            request.requestId
        )
      );


    } catch (err) {

      console.error(
        "Rejection failed:",
        err
      );

      alert(
        err.response?.data?.message ||
        "Unable to reject delivery partner."
      );

    } finally {

      setProcessingId(null);

    }
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Delivery Partner Requests
        </h1>

        <p className="text-gray-500 mt-1">
          Review delivery partner applications.
        </p>

      </div>


      {/* ERROR */}

      {error && (

        <div
          className="
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            rounded-xl
            p-4
          "
        >
          {error}
        </div>

      )}


      {/* LOADING */}

      {loading && (

        <div
          className="
            bg-[#151515]
            border
            border-white/10
            rounded-2xl
            p-12
            text-center
            text-gray-500
          "
        >
          Loading delivery partner requests...
        </div>

      )}


      {/* REQUESTS */}

      {!loading && requests.map((request) => (

        <div

          key={request.requestId}

          className="
            bg-[#151515]
            border
            border-white/10
            rounded-2xl
            p-6
          "

        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              justify-between
              gap-5
            "
          >


            {/* PARTNER INFO */}

            <div className="flex gap-4">


              {/* ICON */}

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-blue-500/10
                  flex
                  items-center
                  justify-center
                "
              >

                <Truck
                  className="text-blue-400"
                  size={22}
                />

              </div>


              {/* DETAILS */}

              <div>


                <h3 className="text-lg font-semibold">

                  {request.name ||
                    "Delivery Partner"}

                </h3>


                <p className="text-sm text-gray-500">

                  {request.email}

                </p>


                <p className="text-sm text-gray-500">

                  {request.phone}

                </p>


                <p className="text-sm text-gray-500">

                  Vehicle:{" "}

                  {request.vehicleType || "-"}

                  {" "}

                  {request.vehicleNumber || ""}

                </p>


                <p className="text-sm text-gray-500">

                  Licence:{" "}

                  {request.drivingLicenseNumber || "-"}

                </p>


              </div>


            </div>


            {/* ACTIONS */}

            <div className="flex gap-3">


              <button

                disabled={
                  processingId ===
                  request.requestId
                }

                onClick={() =>
                  approve(request)
                }

                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-green-600
                  flex
                  items-center
                  gap-2
                  disabled:opacity-50
                "

              >

                <Check size={17} />

                {processingId ===
                request.requestId
                  ? "Processing..."
                  : "Accept"}

              </button>



              <button

                disabled={
                  processingId ===
                  request.requestId
                }

                onClick={() =>
                  reject(request)
                }

                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-red-600
                  flex
                  items-center
                  gap-2
                  disabled:opacity-50
                "

              >

                <X size={17} />

                Reject

              </button>


            </div>


          </div>


        </div>

      ))}


      {/* EMPTY */}

      {!loading &&
        requests.length === 0 && (

          <div
            className="
              bg-[#151515]
              border
              border-white/10
              rounded-2xl
              p-12
              text-center
              text-gray-500
            "
          >

            No pending delivery partner requests.

          </div>

        )}


    </div>

  );

};


export default DeliveryRequests;