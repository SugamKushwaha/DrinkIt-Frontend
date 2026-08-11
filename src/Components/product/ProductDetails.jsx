import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  Check,
  ChevronRight,
  Package,
  Globe,
  Wine,
  Utensils,
  Clock,
} from "lucide-react";

import allProducts from "../../data/allProducts";
import { isWishlisted, toggleWishlist, } from "../../utils/wishlist";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // FIND PRODUCT
  // =====================================================

  const product = allProducts.find(
    (item) => String(item.id) === String(id)
  );

  // =====================================================
  // STATES
  // =====================================================

  const [quantity, setQuantity] = useState(1);
const [wishlist, setWishlist] = useState(() =>
  isWishlisted(id)
);
  const [activeTab, setActiveTab] = useState("description");


  const handleWishlist = () => {

  const newStatus = toggleWishlist(product.id);

  setWishlist(newStatus);

};

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            The product you're looking for doesn't exist.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="
              mt-6
              bg-yellow-500
              text-black
              px-6
              py-3
              rounded-lg
              font-semibold
              hover:bg-yellow-400
              transition
            "
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // QUANTITY
  // =====================================================

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // =====================================================
  // RELATED PRODUCTS
  // =====================================================

  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 5);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product,
      quantity,
    });

    // Later we will connect this with CartContext
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    console.log("Buy Now:", {
      product,
      quantity,
    });

    // Later we can navigate to checkout
  };

  // =====================================================
  // RATING STARS
  // =====================================================

  const renderStars = (rating = 0) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={17}
            fill={
              star <= Math.round(rating)
                ? "currentColor"
                : "none"
            }
            className="text-yellow-400"
          />
        ))}
      </div>
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="min-h-screen bg-black text-white">

      {/* =================================================
          BACK + BREADCRUMB
      ================================================= */}

      <div className="max-w-[1450px] mx-auto px-5 pt-6">

        <div className="flex items-center gap-3 text-sm">

          <button
            onClick={() => navigate("/shop")}
            className="
              flex
              items-center
              gap-2
              text-gray-400
              hover:text-white
              transition
            "
          >
            <ArrowLeft size={18} />

            Back to Shop
          </button>

          <ChevronRight
            size={15}
            className="text-gray-700"
          />

          <span className="text-gray-500">
            Home
          </span>

          <ChevronRight
            size={15}
            className="text-gray-700"
          />

          <span className="text-gray-500 capitalize">
            {product.category}
          </span>

          <ChevronRight
            size={15}
            className="text-gray-700"
          />

          <span className="text-white truncate max-w-[200px]">
            {product.name}
          </span>

        </div>

      </div>


      {/* =================================================
          MAIN PRODUCT
      ================================================= */}

      <section className="max-w-[1450px] mx-auto px-5 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* =================================================
              LEFT IMAGE
          ================================================= */}

          <div className="flex gap-4">

            {/* THUMBNAILS */}

            <div className="hidden sm:flex flex-col gap-3 w-[80px]">

              <div
                className="
                  w-[80px]
                  h-[80px]
                  rounded-lg
                  border
                  border-yellow-500
                  bg-gray-950
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <div
                className="
                  w-[80px]
                  h-[80px]
                  rounded-lg
                  border
                  border-gray-800
                  bg-gray-950
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>

            </div>


            {/* MAIN IMAGE */}

            <div
              className="
                relative
                flex-1
                min-h-[500px]
                lg:h-[575px]
                bg-gradient-to-b
                from-gray-950
                to-black
                border
                border-gray-800
                rounded-xl
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >

              {/* GLOW */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.08),transparent_55%)]
                "
              />

              {/* WISHLIST */}

              <button
  onClick={handleWishlist}
  className={`
    absolute
    top-5
    right-5
    z-20
    w-11
    h-11
    rounded-full
    border
    flex
    items-center
    justify-center
    transition

    ${
      wishlist
        ? "border-red-500 text-red-500 bg-red-500/10"
        : "border-gray-700 text-white bg-black/70 hover:border-red-500 hover:text-red-500"
    }
  `}
>
  <Heart
    size={20}
    fill={wishlist ? "currentColor" : "none"}
  />
