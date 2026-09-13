import React, {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAdminProduct,
  updateAdminProduct,
} from "../../../api/productApi";


const EditProduct = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  const [form, setForm] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {

    const loadProduct = async () => {

      try {

        const product =
          await getAdminProduct(id);

        setForm({

          ...product,

          price:
            product.price ?? "",

          oldPrice:
            product.oldPrice ?? "",

          stock:
            product.stock ?? "",

          popular:
            product.popular ?? false,

          status:
            product.status ?? "ACTIVE",

        });

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Product not found."
        );

      } finally {

        setLoading(false);
      }
    };


    loadProduct();

  }, [id]);


  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const submit = async (e) => {

    e.preventDefault();


    try {

      setSaving(true);


      await updateAdminProduct(
        id,
        {

          name: form.name,

          brand: form.brand,

          category: form.category,

          volume: form.volume,

          price: Number(form.price),

          oldPrice:
            Number(form.oldPrice || 0),

          description:
            form.description,

          image:
            form.image,

          stock:
            Number(form.stock || 0),

          popular:
            form.popular,

          status:
            form.status,

        }
      );


      alert(
        "Product updated successfully."
      );


      navigate(
        "/admin/products"
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to update product."
      );

    } finally {

      setSaving(false);
    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="py-20 text-center text-gray-500">
        Loading product...
      </div>
    );
  }


  if (!form) {

    return (
      <div className="py-20 text-center">
        Product not found.
      </div>
    );
  }


  return (

    <div className="max-w-4xl space-y-6">


      <button
        onClick={() => navigate(-1)}
        className="
          flex
          items-center
          gap-2
          text-gray-400
        "
      >

        <ArrowLeft size={18} />

        Back

      </button>


      <h1 className="text-3xl font-bold">
        Edit Product
      </h1>


      <form
        onSubmit={submit}
        className="
          space-y-5
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-6
        "
      >


        <Input
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />


        <Input
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
        />


        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />


        <Input
          label="Volume"
          name="volume"
          value={form.volume}
          onChange={handleChange}
        />


        <Input
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />


        <Input
          label="Old Price"
          name="oldPrice"
          type="number"
          value={form.oldPrice}
          onChange={handleChange}
        />


        <Input
          label="Stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
        />


        <Input
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
        />


        <div>

          <label className="text-sm text-gray-400">
            Description
          </label>

          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            rows={5}
            className="
              mt-2
              w-full
              resize-none
              rounded-xl
              border
              border-white/10
              bg-black
              px-4
              py-3
              outline-none
            "
          />

        </div>


        <label
          className="
            flex
            items-center
            gap-3
          "
        >

          <input
            type="checkbox"
            name="popular"
            checked={form.popular}
            onChange={handleChange}
          />

          Show in Popular Tonight

        </label>


        <div>

          <label className="text-sm text-gray-400">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-white/10
              bg-black
              px-4
              py-3
              outline-none
            "
          >

            <option value="ACTIVE">
              Active
            </option>

            <option value="HIDDEN">
              Hidden
            </option>

          </select>

        </div>


        <button
          type="submit"
          disabled={saving}
          className="
            w-full
            rounded-xl
            bg-red-600
            py-3
            font-semibold
            hover:bg-red-700
            disabled:opacity-50
          "
        >

          {saving
            ? "Saving..."
            : "Save Changes"}

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
}) => (

  <div>

    <label className="text-sm text-gray-400">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className="
        mt-2
        w-full
        rounded-xl
        border
        border-white/10
        bg-black
        px-4
        py-3
        outline-none
      "
    />

  </div>
);


export default EditProduct;