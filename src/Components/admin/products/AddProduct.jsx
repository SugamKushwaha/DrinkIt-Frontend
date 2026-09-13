import React, { useRef, useState } from "react";

import {
  ArrowLeft,
  UploadCloud,
  Link as LinkIcon,
  X,
  Package,
  Loader2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  addAdminProduct,
} from "../../../api/productApi";

import {
  uploadProductImage,
} from "../../../api/productImageApi";


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

    status: "ACTIVE",

  });


  const [loading, setLoading] =
    useState(false);


  // =====================================================
  // IMAGE STATE
  // =====================================================

  /*
   * "device" -> admin picks a file from their computer/phone,
   *             it gets uploaded to /admin/product-images/upload
   * "url"    -> admin pastes a direct image URL
   */
  const [imageMode, setImageMode] =
    useState("device");

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [imageError, setImageError] =
    useState("");

  const fileInputRef = useRef(null);


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
  // PICK IMAGE FROM DEVICE
  // =====================================================

  const handleFileSelect = (e) => {

    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {

      setImageError(
        "Please select a valid image file."
      );

      return;
    }

    setImageError("");

    setImageFile(file);

    setForm((prev) => ({
      ...prev,
      image: "",
    }));

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };


  const handleRemoveImage = () => {

    setImageFile(null);

    setImagePreview("");

    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleImageModeChange = (mode) => {

    setImageMode(mode);

    setImageError("");

    handleRemoveImage();

    setForm((prev) => ({
      ...prev,
      image: "",
    }));
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!form.name.trim()) {

      alert(
        "Product name is required."
      );

      return;
    }


    if (!form.price) {

      alert(
        "Product price is required."
      );

      return;
    }


    if (
      form.stock === "" ||
      Number(form.stock) < 0
    ) {

      alert(
        "Please enter valid stock."
      );

      return;
    }


    if (
      imageMode === "device" &&
      !imageFile &&
      !form.image
    ) {

      setImageError(
        "Please select a product image from your device."
      );

      return;
    }


    if (
      imageMode === "url" &&
      !form.image.trim()
    ) {

      setImageError(
        "Please enter an image URL."
      );

      return;
    }


    try {

      setLoading(true);


      let imageUrl = form.image;


      // -------------------------------------------------
      // UPLOAD IMAGE FILE FIRST (IF SELECTED)
      // -------------------------------------------------

      if (imageMode === "device" && imageFile) {

        const uploaded =
          await uploadProductImage(
            form.name.trim(),
            imageFile
          );

        imageUrl = uploaded.imageUrl;
      }


      await addAdminProduct({

        name: form.name,

        brand: form.brand,

        category: form.category,

        price: Number(form.price),

        oldPrice:
          Number(form.oldPrice || 0),

        volume: form.volume,

        description: form.description,

        image: imageUrl,

        stock: Number(form.stock),

        popular: form.popular,

        status: form.status,

      });


      alert(
        "Product added successfully."
      );


      navigate(
        "/admin/products"
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to add product."
      );

    } finally {

      setLoading(false);
    }
  };


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


      <div>

        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="mt-1 text-gray-500">
          Add a new product to the DrinkIt catalog.
        </p>

      </div>


      <form
        onSubmit={handleSubmit}
        className="
          space-y-6
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-6
        "
      >


        <div className="grid gap-5 md:grid-cols-2">


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


          {/* CATEGORY */}

          <div>

            <label className="text-sm text-gray-400">
              Category
            </label>

            <select
              name="category"
              value={form.category}
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

              <option value="Whisky">
                Whisky
              </option>

              <option value="Vodka">
                Vodka
              </option>

              <option value="Wine">
                Wine
              </option>

              <option value="Beer">
                Beer
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

        </div>


        {/* =================================================
            PRODUCT IMAGE
        ================================================= */}

        <div>

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <label className="text-sm text-gray-400">
              Product Image
            </label>


            {/* MODE TOGGLE */}

            <div
              className="
                flex
                rounded-lg
                border
                border-white/10
                bg-black
                p-1
                text-xs
              "
            >

              <button
                type="button"
                onClick={() =>
                  handleImageModeChange("device")
                }
                className={`
                  flex
                  items-center
                  gap-1
                  rounded-md
                  px-3
                  py-1.5
                  font-medium
                  transition
                  ${
                    imageMode === "device"
                      ? "bg-red-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >

                <UploadCloud size={14} />

                Upload from device

              </button>

              <button
                type="button"
                onClick={() =>
                  handleImageModeChange("url")
                }
                className={`
                  flex
                  items-center
                  gap-1
                  rounded-md
                  px-3
                  py-1.5
                  font-medium
                  transition
                  ${
                    imageMode === "url"
                      ? "bg-red-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >

                <LinkIcon size={14} />

                Image URL

              </button>

            </div>

          </div>


          <div className="mt-3 flex items-start gap-4">


            {/* PREVIEW */}

            <div
              className="
                flex
                h-[110px]
                w-[110px]
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-black
              "
            >

              {imageMode === "device" &&
              imagePreview ? (

                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />

              ) : imageMode === "url" &&
                form.image ? (

                <img
                  src={form.image}
                  alt="Preview"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />

              ) : (

                <Package
                  size={28}
                  className="text-gray-600"
                />

              )}

            </div>


            {/* CONTROLS */}

            <div className="flex-1 space-y-2">

              {imageMode === "device" ? (

                <>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="
                      block
                      w-full
                      text-sm
                      text-gray-400
                      file:mr-4
                      file:rounded-lg
                      file:border-0
                      file:bg-red-600
                      file:px-4
                      file:py-2
                      file:text-sm
                      file:font-semibold
                      file:text-white
                      hover:file:bg-red-700
                    "
                  />

                  <p className="text-xs text-gray-500">
                    JPG, PNG or WEBP. This image gets
                    saved against the product name, so
                    vendors adding the same product will
                    see it auto-filled.
                  </p>

                  {imageFile && (

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        font-medium
                        text-red-400
                        hover:text-red-300
                      "
                    >

                      <X size={12} />

                      Remove selected image

                    </button>

                  )}

                </>

              ) : (

                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={(e) => {
                    setImageError("");
                    handleChange(e);
                  }}
                  placeholder="https://example.com/product.png"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-black
                    px-4
                    text-sm
                    outline-none
                    focus:border-red-500
                  "
                />

              )}


              {imageError && (

                <p className="text-xs text-red-500">
                  {imageError}
                </p>

              )}

            </div>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div>

          <label className="text-sm text-gray-400">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
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
            placeholder="Product description..."
          />

        </div>


        {/* POPULAR */}

        <label
          className="
            flex
            cursor-pointer
            items-center
            gap-3
          "
        >

          <input
            type="checkbox"
            name="popular"
            checked={form.popular}
            onChange={handleChange}
            className="h-4 w-4"
          />

          <span className="text-sm">
            Show in Popular Tonight
          </span>

        </label>


        {/* STATUS */}

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
          disabled={loading}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-600
            py-3
            font-semibold
            hover:bg-red-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          {loading && (
            <Loader2
              size={18}
              className="animate-spin"
            />
          )}

          {loading
            ? "Adding Product..."
            : "Add Product"}

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
        focus:border-red-500
      "
    />

  </div>
);


export default AddProduct;