</button>


              {/* IMAGE */}

              <img
                src={product.image}
                alt={product.name}
                className="
                  relative
                  z-10
                  w-full
                  h-full
                  object-contain
                  p-10
                  transition
                  duration-500
                  hover:scale-105
                "
              />

            </div>

          </div>


          {/* =================================================
              RIGHT INFORMATION
          ================================================= */}

          <div className="flex flex-col justify-center">

            {/* BADGE */}

            {product.popular && (
              <div>
                <span
                  className="
                    inline-flex
                    items-center
                    bg-yellow-500
                    text-black
                    text-xs
                    font-bold
                    px-3
                    py-1
                    rounded
                    uppercase
                  "
                >
                  Bestseller
                </span>
              </div>
            )}


            {/* NAME */}

            <h1
              className="
                text-3xl
                md:text-4xl
                xl:text-5xl
                font-bold
                mt-4
                leading-tight
              "
            >
              {product.name}
            </h1>


            {/* BRAND */}

            <p className="text-yellow-500 text-lg mt-2">
              {product.brand}
            </p>


            {/* RATING */}

            <div className="flex items-center gap-3 mt-4">

              {renderStars(product.rating)}

              <span className="text-white font-medium">
                {product.rating}
              </span>

              <span className="text-gray-500">
                ({product.reviews} reviews)
              </span>

            </div>


            {/* PRICE */}

            <div className="flex items-center gap-4 mt-6 flex-wrap">

              <span className="text-4xl font-bold">
                ₹{product.price}
              </span>

              {product.oldPrice && (
                <span
                  className="
                    text-gray-500
                    line-through
                    text-xl
                  "
                >
                  ₹{product.oldPrice}
                </span>
              )}

              {product.discount && (
                <span className="text-green-500 font-semibold">
                  {product.discount}% OFF
                </span>
              )}

            </div>

            <p className="text-gray-500 text-sm mt-2">
              Inclusive of all taxes
            </p>


            {/* VOLUME */}

            <div className="mt-7">

              <p className="text-white font-medium mb-3">
                Select Volume
              </p>

              <div className="flex gap-3">

                <button
                  className="
                    border
                    border-yellow-500
                    text-yellow-400
                    px-7
                    py-3
                    rounded-lg
                    font-semibold
                    bg-yellow-500/5
                  "
                >
                  {product.volume}
                </button>

              </div>

            </div>


            {/* QUANTITY */}

            <div className="mt-7">

              <p className="text-white font-medium mb-3">
                Quantity
              </p>

              <div className="flex items-center">

                <button
                  onClick={decreaseQuantity}
                  className="
                    w-12
                    h-11
                    border
                    border-gray-700
                    flex
                    items-center
                    justify-center
                    rounded-l-lg
                    hover:border-yellow-500
                    hover:text-yellow-400
                    transition
                  "
                >
                  <Minus size={17} />
                </button>


                <div
                  className="
                    w-14
                    h-11
                    border-y
                    border-gray-700
                    flex
                    items-center
                    justify-center
                    font-semibold
                  "
                >
                  {quantity}
                </div>


                <button
                  onClick={increaseQuantity}
                  className="
                    w-12
                    h-11
                    border
                    border-gray-700
                    flex
                    items-center
                    justify-center
                    rounded-r-lg
                    hover:border-yellow-500
                    hover:text-yellow-400
                    transition
                  "
                >
                  <Plus size={17} />
                </button>

              </div>

            </div>


            {/* STOCK */}

            <div className="mt-6">

              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-500">

                  <span className="w-2 h-2 bg-green-500 rounded-full" />

                  <span className="font-medium">
                    In Stock
                  </span>

                </div>
              ) : (
                <div className="text-red-500 font-medium">
                  Out of Stock
                </div>
              )}

            </div>


            {/* DELIVERY */}

            <div className="flex items-start gap-3 mt-5">

              <Truck
                size={20}
                className="text-yellow-500 mt-1"
              />

              <div>

                <p className="text-white font-medium">
                  Get it by Tomorrow, 8 PM
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Express Delivery Available
                </p>

              </div>

            </div>


            {/* ACTION BUTTONS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">

              <button
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-yellow-500
                  text-black
                  py-4
                  rounded-lg
                  font-bold
                  hover:bg-yellow-400
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                <ShoppingCart size={20} />

                ADD TO CART
              </button>


              <button
                disabled={!product.inStock}
                onClick={handleBuyNow}
                className="
                  flex
                  items-center
                  justify-center
                  bg-transparent
                  border
                  border-yellow-500
                  text-yellow-400
                  py-4
                  rounded-lg
                  font-bold
                  hover:bg-yellow-500
                  hover:text-black
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                BUY NOW
              </button>

            </div>


            {/* SECONDARY BUTTONS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

              <button
  onClick={handleWishlist}
  className="
    flex
    items-center
    justify-center
    gap-2
    border
    border-gray-700
    text-gray-300
    py-3
    rounded-lg
    hover:border-red-500
    hover:text-red-500
    transition
  "
>
  <Heart
    size={18}
    fill={wishlist ? "currentColor" : "none"}
  />

  {wishlist
    ? "WISHLISTED"
    : "ADD TO WISHLIST"}
</button>


              <button
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  border
                  border-gray-700
                  text-gray-300
                  py-3
                  rounded-lg
                  hover:border-yellow-500
                  hover:text-yellow-400
                  transition
                "
              >
                <Package size={18} />

                COMPARE
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          TABS + DESCRIPTION
      ================================================= */}

      <section className="max-w-[1450px] mx-auto px-5 pb-10">

        <div className="border border-gray-800 rounded-xl overflow-hidden">

          {/* TABS */}

          <div
            className="
              flex
              overflow-x-auto
              border-b
              border-gray-800
            "
          >

            {[
              ["description", "DESCRIPTION"],
              ["details", "DETAILS"],
              [
                "reviews",
                `REVIEWS (${product.reviews || 0})`,
              ],
              ["shipping", "SHIPPING & RETURNS"],
            ].map(([key, label]) => (

              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`
                  px-7
                  py-5
                  text-sm
                  font-semibold
                  whitespace-nowrap
                  transition
                  border-b-2
                  ${
                    activeTab === key
                      ? "text-yellow-400 border-yellow-500"
                      : "text-gray-500 border-transparent hover:text-white"
                  }
                `}
              >
                {label}
              </button>

            ))}

          </div>


          {/* DESCRIPTION */}

          {activeTab === "description" && (
            <div className="p-6 md:p-8">

              <p className="text-gray-400 leading-8 max-w-5xl">
                {product.description ||
                  `${product.name} is a quality ${product.category} from ${product.brand}.`}
              </p>


              {/* PRODUCT FEATURES */}

              <div
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-5
                  gap-6
                  mt-8
                  pt-7
                  border-t
                  border-gray-800
                "
              >

                <ProductFeature
                  icon={<Wine size={24} />}
                  title="Category"
                  value={product.category}
                />

                <ProductFeature
                  icon={<Package size={24} />}
                  title="Volume"
                  value={product.volume}
                />

                <ProductFeature
                  icon={<Globe size={24} />}
                  title="Brand"
                  value={product.brand}
                />

                <ProductFeature
                  icon={<Star size={24} />}
                  title="Rating"
                  value={`${product.rating}/5`}
                />

                <ProductFeature
                  icon={<Check size={24} />}
                  title="Availability"
                  value={
                    product.inStock
                      ? "In Stock"
                      : "Out of Stock"
                  }
                />

              </div>

            </div>
          )}


          {/* DETAILS */}

          {activeTab === "details" && (
            <div className="p-6 md:p-8">

              <div className="grid md:grid-cols-2 gap-4">

                <DetailRow
                  label="Product"
                  value={product.name}
                />

                <DetailRow
                  label="Brand"
                  value={product.brand}
                />

                <DetailRow
                  label="Category"
                  value={product.category}
                />

                <DetailRow
                  label="Volume"
                  value={product.volume}
                />

                <DetailRow
                  label="Rating"
                  value={`${product.rating} / 5`}
                />

                <DetailRow
                  label="Reviews"
                  value={`${product.reviews} reviews`}
                />

                <DetailRow
                  label="Availability"
                  value={
                    product.inStock
                      ? "In Stock"
                      : "Out of Stock"
                  }
                />

                <DetailRow
                  label="Popular"
                  value={
                    product.popular
                      ? "Bestseller"
                      : "Regular"
                  }
                />

              </div>

            </div>
          )}


          {/* REVIEWS */}

          {activeTab === "reviews" && (
            <ReviewsSection product={product} />
          )}


          {/* SHIPPING */}

          {activeTab === "shipping" && (
            <div className="p-6 md:p-8">

              <div className="grid md:grid-cols-3 gap-6">

                <ShippingCard
                  icon={<Truck size={24} />}
                  title="Fast Delivery"
                  text="Get your order delivered quickly to your selected location."
                />

                <ShippingCard
                  icon={<Check size={24} />}
                  title="Secure Packaging"
                  text="Products are carefully packed to help ensure safe delivery."
                />

                <ShippingCard
                  icon={<Clock size={24} />}
                  title="Easy Returns"
                  text="Check product and return policies before placing your order."
                />

              </div>

            </div>
          )}

        </div>

      </section>


      {/* =================================================
          RELATED PRODUCTS
      ================================================= */}

      {relatedProducts.length > 0 && (
        <section className="max-w-[1450px] mx-auto px-5 pb-16">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl md:text-3xl font-bold">
              You may also like
            </h2>

            <button
              onClick={() =>
                navigate(
                  `/shop?category=${product.category}`
                )
              }
              className="
                flex
                items-center
                gap-1
                text-yellow-400
                hover:text-yellow-300
                transition
              "
            >
              View all

              <ChevronRight size={18} />
            </button>

          </div>


          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-4
            "
          >

            {relatedProducts.map((item) => (

              <RelatedProductCard
                key={item.id}
                product={item}
                onClick={() =>
                  navigate(`/product/${item.id}`)
                }
              />

            ))}

          </div>

        </section>
      )}

    </div>
  );
};


