import React, {
  useEffect,
  useState,
} from "react";

import { RefreshCw } from "lucide-react";

import CategoryCard from "./CategoryCard";

import { getCategories } from "../../api/categoryApi";

const CategorySection = () => {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  useEffect(() => {
    const loadCategories =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getCategories();

          setCategories(
            Array.isArray(data)
              ? data.filter(
                  (category) =>
                    category.active !== false
                )
              : []
          );
        } catch (err) {
          console.error(
            "Category loading error:",
            err
          );

          setError(
            err?.response?.data?.message ||
              "Unable to load categories."
          );
        } finally {
          setLoading(false);
        }
      };

    loadCategories();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="py-10">
        <div
          className="
            flex
            items-center
            justify-center
            py-12
          "
        >
          <RefreshCw
            size={28}
            className="
              animate-spin
              text-yellow-500
            "
          />
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="py-10">
        <div
          className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            p-5
            text-center
            text-red-400
          "
        >
          {error}
        </div>
      </section>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (categories.length === 0) {
    return (
      <section className="py-10">
        <div
          className="
            py-10
            text-center
            text-gray-500
          "
        >
          No categories available.
        </div>
      </section>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="py-10">

      {/* HEADER */}

      <div
        className="
          flex
          items-end
          justify-between
          mb-6
        "
      >

        <div>

          <p
            className="
              text-yellow-500
              text-sm
              font-semibold
              uppercase
              tracking-widest
            "
          >
            Explore
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              font-extrabold
              text-white
              mt-1
            "
          >
            Categories
          </h2>

        </div>

      </div>

      {/* CATEGORY GRID */}

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-4
        "
      >

        {categories.map(
          (category) => (
            <CategoryCard
              key={category.id}
              item={category}
            />
          )
        )}

      </div>

    </section>
  );
};

export default CategorySection;