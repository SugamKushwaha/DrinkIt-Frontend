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
  X,
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

  // =====================================================
  // SUCCESS POPUP
  // =====================================================

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user starts correcting field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    // Personal information

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    // Business information

    if (!formData.storeName.trim()) {
      newErrors.storeName =
        "Store name is required";
    }

    if (!formData.businessType) {
      newErrors.businessType =
        "Business type is required";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Store address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT APPLICATION
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Generate application ID
    const newApplicationId =
      "DI-" +
      Date.now().toString().slice(-8);

    // Create vendor application
    const vendorApplication = {
      applicationId: newApplicationId,

      partnerType: "VENDOR",

      name: formData.fullName,
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone,

      password: formData.password,

      storeName: formData.storeName,
      businessType: formData.businessType,

      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,

      status: "PENDING",

      submittedAt: new Date().toISOString(),

      rejectionReason: "",
    };

    // =================================================
    // SAVE APPLICATION
    // =================================================

    localStorage.setItem(
      "drinkit-partner-application",
      JSON.stringify(vendorApplication)
    );

    console.log(
      "Vendor Application:",
      vendorApplication
    );

    // Save ID for popup
    setApplicationId(newApplicationId);

    // Show popup
    setShowSuccessPopup(true);
  };

  // =====================================================
  // CLOSE SUCCESS POPUP
  // =====================================================

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);

    // Reset form after successful submission
    setFormData({
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

    setErrors({});
  };

  // =====================================================
  // INPUT COMPONENT
  // =====================================================

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

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
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

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-yellow-400/10
                "
              >
                <Store
                  size={24}
                  className="text-yellow-400"
                />
              </div>

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-yellow-400
                  "
                >
                  Partner Registration
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                  Become a Vendor
                </h1>

              </div>

            </div>

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-6
                text-gray-500
              "
            >
              Register your store with DrinkIt and
              start reaching customers looking for
              drinks and snacks.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* PERSONAL INFORMATION */}

            <div
              className="
                rounded-2xl
                border
                border-gray-800
                bg-[#080808]
                p-5
                sm:p-7
              "
            >

              <div className="mb-6">

                <h2 className="font-semibold">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Enter the details of the store owner.
                </p>

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-2
                "
              >

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
                  placeholder="Enter 10 digit phone number"
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

            {/* BUSINESS INFORMATION */}

            <div
              className="
                rounded-2xl
                border
                border-gray-800
                bg-[#080808]
                p-5
                sm:p-7
              "
            >

              <div className="mb-6">

                <h2 className="font-semibold">
                  Business Information
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Tell us about your store.
                </p>

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-2
                "
              >

                {/* STORE NAME */}

                <InputField
                  name="storeName"
                  label="Store Name"
                  placeholder="Enter store name"
                  icon={Store}
                />

                {/* BUSINESS TYPE */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-300
                    "
                  >
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

                  {errors.businessType && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.businessType}
                    </p>
                  )}

                </div>

                {/* ADDRESS */}

                <div className="md:col-span-2">

                  <InputField
                    name="address"
                    label="Store Address"
                    placeholder="Enter complete store address"
                    icon={MapPin}
                  />

                </div>

                {/* CITY */}

                <InputField
                  name="city"
                  label="City"
                  placeholder="Enter city"
                  icon={MapPin}
                />

                {/* STATE */}

                <InputField
                  name="state"
                  label="State"
                  placeholder="Enter state"
                  icon={MapPin}
                />

                {/* PINCODE */}

                <InputField
                  name="pincode"
                  label="Pincode"
                  placeholder="Enter 6 digit pincode"
                  icon={MapPin}
                />

              </div>

            </div>

            {/* APPLICATION INFORMATION */}

            <div
              className="
                rounded-2xl
                border
                border-yellow-400/10
                bg-yellow-400/5
                p-5
              "
            >

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={20}
                  className="
                    mt-0.5
                    shrink-0
                    text-yellow-400
                  "
                />

                <div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-yellow-400
                    "
                  >
                    Application Review
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-gray-500
                    "
                  >
                    After submitting your registration,
                    your application will be reviewed
                    before your vendor account is activated.
                    You can check your application status
                    using your email address.
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

      {/* =====================================================
          SUCCESS POPUP
      ===================================================== */}

      {showSuccessPopup && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            px-4
            backdrop-blur-sm
          "
        >

          <div
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              border
              border-gray-800
              bg-[#0b0b0b]
              p-6
              shadow-2xl
              sm:p-8
            "
          >

            {/* CLOSE */}

            <button
              onClick={closeSuccessPopup}
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-gray-500
                transition
                hover:bg-gray-800
                hover:text-white
              "
            >
              <X size={18} />
            </button>

            {/* SUCCESS ICON */}

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-green-400/10
              "
            >
              <CheckCircle2
                size={45}
                className="text-green-400"
              />
            </div>

            {/* TITLE */}

            <div className="mt-6 text-center">

              <h2 className="text-2xl font-bold">
                Application Submitted!
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-gray-500
                "
              >
                Your vendor application has been
                successfully submitted to DrinkIt.
              </p>

            </div>

            {/* APPLICATION ID */}

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-yellow-400/20
                bg-yellow-400/5
                p-5
                text-center
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-gray-500
                "
              >
                Application ID
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-bold
                  tracking-wider
                  text-yellow-400
                "
              >
                {applicationId}
              </p>

            </div>

            {/* INFO */}

            <div className="mt-6 space-y-3">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-green-400"
                />

                <p className="text-sm text-gray-400">
                  Your application is currently{" "}
                  <span className="font-semibold text-yellow-400">
                    under review
                  </span>
                  .
                </p>

              </div>

              <div className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-yellow-400"
                />

                <p className="text-sm text-gray-400">
                  Use your registered email address
                  to check your application status.
                </p>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={closeSuccessPopup}
              className="
                mt-7
                w-full
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
              CONTINUE
            </button>

          </div>

        </div>
      )}

    </>
  );
};

export default VendorRegistration;