import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CHECK AUTHENTICATION
  // ==========================================

  const checkAuth = async () => {

    try {

      setLoading(true);

      const currentUser = await getCurrentUser();

      console.log("CURRENT USER:", currentUser);

      setUser(currentUser);

    } catch (error) {

      console.error(
        "Authentication check failed:",
        error.response?.data || error.message
      );

      setUser(null);

    } finally {

      setLoading(false);

    }
  };

  // ==========================================
  // INITIAL AUTH CHECK
  // ==========================================

  useEffect(() => {

    checkAuth();

  }, []);

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (loginData) => {

    try {

      const response = await loginUser(loginData);

      console.log("LOGIN RESPONSE:", response);

      /*
       * Backend creates HttpOnly JWT cookie.
       *
       * We do NOT store JWT in localStorage.
       */

      await checkAuth();

      return response;

    } catch (error) {

      console.error(
        "Login failed:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (registerData) => {

    try {

      const response =
        await registerUser(registerData);

      return response;

    } catch (error) {

      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = async () => {

    try {

      await logoutUser();

    } catch (error) {

      console.error(
        "Logout error:",
        error.response?.data || error.message
      );

    } finally {

      setUser(null);
    }
  };

  // ==========================================
  // AUTH STATE
  // ==========================================

  const isAuthenticated = Boolean(user);

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    user,
    loading,
    isAuthenticated,

    login,
    register,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// HOOK
// ==========================================

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};