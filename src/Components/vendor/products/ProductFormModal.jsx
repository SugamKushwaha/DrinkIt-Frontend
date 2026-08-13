import React, { useEffect, useState } from "react";
import { X, Save, Package } from "lucide-react";

const emptyProduct = {
  name: "",
  category: "Whisky",
  volume: "",
  price: "",
  stock: "",
  image: "",
  status: "ACTIVE",
};

const ProductFormModal = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState(emptyProduct);

  const isEditing = Boolean(product);

  // =====================================================
  // LOAD PRODUCT FOR EDIT
  // =====================================================

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        category: product.category || "Whisky",
        volume: product.volume || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || "",
        status: product.status || "ACTIVE",
      });
    } else {
      setFormData(emptyProduct);
    }
  }, [product, isOpen]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter product name");
      return;
    }

    if (!formData.volume.trim()) {
      alert("Please enter product volume");
      return;
    }

    if (!formData.price || Number(formData.price) < 0) {
      alert("Please enter a valid price");
      return;
    }

    if (!formData.stock || Number(formData.stock) < 0) {
      alert("Please enter valid stock");
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    onSave(productData);

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/80
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-[650px]
          overflow-y-auto
          rounded-2xl
          border
          border-gray-800
          bg-[#0b0b0b]
          shadow-2xl
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-800
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-xl font-semibold">
              {isEditing
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isEditing
                ? "Update your product information"
                : "Add a new product to your store"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-gray-500
              transition
              hover:bg-gray-800
              hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* PRODUCT NAME */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Johnnie Walker Black Label"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-800
                bg-[#151515]
                px-4
                text-sm
                text-white
                outline-none
                placeholder:text-gray-600
                focus:border-yellow-400
              "
            />
          </div>

          {/* CATEGORY + VOLUME */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-gray-800
                  bg-[#151515]
                  px-4
                  text-sm
                  text-white
                  outline-none
                  focus:border-yellow-400
                "
              >
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

            <div>
              <label className="mb-2 block text-sm font-medium">
                Volume / Size
              </label>

              <input
                type="text"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                placeholder="750 ML"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-gray-800
                  bg-[#151515]
                  px-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-600
                  focus:border-yellow-400
                "
              />
            </div>

          </div>

          {/* PRICE + STOCK */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  placeholder="3200"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-gray-800
                    bg-[#151515]
                    pl-9
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-gray-600
                    focus:border-yellow-400
                  "
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="25"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-gray-800
                  bg-[#151515]
                  px-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-600
                  focus:border-yellow-400
                "
              />
            </div>

          </div>

          {/* IMAGE */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Image
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/images/products/product.png"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-800
                bg-[#151515]
                px-4
                text-sm
                text-white
                outline-none
                placeholder:text-gray-600
                focus:border-yellow-400
              "
            />

            {/* IMAGE PREVIEW */}

            {formData.image ? (
              <div className="mt-3 flex h-[110px] w-[110px] items-center justify-center rounded-xl bg-[#151515] p-3">

                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />

              </div>
            ) : (
              <div className="mt-3 flex h-[110px] w-[110px] items-center justify-center rounded-xl bg-[#151515]">
                <Package
                  size={30}
                  className="text-gray-600"
                />
              </div>
            )}
          </div>

          {/* STATUS */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-800
                bg-[#151515]
                px-4
                text-sm
                text-white
                outline-none
                focus:border-yellow-400
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

          {/* BUTTONS */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              border-t
              border-gray-800
              pt-5
              sm:flex-row
              sm:justify-end
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-700
                px-5
                py-3
                font-semibold
                text-gray-300
                transition
                hover:border-white
                hover:text-white
              "
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-yellow-400
                px-6
                py-3
                font-bold
                text-black
                transition
                hover:bg-yellow-300
              "
            >
              <Save size={18} />

              {isEditing
                ? "SAVE CHANGES"
                : "ADD PRODUCT"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default ProductFormModal;