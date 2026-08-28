import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const SignupForm = ({ onSignup }) => {
  const { register } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // ==========================================
  // CHANGE
  // ==========================================

  const handleChange = (e) => {

  const {
    name,
    value
  } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Clear field-specific error
  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));

  // Clear general error
  setError("");
};

  // ==========================================
  // SUBMIT
  // ==========================================

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setErrors({});

  // ==========================================
  // FRONTEND VALIDATION
  // ==========================================

  const frontendErrors = {};

  if (!formData.name.trim()) {
    frontendErrors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    frontendErrors.email = "Email is required";
  }

  if (!formData.phone.trim()) {
    frontendErrors.phone = "Phone is required";
  }

  if (!formData.password.trim()) {
    frontendErrors.password = "Password is required";
  }

  if (
    formData.password &&
    formData.password.length < 6
  ) {
    frontendErrors.password =
      "Password must contain at least 6 characters";
  }

  if (!formData.confirmPassword.trim()) {
    frontendErrors.confirmPassword =
      "Confirm password is required";
  }

  if (
    formData.password &&
    formData.confirmPassword &&
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
    return;
  }

  // ==========================================
  // BACKEND REQUEST
  // ==========================================

  try {
    setLoading(true);

    const registerData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    };

    const data = await register(registerData);

    console.log(
      "Registration successful:",
      data
    );

    if (onSignup) {
      onSignup(data);
    }

  }catch (error) {

  console.error(
    "Registration error:",
    error
  );

  console.error(
    "Backend response:",
    error.response?.data
  );

  // ==========================================
  // BACKEND VALIDATION / BUSINESS ERRORS
  // ==========================================

  if (
    error.response?.status === 400 ||
    error.response?.status === 409
  ) {

    const backendErrors =
      error.response.data;

    console.log(
      "Backend errors:",
      backendErrors
    );

    // Backend returned:
    //
    // {
    //   email: "Email is already registered"
    // }

    if (
      backendErrors &&
      typeof backendErrors === "object"
    ) {

      setErrors(backendErrors);

      setError("");
    }

    else {

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

}
};

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      {/* ERROR */}

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

      {/* NAME */}

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
            className="
              w-full
              h-12
              bg-[#080808]
              border
              border-white/10
              rounded-xl
              pl-11
              pr-4
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
            "
          />
        </div>
        {errors.name && (
  <p className="text-red-400 text-xs mt-2">
    {errors.name}
  </p>
)}
      </div>

      {/* EMAIL */}

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
            className="
              w-full
              h-12
              bg-[#080808]
              border
              border-white/10
              rounded-xl
              pl-11
              pr-4
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
            "
          />
        </div>
      {errors.email && (
  <p className="text-red-400 text-xs mt-2">
    {errors.email}
  </p>
)}
      </div>

      {/* PHONE */}

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
            className="
              w-full
              h-12
              bg-[#080808]
              border
              border-white/10
              rounded-xl
              pl-11
              pr-4
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
            "
          />
        </div>
        {errors.phone && (
  <p className="text-red-400 text-xs mt-2">
    {errors.phone}
  </p>
)}
      </div>

      {/* PASSWORD */}

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
  transition
  ${
    errors.password
      ? "border-red-500"
      : "border-white/10"
  }
  focus:border-yellow-400
`}
          />

          <button
            type="button"
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

      {/* CONFIRM PASSWORD */}

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
            className="
              w-full
              h-12
              bg-[#080808]
              border
              border-white/10
              rounded-xl
              pl-11
              pr-12
              outline-none
              text-white
              placeholder:text-gray-600
              focus:border-yellow-400
            "
          />

          <button
            type="button"
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

      {/* TERMS */}

      <div className="flex gap-2 pt-1">
        <input
          type="checkbox"
          required
          className="mt-1 accent-yellow-400"
        />

        <p className="text-xs text-gray-500 leading-relaxed">
          I agree to DrinkIt's{" "}
          <span className="text-yellow-400">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-yellow-400">
            Privacy Policy
          </span>
        </p>
      </div>

      {/* BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          py-3.5
          rounded-xl
          bg-yellow-400
          hover:bg-yellow-300
          disabled:opacity-60
          disabled:cursor-not-allowed
          text-black
          font-bold
          flex
          items-center
          justify-center
          gap-2
          transition
          mt-2
        "
      >
        {loading
          ? "CREATING ACCOUNT..."
          : "CREATE ACCOUNT"}

        {!loading && (
          <ArrowRight size={18} />
        )}
      </button>
    </form>
  );
};

export default SignupForm;