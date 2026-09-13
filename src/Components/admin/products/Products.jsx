import React, { useEffect, useState } from "react";

import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getAdminProducts,
  deleteAdminProduct,
  toggleAdminProductStatus,
} from "../../../api/productApi";


const Products = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);


  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  const loadProducts = async () => {

    try {

      setLoading(true);

      const data =
        await getAdminProducts();

      setProducts(data);

    } catch (error) {

      console.error(
        "Failed to load products:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Unable to load products."
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    loadProducts();

  }, []);


  // =====================================================
  // DELETE
  // =====================================================

  const removeProduct = async (id) => {

    if (
      !window.confirm(
        "Delete this product?"
      )
    ) {
      return;
    }

    try {

      await deleteAdminProduct(id);

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to delete product."
      );
    }
  };


  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const toggleProduct = async (
    product
  ) => {

    try {

      const updated =
        await toggleAdminProductStatus(
          product.id
        );

      setProducts((prev) =>
        prev.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to update product status."
      );
    }
  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filtered =
    products.filter((product) => {

      const value =
        search.toLowerCase();

      return (
        product.name
          ?.toLowerCase()
          .includes(value) ||

        product.category
          ?.toLowerCase()
          .includes(value) ||

        product.brand
          ?.toLowerCase()
          .includes(value)
      );
    });


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="py-20 text-center text-gray-500">
        Loading products...
      </div>
    );
  }


  return (

    <div className="space-y-6">


      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="mt-1 text-gray-500">
            Manage products displayed in DrinkIt.
          </p>

        </div>


        <button
          onClick={() =>
            navigate(
              "/admin/products/add"
            )
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-600
            px-5
            py-3
            hover:bg-red-700
          "
        >

          <Plus size={18} />

          Add Product

        </button>

      </div>


      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-4
        "
      >

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products..."
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-black
              py-3
              pl-11
              pr-4
              outline-none
              focus:border-red-500
            "
          />

        </div>

      </div>


      {/* =================================================
          PRODUCT GRID
      ================================================= */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >

        {filtered.map((product) => {

          const isActive =
            product.status === "ACTIVE";

          const isOutOfStock =
            product.stock === 0;

          return (

            <div
              key={product.id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#151515]
              "
            >


              {/* IMAGE */}

              <div
                className="
                  flex
                  h-52
                  items-center
                  justify-center
                  bg-white
                "
              >

                {product.image ? (

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />

                ) : (

                  <Package
                    size={45}
                    className="text-gray-300"
                  />

                )}

              </div>


              {/* CONTENT */}

              <div className="p-5">


                <div
                  className="
                    flex
                    justify-between
                    gap-3
                  "
                >

                  <div>

                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {product.brand || ""}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {product.category || "Uncategorized"}
                    </p>

                  </div>


                  {/* STATUS */}

                  <span
                    className={`
                      h-fit
                      rounded-full
                      px-2
                      py-1
                      text-xs

                      ${
                        isOutOfStock
                          ? "bg-red-500/10 text-red-400"
                          : isActive
                          ? "bg-green-500/10 text-green-400"
                          : "bg-gray-500/10 text-gray-400"
                      }
                    `}
                  >

                    {isOutOfStock
                      ? "Out of Stock"
                      : isActive
                      ? "Active"
                      : "Hidden"}

                  </span>

                </div>


                {/* PRICE */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <span className="font-bold">
                      ₹{product.price || 0}
                    </span>

                    {product.oldPrice > 0 && (

                      <span
                        className="
                          ml-2
                          text-sm
                          text-gray-500
                          line-through
                        "
                      >
                        ₹{product.oldPrice}
                      </span>

                    )}

                  </div>


                  <span className="text-xs text-gray-500">
                    Stock: {product.stock}
                  </span>

                </div>


                {/* ACTIONS */}

                <div
                  className="
                    mt-5
                    flex
                    gap-2
                  "
                >

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/products/edit/${product.id}`
                      )
                    }
                    className="
                      rounded-lg
                      bg-white/5
                      p-2
                      hover:bg-white/10
                    "
                  >

                    <Edit size={16} />

                  </button>


                  <button
                    onClick={() =>
                      toggleProduct(product)
                    }
                    className="
                      rounded-lg
                      bg-white/5
                      px-3
                      text-xs
                      hover:bg-white/10
                    "
                  >

                    {isActive
                      ? "Hide"
                      : "Show"}

                  </button>


                  <button
                    onClick={() =>
                      removeProduct(
                        product.id
                      )
                    }
                    className="
                      rounded-lg
                      bg-red-500/10
                      p-2
                      text-red-400
                    "
                  >

                    <Trash2 size={16} />

                  </button>

                </div>

              </div>

            </div>

          );
        })}

      </div>


      {/* EMPTY */}

      {filtered.length === 0 && (

        <div
          className="
            py-16
            text-center
            text-gray-500
          "
        >
          No products found.
        </div>

      )}

    </div>
  );
};


export default Products;