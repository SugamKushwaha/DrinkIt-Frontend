import React from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";

import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const handleSignup = async (data) => {
    try {
      console.log("REGISTER DATA:", data);

      const response = await register(data);

      console.log("REGISTRATION SUCCESS:", response);

      navigate("/login", {
        state: {
          message:
            "Account created successfully. Please login.",
        },
      });

    } catch (error) {
      console.error(
        "REGISTRATION ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join DrinkIt and enjoy a better way to shop"
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLink="/login"
    >
      <SignupForm
        onSignup={handleSignup}
      />
    </AuthLayout>
  );
};

export default Signup;