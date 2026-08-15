import React, { useEffect, useState } from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAdminProducts,
  updateAdminProduct,
} from "../../../utils/adminStorage";

const EditProduct = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(null);

  useEffect(() => {

    const product = getAdminProducts().find(
      (item) => item.id === id
    );

    if (product) {
      setForm(product);
    }

  }, [id]);

  if (!form) {
    return (
      <div className="py-20 text-center">
        Product not found.
      </div>
    );
  }

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {

    e.preventDefault();

    updateAdminProduct(id, {
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || 0),
      stock: Number(form.stock || 0),
    });

    navigate("/admin/products");
  };

  return (
    <div className="max-w-4xl space-y-6">

      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 items-center text-gray-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-3xl font-bold">
        Edit Product
      </h1>

      <form
        onSubmit={submit}
        className="bg-[#151515] border border-white/10 rounded-2xl p-6 space-y-5"
      >

        {[
          ["name", "Product Name"],
          ["brand", "Brand"],
          ["category", "Category"],
          ["volume", "Volume"],
          ["price", "Price"],
          ["oldPrice", "Old Price"],
          ["stock", "Stock"],
          ["image", "Image URL"],
        ].map(([name, label]) => (

          <div key={name}>

            <label className="text-sm text-gray-400">
              {label}
            </label>

            <input
              name={name}
              value={form[name] ?? ""}
              onChange={handleChange}
              className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none"
            />

          </div>

        ))}

        <div>

          <label className="text-sm text-gray-400">
            Description
          </label>

          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            rows={5}
            className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none resize-none"
          />

        </div>

        <button
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
};

export default EditProduct;