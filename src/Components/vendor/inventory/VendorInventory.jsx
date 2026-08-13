import React, { useMemo, useState } from "react";

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

const VendorInventory = () => {
  // =====================================================
  // PRODUCTS
  // =====================================================

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Johnnie Walker Black Label",
      category: "Whisky",
      volume: "750 ML",
      price: 3200,
      stock: 18,
      status: "ACTIVE",
      image: "/images/products/black-label.png",
    },

    {
      id: 2,
      name: "Kingfisher Premium",
      category: "Beer",
      volume: "650 ML",
      price: 180,
      stock: 42,
      status: "ACTIVE",
      image: "/images/products/kingfisher.png",
    },

    {
      id: 3,
      name: "Belvedere Vodka",
      category: "Vodka",
      volume: "750 ML",
      price: 4200,
      stock: 8,
      status: "ACTIVE",
      image: "/images/products/belvedere.png",
    },

    {
      id: 4,
      name: "Sula Cabernet Sauvignon",
      category: "Wine",
      volume: "750 ML",
      price: 850,
      stock: 0,
      status: "OUT_OF_STOCK",
      image: "/images/products/sula.png",
    },

    {
      id: 5,
      name: "Lay's Classic",
      category: "Snacks",
      volume: "100 GM",
      price: 40,
      stock: 55,
      status: "ACTIVE",
      image: "/images/products/lays.png",
    },
  ]);

  // =====================================================
  // FILTER STATES
  // =====================================================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");

  // =====================================================
  // STOCK UPDATE
  // =====================================================

  const updateStock = (id, change) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== id) {
          return product;
        }

        const newStock = Math.max(
          0,
          product.stock + change
        );

        return {
          ...product,

          stock: newStock,

          status:
            newStock === 0
              ? "OUT_OF_STOCK"
              : "ACTIVE",
        };
      })
    );
  };

  // =====================================================
  // DIRECT STOCK INPUT
  // =====================================================

  const handleStockChange = (id, value) => {
    const newStock = Math.max(
      0,
      Number(value) || 0
    );

    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== id) {
          return product;
        }

        return {
          ...product,

          stock: newStock,

          status:
            newStock === 0
              ? "OUT_OF_STOCK"
              : "ACTIVE",
        };
      })
    );
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
    if (stock === 0) {
      return "OUT_OF_STOCK";
    }

    if (stock < 10) {
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
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "ALL" ||
        product.category === category;

      const status =
        getStockStatus(product.stock);

      const matchesStock =
        stockFilter === "ALL" ||
        status === stockFilter;

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
  ]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalProducts = products.length;

  const totalUnits = products.reduce(
    (total, product) =>
      total + product.stock,
    0
  );

  const inStockProducts = products.filter(
    (product) => product.stock >= 10
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock < 10
  ).length;

  const outOfStockProducts =
    products.filter(
      (product) => product.stock === 0
    ).length;

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

          <button
            onClick={resetFilters}
            className="
              flex
              w-fit
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

        {/* =================================================
            INVENTORY STATS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="
            rounded-2xl
            border
            border-gray-800
            bg-[#080808]
            p-5
          ">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total Products
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {totalProducts}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  {totalUnits} total units
                </p>

              </div>

              <div className="
                rounded-xl
                bg-yellow-400/10
                p-3
              ">

                <Package
                  size={24}
                  className="text-yellow-400"
                />

              </div>

            </div>

          </div>

          {/* IN STOCK */}

          <div className="
            rounded-2xl
            border
            border-gray-800
            bg-[#080808]
            p-5
          ">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  In Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold text-green-400">
                  {inStockProducts}
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

          <div className="
            rounded-2xl
            border
            border-gray-800
            bg-[#080808]
            p-5
          ">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Low Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold text-yellow-400">
                  {lowStockProducts}
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

          <div className="
            rounded-2xl
            border
            border-gray-800
            bg-[#080808]
            p-5
          ">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Out of Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold text-red-400">
                  {outOfStockProducts}
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

        <div className="
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
        ">

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

        <div className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-800
          bg-[#080808]
        ">

          {/* TABLE HEADER */}

          <div className="
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
          ">

            <span>Product</span>

            <span>Category</span>

            <span>Price</span>

            <span>Stock</span>

            <span>Status</span>

            <span>Update</span>

          </div>

          {/* PRODUCTS */}

          <div>

            {filteredProducts.length === 0 ? (

              <div className="p-12 text-center">

                <Package
                  size={42}
                  className="mx-auto mb-4 text-gray-600"
                />

                <h3 className="font-semibold">
                  No Products Found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your filters.
                </p>

              </div>

            ) : (

              filteredProducts.map(
                (product) => (

                  <div
                    key={product.id}
                    className="
                      border-b
                      border-gray-800
                      p-5
                      last:border-b-0
                    "
                  >

                    {/* DESKTOP */}

                    <div className="
                      hidden
                      grid-cols-[2fr_1fr_1fr_1.4fr_1.2fr_160px]
                      items-center
                      gap-4
                      lg:grid
                    ">

                      {/* PRODUCT */}

                      <div className="flex items-center gap-4">

                        <div className="
                          flex
                          h-[65px]
                          w-[65px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#151515]
                          p-2
                        ">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="
                              h-full
                              w-full
                              object-contain
                            "
                          />

                        </div>

                        <div className="min-w-0">

                          <h3 className="
                            truncate
                            font-medium
                          ">
                            {product.name}
                          </h3>

                          <p className="
                            mt-1
                            text-xs
                            text-gray-500
                          ">
                            {product.volume}
                          </p>

                        </div>

                      </div>

                      {/* CATEGORY */}

                      <div className="text-sm text-gray-400">
                        {product.category}
                      </div>

                      {/* PRICE */}

                      <div className="font-semibold">

                        ₹
                        {product.price.toLocaleString(
                          "en-IN"
                        )}

                      </div>

                      {/* STOCK CONTROL */}

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            updateStock(
                              product.id,
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
                          "
                        >

                          <Minus size={15} />

                        </button>

                        <input
                          type="number"
                          min="0"
                          value={product.stock}
                          onChange={(e) =>
                            handleStockChange(
                              product.id,
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
                          "
                        />

                        <button
                          onClick={() =>
                            updateStock(
                              product.id,
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
                              product.stock
                            )}
                          `}
                        >

                          {getStockStatusIcon(
                            product.stock
                          )}

                          {getStockStatusText(
                            product.stock
                          )}

                        </span>

                      </div>

                      {/* UPDATE */}

                      <div>

                        <button
                          onClick={() =>
                            alert(
                              `${product.name} stock updated to ${product.stock} units`
                            )
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
                          "
                        >
                          UPDATE
                        </button>

                      </div>

                    </div>

                    {/* =================================================
                        MOBILE
                    ================================================= */}

                    <div className="lg:hidden">

                      <div className="
                        flex
                        items-start
                        gap-4
                      ">

                        <div className="
                          flex
                          h-[65px]
                          w-[65px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#151515]
                          p-2
                        ">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="
                              h-full
                              w-full
                              object-contain
                            "
                          />

                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          ">

                            <div>

                              <h3 className="font-medium">
                                {product.name}
                              </h3>

                              <p className="
                                mt-1
                                text-xs
                                text-gray-500
                              ">
                                {product.category} •{" "}
                                {product.volume}
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
                                  product.stock
                                )}
                              `}
                            >

                              {getStockStatusIcon(
                                product.stock
                              )}

                              {getStockStatusText(
                                product.stock
                              )}

                            </span>

                          </div>

                          <p className="
                            mt-3
                            font-semibold
                          ">

                            ₹
                            {product.price.toLocaleString(
                              "en-IN"
                            )}

                          </p>

                        </div>

                      </div>

                      {/* MOBILE STOCK */}

                      <div className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-xl
                        bg-[#101010]
                        p-3
                      ">

                        <div>

                          <p className="
                            text-xs
                            text-gray-500
                          ">
                            Stock
                          </p>

                          <p className="
                            mt-1
                            text-sm
                            font-semibold
                          ">
                            {product.stock} units
                          </p>

                        </div>

                        <div className="
                          flex
                          items-center
                          gap-2
                        ">

                          <button
                            onClick={() =>
                              updateStock(
                                product.id,
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
                              hover:border-red-400
                              hover:text-red-400
                            "
                          >
                            <Minus size={15} />
                          </button>

                          <input
                            type="number"
                            min="0"
                            value={product.stock}
                            onChange={(e) =>
                              handleStockChange(
                                product.id,
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
                              outline-none
                              focus:border-yellow-400
                            "
                          />

                          <button
                            onClick={() =>
                              updateStock(
                                product.id,
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
                              hover:border-green-400
                              hover:text-green-400
                            "
                          >
                            <Plus size={15} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default VendorInventory;