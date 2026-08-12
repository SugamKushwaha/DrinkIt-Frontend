import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountSidebar from "../../components/account/AccountSidebar";
import ProfileCard from "../../components/account/ProfileCard";
import AccountStats from "../../components/account/AccountStats";
import AccountOverview from "../../components/account/AccountOverview";
import ReferBanner from "../../components/account/ReferBanner";

const AccountPage = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState("profile");

  // TEMPORARY USER DATA
  // Later this will come from Spring Boot API

  const user = {
    name: "Sugam Kushwaha",
    email: "sugam@example.com",
    phone: "+91 9876543210",
    joinedDate: "August 2024",
    verified: true,
    avatar: null,
  };

  const stats = {
    orders: 12,
    totalSpent: 24560,
    wishlist: 18,
    addresses: 3,
  };

  // =====================================================
  // SIDEBAR NAVIGATION
  // =====================================================

  const handleNavigation = (section) => {
    setActiveSection(section);

    // Later these can become actual routes
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

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("drinkit-user");
    localStorage.removeItem("drinkit-token");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-[1500px] mx-auto">

        <div className="flex">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <AccountSidebar
            activeSection={activeSection}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <main className="flex-1 min-w-0">

            <div className="px-5 py-8 md:px-8 lg:px-10">

              {/* HEADER */}

              <div className="mb-7">

                <h1 className="text-3xl md:text-4xl font-semibold">
                  Profile Information
                </h1>

                <p className="text-gray-500 mt-2">
                  Manage your personal details and account settings
                </p>

              </div>

              {/* PROFILE */}

              <ProfileCard user={user} />

              {/* STATS */}

              <div className="mt-5">
                <AccountStats stats={stats} />
              </div>

              {/* OVERVIEW */}

              <div className="mt-8">

                <AccountOverview
                  onNavigate={handleNavigation}
                />

              </div>

              {/* REFER */}

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