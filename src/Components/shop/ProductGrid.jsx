import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";
import { Loader2, PackageX } from "lucide-react";

import ShopProductCard from "./ShopProductCard";
import SortDropdown from "./ShortDropdown";

import { getProducts } from "../../api/productApi";


const ProductGrid = ({ filters }) => {

  const [searchParams] = useSearchParams();

  const [sort, setSort] = useState("popular");

  const urlCategory =
    searchParams.get("category") || "all";


  // =====================================================
  // PRODUCTS FROM BACKEND
  //
  // GET /api/products returns every ACTIVE product,
  // whether it was created by the Admin or by a Vendor —
  // both write to the same `products` table, so nothing
  // needs to be merged client-side.
  // =====================================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    let cancelled = false;

    const loadProducts = async () => {

      try {

        setLoading(true);

        setError("");

        const data = await getProducts();

        if (!cancelled) {
          setProducts(data || []);
        }

      } catch (err) {

        console.error(
          "Failed to load products:",
          err
        );

        if (!cancelled) {
          setError(
            "Unable to load products right now."
          );
        }

      } finally {

        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };

  }, []);


  // ==================================================
  // FILTER PRODUCTS
  // ==================================================

  const filteredProducts = useMemo(() => {

    let result = [...products];


    // ================= URL CATEGORY =================
    //
    // The category nav / sidebar use lowercase slugs
    // ("whisky") while products are stored Title Case
    // ("Whisky"), so compare case-insensitively.

    if (urlCategory !== "all") {

      result = result.filter(
        (product) =>
          (product.category || "")
            .toLowerCase() ===
          urlCategory.toLowerCase()
      );

    }


    // ================= SIDEBAR CATEGORY =================

    if (filters.categories.length > 0) {

      const selectedCategories =
        filters.categories.map((category) =>
          category.toLowerCase()
        );

      result = result.filter((product) =>
        selectedCategories.includes(
          (product.category || "").toLowerCase()
        )
      );

    }


    // ================= BRAND =================

    if (filters.brands.length > 0) {

      const selectedBrands =
        filters.brands.map((brand) =>
          brand.toLowerCase()
        );

      result = result.filter((product) =>
        selectedBrands.includes(
          (product.brand || "").toLowerCase()
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
    products,
    filters,
    urlCategory,
  ]);


  // ==================================================
  // SORT
  // ==================================================

  const sortedProducts = useMemo(() => {

    const list = [...filteredProducts];

    switch (sort) {

      case "price-low":

        return list.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );


      case "price-high":

        return list.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );


      case "rating":

        return list.sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        );


      case "name":

        return list.sort(
          (a, b) =>
            a.name.localeCompare(b.name)
        );


      case "popular":
      default:

        // Popular products (flagged by admin/vendor) first.
        return list.sort(
          (a, b) =>
            (b.popular === true) -
            (a.popular === true)
        );

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
            {loading
              ? "Loading products..."
              : `${sortedProducts.length} products found`}
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

        {loading ? (

          <div className="py-24 flex flex-col items-center justify-center text-gray-500">

            <Loader2
              size={26}
              className="animate-spin mb-3"
            />

            Loading products...

          </div>

        ) : error ? (

          <div className="py-20 text-center">

            <PackageX
              size={30}
              className="mx-auto text-gray-600 mb-3"
            />

            <h3 className="text-white text-lg">
              {error}
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Please refresh the page to try again.
            </p>

          </div>

        ) : sortedProducts.length > 0 ? (

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
                key={product.id}
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