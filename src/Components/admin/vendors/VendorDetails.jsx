import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Store,
  Phone,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";

import { getVendors } from "../../../utils/adminStorage";

const VendorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const vendor = getVendors().find(
    (item) => item.id === id
  );

  if (!vendor) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">
          Vendor not found
        </h2>

        <button
          onClick={() => navigate("/admin/vendors")}
          className="mt-4 px-5 py-2 bg-red-600 rounded-xl"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <Store
              size={28}
              className="text-red-500"
            />
          </div>

          <div>

            <h1 className="text-2xl font-bold">
              {vendor.businessName}
            </h1>

            <p className="text-gray-500">
              Vendor ID: {vendor.id}
            </p>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

          <h2 className="font-semibold mb-5">
            Business Information
          </h2>

          <div className="space-y-4">

            <Info
              icon={Store}
              label="Business Name"
              value={vendor.businessName}
            />

            <Info
              icon={FileText}
              label="Owner"
              value={vendor.ownerName}
            />

            <Info
              icon={FileText}
              label="GST Number"
              value={vendor.gstNumber}
            />

          </div>

        </div>

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

          <h2 className="font-semibold mb-5">
            Contact Information
          </h2>

          <div className="space-y-4">

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

            <Info
              icon={MapPin}
              label="Address"
              value={`${vendor.address || ""} ${
                vendor.city || ""
              } ${vendor.state || ""}`}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

const Info = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">

    <Icon
      size={18}
      className="text-gray-500 mt-0.5"
    />

    <div>

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="text-sm mt-1">
        {value || "-"}
      </p>

    </div>

  </div>
);

export default VendorDetails;