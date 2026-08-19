import React, { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const LoginForm = ({ onLogin }) => {
  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleSubmit = async (e) => {

  e.preventDefault();

  setError("");

  try {

    setLoading(true);

    const response =
      await login(formData);

    console.log(
      "Login successful:",
      response
    );

    if (onLogin) {
      onLogin(response);
    }

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    if (error.response) {

      setError(
        error.response.data?.message ||
        "Invalid email or password."
      );

    } else if (error.request) {

      setError(
        "Backend server is not responding."
      );

    } else {

      setError(
        "Something went wrong. Please try again."
      );
    }

  } finally {

    setLoading(false);

  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
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
              text-white
              outline-none
              placeholder:text-gray-600
              focus:border-yellow-400
              transition
            "
          />
        </div>
      </div>

      {/* PASSWORD */}

      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-300">
            Password
          </label>

          <button
            type="button"
            className="
              text-xs
              text-yellow-400
              hover:text-yellow-300
            "
          >
            Forgot Password?
          </button>
        </div>

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
            placeholder="Enter your password"
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
              text-white
              outline-none
              placeholder:text-gray-600
              focus:border-yellow-400
              transition
            "
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
              hover:text-white
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* REMEMBER */}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="remember"
          className="accent-yellow-400"
        />

        <label
          htmlFor="remember"
          className="text-sm text-gray-500"
        >
          Remember me
        </label>
      </div>

      {/* LOGIN */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          h-13
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
          shadow-lg
          shadow-yellow-400/10
        "
      >
        {loading
          ? "LOGGING IN..."
          : "LOGIN"}

        {!loading && (
          <ArrowRight size={18} />
        )}
      </button>

      <p className="text-center text-[11px] text-gray-600 pt-2">
        Your account information is protected securely.
      </p>
    </form>
  );
};

export default LoginForm;