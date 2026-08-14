import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Bike,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

const DeliveryRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",

    password: "",
    confirmPassword: "",

    address: "",
    city: "",
    state: "",
    pincode: "",

    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city =
        "City is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType =
        "Vehicle type is required";
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber =
        "Vehicle number is required";
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber =
        "Driving license number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    /*
     * TEMPORARY FRONTEND FLOW
     *
     * Later this will become:
     *
     * POST /api/auth/delivery/register
     */

    const deliveryPartnerData = {
      ...formData,
      role: "DELIVERY_PARTNER",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    console.log(
      "Delivery Partner Registration:",
      deliveryPartnerData
    );

    alert(
      "Delivery partner application submitted successfully!"
    );

    navigate("/partner");
  };

  const InputField = ({
    name,
    label,
    type = "text",
    placeholder,
    icon: Icon,
  }) => (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">

        <Icon
          size={17}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-600
          "
        />

        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="
            h-12
            w-full
            rounded-xl
            border
            border-gray-800
            bg-[#111]
            pl-11
            pr-4
            text-sm
            text-white
            outline-none
            transition
            placeholder:text-gray-700
            focus:border-yellow-400
          "
        />

      </div>

      {errors[name] && (
        <p className="mt-1.5 text-xs text-red-400">
          {errors[name]}
        </p>
      )}

    </div>
  );

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[900px]">

        {/* BACK */}

        <button
          onClick={() => navigate("/partner")}
          className="
            mb-8
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            transition
            hover:text-white
          "
        >
          <ArrowLeft size={18} />
          Back to Partner
        </button>

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-400/10">

              <Bike
                size={25}
                className="text-orange-400"
              />

            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-yellow-400">
                Partner Registration
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                Become a Delivery Partner
              </h1>

            </div>

          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
            Join DrinkIt as a delivery partner and start earning by
            delivering orders to customers.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* PERSONAL */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5 sm:p-7">

            <div className="mb-6">

              <h2 className="font-semibold">
                Personal Information
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Enter your personal details.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <InputField
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                icon={User}
              />

              <InputField
                name="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
              />

              <InputField
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                icon={Phone}
              />

              <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="Create password"
                icon={Lock}
              />

              <InputField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                icon={Lock}
              />

            </div>

          </div>

          {/* ADDRESS */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5 sm:p-7">

            <div className="mb-6">

              <h2 className="font-semibold">
                Address
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Enter your current address.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div className="md:col-span-2">

                <InputField
                  name="address"
                  label="Address"
                  placeholder="Enter complete address"
                  icon={MapPin}
                />

              </div>

              <InputField
                name="city"
                label="City"
                placeholder="Enter city"
                icon={MapPin}
              />

              <InputField
                name="state"
                label="State"
                placeholder="Enter state"
                icon={MapPin}
              />

              <InputField
                name="pincode"
                label="Pincode"
                placeholder="Enter pincode"
                icon={MapPin}
              />

            </div>

          </div>

          {/* VEHICLE */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5 sm:p-7">

            <div className="mb-6">

              <h2 className="font-semibold">
                Vehicle Information
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Tell us about the vehicle you will use for deliveries.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* VEHICLE TYPE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Vehicle Type
                </label>

                <div className="relative">

                  <Bike
                    size={17}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-600
                    "
                  />

                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-gray-800
                      bg-[#111]
                      pl-11
                      pr-4
                      text-sm
                      text-white
                      outline-none
                      focus:border-yellow-400
                    "
                  >

                    <option value="">
                      Select vehicle
                    </option>

                    <option value="BIKE">
                      Bike
                    </option>

                    <option value="SCOOTER">
                      Scooter
                    </option>

                    <option value="CYCLE">
                      Cycle
                    </option>

                    <option value="OTHER">
                      Other
                    </option>

                  </select>

                </div>

                {errors.vehicleType && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.vehicleType}
                  </p>
                )}

              </div>

              <InputField
                name="vehicleNumber"
                label="Vehicle Number"
                placeholder="e.g. UP32AB1234"
                icon={Bike}
              />

              <InputField
                name="licenseNumber"
                label="Driving License Number"
                placeholder="Enter license number"
                icon={CreditCard}
              />

            </div>

          </div>

          {/* APPLICATION INFO */}

          <div className="rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-5">

            <div className="flex items-start gap-3">

              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-yellow-400"
              />

              <div>

                <p className="text-sm font-semibold text-yellow-400">
                  Application Review
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Your application will be reviewed before your delivery
                  partner account is activated.
                </p>

              </div>

            </div>

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-yellow-400
              px-6
              py-3.5
              text-sm
              font-bold
              text-black
              transition
              hover:bg-yellow-300
            "
          >
            SUBMIT DELIVERY APPLICATION
          </button>

        </form>

      </div>

    </div>
  );
};

export default DeliveryRegistration;