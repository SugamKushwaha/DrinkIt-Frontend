import React from "react";
import ProductCard from "../common/ProductCard";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="w-full min-h-[350px] flex items-center justify-center">

        <div className="text-center">

          <div className="text-5xl mb-4">
            🛒
          </div>

          <h2 className="text-white text-xl font-bold">
            No products found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing your filters.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-4
      "
    >

      {products.map((product) => (
        <ProductCard
          key={`${product.category}-${product.id}`}
          product={product}
          showButton={true}
        />
      ))}

    </div>
  );
};

export default ProductGrid;