import React from 'react'
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
// } from "lucide-react";
import { FaFacebook, FaFacebookF, FaInstagram, FaInstagramSquare, FaTwitter, FaTwitterSquare, FaYoutube } from "react-icons/fa";

import navLogo from "../../assets/logos/navLogo.png";
import googlePlay from "../../assets/images/google-play.png";
import appStore from "../../assets/images/app-store.png";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 text-white">

      <div className="max-w-7xl ml-20 px-1 py-5 grid grid-cols-5 gap-10"> 

        {/* Logo Section */}
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

        {/* Shop */}

        <div>
          <h3 className="font-semibold text-yellow-500 mb-4">
            SHOP
          </h3>

          <ul className="space-y-1  text-sm text-gray-400">

            <li><a href="#">All Drinks</a></li>
            <li><a href="#">All Whisky</a></li>
            <li><a href="#">Party Essentials</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">New Arrivals</a></li>

          </ul>
        </div>

        {/* Help */}

        <div>

          <h3 className="font-semibold text-yellow-500 mb-4">
            HELP
          </h3>

          <ul className=" text-sm text-gray-400">

            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Delivery Info</a></li>
            <li><a href="#">Returns & Refunds</a></li>

          </ul>

        </div>

        {/* Legal */}

        <div>

          <h3 className="font-semibold text-yellow-500 mb-4">
            LEGAL
          </h3>

          <ul className="text-sm text-gray-400">

            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Alcohol Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>

          </ul>

        </div>

        {/* App */}

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
              className="w-34 cursor-pointer"
            />

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-zinc-800 py-5 text-center text-gray-500 text-sm">

        © 2026 DrinkIt. All rights reserved.

      </div>

    </footer>
  )
}

export default Footer
