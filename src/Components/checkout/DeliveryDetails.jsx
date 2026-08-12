import React from "react";
import {
  PackageCheck,
  Phone,
} from "lucide-react";

import CheckoutSection from "./CheckoutSection";

const DeliveryDetails = ({
  phone,
  setPhone,
  instructions,
  setInstructions,
}) => {

  return (
    <CheckoutSection
      number="2"
      title="Delivery Details"
      icon={<PackageCheck size={18} />}
    >

      <div className="space-y-5">

        {/* PHONE */}

        <div>

          <label className="block text-sm text-gray-300 mb-2">
            Phone Number
          </label>

          <div className="relative">

            <Phone
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="+91 XXXXX XXXXX"
              className="
                w-full
                h-12
                pl-11
                pr-4
                rounded-xl
                bg-[#0b0b0b]
                border
                border-white/10
                focus:border-yellow-400
                outline-none
              "
            />

          </div>

        </div>

        {/* INSTRUCTIONS */}

        <div>

          <label className="block text-sm text-gray-300 mb-2">
            Delivery Instructions
          </label>

          <textarea
            rows="4"
            maxLength={120}
            value={instructions}
            onChange={(e) =>
              setInstructions(e.target.value)
            }
            placeholder="E.g. Leave at the door, ring the bell..."
            className="
              w-full
              resize-none
              rounded-xl
              bg-[#0b0b0b]
              border
              border-white/10
              focus:border-yellow-400
              outline-none
              p-4
              placeholder:text-gray-600
            "
          />

          <p className="text-xs text-gray-600 mt-1 text-right">
            {instructions.length}/120
          </p>

        </div>

      </div>

    </CheckoutSection>
  );
};

export default DeliveryDetails;