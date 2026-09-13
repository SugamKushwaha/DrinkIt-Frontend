import React, {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Search,
  Package,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

import ProductFormModal
  from "../products/ProductFormModal";

import {
  getVendorProducts,
  addVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,
  toggleVendorProductStatus,
} from "../../../api/vendorApi";


const VendorProducts = () => {

  // =====================================================
  // STATE
  // =====================================================

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("ALL");

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showProductModal, setShowProductModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [actionLoading, setActionLoading] =
    useState(null);


  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  const loadProducts = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getVendorProducts();

      console.log(
        "Vendor products:",
        data
      );

      setProducts(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Unable to load vendor products:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Unable to load products."
      );

      setProducts([]);

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadProducts();

  }, []);


  // =====================================================
  // ADD / UPDATE
  // =====================================================

  const handleSaveProduct =
    async (productData) => {

      try {

        setError("");

        // -------------------------------------------------
        // EDIT
        // -------------------------------------------------

        if (editingProduct) {

          const updatedProduct =
            await updateVendorProduct(
              editingProduct.id,
              productData
            );

          console.log(
            "Updated product:",
            updatedProduct
          );

          // Reload from database
          await loadProducts();

          setEditingProduct(null);

          return;
        }


        // -------------------------------------------------
        // ADD
        // -------------------------------------------------

        const createdProduct =
          await addVendorProduct(
            productData
          );

        console.log(
          "Created product:",
          createdProduct
        );

        // Reload from database
        await loadProducts();

        setEditingProduct(null);

      } catch (error) {

        console.error(
          "Save product error:",
          error
        );

        const message =
          error?.response?.data?.message ||
          "Unable to save product.";

        setError(message);

        alert(message);

        throw error;
      }
    };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmed) {
        return;
      }


      try {

        setActionLoading(id);

        setError("");

        await deleteVendorProduct(id);

        // Reload latest database data
        await loadProducts();

      } catch (error) {

        console.error(
          "Delete product error:",
          error
        );

        const message =
          error?.response?.data?.message ||
          "Unable to delete product.";

        alert(message);

        setError(message);

      } finally {

        setActionLoading(null);

      }
    };


  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const toggleStatus =
    async (id) => {

      try {

        setActionLoading(id);

        setError("");

        await toggleVendorProductStatus(
          id
        );

        // Reload database data
        await loadProducts();

      } catch (error) {

        console.error(
          "Toggle product error:",
          error
        );

        const message =
          error?.response?.data?.message ||
          "Unable to change product status.";

        alert(message);

        setError(message);

      } finally {

        setActionLoading(null);

      }
    };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredProducts =
    products.filter((product) => {

      const searchValue =
        search.toLowerCase().trim();


      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(searchValue);


      const matchesCategory =
        category === "ALL" ||
        product.category === category;


      return (
        matchesSearch &&
        matchesCategory
      );

    });


  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle =
    (status) => {

      switch (status) {

        case "ACTIVE":
          return "bg-green-400/10 text-green-400";

        case "OUT_OF_STOCK":
          return "bg-red-400/10 text-red-400";

        case "HIDDEN":
          return "bg-gray-400/10 text-gray-400";

        default:
          return "bg-gray-400/10 text-gray-400";
      }
    };


  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText =
    (status) => {

      switch (status) {

        case "ACTIVE":
          return "Active";

        case "OUT_OF_STOCK":
          return "Out of Stock";

        case "HIDDEN":
          return "Hidden";

        default:
          return status || "Unknown";
      }
    };


  // =====================================================
  // ADD PRODUCT
  // =====================================================

  const openAddModal = () => {

    setEditingProduct(null);

    setShowProductModal(true);
  };


  // =====================================================
  // EDIT PRODUCT
  // =====================================================

  const openEditModal =
    (product) => {

      setEditingProduct(product);

      setShowProductModal(true);
    };


  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {

    setShowProductModal(false);

    setEditingProduct(null);
  };


  // =====================================================
  // COUNTS
  // =====================================================

  const activeProducts =
    products.filter(
      (product) =>
        product.status === "ACTIVE"
    ).length;


  const outOfStock =
    products.filter(
      (product) =>
        Number(product.stock) === 0
    ).length;


  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
        min-h-screen
        bg-black
        px-4
        py-6
        text-white
        sm:px-6
        md:px-10
      "
    >

      <div className="mx-auto max-w-[1300px]">


        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>

            <h1 className="text-3xl font-semibold">

              Products

            </h1>

            <p className="mt-2 text-gray-500">

              Manage your store products and inventory

            </p>

          </div>


          <div className="flex gap-3">

            {/* REFRESH */}

            <button
              onClick={loadProducts}
              disabled={loading}
              title="Refresh"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-800
                px-4
                py-3
                text-gray-300
                transition
                hover:border-yellow-400
                hover:text-yellow-400
              "
            >

              <RefreshCw
                size={18}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh

            </button>


            {/* ADD */}

            <button
              onClick={openAddModal}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-yellow-400
                px-5
                py-3
                font-bold
                text-black
                transition
                hover:bg-yellow-300
              "
            >

              <Plus size={19} />

              ADD PRODUCT

            </button>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div
            className="
              mb-5
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-4
              text-sm
              text-red-400
            "
          >

            {error}

          </div>

        )}


        {/* =================================================
            STATS
        ================================================= */}

        <div
          className="
            mb-6
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-3
          "
        >

          {/* TOTAL */}

          <div
            className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">

                  Total Products

                </p>

                <h2 className="mt-2 text-2xl font-bold">

                  {loading
                    ? "..."
                    : products.length}

                </h2>

              </div>


              <Package
                size={25}
                className="text-yellow-400"
              />

            </div>

          </div>


          {/* ACTIVE */}

          <div
            className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">

                  Active Products

                </p>

                <h2 className="mt-2 text-2xl font-bold">

                  {loading
                    ? "..."
                    : activeProducts}

                </h2>

              </div>


              <Eye
                size={25}
                className="text-green-400"
              />

            </div>

          </div>


          {/* OUT OF STOCK */}

          <div
            className="
              rounded-2xl
              border
              border-gray-800
              bg-[#080808]
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">

                  Out of Stock

                </p>

                <h2 className="mt-2 text-2xl font-bold">

                  {loading
                    ? "..."
                    : outOfStock}

                </h2>

              </div>


              <Package
                size={25}
                className="text-red-400"
              />

            </div>

          </div>

        </div>


        {/* =================================================
            FILTER
        ================================================= */}

        <div
          className="
            mb-5
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-gray-800
            bg-[#080808]
            p-4
            md:flex-row
          "
        >

          {/* SEARCH */}

          <div className="relative flex-1">

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
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                h-11
                w-full
                rounded-xl
                border
                border-gray-800
                bg-[#111]
                pl-11
                pr-4
                text-sm
                text-white
                outline-none
                focus:border-yellow-400
              "
            />

          </div>


          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="
              h-11
              rounded-xl
              border
              border-gray-800
              bg-[#111]
              px-4
              text-sm
              text-white
              outline-none
              focus:border-yellow-400
            "
          >

            <option value="ALL">
              All Categories
            </option>

            <option value="Whisky">
              Whisky
            </option>

            <option value="Beer">
              Beer
            </option>

            <option value="Vodka">
              Vodka
            </option>

            <option value="Wine">
              Wine
            </option>

            <option value="Rum">
              Rum
            </option>

            <option value="Gin">
              Gin
            </option>

            <option value="Snacks">
              Snacks
            </option>

          </select>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-800
            bg-[#080808]
          "
        >

          {/* HEADER */}

          <div
            className="
              hidden
              grid-cols-[2fr_1fr_1fr_1fr_1fr_140px]
              gap-4
              border-b
              border-gray-800
              px-5
              py-4
              text-xs
              uppercase
              tracking-wider
              text-gray-500
              lg:grid
            "
          >

            <span>Product</span>

            <span>Category</span>

            <span>Price</span>

            <span>Stock</span>

            <span>Status</span>

            <span>Actions</span>

          </div>


          {/* LOADING */}

          {loading ? (

            <div
              className="
                p-12
                text-center
                text-gray-500
              "
            >

              <RefreshCw
                size={30}
                className="
                  mx-auto
                  mb-3
                  animate-spin
                "
              />

              Loading products...

            </div>

          ) : filteredProducts.length === 0 ? (

            /* EMPTY */

            <div
              className="
                p-10
                text-center
              "
            >

              <Package
                size={40}
                className="
                  mx-auto
                  mb-3
                  text-gray-600
                "
              />

              <p className="text-gray-500">

                {products.length === 0
                  ? "You have not added any products yet."
                  : "No products found."}

              </p>


              {products.length === 0 && (

                <button
                  onClick={openAddModal}
                  className="
                    mt-5
                    rounded-xl
                    bg-yellow-400
                    px-5
                    py-3
                    font-bold
                    text-black
                  "
                >

                  Add Your First Product

                </button>

              )}

            </div>

          ) : (

            /* PRODUCTS */

            filteredProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="
                    grid
                    grid-cols-1
                    gap-4
                    border-b
                    border-gray-800
                    p-5
                    last:border-b-0
                    lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_140px]
                    lg:items-center
                  "
                >

                  {/* PRODUCT */}

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        h-[65px]
                        w-[65px]
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-[#151515]
                        p-2
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
                          onError={(e) => {

                            e.currentTarget.style.display =
                              "none";

                          }}
                        />

                      ) : (

                        <Package
                          size={25}
                          className="text-gray-600"
                        />

                      )}

                    </div>


                    <div>

                      <h3 className="font-medium">

                        {product.name}

                      </h3>

                      <p className="mt-1 text-xs text-gray-500">

                        {product.volume || "-"}

                      </p>

                    </div>

                  </div>


                  {/* CATEGORY */}

                  <div className="text-sm text-gray-400">

                    {product.category || "-"}

                  </div>


                  {/* PRICE */}

                  <div className="font-semibold">

                    ₹
                    {Number(
                      product.price || 0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </div>


                  {/* STOCK */}

                  <div>

                    <span
                      className={
                        Number(product.stock) === 0
                          ? "text-red-400"
                          : Number(product.stock) < 10
                          ? "text-yellow-400"
                          : "text-green-400"
                      }
                    >

                      {product.stock || 0}
                      {" "}
                      units

                    </span>

                  </div>


                  {/* STATUS */}

                  <div>

                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getStatusStyle(
                          product.status
                        )}
                      `}
                    >

                      {getStatusText(
                        product.status
                      )}

                    </span>

                  </div>


                  {/* ACTIONS */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    {/* EDIT */}

                    <button
                      title="Edit"
                      disabled={
                        actionLoading ===
                        product.id
                      }
                      onClick={() =>
                        openEditModal(
                          product
                        )
                      }
                      className="
                        rounded-lg
                        border
                        border-gray-800
                        p-2
                        text-gray-400
                        transition
                        hover:border-yellow-400
                        hover:text-yellow-400
                        disabled:opacity-50
                      "
                    >

                      <Edit size={16} />

                    </button>


                    {/* SHOW / HIDE */}

                    <button
                      title={
                        product.status ===
                        "ACTIVE"
                          ? "Hide"
                          : "Show"
                      }
                      disabled={
                        actionLoading ===
                        product.id
                      }
                      onClick={() =>
                        toggleStatus(
                          product.id
                        )
                      }
                      className="
                        rounded-lg
                        border
                        border-gray-800
                        p-2
                        text-gray-400
                        transition
                        hover:border-blue-400
                        hover:text-blue-400
                        disabled:opacity-50
                      "
                    >

                      {product.status ===
                      "ACTIVE" ? (

                        <EyeOff
                          size={16}
                        />

                      ) : (

                        <Eye
                          size={16}
                        />

                      )}

                    </button>


                    {/* DELETE */}

                    <button
                      title="Delete"
                      disabled={
                        actionLoading ===
                        product.id
                      }
                      onClick={() =>
                        handleDelete(
                          product.id
                        )
                      }
                      className="
                        rounded-lg
                        border
                        border-gray-800
                        p-2
                        text-gray-400
                        transition
                        hover:border-red-400
                        hover:text-red-400
                        disabled:opacity-50
                      "
                    >

                      {actionLoading ===
                      product.id ? (

                        <RefreshCw
                          size={16}
                          className="animate-spin"
                        />

                      ) : (

                        <Trash2
                          size={16}
                        />

                      )}

                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>


        {/* =================================================
            MODAL
        ================================================= */}

        <ProductFormModal
          isOpen={
            showProductModal
          }

          onClose={
            closeModal
          }

          onSave={
            handleSaveProduct
          }

          product={
            editingProduct
          }
        />

      </div>

    </div>

  );
};


export default VendorProducts;