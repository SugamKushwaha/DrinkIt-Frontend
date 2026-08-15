import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Truck,
  User,
  Phone,
  Mail,
  MapPin,
  Car,
} from "lucide-react";

import {
  getDeliveryPartners,
} from "../../../utils/adminStorage";

const DeliveryPartnerDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const partner = getDeliveryPartners().find(
    (item) => item.id === id
  );

  if (!partner) {
    return (
      <div className="text-center py-20">

        <h2 className="text-xl font-semibold">
          Delivery partner not found
        </h2>

        <button
          onClick={() =>
            navigate("/admin/delivery-partners")
          }
          className="mt-4 bg-red-600 px-5 py-2 rounded-xl"
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
        className="flex items-center gap-2 text-gray-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">

            <Truck
              size={28}
              className="text-blue-400"
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              {partner.name}
            </h1>

            <p className="text-gray-500">
              {partner.id}
            </p>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

          <h2 className="font-semibold mb-5">
            Personal Information
          </h2>

          <Info
            icon={User}
            label="Name"
            value={partner.name}
          />

          <Info
            icon={Mail}
            label="Email"
            value={partner.email}
          />

          <Info
            icon={Phone}
            label="Phone"
            value={partner.phone}
          />

          <Info
            icon={MapPin}
            label="Address"
            value={partner.address}
          />

        </div>

        <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">

          <h2 className="font-semibold mb-5">
            Vehicle Information
          </h2>

          <Info
            icon={Car}
            label="Vehicle Type"
            value={partner.vehicleType}
          />

          <Info
            icon={Car}
            label="Vehicle Number"
            value={partner.vehicleNumber}
          />

          <Info
            icon={Car}
            label="Driving Licence"
            value={partner.licenseNumber}
          />

        </div>

      </div>

    </div>
  );
};

const Info = ({ icon: Icon, label, value }) => (
  <div className="flex gap-3 mb-5">

    <Icon
      size={18}
      className="text-gray-500"
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

export default DeliveryPartnerDetails;