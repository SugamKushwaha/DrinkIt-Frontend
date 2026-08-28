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
  // CHECK AUTH
  // ==========================================

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();

      console.log("CURRENT USER:", currentUser);

      setUser(currentUser);

    } catch (error) {
      console.log(
        "No authenticated user"
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
    const response = await loginUser(loginData);

    console.log(
      "LOGIN RESPONSE:",
      response
    );

    // Cookie is automatically stored
    // by browser.

    await checkAuth();

    return response;
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (registerData) => {
    const response =
      await registerUser(registerData);

    console.log(
      "REGISTER RESPONSE:",
      response
    );

    return response;
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
        error.response?.data ||
        error.message
      );
    } finally {
      setUser(null);
    }
  };

  // ==========================================
  // AUTH STATE
  // ==========================================

  const isAuthenticated =
    Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
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