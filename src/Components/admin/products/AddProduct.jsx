import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  addAdminProduct,
} from "../../../utils/adminStorage";

const AddProduct = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Whisky",
    price: "",
    oldPrice: "",
    volume: "",
    description: "",
    image: "",
    stock: "",
    popular: false,
  });

  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Product name and price are required.");
      return;
    }

    addAdminProduct({
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
        className="flex items-center gap-2 text-gray-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div>

        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="text-gray-500 mt-1">
          Add a new product to the DrinkIt catalog.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#151515] border border-white/10 rounded-2xl p-6 space-y-6"
      >

        <div className="grid md:grid-cols-2 gap-5">

          <Input
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Johnnie Walker Black Label"
          />

          <Input
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Johnnie Walker"
          />

          <div>

            <label className="text-sm text-gray-400">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none"
            >
              <option>Whisky</option>
              <option>Vodka</option>
              <option>Wine</option>
              <option>Beer</option>
              <option>Rum</option>
              <option>Gin</option>
              <option>Snacks</option>
            </select>

          </div>

          <Input
            label="Volume"
            name="volume"
            value={form.volume}
            onChange={handleChange}
            placeholder="750ml"
          />

          <Input
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="2999"
          />

          <Input
            label="Old Price"
            name="oldPrice"
            type="number"
            value={form.oldPrice}
            onChange={handleChange}
            placeholder="3499"
          />

          <Input
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="100"
          />

          <Input
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/images/products/product.png"
          />

        </div>

        <div>

          <label className="text-sm text-gray-400">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none resize-none"
            placeholder="Product description..."
          />

        </div>

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            name="popular"
            checked={form.popular}
            onChange={handleChange}
            className="w-4 h-4"
          />

          <span className="text-sm">
            Show in Popular Tonight
          </span>

        </label>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
        >
          Add Product
        </button>

      </form>

    </div>
  );
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div>

    <label className="text-sm text-gray-400">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-2 w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
    />

  </div>
);

export default AddProduct;