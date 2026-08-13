import React, { useState } from "react";
import {
  Plus,
  Search,
  Package,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";


import ProductFormModal from "../products/ProductFormModal";

const VendorProducts = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const [showProductModal, setShowProductModal] =
  useState(false);

const [editingProduct, setEditingProduct] =
  useState(null);

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
// ADD / UPDATE PRODUCT
// =====================================================

const handleSaveProduct = (productData) => {
  // EDIT PRODUCT
  if (editingProduct) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProduct.id
          ? {
              ...productData,
              id: editingProduct.id,
            }
          : product
      )
    );

    setEditingProduct(null);

    return;
  }

  // ADD PRODUCT

  const newProduct = {
    ...productData,
    id: Date.now(),
  };

  setProducts((prev) => [
    newProduct,
    ...prev,
  ]);
};

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  // =====================================================
  // TOGGLE PRODUCT STATUS
  // =====================================================

  const toggleStatus = (id) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== id) return product;

        return {
          ...product,
          status:
            product.status === "ACTIVE"
              ? "HIDDEN"
              : "ACTIVE",
        };
      })
    );
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "ALL" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // =====================================================
  // STATUS
  // =====================================================

  const getStatusStyle = (status) => {
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

  const getStatusText = (status) => {
    switch (status) {
      case "ACTIVE":
        return "Active";

      case "OUT_OF_STOCK":
        return "Out of Stock";

      case "HIDDEN":
        return "Hidden";

      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-[1300px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-semibold">
              Products
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your store products and inventory
            </p>
          </div>

          <button
  onClick={() => {
    setEditingProduct(null);
    setShowProductModal(true);
  }}
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

        {/* =================================================
            STATS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Total Products
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {products.length}
                </h2>
              </div>

              <Package
                size={25}
                className="text-yellow-400"
              />

            </div>

          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Active Products
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {
                    products.filter(
                      (p) => p.status === "ACTIVE"
                    ).length
                  }
                </h2>
              </div>

              <Eye
                size={25}
                className="text-green-400"
              />

            </div>

          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#080808] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Out of Stock
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {
                    products.filter(
                      (p) => p.stock === 0
                    ).length
                  }
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
            FILTER BAR
        ================================================= */}

        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-800 bg-[#080808] p-4 md:flex-row">

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

            <option value="Snacks">
              Snacks
            </option>
          </select>

        </div>

        {/* =================================================
            PRODUCTS TABLE
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#080808]">

          {/* DESKTOP HEADER */}

          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1fr_140px] gap-4 border-b border-gray-800 px-5 py-4 text-xs uppercase tracking-wider text-gray-500 lg:grid">

            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Status</span>
            <span>Actions</span>

          </div>

          {/* PRODUCTS */}

          <div>

            {filteredProducts.length === 0 ? (

              <div className="p-10 text-center">

                <Package
                  size={40}
                  className="mx-auto mb-3 text-gray-600"
                />

                <p className="text-gray-500">
                  No products found
                </p>

              </div>

            ) : (

              filteredProducts.map((product) => (

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
                        className="h-full w-full object-contain"
                      />

                    </div>

                    <div>

                      <h3 className="font-medium">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
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

                  {/* STOCK */}

                  <div>

                    <span
                      className={
                        product.stock === 0
                          ? "text-red-400"
                          : product.stock < 10
                          ? "text-yellow-400"
                          : "text-green-400"
                      }
                    >
                      {product.stock} units
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

                  <div className="flex items-center gap-2">

                    <button
  title="Edit"
  onClick={() => {
    setEditingProduct(product);
    setShowProductModal(true);
  }}
  className="
    rounded-lg
    border
    border-gray-800
    p-2
    text-gray-400
    transition
    hover:border-yellow-400
    hover:text-yellow-400
  "
>
  <Edit size={16} />
</button>

                    <button
                      title={
                        product.status === "ACTIVE"
                          ? "Hide"
                          : "Show"
                      }
                      onClick={() =>
                        toggleStatus(product.id)
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
                      "
                    >
                      {product.status ===
                      "ACTIVE" ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    <button
                      title="Delete"
                      onClick={() =>
                        handleDelete(product.id)
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
                      "
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              ))
            )}

          </div>

        </div>

        <ProductFormModal
  isOpen={showProductModal}
  onClose={() => {
    setShowProductModal(false);
    setEditingProduct(null);
  }}
  onSave={handleSaveProduct}
  product={editingProduct}
/>

      </div>

    </div>
  );
};

export default VendorProducts;