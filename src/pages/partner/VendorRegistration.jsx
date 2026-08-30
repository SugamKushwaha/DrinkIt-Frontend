import React, { useEffect, useState } from "react";
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
  AlertCircle,
  Clock,
} from "lucide-react";

import {
  submitVendorRequest,
  getMyVendorRequest,
} from "../../api/vendorApi";

const VendorRegistration = () => {
  const navigate = useNavigate();

  // =====================================================
  // FORM DATA
  // =====================================================

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

    gstNumber: "",
    licenseNumber: "",
  });

  // =====================================================
  // ERRORS
  // =====================================================

  const [errors, setErrors] = useState({});

  // =====================================================
  // GENERAL ERROR
  // =====================================================

  const [error, setError] = useState("");

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(false);

  // =====================================================
  // CHECKING EXISTING APPLICATION
  // =====================================================

  const [checkingApplication, setCheckingApplication] =
    useState(true);

  // =====================================================
  // EXISTING APPLICATION
  // =====================================================

  const [existingApplication, setExistingApplication] =
    useState(null);

  // =====================================================
  // SUCCESS POPUP
  // =====================================================

  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false);

  const [applicationId, setApplicationId] =
    useState("");

  // =====================================================
  // ERROR POPUP
  // =====================================================

  const [showErrorPopup, setShowErrorPopup] =
    useState(false);

  const [popupTitle, setPopupTitle] =
    useState("");

  const [popupMessage, setPopupMessage] =
    useState("");

  // =====================================================
  // CHECK EXISTING APPLICATION
  // =====================================================

  useEffect(() => {
    const checkExistingApplication = async () => {
      try {
        setCheckingApplication(true);

        const response =
          await getMyVendorRequest();

        console.log(
          "Existing vendor application:",
          response
        );

        if (response) {
          setExistingApplication(response);
        }
      } catch (err) {
        /*
         * If there is no vendor request for this user,
         * backend may return 404.
         *
         * In that case user can apply normally.
         */

        if (
          err.response?.status === 404
        ) {
          setExistingApplication(null);
        } else {
          console.error(
            "Unable to check vendor application:",
            err
          );
        }
      } finally {
        setCheckingApplication(false);
      }
    };

    checkExistingApplication();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // Clear general error
    setError("");
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    // =====================================================
    // PERSONAL INFORMATION
    // =====================================================

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
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
        formData.phone.trim()
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

    // =====================================================
    // BUSINESS INFORMATION
    // =====================================================

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
        formData.pincode.trim()
      )
    ) {
      newErrors.pincode =
        "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =====================================================
  // SHOW ERROR POPUP
  // =====================================================

  const showApplicationError = (
    title,
    message
  ) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setShowErrorPopup(true);
  };

  // =====================================================
  // HANDLE EXISTING APPLICATION RESPONSE
  // =====================================================

  const handleExistingApplicationError = (
    backendErrors
  ) => {
    console.log(
      "Backend vendor error:",
      backendErrors
    );

    // -----------------------------------------------------
    // BACKEND MAY RETURN:
    //
    // {
    //   general: "Application already exists"
    // }
    //
    // OR
    //
    // {
    //   email: "Application already exists"
    // }
    //
    // OR
    //
    // {
    //   gstNumber: "Application already exists"
    // }
    // -----------------------------------------------------

    let message =
      "Application already exists.";

    if (
      typeof backendErrors === "string"
    ) {
      message = backendErrors;
    }

    else if (
      backendErrors?.general
    ) {
      message =
        backendErrors.general;
    }

    else if (
      backendErrors?.message
    ) {
      message =
        backendErrors.message;
    }

    else if (
      backendErrors?.email
    ) {
      message =
        backendErrors.email;
    }

    else if (
      backendErrors?.gstNumber
    ) {
      message =
        backendErrors.gstNumber;
    }

    else if (
      backendErrors?.licenseNumber
    ) {
      message =
        backendErrors.licenseNumber;
    }

    else if (
      backendErrors?.phone
    ) {
      message =
        backendErrors.phone;
    }

    setError(message);

    showApplicationError(
      "Application Already Exists",
      message
    );
  };

  // =====================================================
  // SUBMIT APPLICATION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------------------------------
    // DO NOT SUBMIT WHILE CHECKING
    // -----------------------------------------------------

    if (checkingApplication) {
      return;
    }

    // -----------------------------------------------------
    // CLEAR PREVIOUS ERRORS
    // -----------------------------------------------------

    setErrors({});
    setError("");

    // =====================================================
    // CHECK CURRENT APPLICATION STATE
    // =====================================================

    if (existingApplication) {
      const status =
        existingApplication.status;

      // ---------------------------------------------------
      // ALREADY VENDOR
      // ---------------------------------------------------

      if (
        status === "APPROVED"
      ) {
        showApplicationError(
          "You Are Already a Vendor",
          "Your vendor application has already been approved. You are already registered as a DrinkIt vendor."
        );

        return;
      }

      // ---------------------------------------------------
      // APPLICATION PENDING
      // ---------------------------------------------------

      if (
        status === "PENDING"
      ) {
        showApplicationError(
          "Application Already Exists",
          "Your vendor application is already under review. Please wait for the admin to process your application."
        );

        return;
      }

      // ---------------------------------------------------
      // REJECTED
      //
      // User IS allowed to apply again.
      // ---------------------------------------------------

      if (
        status === "REJECTED"
      ) {
        console.log(
          "Previous application rejected. New application allowed."
        );

        /*
         * Do not return.
         * Continue with new application.
         */
      }
    }

    // =====================================================
    // FRONTEND VALIDATION
    // =====================================================

    if (!validateForm()) {
      return;
    }

    // =====================================================
    // START API REQUEST
    // =====================================================

    try {
      setLoading(true);

      // =================================================
      // DATA FOR BACKEND
      // =================================================

      const requestData = {
  businessName:
    formData.storeName.trim(),

  businessAddress:
    formData.address.trim(),

  businessType:
    formData.businessType.trim(), // ✅ ADD

  city:
    formData.city.trim(),

  state:
    formData.state.trim(),

  pincode:
    formData.pincode.trim(),

  gstNumber:
    formData.gstNumber?.trim() || "",

  licenseNumber:
    formData.licenseNumber?.trim() || "",
};

      console.log(
        "Submitting vendor request:",
        requestData
      );

      // =================================================
      // CALL BACKEND
      // =================================================

      const response =
        await submitVendorRequest(
          requestData
        );

      console.log(
        "Vendor request created:",
        response
      );

      // =================================================
      // SAVE APPLICATION ID
      //
      // IMPORTANT:
      // Backend DTO has requestId,
      // NOT id.
      // =================================================

      if (
        response?.requestId
      ) {
        setApplicationId(
          `DI-${response.requestId}`
        );
      } else {
        setApplicationId(
          "DI-" +
            Date.now()
              .toString()
              .slice(-8)
        );
      }

      // =================================================
      // UPDATE EXISTING APPLICATION
      // =================================================

      setExistingApplication(
        response
      );

      // =================================================
      // SHOW SUCCESS
      // =================================================

      setShowSuccessPopup(true);

    } catch (err) {

      console.error(
        "Vendor application error:",
        err
      );

      console.error(
        "Backend response:",
        err.response?.data
      );

      // =================================================
      // 400 BAD REQUEST
      // =================================================

      if (
        err.response?.status === 400
      ) {
        const backendErrors =
          err.response.data;

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

      // =================================================
      // 401 UNAUTHORIZED
      // =================================================

      if (
        err.response?.status === 401
      ) {
        showApplicationError(
          "Login Required",
          "Please login before submitting a vendor application."
        );

        return;
      }

      // =================================================
      // 403 FORBIDDEN
      // =================================================

      if (
        err.response?.status === 403
      ) {
        showApplicationError(
          "Access Denied",
          "You are not allowed to submit a vendor application."
        );

        return;
      }

      // =================================================
      // 404
      // =================================================

      if (
        err.response?.status === 404
      ) {
        setError(
          "Vendor application service was not found."
        );

        return;
      }

      // =================================================
      // 409 CONFLICT
      //
      // THIS IS IMPORTANT
      //
      // Existing application / vendor
      // =================================================

      if (
        err.response?.status === 409
      ) {
        const backendErrors =
          err.response.data;

        handleExistingApplicationError(
          backendErrors
        );

        return;
      }

      // =================================================
      // OTHER SERVER ERROR
      // =================================================

      if (err.response) {

        const backendData =
          err.response.data;

        const message =
          typeof backendData ===
          "string"
            ? backendData
            : backendData?.message ||
              backendData?.general ||
              "Unable to submit vendor application.";

        setError(message);

        return;
      }

      // =================================================
      // SERVER NOT AVAILABLE
      // =================================================

      if (err.request) {
        setError(
          "Backend server is not responding."
        );

        return;
      }

      // =================================================
      // UNKNOWN ERROR
      // =================================================

      setError(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLOSE SUCCESS POPUP
  // =====================================================

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);

    /*
     * Do NOT clear the form here.
     *
     * Keeping the form data is safer because
     * user can see what they submitted.
     */

    setErrors({});
    setError("");
  };

  // =====================================================
  // CLOSE ERROR POPUP
  // =====================================================

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
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

      <label
        className="
          mb-2
          block
          text-sm
          font-medium
          text-gray-300
        "
      >
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
          className={`
            h-12
            w-full
            rounded-xl
            border
            bg-[#111]
            pl-11
            pr-4
            text-sm
            text-white
            outline-none
            transition
            placeholder:text-gray-700
            focus:border-yellow-400
            ${
              errors[name]
                ? "border-red-500"
                : "border-gray-800"
            }
          `}
        />

      </div>

      {errors[name] && (
        <p
          className="
            mt-1.5
            text-xs
            text-red-400
          "
        >
          {errors[name]}
        </p>
      )}

    </div>
  );

  // =====================================================
  // EXISTING APPLICATION STATUS
  // =====================================================

  const renderApplicationStatus = () => {
    if (!existingApplication) {
      return null;
    }

    if (
      existingApplication.status ===
      "PENDING"
    ) {
      return (
        <div
          className="
            mb-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-yellow-400/20
            bg-yellow-400/5
            p-5
          "
        >
          <Clock
            size={22}
            className="
              mt-0.5
              shrink-0
              text-yellow-400
            "
          />

          <div>

            <p
              className="
                font-semibold
                text-yellow-400
              "
            >
              Application Under Review
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-gray-400
              "
            >
              You already have a vendor
              application under review.
              Please wait for the admin
              to process it.
            </p>

            {existingApplication.requestId && (
              <p
                className="
                  mt-2
                  text-xs
                  text-gray-500
                "
              >
                Application ID:{" "}
                <span className="text-yellow-400">
                  DI-
                  {
                    existingApplication.requestId
                  }
                </span>
              </p>
            )}

          </div>

        </div>
      );
    }

    if (
      existingApplication.status ===
      "APPROVED"
    ) {
      return (
        <div
          className="
            mb-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-green-400/20
            bg-green-400/5
            p-5
          "
        >
          <CheckCircle2
            size={22}
            className="
              mt-0.5
              shrink-0
              text-green-400
            "
          />

          <div>

            <p
              className="
                font-semibold
                text-green-400
              "
            >
              You Are Already a Vendor
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-gray-400
              "
            >
              Your vendor application has
              already been approved by the
              admin.
            </p>

          </div>

        </div>
      );
    }

    if (
      existingApplication.status ===
      "REJECTED"
    ) {
      return (
        <div
          className="
            mb-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-400/20
            bg-red-400/5
            p-5
          "
        >
          <AlertCircle
            size={22}
            className="
              mt-0.5
              shrink-0
              text-red-400
            "
          />

          <div>

            <p
              className="
                font-semibold
                text-red-400
              "
            >
              Previous Application Rejected
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-gray-400
              "
            >
              Your previous vendor application
              was rejected. You can submit a
              new application.
            </p>

          </div>

        </div>
      );
    }

    return null;
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <div
        className="
          min-h-screen
          bg-black
          px-4
          py-8
          text-white
          sm:px-6
          md:px-10
        "
      >

        <div
          className="
            mx-auto
            max-w-[900px]
          "
        >

          {/* =================================================
              BACK
          ================================================= */}

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

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8">

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

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
                  className="
                    text-yellow-400
                  "
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

                <h1
                  className="
                    mt-1
                    text-3xl
                    font-bold
                  "
                >
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
              Register your store with
              DrinkIt and start reaching
              customers looking for drinks
              and snacks.
            </p>

          </div>

          {/* =================================================
              CHECKING APPLICATION
          ================================================= */}

          {checkingApplication && (
            <div
              className="
                mb-6
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-gray-800
                bg-[#080808]
                px-4
                py-3
                text-sm
                text-gray-400
              "
            >
              <div
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-gray-700
                  border-t-yellow-400
                "
              />

              Checking your vendor
              application...
            </div>
          )}

          {/* =================================================
              EXISTING APPLICATION STATUS
          ================================================= */}

          {!checkingApplication &&
            renderApplicationStatus()}

          {/* =================================================
              GENERAL ERROR
          ================================================= */}

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

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

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

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                  "
                >
                  Enter the details of the
                  store owner.
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

            {/* =================================================
                BUSINESS INFORMATION
            ================================================= */}

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

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                  "
                >
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

                  <div
                    className="
                      relative
                    "
                  >

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
                      value={
                        formData.businessType
                      }
                      onChange={handleChange}
                      className={`
                        h-12
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        bg-[#111]
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                        focus:border-yellow-400
                        ${
                          errors.businessType
                            ? "border-red-500"
                            : "border-gray-800"
                        }
                      `}
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
                    <p
                      className="
                        mt-1.5
                        text-xs
                        text-red-400
                      "
                    >
                      {
                        errors.businessType
                      }
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

                {/* GST */}

                <InputField
                  name="gstNumber"
                  label="GST Number"
                  placeholder="Enter GST number"
                  icon={Building2}
                />

                {/* LICENSE */}

                <InputField
                  name="licenseNumber"
                  label="License Number"
                  placeholder="Enter license number"
                  icon={Building2}
                />

              </div>

            </div>

            {/* =================================================
                APPLICATION INFORMATION
            ================================================= */}

            <div
              className="
                rounded-2xl
                border
                border-yellow-400/10
                bg-yellow-400/5
                p-5
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >

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
                    After submitting your
                    registration, your
                    application will be
                    reviewed by the DrinkIt
                    admin before your vendor
                    account is activated.
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              disabled={
                loading ||
                checkingApplication ||
                existingApplication?.status ===
                  "PENDING" ||
                existingApplication?.status ===
                  "APPROVED"
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
                : existingApplication?.status ===
                  "APPROVED"
                ? "ALREADY A VENDOR"
                : existingApplication?.status ===
                  "PENDING"
                ? "APPLICATION UNDER REVIEW"
                : "SUBMIT VENDOR APPLICATION"}

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
              onClick={
                closeSuccessPopup
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
                className="
                  text-green-400
                "
              />
            </div>

            {/* TITLE */}

            <div
              className="
                mt-6
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
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
                Your vendor application
                has been successfully
                submitted to DrinkIt.
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

            <div
              className="
                mt-6
                space-y-3
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                <CheckCircle2
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-green-400
                  "
                />

                <p
                  className="
                    text-sm
                    text-gray-400
                  "
                >
                  Your application is
                  currently{" "}
                  <span
                    className="
                      font-semibold
                      text-yellow-400
                    "
                  >
                    under review
                  </span>
                  .
                </p>

              </div>

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                <Mail
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-yellow-400
                  "
                />

                <p
                  className="
                    text-sm
                    text-gray-400
                  "
                >
                  You can check your
                  vendor application
                  status from your
                  account.
                </p>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={
                closeSuccessPopup
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
              CONTINUE
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          ERROR POPUP
      ===================================================== */}

      {showErrorPopup && (

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
              border-red-500/20
              bg-[#0b0b0b]
              p-6
              shadow-2xl
              sm:p-8
            "
          >

            {/* CLOSE */}

            <button
              onClick={
                closeErrorPopup
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

            {/* ERROR ICON */}

            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-red-400/10
              "
            >

              <AlertCircle
                size={45}
                className="
                  text-red-400
                "
              />

            </div>

            {/* TITLE */}

            <div
              className="
                mt-6
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {popupTitle}
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-gray-500
                "
              >
                {popupMessage}
              </p>

            </div>

            {/* BUTTON */}

            <button
              onClick={
                closeErrorPopup
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
              OK, GOT IT
            </button>

          </div>

        </div>
      )}
    </>
  );
};

export default VendorRegistration;