import React from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {

  const navigate = useNavigate();

  // ==========================================
  // LOGIN SUCCESS
  // ==========================================

  const handleLogin = (data) => {

    console.log(
      "Login successful:",
      data
    );

    /*
     * JWT is NOT stored here.
     *
     * Backend has already placed JWT
     * inside an HttpOnly cookie.
     */

    switch (data.role) {

      case "ADMIN":

        navigate("/admin");

        break;

      case "VENDOR":

        navigate("/vendor");

        break;

      case "DELIVERY_PARTNER":

        navigate("/delivery-partner");

        break;

      case "CUSTOMER":

        navigate("/");

        break;

      default:

        navigate("/");

        break;
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your DrinkIt journey"
      bottomText="Don't have an account?"
      bottomLinkText="Create Account"
      bottomLink="/signup"
    >

      <LoginForm
        onLogin={handleLogin}
      />

    </AuthLayout>
  );
};

export default Login;