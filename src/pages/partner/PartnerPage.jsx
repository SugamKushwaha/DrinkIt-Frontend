import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Store,
  Bike,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const PartnerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-gray-900">

        {/* Background Glow */}

        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-yellow-400">
              <TrendingUp size={15} />
              Partner with DrinkIt
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Grow With{" "}
              <span className="text-yellow-400">
                DrinkIt
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Whether you own a store or want to earn by delivering orders,
              DrinkIt gives you the platform to grow, earn and serve customers.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          PARTNER OPTIONS
      ===================================================== */}

      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">

        <div className="mb-10 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Choose Your Path
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            How do you want to partner?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
            Select the option that matches what you want to do with DrinkIt.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* =================================================
              VENDOR
          ================================================= */}

          <div className="group rounded-3xl border border-gray-800 bg-[#080808] p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/50">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">
              <Store
                size={28}
                className="text-yellow-400"
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Become a Vendor
            </h3>

            <p className="mt-3 leading-7 text-gray-500">
              List your store and products on DrinkIt and reach customers
              looking for drinks and snacks around them.
            </p>

            <div className="mt-6 space-y-3">

              {[
                "Grow your customer reach",
                "Manage your products",
                "Receive and manage orders",
                "Track your store performance",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-yellow-400"
                  />

                  {item}
                </div>

              ))}

            </div>

            <button
              onClick={() =>
                navigate("/partner/vendor/register")
              }
              className="
                mt-8
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-yellow-400
                px-5
                text-sm
                font-bold
                text-black
                transition
                hover:bg-yellow-300
              "
            >
              REGISTER AS VENDOR
              <ArrowRight size={18} />
            </button>

          </div>

          {/* =================================================
              DELIVERY PARTNER
          ================================================= */}

          <div className="group rounded-3xl border border-gray-800 bg-[#080808] p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/50">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400/10">
              <Bike
                size={28}
                className="text-orange-400"
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Become a Delivery Partner
            </h3>

            <p className="mt-3 leading-7 text-gray-500">
              Deliver orders to DrinkIt customers and earn money with every
              successful delivery.
            </p>

            <div className="mt-6 space-y-3">

              {[
                "Flexible delivery opportunities",
                "Track your active deliveries",
                "Manage your delivery profile",
                "Track your earnings",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-orange-400"
                  />

                  {item}
                </div>

              ))}

            </div>

            <button
              onClick={() =>
                navigate("/partner/delivery/register")
              }
              className="
                mt-8
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-yellow-400
                px-5
                text-sm
                font-bold
                text-black
                transition
                hover:bg-yellow-300
              "
            >
              JOIN AS DELIVERY PARTNER
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="border-t border-gray-900 bg-[#050505]">

        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

            <div className="rounded-2xl border border-gray-900 bg-[#080808] p-6">

              <Clock3
                size={24}
                className="text-yellow-400"
              />

              <h3 className="mt-4 font-semibold">
                Simple Process
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Register with your details and get started with DrinkIt.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-900 bg-[#080808] p-6">

              <TrendingUp
                size={24}
                className="text-yellow-400"
              />

              <h3 className="mt-4 font-semibold">
                Grow With Us
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Build your business or increase your earning opportunities.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-900 bg-[#080808] p-6">

              <ShieldCheck
                size={24}
                className="text-yellow-400"
              />

              <h3 className="mt-4 font-semibold">
                Verified Partners
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Partner applications can be reviewed before account approval.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default PartnerPage;