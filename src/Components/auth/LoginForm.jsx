import React, { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const LoginForm = ({ onLogin }) => {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    console.log("Login Data:", formData);

    // Later:
    // POST /api/auth/login

    if (onLogin) {
      onLogin(formData);
    }

  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

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
            type={showPassword ? "text" : "password"}
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
              setShowPassword(!showPassword)
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


      {/* LOGIN BUTTON */}

      <button
        type="submit"
        className="
          w-full
          h-13
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
          shadow-lg
          shadow-yellow-400/10
        "
      >

        LOGIN

        <ArrowRight size={18} />

      </button>


      {/* SECURITY */}

      <p className="text-center text-[11px] text-gray-600 pt-2">
        Your account information is protected securely.
      </p>

    </form>
  );
};

export default LoginForm;