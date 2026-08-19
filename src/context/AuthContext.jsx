import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginApi,
  registerApi,
  getCurrentUserApi,
  logoutApi,
} from "../api/authApi";

const AuthContext = createContext(null);

// ==========================================
// PROVIDER
// ==========================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // CHECK CURRENT LOGIN
  // ==========================================

  const checkAuth = async () => {
    try {
      setLoading(true);

      const currentUser =
        await getCurrentUserApi();

      setUser(currentUser);
    } catch (error) {
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

    const response =
      await loginApi(loginData);

    /*
     * Backend has already created the
     * HttpOnly JWT cookie.
     *
     * We DON'T store the token.
     */

    setUser(response);

    return response;
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (registerData) => {

    const response =
      await registerApi(registerData);

    return response;
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = async () => {

    try {

      await logoutApi();

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    } finally {

      setUser(null);

      window.dispatchEvent(
        new Event("authUpdated")
      );
    }
  };

  // ==========================================
  // AUTH STATE
  // ==========================================

  const isAuthenticated =
    Boolean(user);

  // ==========================================
  // CONTEXT
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

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};