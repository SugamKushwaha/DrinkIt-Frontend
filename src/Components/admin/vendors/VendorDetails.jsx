import React, {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  CreditCard,
  Hash,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getVendorRequest,
} from "../../../api/adminApi";

const VendorDetails = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [request, setRequest] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD VENDOR REQUEST
  // ==========================================

  useEffect(() => {

    const loadRequest = async () => {

      try {

        setLoading(true);
        setError("");

        const data =
          await getVendorRequest(id);

        setRequest(data);

      } catch (error) {

        console.error(
          "Failed to load vendor request:",
          error
        );

        setError(
          error?.response?.data?.message ||
          "Failed to load vendor request."
        );

      } finally {

        setLoading(false);

      }

    };

    loadRequest();

  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="flex items-center justify-center py-20">

        <p className="text-gray-400">
          Loading vendor details...
        </p>

      </div>

    );

  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="space-y-5">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >

          <ArrowLeft size={18} />

          Back

        </button>

        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-6">

          {error}

        </div>

      </div>

    );

  }

  if (!request) {

    return (

      <div className="text-center py-20 text-gray-500">

        Vendor request not found.

      </div>

    );

  }

  // ==========================================
  // STATUS ICON
  // ==========================================

  const getStatusIcon = () => {

    if (request.status === "APPROVED") {

      return (
        <CheckCircle
          size={18}
          className="text-green-400"
        />
      );

    }

    if (request.status === "REJECTED") {

      return (
        <XCircle
          size={18}
          className="text-red-400"
        />
      );

    }

    return (
      <Clock
        size={18}
        className="text-yellow-400"
      />
    );

  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = () => {

    if (request.status === "APPROVED") {

      return "bg-green-500/10 text-green-400";

    }

    if (request.status === "REJECTED") {

      return "bg-red-500/10 text-red-400";

    }

    return "bg-yellow-500/10 text-yellow-400";

  };

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="space-y-6">

      {/* BACK */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white"
      >

        <ArrowLeft size={18} />

        Back to Vendor Requests

      </button>

      {/* HEADER */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">

              <Store
                size={30}
                className="text-red-500"
              />

            </div>

            <div>

              <h1 className="text-2xl font-bold">

                {request.businessName ||
                  "Vendor Request"}

              </h1>

              <p className="text-sm text-gray-500 mt-1">

                Vendor Request ID:{" "}
                {request.requestId}

              </p>

            </div>

          </div>

          {/* STATUS */}

          <div
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm w-fit ${getStatusClass()}`}
          >

            {getStatusIcon()}

            {request.status}

          </div>

        </div>

      </div>

      {/* OWNER INFORMATION */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-5">

          Owner Information

        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <Info
            icon={User}
            label="Owner Name"
            value={request.name}
          />

          <Info
            icon={Hash}
            label="User ID"
            value={request.userId}
          />

          <Info
            icon={Mail}
            label="Email"
            value={request.email}
          />

          <Info
            icon={Phone}
            label="Phone"
            value={request.phone}
          />

        </div>

      </div>

      {/* BUSINESS INFORMATION */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-5">

          Business Information

        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <Info
            icon={Store}
            label="Business Name"
            value={request.businessName}
          />

          <Info
            icon={FileText}
            label="GST Number"
            value={request.gstNumber}
          />

          <Info
            icon={CreditCard}
            label="License Number"
            value={request.licenseNumber}
          />

        </div>

      </div>

      {/* BUSINESS ADDRESS */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-5">

          Business Address

        </h2>

        <div className="space-y-5">

          <Info
            icon={MapPin}
            label="Address"
            value={request.businessAddress}
          />

          <div className="grid md:grid-cols-3 gap-5">

            <Info
              icon={MapPin}
              label="City"
              value={request.city}
            />

            <Info
              icon={MapPin}
              label="State"
              value={request.state}
            />

            <Info
              icon={Hash}
              label="Pincode"
              value={request.pincode}
            />

          </div>

        </div>

      </div>

      {/* REQUEST INFORMATION */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-5">

          Request Information

        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <Info
            icon={Hash}
            label="Request ID"
            value={request.requestId}
          />

          <Info
            icon={Hash}
            label="User ID"
            value={request.userId}
          />

          <Info
            icon={Clock}
            label="Status"
            value={request.status}
          />

        </div>

      </div>

    </div>

  );

};

// ==========================================
// INFO COMPONENT
// ==========================================

const Info = ({
  icon: Icon,
  label,
  value,
}) => {

  return (

    <div className="flex items-start gap-3">

      <Icon
        size={18}
        className="text-gray-500 mt-0.5 shrink-0"
      />

      <div className="min-w-0">

        <p className="text-xs text-gray-500">

          {label}

        </p>

        <p className="text-sm mt-1 break-words">

          {value || "-"}

        </p>

      </div>

    </div>

  );

};

export default VendorDetails;