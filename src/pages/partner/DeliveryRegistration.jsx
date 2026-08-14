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
  X,
  Clock3,
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

  // =====================================================
  // SUCCESS POPUP
  // =====================================================

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submittedApplication, setSubmittedApplication] =
    useState(null);

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[0-9]{10}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
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

    if (!formData.state.trim()) {
      newErrors.state =
        "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode =
        "Pincode is required";
    } else if (
      !/^[0-9]{6}$/.test(formData.pincode)
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
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

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =====================================================
  // SUBMIT APPLICATION
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Generate Application ID
    const applicationId =
      "DI-" +
      Date.now().toString().slice(-8);

    // Create application
    const deliveryApplication = {
      applicationId,

      partnerType: "DELIVERY_PARTNER",

      name: formData.fullName,

      email: formData.email
        .trim()
        .toLowerCase(),

      phone: formData.phone,

      password: formData.password,

      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,

      vehicleType: formData.vehicleType,
      vehicleNumber: formData.vehicleNumber,
      licenseNumber: formData.licenseNumber,

      status: "PENDING",

      submittedAt:
        new Date().toISOString(),

      rejectionReason: "",
    };

    // =================================================
    // SAVE APPLICATION
    // =================================================

    localStorage.setItem(
      "drinkit-partner-application",
      JSON.stringify(
        deliveryApplication
      )
    );

    console.log(
      "Delivery Partner Application:",
      deliveryApplication
    );

    // =================================================
    // SAVE APPLICATION FOR POPUP
    // =================================================

    setSubmittedApplication(
      deliveryApplication
    );

    // =================================================
    // SHOW SUCCESS POPUP
    // =================================================

    setShowSuccessPopup(true);
  };

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
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
                bg-orange-400/10
              "
            >
              <Bike
                size={25}
                className="text-orange-400"
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
                Become a Delivery Partner
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
            Join DrinkIt as a delivery partner and
            start earning by delivering orders to
            customers.
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
                Enter your personal details.
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

          {/* ADDRESS */}

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
                Address
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Enter your current address.
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
                placeholder="Enter 6 digit pincode"
                icon={MapPin}
              />

            </div>

          </div>

          {/* VEHICLE */}

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
                Vehicle Information
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Tell us about the vehicle you will
                use for deliveries.
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

              {/* VEHICLE TYPE */}

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
                    value={
                      formData.vehicleType
                    }
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
                  <p
                    className="
                      mt-1.5
                      text-xs
                      text-red-400
                    "
                  >
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
                  Your application will be reviewed
                  before your delivery partner account
                  is activated. You can check your
                  application status using your email
                  address.
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

      {/* =================================================
          SUCCESS POPUP
      ================================================= */}

      {showSuccessPopup && submittedApplication && (

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

          {/* POPUP */}

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
                bg-[#151515]
                text-gray-400
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
                Your delivery partner application
                has been successfully submitted to
                DrinkIt.
              </p>

            </div>

            {/* APPLICATION DETAILS */}

            <div
              className="
                mt-6
                space-y-3
                rounded-2xl
                border
                border-gray-800
                bg-[#111]
                p-5
              "
            >

              {/* APPLICATION ID */}

              <div className="flex items-center justify-between gap-4">

                <span className="text-xs text-gray-500">
                  Application ID
                </span>

                <span
                  className="
                    text-sm
                    font-semibold
                    text-yellow-400
                  "
                >
                  {submittedApplication.applicationId}
                </span>

              </div>

              {/* EMAIL */}

              <div className="flex items-center justify-between gap-4">

                <span className="text-xs text-gray-500">
                  Email
                </span>

                <span
                  className="
                    max-w-[220px]
                    break-all
                    text-right
                    text-sm
                    text-gray-300
                  "
                >
                  {submittedApplication.email}
                </span>

              </div>

              {/* STATUS */}

              <div className="flex items-center justify-between gap-4">

                <span className="text-xs text-gray-500">
                  Status
                </span>

                <span
                  className="
                    rounded-full
                    bg-yellow-400/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-yellow-400
                  "
                >
                  PENDING
                </span>

              </div>

            </div>

            {/* REVIEW MESSAGE */}

            <div
              className="
                mt-5
                flex
                items-start
                gap-3
                rounded-xl
                border
                border-yellow-400/10
                bg-yellow-400/5
                p-4
              "
            >

              <Clock3
                size={19}
                className="
                  mt-0.5
                  shrink-0
                  text-yellow-400
                "
              />

              <p
                className="
                  text-xs
                  leading-5
                  text-gray-500
                "
              >
                Our team will review your
                application. You can check your
                application status later using the
                same email address.
              </p>

            </div>

            {/* BUTTONS */}

            <div className="mt-6 flex flex-col gap-3">

              <button
                onClick={closeSuccessPopup}
                className="
                  w-full
                  rounded-xl
                  bg-yellow-400
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-black
                  transition
                  hover:bg-yellow-300
                "
              >
                DONE
              </button>

              <button
                onClick={() => {
                  closeSuccessPopup();
                  navigate(
                    "/application-status"
                  );
                }}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-700
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-gray-300
                  transition
                  hover:border-yellow-400
                  hover:text-yellow-400
                "
              >
                CHECK APPLICATION STATUS
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default DeliveryRegistration;