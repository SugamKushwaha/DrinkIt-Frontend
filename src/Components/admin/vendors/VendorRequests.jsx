import React, { useEffect, useState } from "react";

import {
  Check,
  X,
  Eye,
  Clock,
  Store,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getVendorRequests,
  approveVendorRequest,
  rejectVendorRequest,
} from "../../../api/adminApi";

const VendorRequests = () => {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [processingId, setProcessingId] = useState(null);

  // ==========================================
  // LOAD VENDOR REQUESTS
  // ==========================================

  const loadRequests = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getVendorRequests();

      setRequests(data || []);

    } catch (error) {

      console.error(
        "Failed to load vendor requests:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to load vendor requests."
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // LOAD ON PAGE OPEN
  // ==========================================

  useEffect(() => {

    loadRequests();

  }, []);

  // ==========================================
  // OPEN DETAILS
  // ==========================================

  const handleDetails = (requestId) => {

    navigate(
      `/admin/vendors/${requestId}`
    );

  };

  // ==========================================
  // APPROVE REQUEST
  // ==========================================

  const handleApprove = async (request) => {

    try {

      setProcessingId(request.requestId);
      setError("");

      await approveVendorRequest(
        request.requestId
      );

      // Remove approved request
      // from pending list

      setRequests((previous) =>
        previous.filter(
          (item) =>
            item.requestId !==
            request.requestId
        )
      );

    } catch (error) {

      console.error(
        "Failed to approve vendor:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to approve vendor request."
      );

    } finally {

      setProcessingId(null);

    }

  };

  // ==========================================
  // REJECT REQUEST
  // ==========================================

  const handleReject = async (request) => {

    const reason = window.prompt(
      "Enter rejection reason:"
    );

    if (!reason || !reason.trim()) {

      return;

    }

    try {

      setProcessingId(request.requestId);
      setError("");

      await rejectVendorRequest(
        request.requestId,
        reason.trim()
      );

      // Remove rejected request
      // from pending list

      setRequests((previous) =>
        previous.filter(
          (item) =>
            item.requestId !==
            request.requestId
        )
      );

    } catch (error) {

      console.error(
        "Failed to reject vendor:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to reject vendor request."
      );

    } finally {

      setProcessingId(null);

    }

  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="flex items-center justify-center py-20">

        <p className="text-gray-400">
          Loading vendor requests...
        </p>

      </div>

    );

  }

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Vendor Requests
        </h1>

        <p className="text-gray-500 mt-1">
          Review vendor registration requests.
        </p>

      </div>

      {/* ERROR */}

      {error && (

        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3">

          {error}

        </div>

      )}

      {/* REQUESTS */}

      <div className="grid gap-5">

        {requests.map((request) => {

          const isProcessing =
            processingId ===
            request.requestId;

          return (

            <div
              key={request.requestId}
              className="bg-[#151515] border border-white/10 rounded-2xl p-6"
            >

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                {/* VENDOR INFORMATION */}

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">

                    <Store
                      className="text-red-500"
                      size={22}
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-lg">

                      {request.businessName ||
                        "Vendor Request"}

                    </h3>

                    <p className="text-sm text-gray-500">

                      Owner:{" "}
                      {request.name || "-"}

                    </p>

                    <p className="text-sm text-gray-500">

                      {request.email || "-"}

                    </p>

                    <p className="text-sm text-gray-500">

                      {request.phone || "-"}

                    </p>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex gap-3 flex-wrap">

                  {/* DETAILS */}

                  <button
                    type="button"
                     onClick={() =>
    navigate(
      `/admin/vendors-requests/${request.requestId}`
    )
  }
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-2"
                  >

                    <Eye size={17} />

                    Details

                  </button>

                  {/* APPROVE */}

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() =>
                      handleApprove(request)
                    }
                    className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >

                    <Check size={17} />

                    {isProcessing
                      ? "Processing..."
                      : "Accept"}

                  </button>

                  {/* REJECT */}

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() =>
                      handleReject(request)
                    }
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >

                    <X size={17} />

                    Reject

                  </button>

                </div>

              </div>

              {/* REQUEST INFORMATION */}

              <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-gray-500">

                <Clock size={14} />

                Request ID:{" "}
                {request.requestId}

              </div>

            </div>

          );

        })}

      </div>

      {/* EMPTY */}

      {requests.length === 0 && (

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-12 text-center">

          <Check
            size={40}
            className="mx-auto text-green-500"
          />

          <h3 className="mt-4 font-semibold">

            No pending requests

          </h3>

          <p className="text-sm text-gray-500 mt-1">

            All vendor requests have been reviewed.

          </p>

        </div>

      )}

    </div>

  );

};

export default VendorRequests;