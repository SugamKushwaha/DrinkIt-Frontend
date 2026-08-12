import React, { useState } from "react";
import {
  MapPin,
  Plus,
} from "lucide-react";

import CheckoutSection from "./CheckoutSection";
import AddressCard from "./AddressCard";
import AddressModal from "./AddressModal";

const AddressSection = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
  setAddresses,
}) => {

  const [showModal, setShowModal] = useState(false);

  // ==================================================
  // ADD ADDRESS
  // ==================================================

  const addAddress = (address) => {

    const newAddress = {
      ...address,
      id: Date.now(),
      default: false,
    };

    setAddresses((prev) => [
      ...prev,
      newAddress,
    ]);

    setSelectedAddress(newAddress.id);

    setShowModal(false);
  };

  // ==================================================
  // UPDATE ADDRESS
  // ==================================================

  const updateAddress = (updatedAddress) => {

    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === updatedAddress.id
          ? updatedAddress
          : address
      )
    );

  };

  return (
    <>
      <CheckoutSection
        number="1"
        title="Delivery Address"
        icon={<MapPin size={18} />}
      >

        <div className="space-y-4">

          {addresses.map((address) => (

            <AddressCard
              key={address.id}
              address={address}
              selected={
                selectedAddress === address.id
              }

              onSelect={() =>
                setSelectedAddress(address.id)
              }

              onUpdate={updateAddress}
            />

          ))}

          {/* ADD NEW ADDRESS */}

          <button
            onClick={() => setShowModal(true)}
            className="
              w-full
              py-4
              rounded-xl
              border
              border-dashed
              border-white/20
              hover:border-yellow-400
              hover:text-yellow-400
              transition
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <Plus size={19} />

            Add New Address

          </button>

        </div>

      </CheckoutSection>

      {/* ADDRESS MODAL */}

      {showModal && (
        <AddressModal
          onClose={() =>
            setShowModal(false)
          }
          onSave={addAddress}
        />
      )}

    </>
  );
};

export default AddressSection;