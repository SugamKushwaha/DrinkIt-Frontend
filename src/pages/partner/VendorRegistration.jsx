import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Store,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Building2,
  CheckCircle2,
} from "lucide-react";

const VendorRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    storeName: "",
    businessType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
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
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    if (!formData.storeName.trim()) {
      newErrors.storeName =
        "Store name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Store address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
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
     * POST /api/auth/vendor/register
     */

    const vendorData = {
      ...formData,
      role: "VENDOR",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    console.log("Vendor Registration:", vendorData);

    alert(
      "Vendor registration submitted successfully!"
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

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10">
              <Store
                size={24}
                className="text-yellow-400"
              />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-yellow-400">
                Partner Registration
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                Become a Vendor
              </h1>

            </div>

          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
            Register your store with DrinkIt and start reaching customers
            looking for drinks and snacks.
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
                Enter the details of the store owner.
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

          {/* BUSINESS */}

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5 sm:p-7">

            <div className="mb-6">

              <h2 className="font-semibold">
                Business Information
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Tell us about your store.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <InputField
                name="storeName"
                label="Store Name"
                placeholder="Enter store name"
                icon={Store}
              />

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Business Type
                </label>

                <div className="relative">

                  <Building2
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
                    name="businessType"
                    value={formData.businessType}
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
                      Select business type
                    </option>

                    <option value="LIQUOR_STORE">
                      Liquor Store
                    </option>

                    <option value="BEVERAGE_STORE">
                      Beverage Store
                    </option>

                    <option value="SNACK_STORE">
                      Snack Store
                    </option>

                    <option value="RESTAURANT">
                      Restaurant
                    </option>

                    <option value="OTHER">
                      Other
                    </option>

                  </select>

                </div>

              </div>

              <div className="md:col-span-2">

                <InputField
                  name="address"
                  label="Store Address"
                  placeholder="Enter complete store address"
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

          {/* INFORMATION */}

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
                  After submitting your registration, your application
                  will be reviewed before your vendor account is activated.
                </p>

              </div>

            </div>

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="
              flex
              h-13
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
            SUBMIT VENDOR APPLICATION
          </button>

        </form>

      </div>

    </div>
  );
};

export default VendorRegistration;