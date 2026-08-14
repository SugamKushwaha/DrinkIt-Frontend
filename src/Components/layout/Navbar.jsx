import React, { useEffect, useState } from "react";

import {
  Search,
  MapPin,
  User,
  ShoppingCart,
  ChevronDown,
  Heart,
  LogOut,
  UserCircle,
} from "lucide-react";

import navLogo from "../../assets/logos/navLogo.png";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  getCartCount,
} from "../../utils/cartUtils";

const Navbar = () => {

  const navigate = useNavigate();

  // =====================================================
  // CART
  // =====================================================

  const [cartCount, setCartCount] = useState(
    getCartCount()
  );

  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(null);


  // =====================================================
  // LOAD USER
  // =====================================================

  const loadUser = () => {

    try {

      const storedUser =
        localStorage.getItem("drinkit-user");

      if (storedUser) {

        setUser(
          JSON.parse(storedUser)
        );

      } else {

        setUser(null);

      }

    } catch (error) {

      console.error(
        "Failed to load user",
        error
      );

      setUser(null);
    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadUser();

  }, []);


  // =====================================================
  // LISTEN FOR AUTH CHANGES
  // =====================================================

  useEffect(() => {

    const handleAuthUpdate = () => {

      loadUser();

    };

    window.addEventListener(
      "authUpdated",
      handleAuthUpdate
    );

    return () => {

      window.removeEventListener(
        "authUpdated",
        handleAuthUpdate
      );

    };

  }, []);


  // =====================================================
  // CART UPDATE
  // =====================================================

  useEffect(() => {

    const updateCartCount = () => {

      setCartCount(
        getCartCount()
      );

    };

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

    };

  }, []);


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "drinkit-user"
    );

    window.dispatchEvent(
      new Event("authUpdated")
    );

    navigate("/");

  };


  return (

    <nav
      className="
        bg-black
        border-b
        border-neutral-800
        h-20
        flex
        items-center
        justify-between
        px-8
        sticky
        
      "
    >

      {/* =================================================
          LEFT
      ================================================= */}

      <div className="flex items-center gap-8">

        {/* LOGO */}

        <Link
          to="/"
          className="
            flex
            items-center
            gap-2
          "
        >

          <img
            src={navLogo}
            alt="DrinkIt"
            className="w-10 h-13"
          />

          <h1
            className="
              text-white
              text-3xl
              font-bold
              tracking-wide
            "
          >

            DRINK

            <span className="text-yellow-500">
              IT
            </span>

          </h1>

        </Link>


        {/* LOCATION */}

        <div
          className="
            flex
            items-center
            gap-2
            cursor-pointer
          "
        >

          <MapPin
            className="text-yellow-400"
            size={18}
          />

          <div className="leading-4">

            <p
              className="
                text-gray-400
                text-[10px]
              "
            >
              Deliver to
            </p>

            <div className="flex items-center">

              <span
                className="
                  text-white
                  text-sm
                "
              >
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


      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="w-[480px] relative">

        <Search
          className="
            absolute
            right-4
            top-3
            text-gray-400
          "
          size={18}
        />

        <input
          type="text"
          placeholder="Search for drinks, snacks & more..."
          className="
            w-full
            bg-neutral-900
            border
            border-neutral-700
            rounded-lg
            pl-5
            pr-12
            py-2
            text-white
            outline-none
            focus:border-yellow-600
          "
        />

      </div>


      {/* =================================================
          RIGHT
      ================================================= */}

      <div
        className="
          flex
          items-center
          gap-8
        "
      >

        {/* =================================================
            AUTH
        ================================================= */}

        {!user ? (

          /* LOGIN / SIGNUP */

          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              flex
              items-center
              gap-2
              text-white
              hover:text-yellow-400
              transition
            "
          >

            <User size={18} />

            Login / Signup

          </button>

        ) : (

          /* PROFILE */

          <button
            onClick={() =>
              navigate("/profile")
            }
            title={user.name}
            className="
              flex
              items-center
              gap-2
              text-white
              hover:text-yellow-400
              transition
              cursor-pointer
            "
          >

            <UserCircle
              size={26}
              className="text-yellow-400"
            />

            <span className="hidden lg:block">
              {user.name?.split(" ")[0]}
            </span>

          </button>

        )}


        {/* =================================================
            WISHLIST
        ================================================= */}

        <button
          onClick={() =>
            navigate("/wishlist")
          }
          className="
            flex
            items-center
            gap-2
            text-white
            hover:text-yellow-400
            transition
            cursor-pointer
          "
        >

          <Heart size={18} />

        </button>


        {/* =================================================
            CART
        ================================================= */}

        <button
          onClick={() =>
            navigate("/cart")
          }
          className="
            relative
            flex
            items-center
            gap-2
            text-white
            hover:text-yellow-600
            transition
            cursor-pointer
          "
        >

          <ShoppingCart size={20} />

          Cart


          {/* CART COUNT */}

          {cartCount > 0 && (

            <span
              className="
                absolute
                -top-2
                -right-3
                bg-yellow-400
                text-black
                text-xs
                rounded-full
                w-5
                h-5
                flex
                items-center
                justify-center
                font-bold
              "
            >

              {cartCount}

            </span>

          )}

        </button>

      </div>

    </nav>
  );
};

export default Navbar;