// =====================================================
// PRODUCT FEATURE
// =====================================================

const ProductFeature = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="flex flex-col items-start gap-2">

      <div className="text-yellow-500">
        {icon}
      </div>

      <p className="text-yellow-500 text-sm">
        {title}
      </p>

      <p className="text-white text-sm capitalize">
        {value}
      </p>

    </div>
  );
};


// =====================================================
// DETAIL ROW
// =====================================================

const DetailRow = ({
  label,
  value,
}) => {
  return (
    <div
      className="
        flex
        justify-between
        gap-5
        border-b
        border-gray-800
        py-4
      "
    >
      <span className="text-gray-500">
        {label}
      </span>

      <span className="text-white text-right capitalize">
        {value}
      </span>
    </div>
  );
};


// =====================================================
// SHIPPING CARD
// =====================================================

const ShippingCard = ({
  icon,
  title,
  text,
}) => {
  return (
    <div
      className="
        border
        border-gray-800
        rounded-xl
        p-6
        bg-gray-950/40
      "
    >

      <div className="text-yellow-500 mb-4">
        {icon}
      </div>

      <h3 className="text-white font-semibold">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2 leading-6">
        {text}
      </p>

    </div>
  );
};


// =====================================================
// REVIEWS SECTION
// =====================================================

const ReviewsSection = ({
  product,
}) => {

  const rating = product.rating || 4.5;

  return (
    <div className="p-6 md:p-8">

      <div className="grid md:grid-cols-2 gap-10">

        {/* RATING SUMMARY */}

        <div>

          <h3 className="text-xl font-semibold">
            Customer Reviews
          </h3>

          <div className="flex items-center gap-5 mt-6">

            <div>

              <p className="text-5xl font-bold">
                {rating}
              </p>

              <div className="mt-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Based on {product.reviews || 0} reviews
              </p>

            </div>


            {/* BARS */}

            <div className="flex-1 space-y-3">

              {[5, 4, 3, 2, 1].map((number) => (

                <div
                  key={number}
                  className="flex items-center gap-3"
                >

                  <span className="text-sm text-gray-400 w-5">
                    {number}★
                  </span>

                  <div className="h-2 bg-gray-800 rounded-full flex-1 overflow-hidden">

                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{
                        width:
                          number === 5
                            ? "70%"
                            : number === 4
                            ? "45%"
                            : number === 3
                            ? "20%"
                            : number === 2
                            ? "10%"
                            : "5%",
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* REVIEW */}

        <div
          className="
            border
            border-gray-800
            rounded-xl
            p-6
            bg-gray-950/40
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="font-semibold">
                Verified Customer
              </p>

              <p className="text-green-500 text-xs mt-1">
                ✓ Verified Buyer
              </p>

            </div>

            <span className="text-gray-600 text-xs">
              2 weeks ago
            </span>

          </div>


          <div className="flex mt-4">

            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                fill="currentColor"
                className="text-yellow-400"
              />
            ))}

          </div>


          <h4 className="font-semibold mt-4">
            Great product and smooth experience!
          </h4>

          <p className="text-gray-400 text-sm leading-6 mt-2">
            Really enjoyed the product. Good quality,
            nice packaging and quick delivery.
          </p>

        </div>

      </div>

    </div>
  );
};


// =====================================================
// RELATED PRODUCT CARD
// =====================================================

const RelatedProductCard = ({
  product,
  onClick,
}) => {

  return (
    <button
      onClick={onClick}
      className="
        group
        text-left
        border
        border-gray-800
        rounded-xl
        overflow-hidden
        bg-black
        hover:border-gray-600
        transition
      "
    >

      {/* IMAGE */}

      <div
        className="
          h-[230px]
          bg-gray-950
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >

        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-full
            object-contain
            p-6
            group-hover:scale-105
            transition
            duration-300
          "
        />

      </div>


      {/* INFORMATION */}

      <div className="p-4">

        <h3 className="text-white font-semibold truncate">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.volume}
        </p>


        <div className="flex items-center gap-2 mt-3">

          <div className="flex">

            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                fill="currentColor"
                className="text-yellow-400"
              />
            ))}

          </div>

          <span className="text-gray-500 text-xs">
            {product.rating}
          </span>

        </div>


        <div className="flex items-center justify-between mt-3">

          <span className="text-white font-bold">
            ₹{product.price}
          </span>

          {product.discount && (
            <span className="text-green-500 text-xs">
              {product.discount}% OFF
            </span>
          )}

        </div>

      </div>

    </button>
  );
};

export default ProductDetails;