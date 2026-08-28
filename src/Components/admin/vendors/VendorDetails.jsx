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
  useLocation,
} from "react-router-dom";

import {
  getVendorRequest,
  getVendor,
} from "../../../api/adminApi";

const VendorDetails = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const location = useLocation();

  const [vendor, setVendor] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // CHECK WHETHER THIS IS REQUEST OR VENDOR
  // ==========================================

  const isVendorRequest =
    location.pathname.includes("vendors-requests");

  // ==========================================
  // LOAD DETAILS
  // ==========================================

  useEffect(() => {

    const loadDetails = async () => {

      try {

        setLoading(true);
        setError("");

        let data;

        if (isVendorRequest) {

          // ----------------------------------
          // VENDOR REQUEST
          // ----------------------------------

          data = await getVendorRequest(id);

        } else {

          // ----------------------------------
          // APPROVED VENDOR
          // ----------------------------------

          data = await getVendor(id);

        }

        setVendor(data);

      } catch (error) {

        console.error(
          "Failed to load vendor details:",
          error
        );

        setError(
          error?.response?.data?.message ||
          "Failed to load vendor details."
        );

      } finally {

        setLoading(false);

      }

    };

    loadDetails();

  }, [id, isVendorRequest]);

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

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!vendor) {

    return (

      <div className="text-center py-20 text-gray-500">

        Vendor details not found.

      </div>

    );

  }

  // ==========================================
  // STATUS ICON
  // ==========================================

  const getStatusIcon = () => {

    if (vendor.status === "APPROVED" ||
        vendor.status === "ACTIVE") {

      return (
        <CheckCircle
          size={18}
          className="text-green-400"
        />
      );

    }

    if (vendor.status === "REJECTED" ||
        vendor.status === "INACTIVE") {

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

    if (
      vendor.status === "APPROVED" ||
      vendor.status === "ACTIVE"
    ) {

      return "bg-green-500/10 text-green-400";

    }

    if (
      vendor.status === "REJECTED" ||
      vendor.status === "INACTIVE"
    ) {

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

        {isVendorRequest
          ? "Back to Vendor Requests"
          : "Back to Vendors"}

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

                {vendor.businessName ||
                  "Vendor"}

              </h1>

              <p className="text-sm text-gray-500 mt-1">

                {isVendorRequest
                  ? `Vendor Request ID: ${vendor.requestId}`
                  : `Vendor ID: ${vendor.id || vendor.userId}`}

              </p>

            </div>

          </div>


          {/* STATUS */}

          <div
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm w-fit ${getStatusClass()}`}
          >

            {getStatusIcon()}

            {vendor.status}

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
            value={
              vendor.name ||
              vendor.ownerName
            }
          />

          <Info
            icon={Hash}
            label="User ID"
            value={
              vendor.userId ||
              vendor.id
            }
          />

          <Info
            icon={Mail}
            label="Email"
            value={vendor.email}
          />

          <Info
            icon={Phone}
            label="Phone"
            value={vendor.phone}
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
            value={vendor.businessName}
          />

          <Info
            icon={FileText}
            label="GST Number"
            value={vendor.gstNumber}
          />

          <Info
            icon={CreditCard}
            label="License Number"
            value={vendor.licenseNumber}
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
            value={vendor.businessAddress}
          />

          <div className="grid md:grid-cols-3 gap-5">

            <Info
              icon={MapPin}
              label="City"
              value={vendor.city}
            />

            <Info
              icon={MapPin}
              label="State"
              value={vendor.state}
            />

            <Info
              icon={Hash}
              label="Pincode"
              value={vendor.pincode}
            />

          </div>

        </div>

      </div>


      {/* REQUEST / VENDOR INFORMATION */}

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <h2 className="text-lg font-semibold mb-5">

          {isVendorRequest
            ? "Request Information"
            : "Vendor Information"}

        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {isVendorRequest && (

            <Info
              icon={Hash}
              label="Request ID"
              value={vendor.requestId}
            />

          )}

          <Info
            icon={Hash}
            label="User ID"
            value={
              vendor.userId ||
              vendor.id
            }
          />

          <Info
            icon={Clock}
            label="Status"
            value={vendor.status}
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