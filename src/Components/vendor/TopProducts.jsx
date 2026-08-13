import React from "react";

const TopProducts = ({ products }) => {

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#0b0b0b]">

      <div className="border-b border-gray-800 p-5">

        <h3 className="font-semibold">
          Top Products
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Best selling products
        </p>

      </div>

      <div className="space-y-1 p-3">

        {products.map((product, index) => (

          <div
            key={product.id}
            className="flex items-center gap-4 rounded-xl p-3 hover:bg-white/[0.03]"
          >

            {/* RANK */}

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-sm font-bold text-yellow-400">
              {index + 1}
            </div>

            {/* INFO */}

            <div className="min-w-0 flex-1">

              <h4 className="truncate text-sm font-medium">
                {product.name}
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                {product.category}
              </p>

            </div>

            {/* SALES */}

            <div className="text-right">

              <p className="text-sm font-semibold">
                {product.sold}
              </p>

              <p className="text-[10px] text-gray-500">
                sold
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default TopProducts;