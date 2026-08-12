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

const SignupForm = ({ onSignup }) => {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      alert("Passwords do not match");

      return;
    }


    console.log("Signup Data:", formData);

    // Later:
    // POST /api/auth/signup

    if (onSignup) {
      onSignup(formData);
    }

  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

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
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
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
              setShowPassword(!showPassword)
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


      {/* SIGNUP */}

      <button
        type="submit"
        className="
          w-full
          py-3.5
          rounded-xl
          bg-yellow-400
          hover:bg-yellow-300
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

        CREATE ACCOUNT

        <ArrowRight size={18} />

      </button>

    </form>
  );
};

export default SignupForm;