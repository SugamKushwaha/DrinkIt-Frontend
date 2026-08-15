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
  Menu,
  X,
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
  // MOBILE MENU
  // =====================================================

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  // =====================================================
  // LOAD USER
  // =====================================================

  const loadUser = () => {
    try {
      const storedUser =
        localStorage.getItem("drinkit-user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
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
      setCartCount(getCartCount());
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
  // CLOSE MOBILE MENU ON RESIZE
  // =====================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

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

    setMobileMenuOpen(false);

    navigate("/");
  };

  // =====================================================
  // CART
  // =====================================================

  const handleCart = () => {
    navigate("/cart");
    setMobileMenuOpen(false);
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const handleWishlist = () => {
    navigate("/wishlist");
    setMobileMenuOpen(false);
  };

  // =====================================================
  // PROFILE
  // =====================================================

  const handleProfile = () => {
    navigate("/profile");
    setMobileMenuOpen(false);
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-neutral-800
        bg-black
      "
    >

      {/* =================================================
          MAIN NAVBAR
      ================================================= */}

      <div
        className="
          flex
          h-20
          w-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            LEFT SECTION
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-4
            lg:gap-8
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="
              flex
              shrink-0
              items-center
              gap-2
            "
          >

            <img
              src={navLogo}
              alt="DrinkIt"
              className="
                h-12
                w-9
                object-contain
                sm:h-13
                sm:w-10
              "
            />

            <h1
              className="
                hidden
                text-2xl
                font-bold
                tracking-wide
                text-white
                sm:block
                lg:text-3xl
              "
            >
              DRINK
              <span className="text-yellow-500">
                IT
              </span>
            </h1>

          </Link>


          {/* =================================================
              LOCATION
          ================================================= */}

          <div
            className="
              hidden
              cursor-pointer
              items-center
              gap-2
              xl:flex
            "
          >

            <MapPin
              className="text-yellow-400"
              size={18}
            />

            <div className="leading-4">

              <p
                className="
                  text-[10px]
                  text-gray-400
                "
              >
                Deliver to
              </p>

              <div
                className="
                  flex
                  items-center
                "
              >

                <span
                  className="
                    text-sm
                    text-white
                  "
                >
                  Mumbai, 400001
                </span>

                <ChevronDown
                  size={15}
                  className="
                    ml-1
                    text-white
                  "
                />

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            DESKTOP SEARCH
        ================================================= */}

        <div
          className="
            mx-4
            hidden
            max-w-[480px]
            flex-1
            lg:block
            xl:mx-8
          "
        >

          <div className="relative">

            <Search
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
              size={18}
            />

            <input
              type="text"
              placeholder="
                Search for drinks, snacks & more...
              "
              className="
                h-11
                w-full
                rounded-lg
                border
                border-neutral-700
                bg-neutral-900
                pl-5
                pr-12
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-gray-500
                focus:border-yellow-600
              "
            />

          </div>

        </div>


        {/* =================================================
            DESKTOP RIGHT
        ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-5
            lg:flex
            xl:gap-8
          "
        >

          {/* =================================================
              AUTH
          ================================================= */}

          {!user ? (

            <button
              onClick={handleLogin}
              className="
                flex
                items-center
                gap-2
                whitespace-nowrap
                text-white
                transition
                hover:text-yellow-400
              "
            >

              <User size={18} />

              <span>
                Login / Signup
              </span>

            </button>

          ) : (

            <button
              onClick={handleProfile}
              title={user.name}
              className="
                flex
                cursor-pointer
                items-center
                gap-2
                text-white
                transition
                hover:text-yellow-400
              "
            >

              <UserCircle
                size={26}
                className="text-yellow-400"
              />

              <span className="hidden xl:block">
                {user.name?.split(" ")[0]}
              </span>

            </button>

          )}


          {/* =================================================
              WISHLIST
          ================================================= */}

          <button
            onClick={handleWishlist}
            aria-label="Wishlist"
            className="
              flex
              cursor-pointer
              items-center
              text-white
              transition
              hover:text-yellow-400
            "
          >

            <Heart size={19} />

          </button>


          {/* =================================================
              CART
          ================================================= */}

          <button
            onClick={handleCart}
            className="
              relative
              flex
              cursor-pointer
              items-center
              gap-2
              text-white
              transition
              hover:text-yellow-400
            "
          >

            <ShoppingCart size={20} />

            <span>
              Cart
            </span>

            {/* CART COUNT */}

            {cartCount > 0 && (

              <span
                className="
                  absolute
                  -right-3
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-yellow-400
                  text-xs
                  font-bold
                  text-black
                "
              >
                {cartCount}
              </span>

            )}

          </button>

        </div>


        {/* =================================================
            MOBILE RIGHT
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
            lg:hidden
          "
        >

          {/* MOBILE CART */}

          <button
            onClick={handleCart}
            aria-label="Cart"
            className="
              relative
              flex
              items-center
              justify-center
              text-white
              transition
              hover:text-yellow-400
            "
          >

            <ShoppingCart size={22} />

            {cartCount > 0 && (

              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-yellow-400
                  text-[10px]
                  font-bold
                  text-black
                "
              >
                {cartCount}
              </span>

            )}

          </button>


          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            aria-label="Toggle menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-neutral-800
              text-white
              transition
              hover:border-yellow-400
              hover:text-yellow-400
            "
          >

            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}

          </button>

        </div>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileMenuOpen && (

        <div
          className="
            border-t
            border-neutral-800
            bg-[#080808]
            px-4
            py-5
            lg:hidden
          "
        >

          {/* =================================================
              MOBILE SEARCH
          ================================================= */}

          <div className="relative">

            <Search
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
              size={18}
            />

            <input
              type="text"
              placeholder="
                Search for drinks, snacks & more...
              "
              className="
                h-11
                w-full
                rounded-xl
                border
                border-neutral-700
                bg-neutral-900
                pl-4
                pr-12
                text-sm
                text-white
                outline-none
                placeholder:text-gray-500
                focus:border-yellow-500
              "
            />

          </div>


          {/* =================================================
              LOCATION
          ================================================= */}

          <button
            className="
              mt-4
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              border
              border-neutral-800
              bg-neutral-900/50
              p-4
              text-left
            "
          >

            <MapPin
              size={20}
              className="text-yellow-400"
            />

            <div>

              <p
                className="
                  text-[10px]
                  text-gray-500
                "
              >
                Deliver to
              </p>

              <div
                className="
                  mt-0.5
                  flex
                  items-center
                "
              >

                <span
                  className="
                    text-sm
                    text-white
                  "
                >
                  Mumbai, 400001
                </span>

                <ChevronDown
                  size={15}
                  className="ml-1 text-white"
                />

              </div>

            </div>

          </button>


          {/* =================================================
              MENU ITEMS
          ================================================= */}

          <div
            className="
              mt-4
              divide-y
              divide-neutral-800
              rounded-xl
              border
              border-neutral-800
              bg-neutral-900/30
            "
          >

            {/* LOGIN / PROFILE */}

            {!user ? (

              <button
                onClick={handleLogin}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-4
                  text-left
                  text-sm
                  text-white
                  transition
                  hover:text-yellow-400
                "
              >

                <User size={19} />

                Login / Signup

              </button>

            ) : (

              <button
                onClick={handleProfile}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-4
                  text-left
                  text-sm
                  text-white
                  transition
                  hover:text-yellow-400
                "
              >

                <UserCircle
                  size={21}
                  className="text-yellow-400"
                />

                <div>

                  <p>
                    {user.name}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-gray-500
                    "
                  >
                    View Profile
                  </p>

                </div>

              </button>

            )}


            {/* WISHLIST */}

            <button
              onClick={handleWishlist}
              className="
                flex
                w-full
                items-center
                gap-3
                px-4
                py-4
                text-left
                text-sm
                text-white
                transition
                hover:text-yellow-400
              "
            >

              <Heart size={19} />

              Wishlist

            </button>


            {/* CART */}

            <button
              onClick={handleCart}
              className="
                flex
                w-full
                items-center
                justify-between
                px-4
                py-4
                text-left
                text-sm
                text-white
                transition
                hover:text-yellow-400
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <ShoppingCart size={19} />

                Cart

              </div>

              {cartCount > 0 && (

                <span
                  className="
                    flex
                    h-6
                    min-w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-400
                    px-1.5
                    text-xs
                    font-bold
                    text-black
                  "
                >
                  {cartCount}
                </span>

              )}

            </button>


            {/* LOGOUT */}

            {user && (

              <button
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-4
                  text-left
                  text-sm
                  text-red-400
                  transition
                  hover:text-red-300
                "
              >

                <LogOut size={19} />

                Logout

              </button>

            )}

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;