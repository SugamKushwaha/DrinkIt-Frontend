const ProductCard = ({
  product,
  showButton = false,
}) => {
  return (
    <div className="w-full bg-[#0d0d0d] border  rounded-lg overflow-hidden">

     {/* IMAGE AREA */}
<div className="w-full h-[230px] bg-black flex items-center justify-center overflow-hidden">

  <img
    src={product.image}
    alt={product.name}
    className="
      w-full
      h-full
      object-contain
      scale-115
      hover:scale-105
      transition duration-300
    "
  />

</div>

{/* TEXT AREA */}
<div className="bg-black border-t border-gray-700 px-3 py-2">

        <h3 className="text-white text-[15px] font-medium truncate">
          {product.name}
        </h3>

        <p className="text-gray-400 text-[13px] mt-1">
          {product.volume}
        </p>

        <div className="flex justify-between items-center mt-1">

          <span className="text-white text-lg font-bold">
            ${product.price}
          </span>

          {showButton && (
            <button className="border border-yellow-500 text-yellow-500 px-2 py-1 text-xs rounded">
              ADD
            </button>
          )}

        </div>

      </div>

    </div>
    
  );
};

export default ProductCard;