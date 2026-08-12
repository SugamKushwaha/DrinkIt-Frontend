import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

import CheckoutHeader from "../checkout/CheckoutHeader";
import CheckoutBenefits from "../checkout/CheckoutBenefits";
import AddressSection from "../checkout/AddressSection";
import DeliveryDetails from "../checkout/DeliveryDetails";
import PaymentSection from "../checkout/PaymentSection";
import OrderSummary from "../checkout/OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(1);

  const [phone, setPhone] = useState("");

  const [instructions, setInstructions] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "HOME",
      name: "Sugam Kushwaha",
      address: "123, Govind Nagar, Kanpur",
      city: "Uttar Pradesh - 208006",
      country: "India",
      default: true,
    },
  ]);

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    const orderData = {
      address: addresses.find(
        (address) => address.id === selectedAddress
      ),
      phone,
      instructions,
      paymentMethod,
    };

    console.log("Order:", orderData);

    navigate("/order-success", {
      state: {
        order: orderData,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white">

      {/* HEADER */}
      <CheckoutHeader />

      <main className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8">

        {/* PAGE TITLE */}
        <div className="mb-7">
          <button
            onClick={() => navigate("/cart")}
            className="text-yellow-400 mb-5"
          >
            ← Back to Cart
          </button>

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <p className="text-gray-400 mt-2">
            Complete your order and enjoy your drinks!
          </p>
        </div>

        {/* BENEFITS */}
        <CheckoutBenefits />

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_390px] gap-7 mt-8">

          {/* LEFT */}
          <div className="space-y-6">

            <AddressSection
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setAddresses={setAddresses}
            />

            <DeliveryDetails
              phone={phone}
              setPhone={setPhone}
              instructions={instructions}
              setInstructions={setInstructions}
            />

            <PaymentSection
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            {/* AGE NOTICE */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-5">

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <span className="font-bold">
                    18+
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Responsible Drinking
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Alcohol products are intended only for
                    customers of legal drinking age.
                    Drink responsibly and never drink and drive.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <OrderSummary
            onPlaceOrder={handlePlaceOrder}
          />

        </div>

      </main>
    </div>
  );
};

export default Checkout;