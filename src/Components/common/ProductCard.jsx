import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  showButton = false,
  bordered = false,
}) => {

  const navigate = useNavigate();

  // ================= PRODUCT CLICK =================

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };


  // ================= ADD TO CART =================

  const handleAddToCart = (e) => {
    e.stopPropagation();

    console.log("Add to cart:", product);
  };


  return (

    <div
      onClick={handleProductClick}
      className={`
        w-full
        bg-black
        overflow-hidden
        cursor-pointer
        ${bordered ? "border border-gray-700 rounded-lg" : ""}
        hover:border-gray-500
        transition
        duration-300
      `}
    >

      {/* ================= IMAGE AREA ================= */}

      <div
        className="
          w-full
          h-[230px]
          bg-black
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
            transition
            duration-300
            hover:scale-110
          "
        />

      </div>


      {/* ================= GRAY LINE ================= */}

      <div className="border-t border-gray-700">


        {/* ================= TEXT AREA ================= */}

        <div className="bg-black px-3 py-2">


          {/* NAME */}

          <h3 className="text-white text-[15px] font-medium truncate">
            {product.name}
          </h3>


          {/* VOLUME / SIZE */}

          <p className="text-gray-400 text-[13px] mt-1">
            {product.volume || product.size}
          </p>


          {/* ================= PRICE + BUTTON ================= */}

          <div className="flex justify-between items-center mt-2">

            <span className="text-white text-lg font-bold">
              ₹ {product.price}
            </span>


            {showButton && (

              <button
                onClick={handleAddToCart}
                className="
                  flex
                  items-center
                  gap-1
                  border
                  border-yellow-500
                  text-yellow-500
                  px-3
                  py-1
                  text-sm
                  rounded
                  hover:bg-yellow-500
                  hover:text-black
                  transition
                "
              >

                <ShoppingCart size={15} />

                ADD

              </button>

            )}

          </div>


        </div>

      </div>

    </div>

  );
};

export default ProductCard;