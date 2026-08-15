import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import navLogo from "../../assets/logos/navLogo.png";
import googlePlay from "../../assets/images/google-play.png";
import appStore from "../../assets/images/app-store.jpg";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 text-white">

      <div className="max-w-7xl ml-20 px-1 py-5 grid grid-cols-5 gap-10">

        {/* ================= LOGO ================= */}

        <div>

          <div className="flex items-center gap-3">

            <img
              src={navLogo}
              alt="DrinkIt"
              className="w-10 h-10"
            />

            <h2 className="text-3xl font-bold">
              DRINK
              <span className="text-yellow-500">IT</span>
            </h2>

          </div>

          <p className="text-gray-400 mt-5 text-sm leading-6">
            Your one stop destination for
            drinks, snacks & party essentials.
          </p>

          {/* SOCIAL */}

          <div className="flex gap-3 mt-6">

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-yellow-500 hover:text-black duration-300"
            >
              <FaFacebookF size={22} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-yellow-500 hover:text-black duration-300"
            >
              <FaInstagram size={22} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-yellow-500 hover:text-black duration-300"
            >
              <FaTwitter size={22} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-yellow-500 hover:text-black duration-300"
            >
              <FaYoutube size={22} />
            </a>

          </div>

        </div>

        {/* ================= SHOP ================= */}

        <div>

          <h3 className="font-semibold text-yellow-500 mb-4">
            SHOP
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">

            <li>
              <Link
                to="/shop"
                className="hover:text-yellow-400 duration-200"
              >
                All Drinks
              </Link>
            </li>

            <li>
              <Link
                to="/shop?category=whisky"
                className="hover:text-yellow-400 duration-200"
              >
                All Whisky
              </Link>
            </li>

            <li>
              <Link
                to="/shop?category=snacks"
                className="hover:text-yellow-400 duration-200"
              >
                Party Essentials
              </Link>
            </li>

            <li>
              <Link
                to="/shop?filter=offers"
                className="hover:text-yellow-400 duration-200"
              >
                Offers
              </Link>
            </li>

            <li>
              <Link
                to="/shop?filter=new"
                className="hover:text-yellow-400 duration-200"
              >
                New Arrivals
              </Link>
            </li>

          </ul>

        </div>

        {/* ================= HELP ================= */}

        <div>

          <h3 className="font-semibold text-yellow-500 mb-4">
            HELP
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">

            <li>
              <Link
                to="/about"
                className="hover:text-yellow-400 duration-200"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 duration-200"
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/faq"
                className="hover:text-yellow-400 duration-200"
              >
                FAQs
              </Link>
            </li>

            <li>
              <Link
                to="/delivery-info"
                className="hover:text-yellow-400 duration-200"
              >
                Delivery Info
              </Link>
            </li>

            <li>
              <Link
                to="/returns"
                className="hover:text-yellow-400 duration-200"
              >
                Returns & Refunds
              </Link>
            </li>

          </ul>

        </div>

        {/* ================= LEGAL ================= */}

        <div>

          <h3 className="font-semibold text-yellow-500 mb-4">
            LEGAL
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">

            <li>
              <Link
                to="/terms"
                className="hover:text-yellow-400 duration-200"
              >
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link
                to="/privacy"
                className="hover:text-yellow-400 duration-200"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                to="/alcohol-policy"
                className="hover:text-yellow-400 duration-200"
              >
                Alcohol Policy
              </Link>
            </li>

            <li>
              <Link
                to="/cookie-policy"
                className="hover:text-yellow-400 duration-200"
              >
                Cookie Policy
              </Link>
            </li>

            {/* ⭐ PARTNER */}

            <li>
              <Link
                to="/partner"
                className="font-semibold text-yellow-400 hover:text-yellow-300 duration-200"
              >
                Become Partner
              </Link>
            </li>

          </ul>

        </div>

        {/* ================= APP ================= */}

        <div>

          <h3 className="font-semibold text-yellow-500 mb-4">
            DOWNLOAD OUR APP
          </h3>

          <p className="text-gray-400 text-sm mb-5">
            Get the DrinkIt app now.
          </p>

          <div className="space-y-3 flex gap-3">

            <img
              src={googlePlay}
              alt="Google Play"
              className="w-34 cursor-pointer"
            />

            <img
              src={appStore}
              alt="App Store"
              className="w-54 h-7 cursor-pointer mt-6 border rounded-xl border-gray-500 "
            />

          </div>

        </div>

      </div>

      {/* ================= BOTTOM ================= */}

      <div className="border-t border-zinc-800 py-5 text-center text-gray-500 text-sm">
        © 2026 DrinkIt. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;