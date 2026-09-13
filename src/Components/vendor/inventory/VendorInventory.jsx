import React, { useEffect, useMemo, useState } from "react";

import {
  Package,
  Search,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCcw,
} from "lucide-react";

import {
  getVendorProducts,
  updateVendorProduct,
} from "../../../api/vendorApi";

const VendorInventory = () => {
  // =====================================================
  // STATE
  // =====================================================

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("ALL");

  const [stockFilter, setStockFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Stores products whose stock is being saved
  const [savingId, setSavingId] = useState(null);

  // Stores stock values changed by user but not yet saved
  const [stockChanges, setStockChanges] = useState({});

  // =====================================================
  // LOAD VENDOR PRODUCTS
  // =====================================================

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getVendorProducts();

      console.log("Vendor inventory products:", data);

      setProducts(Array.isArray(data) ? data : []);

      // Clear unsaved changes after fresh DB load
      setStockChanges({});
    } catch (error) {
      console.error(
        "Unable to load vendor inventory:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to load inventory.";

      setError(message);

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
  // GET CURRENT STOCK
  // =====================================================

  const getCurrentStock = (product) => {
    if (
      Object.prototype.hasOwnProperty.call(
        stockChanges,
        product.id
      )
    ) {
      return stockChanges[product.id];
    }

    return Number(product.stock || 0);
  };

  // =====================================================
  // CHANGE STOCK LOCALLY
  // =====================================================

  const setStockValue = (id, value) => {
    const parsedValue = Number(value);

    const newStock =
      Number.isFinite(parsedValue) && parsedValue >= 0
        ? Math.floor(parsedValue)
        : 0;

    setStockChanges((prev) => ({
      ...prev,
      [id]: newStock,
    }));
  };

  // =====================================================
  // INCREASE / DECREASE STOCK
  // =====================================================

  const updateStock = (product, change) => {
    const currentStock = getCurrentStock(product);

    const newStock = Math.max(
      0,
      currentStock + change
    );

    setStockValue(product.id, newStock);
  };

  // =====================================================
  // DIRECT STOCK INPUT
  // =====================================================

  const handleStockChange = (product, value) => {
    /*
     * When the input is temporarily empty,
     * don't immediately convert it to zero.
     */

    if (value === "") {
      setStockChanges((prev) => ({
        ...prev,
        [product.id]: "",
      }));

      return;
    }

    const parsedValue = Number(value);

    if (
      !Number.isFinite(parsedValue) ||
      parsedValue < 0
    ) {
      return;
    }

    setStockChanges((prev) => ({
      ...prev,
      [product.id]: Math.floor(parsedValue),
    }));
  };

  // =====================================================
  // SAVE STOCK TO DATABASE
  // =====================================================

  const saveStock = async (product) => {
    const stockValue = getCurrentStock(product);

    if (stockValue === "") {
      alert("Please enter a valid stock quantity.");
      return;
    }

    const newStock = Number(stockValue);

    if (
      !Number.isFinite(newStock) ||
      newStock < 0
    ) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    const oldStock = Number(product.stock || 0);

    // No changes
    if (newStock === oldStock) {
      return;
    }

    try {
      setSavingId(product.id);
      setError("");

      /*
       * IMPORTANT:
       *
       * We use the SAME updateVendorProduct()
       * API already used by your VendorProducts page.
       *
       * We preserve the complete product object and
       * only change the stock.
       */

      const productData = {
        name: product.name || "",

        category: product.category || "Whisky",

        volume: product.volume || "",

        price: Number(product.price || 0),

        stock: newStock,

        image: product.image || "",

        status: product.status || "ACTIVE",
      };

      console.log(
        "Updating vendor product stock:",
        product.id,
        productData
      );

      const updatedProduct =
        await updateVendorProduct(
          product.id,
          productData
        );

      console.log(
        "Updated inventory product:",
        updatedProduct
      );

      /*
       * Update UI immediately from API response
       * if backend returns the updated product.
       */

      if (updatedProduct) {
        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  ...updatedProduct,
                  stock: Number(
                    updatedProduct.stock ??
                      newStock
                  ),
                }
              : item
          )
        );
      } else {
        /*
         * If backend doesn't return the product,
         * update local value and reload database.
         */

        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  stock: newStock,
                }
              : item
          )
        );
      }

      // Remove pending change
      setStockChanges((prev) => {
        const updated = { ...prev };

        delete updated[product.id];

        return updated;
      });
    } catch (error) {
      console.error(
        "Unable to update inventory stock:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to update stock.";

      setError(message);

      alert(message);
    } finally {
      setSavingId(null);
    }
  };

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setSearch("");
    setCategory("ALL");
    setStockFilter("ALL");
  };

  // =====================================================
  // STOCK STATUS
  // =====================================================

  const getStockStatus = (stock) => {
    const quantity = Number(stock || 0);

    if (quantity === 0) {
      return "OUT_OF_STOCK";
    }

    if (quantity < 10) {
      return "LOW_STOCK";
    }

    return "IN_STOCK";
  };

  // =====================================================
  // STOCK STATUS TEXT
  // =====================================================

  const getStockStatusText = (stock) => {
    const status = getStockStatus(stock);

    switch (status) {
      case "OUT_OF_STOCK":
        return "Out of Stock";

      case "LOW_STOCK":
        return "Low Stock";

      case "IN_STOCK":
        return "In Stock";

      default:
        return "Unknown";
    }
  };

  // =====================================================
  // STOCK STATUS STYLE
  // =====================================================

  const getStockStatusStyle = (stock) => {
    const status = getStockStatus(stock);

    switch (status) {
      case "OUT_OF_STOCK":
        return "bg-red-400/10 text-red-400";

      case "LOW_STOCK":
        return "bg-yellow-400/10 text-yellow-400";

      case "IN_STOCK":
        return "bg-green-400/10 text-green-400";

      default:
        return "bg-gray-400/10 text-gray-400";
    }
  };

  // =====================================================
  // STOCK STATUS ICON
  // =====================================================

  const getStockStatusIcon = (stock) => {
    const status = getStockStatus(stock);

    switch (status) {
      case "OUT_OF_STOCK":
        return <XCircle size={15} />;

      case "LOW_STOCK":
        return <AlertTriangle size={15} />;

      case "IN_STOCK":
        return <CheckCircle2 size={15} />;

      default:
        return null;
    }
  };

  // =====================================================
  // FILTERED PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        category === "ALL" ||
        product.category === category;

      const stock = getCurrentStock(product);

      const stockStatus =
        getStockStatus(stock);

      const matchesStock =
        stockFilter === "ALL" ||
        stockStatus === stockFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });
  }, [
    products,
    search,
    category,
    stockFilter,
    stockChanges,
  ]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalProducts = products.length;

  const totalUnits = products.reduce(
    (total, product) =>
      total + getCurrentStock(product),
    0
  );

  const inStockProducts = products.filter(
    (product) =>
      getCurrentStock(product) >= 10
  ).length;

  const lowStockProducts = products.filter(
    (product) => {
      const stock =
        getCurrentStock(product);

      return (
        stock > 0 &&
        stock < 10
      );
    }
  ).length;

  const outOfStockProducts =
    products.filter(
      (product) =>
        getCurrentStock(product) === 0
    ).length;

  // =====================================================
  // HAS UNSAVED CHANGE
  // =====================================================

  const hasStockChange = (product) => {
    if (
      !Object.prototype.hasOwnProperty.call(
        stockChanges,
        product.id
      )
    ) {
      return false;
    }

    return (
      Number(stockChanges[product.id]) !==
      Number(product.stock || 0)
    );
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">
      <div className="mx-auto max-w-[1300px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-semibold">
              Inventory
            </h1>

            <p className="mt-2 text-gray-500">
              Manage product stock and inventory
            </p>
          </div>

          <div className="flex gap-3">

            {/* REFRESH */}

            <button
              onClick={loadProducts}
              disabled={loading}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-800
                bg-[#080808]
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-300
                transition
                hover:border-yellow-400
                hover:text-yellow-400
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <RefreshCcw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              REFRESH
            </button>

            {/* RESET */}

            <button
              onClick={resetFilters}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-800
                bg-[#080808]
                px-4
                py-3
                text-sm
                font-semibold
                text-gray-300
                transition
                hover:border-yellow-400
                hover:text-yellow-400
              "
            >
              <RefreshCcw size={17} />

              RESET FILTERS
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
            INVENTORY STATS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

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
                    : totalProducts}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  {totalUnits} total units
                </p>
              </div>

              <div className="rounded-xl bg-yellow-400/10 p-3">
                <Package
                  size={24}
                  className="text-yellow-400"
                />
              </div>

            </div>
          </div>

          {/* IN STOCK */}

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
                  In Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold text-green-400">
                  {loading
                    ? "..."
                    : inStockProducts}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Healthy inventory
                </p>
              </div>

              <CheckCircle2
                size={25}
                className="text-green-400"
              />

            </div>
          </div>

          {/* LOW STOCK */}

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
                  Low Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold text-yellow-400">
                  {loading
                    ? "..."
                    : lowStockProducts}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Needs restocking
                </p>
              </div>

              <AlertTriangle
                size={25}
                className="text-yellow-400"
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

                <h2 className="mt-2 text-2xl font-bold text-red-400">
                  {loading
                    ? "..."
                    : outOfStockProducts}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Products unavailable
                </p>
              </div>

              <XCircle
                size={25}
                className="text-red-400"
              />

            </div>
          </div>

        </div>

        {/* =================================================
            FILTER BAR
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
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
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
                placeholder:text-gray-600
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

          {/* STOCK FILTER */}

          <select
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(e.target.value)
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
              All Stock
            </option>

            <option value="IN_STOCK">
              In Stock
            </option>

            <option value="LOW_STOCK">
              Low Stock
            </option>

            <option value="OUT_OF_STOCK">
              Out of Stock
            </option>
          </select>

        </div>

        {/* =================================================
            INVENTORY TABLE
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

          {/* TABLE HEADER */}

          <div
            className="
              hidden
              grid-cols-[2fr_1fr_1fr_1.4fr_1.2fr_160px]
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
            <span>Update</span>
          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <div className="p-12 text-center">

              <RefreshCcw
                size={35}
                className="mx-auto mb-4 animate-spin text-yellow-400"
              />

              <p className="text-gray-500">
                Loading inventory...
              </p>

            </div>
          ) : filteredProducts.length === 0 ? (

            /* =================================================
                EMPTY
            ================================================= */

            <div className="p-12 text-center">

              <Package
                size={42}
                className="mx-auto mb-4 text-gray-600"
              />

              <h3 className="font-semibold">
                No Products Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {products.length === 0
                  ? "You have not added any products yet."
                  : "Try changing your filters."}
              </p>

            </div>

          ) : (

            /* =================================================
                PRODUCTS
            ================================================= */

            <div>

              {filteredProducts.map((product) => {

                const stock =
                  getCurrentStock(product);

                const saving =
                  savingId === product.id;

                const changed =
                  hasStockChange(product);

                return (
                  <div
                    key={product.id}
                    className="
                      border-b
                      border-gray-800
                      p-5
                      last:border-b-0
                    "
                  >

                    {/* =================================================
                        DESKTOP
                    ================================================= */}

                    <div
                      className="
                        hidden
                        grid-cols-[2fr_1fr_1fr_1.4fr_1.2fr_160px]
                        items-center
                        gap-4
                        lg:grid
                      "
                    >

                      {/* PRODUCT */}

                      <div className="flex items-center gap-4">

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

                        <div className="min-w-0">

                          <h3 className="truncate font-medium">
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
                        ).toLocaleString("en-IN")}

                      </div>

                      {/* STOCK */}

                      <div className="flex items-center gap-2">

                        {/* MINUS */}

                        <button
                          type="button"
                          disabled={saving || stock === 0}
                          onClick={() =>
                            updateStock(
                              product,
                              -1
                            )
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-800
                            text-gray-400
                            transition
                            hover:border-red-400
                            hover:text-red-400
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          <Minus size={15} />
                        </button>

                        {/* INPUT */}

                        <input
                          type="number"
                          min="0"
                          value={stock}
                          disabled={saving}
                          onChange={(e) =>
                            handleStockChange(
                              product,
                              e.target.value
                            )
                          }
                          className="
                            h-9
                            w-[60px]
                            rounded-lg
                            border
                            border-gray-800
                            bg-[#111]
                            text-center
                            text-sm
                            text-white
                            outline-none
                            focus:border-yellow-400
                            disabled:opacity-50
                          "
                        />

                        {/* PLUS */}

                        <button
                          type="button"
                          disabled={saving}
                          onClick={() =>
                            updateStock(
                              product,
                              1
                            )
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-800
                            text-gray-400
                            transition
                            hover:border-green-400
                            hover:text-green-400
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                      {/* STATUS */}

                      <div>

                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            ${getStockStatusStyle(
                              stock
                            )}
                          `}
                        >
                          {getStockStatusIcon(
                            stock
                          )}

                          {getStockStatusText(
                            stock
                          )}
                        </span>

                      </div>

                      {/* UPDATE */}

                      <div>

                        <button
                          type="button"
                          disabled={
                            saving ||
                            !changed
                          }
                          onClick={() =>
                            saveStock(product)
                          }
                          className="
                            rounded-lg
                            border
                            border-gray-800
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-gray-300
                            transition
                            hover:border-yellow-400
                            hover:text-yellow-400
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          {saving
                            ? "SAVING..."
                            : "UPDATE"}
                        </button>

                      </div>

                    </div>

                    {/* =================================================
                        MOBILE
                    ================================================= */}

                    <div className="lg:hidden">

                      {/* PRODUCT INFO */}

                      <div className="flex items-start gap-4">

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

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <h3 className="font-medium">
                                {product.name}
                              </h3>

                              <p className="mt-1 text-xs text-gray-500">
                                {product.category || "-"} •{" "}
                                {product.volume || "-"}
                              </p>

                            </div>

                            <span
                              className={`
                                inline-flex
                                shrink-0
                                items-center
                                gap-1
                                rounded-full
                                px-2
                                py-1
                                text-[10px]
                                font-semibold
                                ${getStockStatusStyle(
                                  stock
                                )}
                              `}
                            >
                              {getStockStatusIcon(
                                stock
                              )}

                              {getStockStatusText(
                                stock
                              )}
                            </span>

                          </div>

                          <p className="mt-3 font-semibold">

                            ₹
                            {Number(
                              product.price || 0
                            ).toLocaleString("en-IN")}

                          </p>

                        </div>

                      </div>

                      {/* MOBILE STOCK */}

                      <div
                        className="
                          mt-5
                          rounded-xl
                          bg-[#101010]
                          p-3
                        "
                      >

                        <div className="flex items-center justify-between gap-4">

                          <div>

                            <p className="text-xs text-gray-500">
                              Stock
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                              {stock} units
                            </p>

                          </div>

                          <div className="flex items-center gap-2">

                            {/* MINUS */}

                            <button
                              type="button"
                              disabled={
                                saving ||
                                stock === 0
                              }
                              onClick={() =>
                                updateStock(
                                  product,
                                  -1
                                )
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-gray-800
                                text-gray-400
                                transition
                                hover:border-red-400
                                hover:text-red-400
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                              "
                            >
                              <Minus size={15} />
                            </button>

                            {/* INPUT */}

                            <input
                              type="number"
                              min="0"
                              value={stock}
                              disabled={saving}
                              onChange={(e) =>
                                handleStockChange(
                                  product,
                                  e.target.value
                                )
                              }
                              className="
                                h-9
                                w-[60px]
                                rounded-lg
                                border
                                border-gray-800
                                bg-[#080808]
                                text-center
                                text-sm
                                text-white
                                outline-none
                                focus:border-yellow-400
                                disabled:opacity-50
                              "
                            />

                            {/* PLUS */}

                            <button
                              type="button"
                              disabled={saving}
                              onClick={() =>
                                updateStock(
                                  product,
                                  1
                                )
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-gray-800
                                text-gray-400
                                transition
                                hover:border-green-400
                                hover:text-green-400
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                              "
                            >
                              <Plus size={15} />
                            </button>

                          </div>

                        </div>

                        {/* MOBILE UPDATE */}

                        <button
                          type="button"
                          disabled={
                            saving ||
                            !changed
                          }
                          onClick={() =>
                            saveStock(product)
                          }
                          className="
                            mt-3
                            w-full
                            rounded-lg
                            border
                            border-gray-800
                            px-4
                            py-2.5
                            text-xs
                            font-semibold
                            text-gray-300
                            transition
                            hover:border-yellow-400
                            hover:text-yellow-400
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          {saving
                            ? "SAVING..."
                            : changed
                            ? "UPDATE STOCK"
                            : "STOCK SAVED"}
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default VendorInventory;