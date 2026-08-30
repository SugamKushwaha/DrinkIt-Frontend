import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const SignupForm = ({ onSignup }) => {
  const { register } = useAuth();

  // ==========================================
  // PASSWORD VISIBILITY
  // ==========================================

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(false);

  // ==========================================
  // ERRORS
  // ==========================================

  const [error, setError] = useState("");

  const [errors, setErrors] = useState({});

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ------------------------------------------
    // Clear only this field's error
    // ------------------------------------------

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // ------------------------------------------
    // Clear general error
    // ------------------------------------------

    setError("");
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ------------------------------------------
    // IMPORTANT:
    // Do not allow another request while loading
    // ------------------------------------------

    if (loading) {
      return;
    }

    // ------------------------------------------
    // Clear previous errors
    // ------------------------------------------

    setError("");
    setErrors({});

    // ==========================================
    // FRONTEND VALIDATION
    // ==========================================

    const frontendErrors = {};

    // NAME

    if (!formData.name.trim()) {
      frontendErrors.name = "Name is required";
    }

    // EMAIL

    if (!formData.email.trim()) {
      frontendErrors.email = "Email is required";
    }

    // PHONE

    if (!formData.phone.trim()) {
      frontendErrors.phone = "Phone is required";
    }

    // PASSWORD

    if (!formData.password.trim()) {
      frontendErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      frontendErrors.password =
        "Password must contain at least 6 characters";
    }

    // CONFIRM PASSWORD

    if (!formData.confirmPassword.trim()) {
      frontendErrors.confirmPassword =
        "Confirm password is required";
    } else if (
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      frontendErrors.confirmPassword =
        "Passwords do not match";
    }

    // ==========================================
    // STOP IF FRONTEND VALIDATION FAILED
    // ==========================================

    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);

      // IMPORTANT:
      // Loading NEVER starts here.
      // Therefore button remains CREATE ACCOUNT.
      return;
    }

    // ==========================================
    // BACKEND REQUEST STARTS HERE
    // ==========================================

    try {
      // ------------------------------------------
      // ONLY NOW show:
      // CREATING ACCOUNT...
      // ------------------------------------------

      setLoading(true);

      const registerData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      };

      console.log("Register request:", registerData);

      // ------------------------------------------
      // API CALL
      // ------------------------------------------

      const data = await register(registerData);

      console.log(
        "Registration successful:",
        data
      );

      // ------------------------------------------
      // SUCCESS
      // ------------------------------------------

      if (onSignup) {
        onSignup(data);
      }

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      // ==========================================
      // BACKEND VALIDATION / DUPLICATE ERRORS
      // ==========================================

      if (
        error.response?.status === 400 ||
        error.response?.status === 409
      ) {
        const backendErrors =
          error.response?.data;

        console.log(
          "Backend errors:",
          backendErrors
        );

        // ------------------------------------------
        // Backend returned field errors
        //
        // {
        //   email: "This email is already registered."
        // }
        //
        // OR
        //
        // {
        //   phone: "This phone number is already registered."
        // }
        // ------------------------------------------

        if (
          backendErrors &&
          typeof backendErrors === "object"
        ) {
          const fieldErrors = {};

          // EMAIL ERROR

          if (backendErrors.email) {
            fieldErrors.email =
              backendErrors.email;
          }

          // PHONE ERROR

          if (backendErrors.phone) {
            fieldErrors.phone =
              backendErrors.phone;
          }

          // NAME ERROR

          if (backendErrors.name) {
            fieldErrors.name =
              backendErrors.name;
          }

          // PASSWORD ERROR

          if (backendErrors.password) {
            fieldErrors.password =
              backendErrors.password;
          }

          // CONFIRM PASSWORD ERROR

          if (backendErrors.confirmPassword) {
            fieldErrors.confirmPassword =
              backendErrors.confirmPassword;
          }

          // ------------------------------------------
          // GENERAL ERROR
          // ------------------------------------------

          if (backendErrors.general) {
            setError(
              backendErrors.general
            );
          }

          // ------------------------------------------
          // Set field errors
          // ------------------------------------------

          setErrors(fieldErrors);
        } else {
          setError(
            "Please check your information."
          );
        }
      }

      // ==========================================
      // OTHER BACKEND ERROR
      // ==========================================

      else if (error.response) {
        setError(
          error.response.data?.message ||
            error.response.data?.general ||
            "Unable to create account."
        );
      }

      // ==========================================
      // SERVER NOT REACHABLE
      // ==========================================

      else if (error.request) {
        setError(
          "Backend server is not responding."
        );
      }

      // ==========================================
      // UNKNOWN ERROR
      // ==========================================

      else {
        setError(
          "Something went wrong."
        );
      }

    } finally {
      // ==========================================
      // VERY IMPORTANT
      // ==========================================
      //
      // Whether registration succeeds OR fails,
      // loading becomes false.
      //
      // Therefore:
      //
      // SUCCESS → CREATE ACCOUNT
      // DUPLICATE → CREATE ACCOUNT
      // ERROR → CREATE ACCOUNT
      //
      // Only during API request:
      // CREATING ACCOUNT...
      //
      // ==========================================

      setLoading(false);
    }
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >

      {/* ======================================
          GENERAL ERROR
      ====================================== */}

      {error && (
        <div
          className="
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            text-sm
            rounded-xl
            px-4
            py-3
          "
        >
          {error}
        </div>
      )}

      {/* ======================================
          NAME
      ====================================== */}

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Full Name
        </label>

        <div className="relative">

          <User
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
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            disabled={loading}
            className={`
              w-full
              h-12
              bg-[#080808]
              border
              rounded-xl
              pl-11
              pr-4
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
              transition
              ${
                errors.name
                  ? "border-red-500"
                  : "border-white/10"
              }
            `}
          />

        </div>

        {errors.name && (
          <p className="text-red-400 text-xs mt-2">
            {errors.name}
          </p>
        )}
      </div>

      {/* ======================================
          EMAIL
      ====================================== */}

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Email Address
        </label>

        <div className="relative">

          <Mail
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled={loading}
            className={`
              w-full
              h-12
              bg-[#080808]
              border
              rounded-xl
              pl-11
              pr-4
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
              transition
              ${
                errors.email
                  ? "border-red-500"
                  : "border-white/10"
              }
            `}
          />

        </div>

        {errors.email && (
          <p className="text-red-400 text-xs mt-2">
            {errors.email}
          </p>
        )}
      </div>

      {/* ======================================
          PHONE
      ====================================== */}

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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            required
            disabled={loading}
            className={`
              w-full
              h-12
              bg-[#080808]
              border
              rounded-xl
              pl-11
              pr-4
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
              transition
              ${
                errors.phone
                  ? "border-red-500"
                  : "border-white/10"
              }
            `}
          />

        </div>

        {errors.phone && (
          <p className="text-red-400 text-xs mt-2">
            {errors.phone}
          </p>
        )}
      </div>

      {/* ======================================
          PASSWORD
      ====================================== */}

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Password
        </label>

        <div className="relative">

          <Lock
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
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            disabled={loading}
            className={`
              w-full
              h-12
              bg-[#080808]
              border
              rounded-xl
              pl-11
              pr-12
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
              transition
              ${
                errors.password
                  ? "border-red-500"
                  : "border-white/10"
              }
            `}
          />

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        {errors.password && (
          <p className="text-red-400 text-xs mt-2">
            {errors.password}
          </p>
        )}
      </div>

      {/* ======================================
          CONFIRM PASSWORD
      ====================================== */}

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Confirm Password
        </label>

        <div className="relative">

          <Lock
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
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            disabled={loading}
            className={`
              w-full
              h-12
              bg-[#080808]
              border
              rounded-xl
              pl-11
              pr-12
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
              transition
              ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-white/10"
              }
            `}
          />

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        {errors.confirmPassword && (
          <p className="text-red-400 text-xs mt-2">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* ======================================
          TERMS
      ====================================== */}

      <div className="flex gap-2 pt-1">

        <input
          type="checkbox"
          required
          disabled={loading}
          className="
            mt-1
            accent-yellow-400
          "
        />

        <p className="text-xs text-gray-500 leading-relaxed">

          I agree to DrinkIt's{" "}

          <span className="text-yellow-400">
            Terms & Conditions
          </span>

          {" "}and{" "}

          <span className="text-yellow-400">
            Privacy Policy
          </span>

        </p>

      </div>

      {/* ======================================
          CREATE ACCOUNT BUTTON
      ====================================== */}

      <button
        type="submit"
        disabled={loading}
        className="  w-full  py-3.5  rounded-xl  bg-yellow-400  hover:bg-yellow-300  disabled:opacity-60  disabled:cursor-not-allowed  text-black  font-bold  flex  items-center  justify-center  gap-2  transition  mt-  " >

        {loading ? (
          <>
            CREATING ACCOUNT...

            <span
              className=" w-4 h-4 border-2  border-black/30  border-t-black rounded-full  animate-spi "
            />
          </>
        ) : (
          <>
            CREATE ACCOUNT
            <ArrowRight size={18} />
          </>
        )}

      </button>

    </form>
  );
};

export default SignupForm;
