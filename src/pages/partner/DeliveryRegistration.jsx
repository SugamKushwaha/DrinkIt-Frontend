import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Bike,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Car,
  CreditCard,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";

import {
  submitDeliveryPartnerRequest,
  getMyDeliveryPartnerRequest,
} from "../../api/deliveryPartnerApi";

const DeliveryRegistration = () => {
  const navigate = useNavigate();

  // ======================================================
  // FORM DATA
  // ======================================================

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
    drivingLicenseNumber: "",
    aadhaarNumber: "",
  });

  // ======================================================
  // ERRORS
  // ======================================================

  const [errors, setErrors] = useState({});

  // ======================================================
  // LOADING
  // ======================================================

  const [loading, setLoading] = useState(false);

  // ======================================================
  // CHECKING EXISTING APPLICATION
  // ======================================================

  const [checkingApplication, setCheckingApplication] =
    useState(true);

  // ======================================================
  // GENERAL ERROR
  // ======================================================

  const [error, setError] = useState("");

  // ======================================================
  // EXISTING APPLICATION
  // ======================================================

  const [existingApplication, setExistingApplication] =
    useState(null);

  // ======================================================
  // SUCCESS POPUP
  // ======================================================

  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false);

  const [applicationId, setApplicationId] =
    useState("");

  // ======================================================
  // APPLICATION POPUP
  // ======================================================

  const [showApplicationPopup, setShowApplicationPopup] =
    useState(false);

  const [applicationPopupType, setApplicationPopupType] =
    useState("");

  // ======================================================
  // LOAD CURRENT APPLICATION
  // ======================================================

  useEffect(() => {
    const loadApplication = async () => {
      try {
        setCheckingApplication(true);

        const response =
          await getMyDeliveryPartnerRequest();

        console.log(
          "Existing delivery partner request:",
          response
        );

        if (response) {
          setExistingApplication(response);
        }
      } catch (err) {
        console.log(
          "No existing delivery partner application"
        );

        /*
         * Backend currently throws an error when
         * application doesn't exist.
         *
         * Therefore we simply allow the user
         * to fill the form.
         */

        setExistingApplication(null);
      } finally {
        setCheckingApplication(false);
      }
    };

    loadApplication();
  }, []);

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
  };

  // ======================================================
  // VALIDATION
  // ======================================================

  const validateForm = () => {
    const newErrors = {};

    // ====================================================
    // PERSONAL
    // ====================================================

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
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
      !/^[0-9]{10}$/.test(
        formData.phone
      )
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

    // ====================================================
    // ADDRESS
    // ====================================================

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
      !/^[0-9]{6}$/.test(
        formData.pincode
      )
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    // ====================================================
    // VEHICLE
    // ====================================================

    if (!formData.vehicleType) {
      newErrors.vehicleType =
        "Vehicle type is required";
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber =
        "Vehicle number is required";
    }

    if (
      !formData.drivingLicenseNumber.trim()
    ) {
      newErrors.drivingLicenseNumber =
        "Driving license number is required";
    }

    if (!formData.aadhaarNumber.trim()) {
      newErrors.aadhaarNumber =
        "Aadhaar number is required";
    } else if (
      !/^[0-9]{12}$/.test(
        formData.aadhaarNumber
      )
    ) {
      newErrors.aadhaarNumber =
        "Enter a valid 12-digit Aadhaar number";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ======================================================
  // CHECK APPLICATION BEFORE SUBMIT
  // ======================================================

  const checkExistingApplicationBeforeSubmit =
    async () => {
      try {
        const response =
          await getMyDeliveryPartnerRequest();

        if (response) {
          setExistingApplication(response);

          return response;
        }

        return null;
      } catch {
        return null;
      }
    };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setError("");

    // ====================================================
    // VALIDATION
    // ====================================================

    if (!validateForm()) {
      return;
    }

    // ====================================================
    // CHECK EXISTING APPLICATION
    // ====================================================

    try {
      setLoading(true);

      const existing =
        await checkExistingApplicationBeforeSubmit();

      if (existing) {
        const status =
          String(existing.status || "")
            .toUpperCase();

        // ================================================
        // ALREADY APPROVED
        // ================================================

        if (status === "APPROVED") {
          setApplicationPopupType(
            "ALREADY_PARTNER"
          );

          setShowApplicationPopup(true);

          return;
        }

        // ================================================
        // ALREADY PENDING
        // ================================================

        if (status === "PENDING") {
          setApplicationPopupType(
            "ALREADY_EXISTS"
          );

          setShowApplicationPopup(true);

          return;
        }

        // ================================================
        // REJECTED
        //
        // User is allowed to apply again.
        // ================================================

        if (status === "REJECTED") {
          setExistingApplication(null);
        }
      }

      // ==================================================
      // REQUEST DATA
      // ==================================================

      const requestData = {
        address:
          formData.address.trim(),

        city:
          formData.city.trim(),

        state:
          formData.state.trim(),

        pincode:
          formData.pincode.trim(),

        vehicleType:
          formData.vehicleType.trim(),

        vehicleNumber:
          formData.vehicleNumber
            .trim()
            .toUpperCase(),

        drivingLicenseNumber:
          formData.drivingLicenseNumber
            .trim()
            .toUpperCase(),

        aadhaarNumber:
          formData.aadhaarNumber.trim(),
      };

      console.log(
        "Submitting delivery partner request:",
        requestData
      );

      // ==================================================
      // API
      // ==================================================

      const response =
        await submitDeliveryPartnerRequest(
          requestData
        );

      console.log(
        "Delivery partner request created:",
        response
      );

      // ==================================================
      // APPLICATION ID
      // ==================================================

      if (response?.requestId) {
        setApplicationId(
          `DI-DP-${response.requestId}`
        );
      } else if (response?.id) {
        setApplicationId(
          `DI-DP-${response.id}`
        );
      } else {
        setApplicationId(
          "DI-DP-" +
            Date.now()
              .toString()
              .slice(-8)
        );
      }

      // ==================================================
      // SAVE APPLICATION
      // ==================================================

      setExistingApplication(response);

      // ==================================================
      // SUCCESS POPUP
      // ==================================================

      setShowSuccessPopup(true);

    } catch (err) {
      console.error(
        "Delivery partner application error:",
        err
      );

      console.error(
        "Backend response:",
        err.response?.data
      );

      // ==================================================
      // 401
      // ==================================================

      if (
        err.response?.status === 401
      ) {
        setError(
          "Please login before submitting a delivery partner application."
        );

        return;
      }

      // ==================================================
      // 403
      // ==================================================

      if (
        err.response?.status === 403
      ) {
        setError(
          "You are not allowed to submit a delivery partner application."
        );

        return;
      }

      // ==================================================
      // 409
      // ==================================================

      if (
        err.response?.status === 409
      ) {
        setApplicationPopupType(
          "ALREADY_EXISTS"
        );

        setShowApplicationPopup(true);

        return;
      }

      // ==================================================
      // 400
      // ==================================================

      if (
        err.response?.status === 400
      ) {
        const backendErrors =
          err.response?.data;

        if (
          backendErrors &&
          typeof backendErrors ===
            "object"
        ) {
          setErrors(
            backendErrors
          );
        } else {
          setError(
            "Please check your information."
          );
        }

        return;
      }

      // ==================================================
      // OTHER BACKEND ERROR
      // ==================================================

      if (err.response) {
        const message =
          typeof err.response.data ===
          "string"
            ? err.response.data
            : err.response.data?.message ||
              err.response.data?.error;

        if (
          message &&
          message
            .toLowerCase()
            .includes("already pending")
        ) {
          setApplicationPopupType(
            "ALREADY_EXISTS"
          );

          setShowApplicationPopup(true);

          return;
        }

        if (
          message &&
          message
            .toLowerCase()
            .includes("only customers")
        ) {
          setApplicationPopupType(
            "ALREADY_PARTNER"
          );

          setShowApplicationPopup(true);

          return;
        }

        setError(
          message ||
            "Unable to submit application."
        );

        return;
      }

      // ==================================================
      // SERVER NOT AVAILABLE
      // ==================================================

      if (err.request) {
        setError(
          "Backend server is not responding."
        );

        return;
      }

      // ==================================================
      // UNKNOWN
      // ==================================================

      setError(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RESET FORM
  // ======================================================

  const resetForm = () => {
    setFormData({
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
      drivingLicenseNumber: "",
      aadhaarNumber: "",
    });

    setErrors({});
    setError("");
  };

  // ======================================================
  // CLOSE SUCCESS
  // ======================================================

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);

    resetForm();

    /*
     * Keep the existing application in state.
     * This prevents the user from immediately
     * submitting another application.
     */
  };

  // ======================================================
  // INPUT COMPONENT
  // ======================================================

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

  // ======================================================
  // CHECKING SCREEN
  // ======================================================

  if (checkingApplication) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-yellow-400" />

          <p className="text-sm text-gray-500">
            Checking your application...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <>
      <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 md:px-10">

        <div className="mx-auto max-w-[900px]">

          {/* ==================================================
              BACK
          ================================================== */}

          <button
            onClick={() =>
              navigate("/partner")
            }
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

          {/* ==================================================
              HEADER
          ================================================== */}

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
                <Bike
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
              Join DrinkIt as a delivery partner
              and start delivering orders to
              customers.
            </p>

          </div>

          {/* ==================================================
              EXISTING STATUS
          ================================================== */}

          {existingApplication &&
            String(
              existingApplication.status
            ).toUpperCase() === "PENDING" && (

              <div
                className="
                  mb-6
                  rounded-2xl
                  border
                  border-yellow-400/20
                  bg-yellow-400/5
                  p-5
                "
              >

                <div className="flex items-start gap-3">

                  <AlertCircle
                    size={20}
                    className="
                      mt-0.5
                      shrink-0
                      text-yellow-400
                    "
                  />

                  <div>

                    <p className="font-semibold text-yellow-400">
                      Application Already Exists
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Your delivery partner
                      application is currently
                      under review by the admin.
                    </p>

                  </div>

                </div>

              </div>
            )}

          {/* ==================================================
              GENERAL ERROR
          ================================================== */}

          {error && (
            <div
              className="
                mb-6
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* ==================================================
                PERSONAL INFORMATION
            ================================================== */}

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

            {/* ==================================================
                ADDRESS
            ================================================== */}

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
                  Address Information
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

            {/* ==================================================
                VEHICLE INFORMATION
            ================================================== */}

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
                  Enter the vehicle details that
                  you will use for delivery.
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

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Vehicle Type
                  </label>

                  <div className="relative">

                    <Car
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
                        Select vehicle type
                      </option>

                      <option value="BIKE">
                        Bike
                      </option>

                      <option value="SCOOTER">
                        Scooter
                      </option>

                      <option value="MOTORCYCLE">
                        Motorcycle
                      </option>

                      <option value="ELECTRIC_BIKE">
                        Electric Bike
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
                  placeholder="e.g. UP78AB1234"
                  icon={Car}
                />

                <InputField
                  name="drivingLicenseNumber"
                  label="Driving License Number"
                  placeholder="Enter driving license number"
                  icon={CreditCard}
                />

                <InputField
                  name="aadhaarNumber"
                  label="Aadhaar Number"
                  type="text"
                  placeholder="Enter 12 digit Aadhaar number"
                  icon={CreditCard}
                />

              </div>

            </div>

            {/* ==================================================
                APPLICATION INFORMATION
            ================================================== */}

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
                    Your application will be
                    reviewed by the DrinkIt admin.
                    After approval, your account
                    will become a delivery partner
                    account.
                  </p>

                </div>

              </div>

            </div>

            {/* ==================================================
                SUBMIT
            ================================================== */}

            <button
              type="submit"
              disabled={
                loading ||
                (
                  existingApplication &&
                  String(
                    existingApplication.status
                  ).toUpperCase() === "PENDING"
                )
              }
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading
                ? "SUBMITTING APPLICATION..."
                : existingApplication &&
                  String(
                    existingApplication.status
                  ).toUpperCase() === "PENDING"
                ? "APPLICATION UNDER REVIEW"
                : "SUBMIT DELIVERY PARTNER APPLICATION"}

            </button>

          </form>

        </div>

      </div>

      {/* ======================================================
          SUCCESS POPUP
      ====================================================== */}

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
                has been successfully submitted
                to DrinkIt admin.
              </p>

            </div>

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

            <div className="mt-6 space-y-3">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-green-400
                  "
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
                  className="
                    mt-0.5
                    shrink-0
                    text-yellow-400
                  "
                />

                <p className="text-sm text-gray-400">
                  You can check your application
                  status from your account.
                </p>

              </div>

            </div>

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

      {/* ======================================================
          APPLICATION STATUS POPUP
      ====================================================== */}

      {showApplicationPopup && (

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

            <button
              onClick={() =>
                setShowApplicationPopup(false)
              }
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

            {/* ==================================================
                ALREADY PARTNER
            ================================================== */}

            {applicationPopupType ===
              "ALREADY_PARTNER" && (

              <>

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

                  <Bike
                    size={40}
                    className="text-green-400"
                  />

                </div>

                <div className="mt-6 text-center">

                  <h2 className="text-2xl font-bold">
                    You Are Already a Delivery Partner
                  </h2>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    Your delivery partner
                    application has already been
                    approved by the admin.
                  </p>

                </div>

                <button
                  onClick={() => {
                    setShowApplicationPopup(false);
                    navigate("/delivery-partner");
                  }}
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
                  GO TO DELIVERY PARTNER
                </button>

              </>
            )}

            {/* ==================================================
                APPLICATION ALREADY EXISTS
            ================================================== */}

            {applicationPopupType ===
              "ALREADY_EXISTS" && (

              <>

                <div
                  className="
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-400/10
                  "
                >

                  <AlertCircle
                    size={40}
                    className="text-yellow-400"
                  />

                </div>

                <div className="mt-6 text-center">

                  <h2 className="text-2xl font-bold">
                    Application Already Exists
                  </h2>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    You have already submitted a
                    delivery partner application.
                    Please wait for the admin to
                    review your application.
                  </p>

                </div>

                {existingApplication && (

                  <div
                    className="
                      mt-6
                      rounded-2xl
                      border
                      border-gray-800
                      bg-[#111]
                      p-4
                    "
                  >

                    <div className="flex justify-between">

                      <span className="text-sm text-gray-500">
                        Status
                      </span>

                      <span className="text-sm font-semibold text-yellow-400">
                        {existingApplication.status}
                      </span>

                    </div>

                    {existingApplication.requestId && (

                      <div className="mt-3 flex justify-between">

                        <span className="text-sm text-gray-500">
                          Application ID
                        </span>

                        <span className="text-sm font-semibold text-white">
                          DI-DP-
                          {
                            existingApplication.requestId
                          }
                        </span>

                      </div>

                    )}

                  </div>

                )}

                <button
                  onClick={() =>
                    setShowApplicationPopup(false)
                  }
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
                  OK
                </button>

              </>
            )}

          </div>

        </div>

      )}

    </>
  );
};

export default DeliveryRegistration;