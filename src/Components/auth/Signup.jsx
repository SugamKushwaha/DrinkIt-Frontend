import React from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import SignupForm from "../../components/auth/SignupForm";

const Signup = () => {
  const navigate = useNavigate();

  // ==========================================
  // SignupForm already calls register() itself
  // and only invokes onSignup on success. The
  // previous version called register() a SECOND
  // time here, passing in the auth RESPONSE
  // object (no phone/password fields) as if it
  // were the form data. That crashed with a
  // TypeError and showed "Registration failed"
  // even though the account had already been
  // created by the first (successful) call.
  // ==========================================

  const handleSignup = (response) => {
    console.log("REGISTRATION SUCCESS:", response);

    navigate("/login", {
      state: {
        message:
          "Account created successfully. Please login.",
      },
    });
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