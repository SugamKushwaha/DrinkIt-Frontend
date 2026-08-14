import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowLeft,
  Store,
  Search,
  Mail,
  FileText,
  Bike,
} from "lucide-react";

const ApplicationStatus = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [application, setApplication] = useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // CHECK APPLICATION STATUS
  // =====================================================

  const handleCheckStatus = (e) => {
    e.preventDefault();

    setError("");
    setApplication(null);

    const enteredEmail = email.trim().toLowerCase();

    if (!enteredEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const storedApplication = localStorage.getItem(
        "drinkit-partner-application"
      );

      if (!storedApplication) {
        setError(
          "No application found. Please submit a partner application first."
        );
        return;
      }

      const applicationData =
        JSON.parse(storedApplication);

      const applicationEmail = String(
        applicationData.email || ""
      )
        .trim()
        .toLowerCase();

      if (applicationEmail !== enteredEmail) {
        setError(
          "No application found for this email address."
        );
        return;
      }

      // Application found
      setApplication(applicationData);

    } catch (err) {
      console.error(
        "Error checking application:",
        err
      );

      setError(
        "Something went wrong while checking your application."
      );
    }
  };

  // =====================================================
  // STATUS CONFIG
  // =====================================================

  const getStatusConfig = (status) => {

    switch (status) {

      case "APPROVED":

        return {
          title: "Application Approved!",
          description:
            "Congratulations! Your DrinkIt partner application has been approved.",
          icon: CheckCircle2,
          iconClass: "text-green-400",
          bgClass: "bg-green-400/10",
          statusText: "Approved",
        };

      case "REJECTED":

        return {
          title: "Application Rejected",
          description:
            application?.rejectionReason ||
            "Unfortunately, your application was not approved.",
          icon: XCircle,
          iconClass: "text-red-400",
          bgClass: "bg-red-400/10",
          statusText: "Rejected",
        };

      default:

        return {
          title: "Application Under Review",
          description:
            "Your application has been successfully submitted. Our team is reviewing your details.",
          icon: Clock3,
          iconClass: "text-yellow-400",
          bgClass: "bg-yellow-400/10",
          statusText: "Pending Review",
        };
    }
  };

  // =====================================================
  // RESET SEARCH
  // =====================================================

  const handleSearchAgain = () => {
    setApplication(null);
    setEmail("");
    setError("");
  };

  // =====================================================
  // EMAIL SEARCH SCREEN
  // =====================================================

  if (!application) {

    return (
      <div className="
        min-h-screen
        bg-black
        px-4
        py-10
        text-white
        sm:px-6
      ">

        <div className="mx-auto max-w-xl">

          {/* BACK */}

          <button
            onClick={() => navigate("/partner")}
            className="
              mb-8
              flex
              items-center
              gap-2
              text-sm
              text-gray-400
              transition
              hover:text-white
            "
          >
            <ArrowLeft size={18} />
            Back to Partner Page
          </button>

          {/* CARD */}

          <div className="
            rounded-3xl
            border
            border-gray-800
            bg-[#080808]
            p-6
            sm:p-10
          ">

            {/* ICON */}

            <div className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-yellow-400/10
            ">

              <FileText
                size={30}
                className="text-yellow-400"
              />

            </div>

            {/* HEADER */}

            <div className="mt-6 text-center">

              <p className="
                text-xs
                uppercase
                tracking-wider
                text-gray-500
              ">
                DrinkIt Partner
              </p>

              <h1 className="
                mt-2
                text-3xl
                font-semibold
              ">
                Check Application Status
              </h1>

              <p className="
                mx-auto
                mt-3
                max-w-md
                text-sm
                leading-6
                text-gray-500
              ">
                Enter the email address you used when
                submitting your partner application.
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleCheckStatus}
              className="mt-8"
            >

              <label className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-300
              ">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-gray-800
                    bg-[#111]
                    pl-11
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-gray-600
                    focus:border-yellow-400
                  "
                />

              </div>

              {/* ERROR */}

              {error && (
                <div className="
                  mt-4
                  rounded-xl
                  border
                  border-red-400/20
                  bg-red-400/5
                  p-4
                  text-sm
                  text-red-400
                ">
                  {error}
                </div>
              )}

              {/* BUTTON */}

              <button
                type="submit"
                className="
                  mt-5
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-yellow-400
                  text-sm
                  font-bold
                  text-black
                  transition
                  hover:bg-yellow-300
                "
              >
                <Search size={18} />

                CHECK STATUS
              </button>

            </form>

            {/* REGISTER */}

            <div className="
              mt-8
              border-t
              border-gray-800
              pt-6
              text-center
            ">

              <p className="text-sm text-gray-500">
                Haven't applied yet?
              </p>

              <button
                onClick={() =>
                  navigate("/partner/delivery-registration")
                }
                className="
                  mt-2
                  text-sm
                  font-semibold
                  text-yellow-400
                  hover:text-yellow-300
                "
              >
                Become a Delivery Partner
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // APPLICATION FOUND
  // =====================================================

  const config = getStatusConfig(
    application.status
  );

  const StatusIcon = config.icon;

  // =====================================================
  // STATUS PAGE
  // =====================================================

  return (
    <div className="
      min-h-screen
      bg-black
      px-4
      py-10
      text-white
      sm:px-6
    ">

      <div className="mx-auto max-w-4xl">

        {/* BACK */}

        <button
          onClick={handleSearchAgain}
          className="
            mb-8
            flex
            items-center
            gap-2
            text-sm
            text-gray-400
            transition
            hover:text-white
          "
        >
          <ArrowLeft size={18} />
          Check Another Email
        </button>

        {/* HEADER */}

        <div className="mb-8">

          <p className="
            text-xs
            uppercase
            tracking-wider
            text-gray-500
          ">
            DrinkIt Partner
          </p>

          <h1 className="
            mt-2
            text-3xl
            font-semibold
            sm:text-4xl
          ">
            Application Status
          </h1>

        </div>

        {/* STATUS CARD */}

        <div className="
          overflow-hidden
          rounded-3xl
          border
          border-gray-800
          bg-[#080808]
        ">

          {/* STATUS */}

          <div className="
            p-8
            text-center
            sm:p-12
          ">

            <div className={`
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              ${config.bgClass}
            `}>

              <StatusIcon
                size={42}
                className={config.iconClass}
              />

            </div>

            <h2 className="
              mt-6
              text-2xl
              font-semibold
            ">
              {config.title}
            </h2>

            <p className="
              mx-auto
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-gray-500
            ">
              {config.description}
            </p>

            <div className="
              mt-7
              flex
              justify-center
            ">

              <span className={`
                rounded-full
                px-5
                py-2
                text-sm
                font-semibold
                ${config.bgClass}
                ${config.iconClass}
              `}>
                {config.statusText}
              </span>

            </div>

          </div>

          {/* DETAILS */}

          <div className="
            border-t
            border-gray-800
            p-6
            sm:p-8
          ">

            <h3 className="
              mb-5
              font-semibold
            ">
              Application Details
            </h3>

            <div className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            ">

              <Detail
                label="Application ID"
                value={application.applicationId}
              />

              <Detail
                label="Partner Type"
                value="Delivery Partner"
              />

              <Detail
                label="Name"
                value={application.name}
              />

              <Detail
                label="Email"
                value={application.email}
              />

              <Detail
                label="Phone"
                value={application.phone}
              />

              <Detail
                label="Vehicle"
                value={
                  application.vehicleType
                }
              />

              <Detail
                label="Vehicle Number"
                value={
                  application.vehicleNumber
                }
              />

              <Detail
                label="Submitted On"
                value={
                  application.submittedAt
                    ? new Date(
                        application.submittedAt
                      ).toLocaleString("en-IN")
                    : "Recently"
                }
              />

            </div>

          </div>

        </div>

        {/* =================================================
            APPROVED
        ================================================= */}

        {application.status === "APPROVED" && (

          <div className="
            mt-6
            rounded-2xl
            border
            border-green-400/20
            bg-green-400/5
            p-6
          ">

            <div className="
              flex
              items-start
              gap-4
            ">

              <CheckCircle2
                size={22}
                className="
                  mt-1
                  text-green-400
                "
              />

              <div>

                <h3 className="
                  font-semibold
                  text-green-400
                ">
                  Welcome to DrinkIt!
                </h3>

                <p className="
                  mt-2
                  text-sm
                  leading-6
                  text-gray-400
                ">
                  Your delivery partner account has
                  been approved.
                </p>

                <button
                  onClick={() =>
                    navigate("/delivery")
                  }
                  className="
                    mt-5
                    rounded-xl
                    bg-green-400
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-black
                    hover:bg-green-300
                  "
                >
                  GO TO DELIVERY DASHBOARD
                </button>

              </div>

            </div>

          </div>

        )}

        {/* =================================================
            PENDING
        ================================================= */}

        {application.status === "PENDING" && (

          <div className="
            mt-6
            rounded-2xl
            border
            border-yellow-400/20
            bg-yellow-400/5
            p-6
          ">

            <div className="
              flex
              items-start
              gap-4
            ">

              <Clock3
                size={22}
                className="
                  mt-1
                  text-yellow-400
                "
              />

              <div>

                <h3 className="
                  font-semibold
                  text-yellow-400
                ">
                  What happens next?
                </h3>

                <p className="
                  mt-2
                  text-sm
                  leading-6
                  text-gray-500
                ">
                  Our team is reviewing your application.
                  Please check again later for an update.
                </p>

              </div>

            </div>

          </div>

        )}

        {/* =================================================
            REJECTED
        ================================================= */}

        {application.status === "REJECTED" && (

          <div className="
            mt-6
            rounded-2xl
            border
            border-red-400/20
            bg-red-400/5
            p-6
          ">

            <div className="
              flex
              items-start
              gap-4
            ">

              <XCircle
                size={22}
                className="
                  mt-1
                  text-red-400
                "
              />

              <div>

                <h3 className="
                  font-semibold
                  text-red-400
                ">
                  Application Not Approved
                </h3>

                <p className="
                  mt-2
                  text-sm
                  text-gray-500
                ">
                  {application.rejectionReason ||
                    "You can submit a new application if you wish."}
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/partner/delivery-registration"
                    )
                  }
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-gray-700
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-gray-300
                    hover:border-yellow-400
                    hover:text-yellow-400
                  "
                >
                  SUBMIT NEW APPLICATION
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

// =====================================================
// DETAIL COMPONENT
// =====================================================

const Detail = ({ label, value }) => {

  return (
    <div className="
      rounded-xl
      bg-[#111]
      p-4
    ">

      <p className="
        text-xs
        text-gray-500
      ">
        {label}
      </p>

      <p className="
        mt-2
        break-words
        text-sm
        font-medium
        text-gray-200
      ">
        {value || "Not available"}
      </p>

    </div>
  );
};

export default ApplicationStatus;