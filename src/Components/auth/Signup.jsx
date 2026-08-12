import React from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (data) => {
    console.log("Signup:", data);

    // TEMPORARY
    // Backend API will be connected later.

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join DrinkIt and enjoy a better way to shop"
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLink="/login"
    >
      <SignupForm onSignup={handleSignup} />
    </AuthLayout>
  );
};

export default Signup;