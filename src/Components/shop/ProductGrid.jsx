import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ShopProductCard from "./ShopProductCard";
import allProducts from "../../data/allProducts";
import SortDropdown from "./ShortDropdown";

const ProductGrid = ({ filters }) => {

  const [searchParams] = useSearchParams();

  const [sort, setSort] = useState("popular");

  const urlCategory =
    searchParams.get("category") || "all";


  // ==================================================
  // FILTER PRODUCTS
  // ==================================================

  const filteredProducts = useMemo(() => {

    let result = [...allProducts];


    // ================= URL CATEGORY =================

    if (urlCategory !== "all") {

      result = result.filter(
        (product) =>
          product.category === urlCategory
      );

    }


    // ================= SIDEBAR CATEGORY =================

    if (filters.categories.length > 0) {

      result = result.filter(
        (product) =>
          filters.categories.includes(
            product.category
          )
      );

    }


    // ================= BRAND =================

    if (filters.brands.length > 0) {

      result = result.filter(
        (product) =>
          filters.brands.includes(
            product.brand
          )
      );

    }


    // ================= PRICE =================

    result = result.filter(
      (product) =>
        Number(product.price) <=
        Number(filters.maxPrice)
    );


    return result;

  }, [
    filters,
    urlCategory,
  ]);


  // ==================================================
  // SORT
  // ==================================================

  const sortedProducts = useMemo(() => {

    const products = [...filteredProducts];

    switch (sort) {

      case "price-low":

        return products.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );


      case "price-high":

        return products.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );


      case "rating":

        return products.sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        );


      case "name":

        return products.sort(
          (a, b) =>
            a.name.localeCompare(b.name)
        );


      case "popular":
      default:

        return products;

    }

  }, [
    filteredProducts,
    sort,
  ]);


 return (
  <div className="flex-1 min-w-0">

    {/* TOP BAR */}
    <div className="flex justify-between items-center mb-6">

      <div>
        <h2 className="text-white text-xl font-bold capitalize">
          {urlCategory === "all"
            ? "All Products"
            : `${urlCategory} Collection`}
        </h2>

        <p className="text-gray-500 text-xs mt-1">
          {sortedProducts.length} products found
        </p>
      </div>

      <SortDropdown
        sort={sort}
        setSort={setSort}
      />

    </div>


    {/* SCROLLABLE PRODUCT AREA */}

    <div
      className="
        max-h-[700px]
        overflow-y-auto
        pr-3
        scrollbar-thin
        scrollbar-thumb-gray-700
        scrollbar-track-transparent
      "
    >

      {sortedProducts.length > 0 ? (

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-5
          "
        >

          {sortedProducts.map((product) => (

            <ShopProductCard
              key={`${product.category}-${product.id}`}
              product={product}
            />

          ))}

        </div>

      ) : (

        <div className="py-20 text-center">

          <h3 className="text-white text-lg">
            No products found
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Try changing your filters.
          </p>

        </div>

      )}

    </div>

  </div>
);
};

export default ProductGrid;