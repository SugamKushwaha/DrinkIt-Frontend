import React from 'react'
import { Search, MapPin, User, ShoppingCart, ChevronDown } from "lucide-react";
import navLogo from "../../assets/logos/navLogo.png";

const Navbar = () => {
  return (
       <nav className="bg-black border-b border-neutral-800 h-20 flex items-center justify-between px-8">

      {/* Left Section */}
      <div className="flex items-center gap-8">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={navLogo}
            alt="DrinkIt"
            className="w-10 h-13"
          />

          <h1 className="border-yellow-300   text-white text-3xl font-bold tracking-wide ">
            DRINK<span className='text-yellow-500'>IT</span>
          </h1>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 cursor-pointer">
          <MapPin className="text-yellow-400" size={18} />

          <div className="leading-4">
            <p className="text-gray-400 text-[10px]">
              Deliver to
            </p>

            <div className="flex items-center">
              <span className="text-white text-sm">
                Mumbai, 400001
              </span>

              <ChevronDown
                size={15}
                className="text-white ml-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="w-[480px] relative">

        <Search
          className="absolute left-110 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search for drinks, snacks & more..."
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-5 pr-4 py-2 text-white outline-none focus:border-yellow-600"
        />
      </div>

      {/* Right Section */}

      <div className="flex items-center gap-8">

        <button className="flex items-center gap-2 text-white hover:text-yellow-400 transition">
          <User size={18} />
          Login / Signup
        </button>

        <button className="relative flex items-center gap-2 text-white hover:text-yellow-600 transition">
          <ShoppingCart size={20} />

          Cart

          <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            3
          </span>
        </button>

      </div>

    </nav>
     
  )
}

export default Navbar
