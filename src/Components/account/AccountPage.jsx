import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import AccountSidebar from "./AccountSidebar";
import ProfileCard from "./ProfileCard";
import AccountStats from "./AccountStats";
import AccountOverview from "./AccountOverview";
import ReferBanner from "./ReferBanner";

const AccountPage = () => {

  const navigate = useNavigate();

  const {
    user,
    loading,
    logout,
  } = useAuth();

  const [activeSection, setActiveSection] =
    useState("profile");

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">
        <p className="text-yellow-400">
          Loading profile...
        </p>
      </div>
    );

  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!user) {

    return (
      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">

        <div className="text-center">

          <p className="
            text-gray-400
            mb-4
          ">
            Please login to view your account.
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              bg-yellow-400
              text-black
              px-6 py-3
              rounded-lg
              font-semibold
            "
          >
            LOGIN
          </button>

        </div>

      </div>
    );

  }

  // ==========================================
  // STATS
  // ==========================================

  const stats = {
    orders: 12,
    totalSpent: 24560,
    wishlist: 18,
    addresses: 3,
  };

  // ==========================================
  // NAVIGATION
  // ==========================================

  const handleNavigation = (section) => {

    setActiveSection(section);

    switch (section) {

      case "orders":
        navigate("/orders");
        break;

      case "wishlist":
        navigate("/wishlist");
        break;

      case "addresses":
        navigate("/account/addresses");
        break;

      default:
        break;

    }

  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {

    await logout();

    navigate("/login", {
      replace: true,
    });

  };

  return (
    <div className="
      min-h-screen
      bg-black
      text-white
    ">

      <div className="
        max-w-[1500px]
        mx-auto
      ">

        <div className="flex">

          <AccountSidebar
            activeSection={activeSection}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />

          <main className="
            flex-1
            min-w-0
          ">

            <div className="
              px-5
              py-8
              md:px-8
              lg:px-10
            ">

              <div className="mb-7">

                <h1 className="
                  text-3xl
                  md:text-4xl
                  font-semibold
                ">
                  Profile Information
                </h1>

                <p className="
                  text-gray-500
                  mt-2
                ">
                  Manage your personal details
                  and account settings
                </p>

              </div>

              <ProfileCard user={user} />

              <div className="mt-5">
                <AccountStats
                  stats={stats}
                />
              </div>

              <div className="mt-8">

                <AccountOverview
                  onNavigate={
                    handleNavigation
                  }
                />

              </div>

              <div className="mt-6">

                <ReferBanner />

              </div>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
};

export default AccountPage;