import React from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("Login:", data);

    // TEMPORARY LOGIN STATE
    const user = {
      name: "Sugam Kushwaha",
      email: data.email,
    };

    localStorage.setItem(
      "drinkit-user",
      JSON.stringify(user)
    );

    // Tell Navbar that login state changed
    window.dispatchEvent(
      new Event("authUpdated")
    );

    navigate("/");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your DrinkIt journey"
      bottomText="Don't have an account?"
      bottomLinkText="Create Account"
      bottomLink="/signup"
    >
      <LoginForm onLogin={handleLogin} />
    </AuthLayout>
  );
};

export default Login;