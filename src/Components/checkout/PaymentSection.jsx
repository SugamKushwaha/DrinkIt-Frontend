import React from "react";
import {
  CreditCard,
  ShieldCheck,
  WalletCards,
  Banknote,
} from "lucide-react";

import CheckoutSection from "./CheckoutSection";
import PaymentCard from "./PaymentCard";

const PaymentSection = ({
  paymentMethod,
  setPaymentMethod,
}) => {

  return (
    <CheckoutSection
      number="3"
      title="Payment Method"
      icon={<CreditCard size={18} />}
    >

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      ">

        <PaymentCard
          selected={paymentMethod === "upi"}
          onClick={() =>
            setPaymentMethod("upi")
          }
          icon={<WalletCards size={24} />}
          title="UPI"
          subtitle="Pay using any UPI app"
        />

        <PaymentCard
          selected={paymentMethod === "card"}
          onClick={() =>
            setPaymentMethod("card")
          }
          icon={<CreditCard size={24} />}
          title="Card"
          subtitle="Credit / Debit Card"
        />

        <PaymentCard
          selected={paymentMethod === "cod"}
          onClick={() =>
            setPaymentMethod("cod")
          }
          icon={<Banknote size={24} />}
          title="Cash on Delivery"
          subtitle="Pay when you receive"
        />

      </div>

      {/* SECURITY */}

      <div className="
        mt-5
        rounded-xl
        border
        border-green-500/20
        bg-green-500/5
        px-4
        py-3
        flex
        items-center
        gap-3
      ">

        <ShieldCheck
          size={19}
          className="text-green-400"
        />

        <p className="text-sm text-gray-400">
          We do not store your UPI / Card details.
          All payments are secure and encrypted.
        </p>

      </div>

    </CheckoutSection>
  );
};

export default PaymentSection;