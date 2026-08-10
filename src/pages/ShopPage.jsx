import React, { useState } from "react";

import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";

import ShopHeader from "../Components/shop/ShopHeader";
import CategoryNavigation from "../Components/shop/CategoryNavigation";
import FilterSidebar from "../Components/shop/FilterSidebar";
import ProductGrid from "../Components/shop/ProductGrid";

const ShopPage = () => {

  // ================= FILTER STATE =================

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    maxPrice: 5000,
  });


  // ================= CATEGORY =================

  const handleCategoryChange = (category) => {

    setFilters((prev) => {

      const alreadySelected =
        prev.categories.includes(category);

      return {
        ...prev,

        categories: alreadySelected
          ? prev.categories.filter(
              (item) => item !== category
            )
          : [...prev.categories, category],
      };

    });

  };


  // ================= BRAND =================

  const handleBrandChange = (brand) => {

    setFilters((prev) => {

      const alreadySelected =
        prev.brands.includes(brand);

      return {
        ...prev,

        brands: alreadySelected
          ? prev.brands.filter(
              (item) => item !== brand
            )
          : [...prev.brands, brand],
      };

    });

  };


  // ================= PRICE =================

  const handlePriceChange = (price) => {

    setFilters((prev) => ({
      ...prev,
      maxPrice: Number(price),
    }));

  };


  // ================= CLEAR =================

  const clearFilters = () => {

    setFilters({
      categories: [],
      brands: [],
      maxPrice: 5000,
    });

  };


  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <ShopHeader />

      <CategoryNavigation />


      {/* ================= SHOP CONTENT ================= */}

      <section className="max-w-[1450px] mx-auto px-5 py-8">

        <div className="flex gap-6 items-start">

          {/* FILTER SIDEBAR */}

          <FilterSidebar
            filters={filters}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onPriceChange={handlePriceChange}
            onClear={clearFilters}
          />


          {/* PRODUCTS */}

          <ProductGrid
            filters={filters}
          />

        </div>

      </section>


      <Footer />

    </div>
  );
};

export default ShopPage;