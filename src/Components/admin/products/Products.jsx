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
  updateAdminProduct,
} from "../../../utils/adminStorage";

const Products = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const load = () => {
    setProducts(getAdminProducts());
  };

  useEffect(() => {
    load();
  }, []);

  const removeProduct = (id) => {

    if (!window.confirm("Delete this product?")) {
      return;
    }

    deleteAdminProduct(id);

    load();
  };

  const toggleProduct = (product) => {

    updateAdminProduct(product.id, {
      active: !product.active,
    });

    load();
  };

  const filtered = products.filter((product) => {

    const value = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(value) ||
      product.category?.toLowerCase().includes(value) ||
      product.brand?.toLowerCase().includes(value)
    );

  });

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage products displayed in DrinkIt.
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/admin/products/add")
          }
          className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

      <div className="bg-[#151515] border border-white/10 rounded-2xl p-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products..."
            className="w-full bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-500"
          />

        </div>

      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

        {filtered.map((product) => (

          <div
            key={product.id}
            className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden"
          >

            <div className="h-52 bg-white flex items-center justify-center">

              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Package
                  size={45}
                  className="text-gray-300"
                />
              )}

            </div>

            <div className="p-5">

              <div className="flex justify-between gap-3">

                <div>

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {product.category || "Uncategorized"}
                  </p>

                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full h-fit ${
                    product.active
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {product.active
                    ? "Active"
                    : "Hidden"}
                </span>

              </div>

              <div className="flex items-center justify-between mt-5">

                <span className="font-bold">
                  ₹{product.price || 0}
                </span>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/products/edit/${product.id}`
                      )
                    }
                    className="p-2 rounded-lg bg-white/5"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() =>
                      toggleProduct(product)
                    }
                    className="p-2 rounded-lg bg-white/5"
                  >
                    {product.active
                      ? "Hide"
                      : "Show"}
                  </button>

                  <button
                    onClick={() =>
                      removeProduct(product.id)
                    }
                    className="p-2 rounded-lg bg-red-500/10 text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No products found.
        </div>
      )}

    </div>
  );
};

export default Products;