import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
  Save,
  Package,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  getProductImage,
} from "../../../api/productImageApi";


const emptyProduct = {
  name: "",
  category: "Whisky",
  volume: "",
  price: "",
  stock: "",
  image: "",
  status: "ACTIVE",
};


/*
 * How long to wait after the vendor stops typing
 * the product name before we auto-fetch the image.
 */
const IMAGE_LOOKUP_DELAY_MS = 600;


const ProductFormModal = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {

  const [formData, setFormData] =
    useState(emptyProduct);

  const [saving, setSaving] =
    useState(false);


  // =====================================================
  // AUTO IMAGE LOOKUP STATE
  //
  // idle    -> nothing typed yet / name cleared
  // loading -> looking up the image for current name
  // found   -> image auto-filled from admin's catalog
  // missing -> no matching product image on file
  // =====================================================

  const [imageLookupStatus, setImageLookupStatus] =
    useState("idle");

  const lookupTimeoutRef = useRef(null);

  const lastLookedUpNameRef = useRef("");


  const isEditing =
    Boolean(product);


  // =====================================================
  // LOAD PRODUCT
  // =====================================================

  useEffect(() => {

    if (product) {

      setFormData({
        id: product.id,

        name:
          product.name || "",

        category:
          product.category || "Whisky",

        volume:
          product.volume || "",

        price:
          product.price ?? "",

        stock:
          product.stock ?? "",

        image:
          product.image || "",

        status:
          product.status || "ACTIVE",
      });

      lastLookedUpNameRef.current =
        (product.name || "")
          .trim()
          .toLowerCase();

      setImageLookupStatus(
        product.image ? "found" : "idle"
      );

    } else {

      setFormData({
        ...emptyProduct,
      });

      lastLookedUpNameRef.current = "";

      setImageLookupStatus("idle");

    }

  }, [product, isOpen]);


  // =====================================================
  // CLEAR PENDING LOOKUP ON UNMOUNT
  // =====================================================

  useEffect(() => {

    return () => {

      if (lookupTimeoutRef.current) {
        clearTimeout(lookupTimeoutRef.current);
      }
    };

  }, []);


  // =====================================================
  // AUTO-FETCH IMAGE BY PRODUCT NAME
  // =====================================================

  const fetchImageForName = async (rawName) => {

    const name = rawName.trim();


    if (!name) {

      setImageLookupStatus("idle");

      return;
    }


    setImageLookupStatus("loading");


    try {

      const result =
        await getProductImage(name);

      lastLookedUpNameRef.current =
        name.toLowerCase();

      setFormData((prev) => {

        /*
         * Guard against the name having changed
         * again while this request was in flight.
         */
        if (
          prev.name.trim().toLowerCase() !==
          name.toLowerCase()
        ) {
          return prev;
        }

        return {
          ...prev,
          image: result?.imageUrl || "",
        };
      });

      setImageLookupStatus(
        result?.imageUrl ? "found" : "missing"
      );

    } catch (error) {

      lastLookedUpNameRef.current =
        name.toLowerCase();

      /*
       * No image on file for this product name yet
       * (backend returns 404 style error).
       */
      setFormData((prev) => {

        if (
          prev.name.trim().toLowerCase() !==
          name.toLowerCase()
        ) {
          return prev;
        }

        return {
          ...prev,
          image: "",
        };
      });

      setImageLookupStatus("missing");
    }
  };


  const scheduleImageLookup = (name) => {

    if (lookupTimeoutRef.current) {
      clearTimeout(lookupTimeoutRef.current);
    }

    const trimmed = name.trim();

    if (!trimmed) {

      setImageLookupStatus("idle");

      return;
    }

    if (
      trimmed.toLowerCase() ===
      lastLookedUpNameRef.current
    ) {
      return;
    }

    lookupTimeoutRef.current = setTimeout(() => {

      fetchImageForName(trimmed);

    }, IMAGE_LOOKUP_DELAY_MS);
  };


  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      scheduleImageLookup(value);
    }
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!formData.name.trim()) {

      alert(
        "Please enter product name."
      );

      return;
    }


    if (!formData.volume.trim()) {

      alert(
        "Please enter product volume."
      );

      return;
    }


    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {

      alert(
        "Please enter a valid price."
      );

      return;
    }


    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {

      alert(
        "Please enter valid stock."
      );

      return;
    }


    const productData = {

      name:
        formData.name.trim(),

      category:
        formData.category,

      volume:
        formData.volume.trim(),

      price:
        Number(formData.price),

      stock:
        Number(formData.stock),

      image:
        formData.image.trim(),

      status:
        formData.status,
    };


    try {

      setSaving(true);

      await onSave(
        productData
      );

      onClose();

    } catch (error) {

      console.error(
        "Product save error:",
        error
      );

    } finally {

      setSaving(false);

    }
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
            disabled={saving}
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

          {/* NAME */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Product Name

            </label>

            <div className="relative">

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
                  pr-10
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-600
                  focus:border-yellow-400
                "
              />

              <span
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              >

                {imageLookupStatus === "loading" && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

              </span>

            </div>

            <p className="mt-2 text-xs text-gray-500">

              Type the exact product name used by the
              admin catalog and we'll pull in the
              matching product image automatically.

            </p>

          </div>


          {/* CATEGORY + VOLUME */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >

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

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >

            <div>

              <label className="mb-2 block text-sm font-medium">

                Price

              </label>

              <div className="relative">

                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                >
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


          {/* IMAGE (AUTO-FETCHED) */}

          <div>

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >

              <label className="block text-sm font-medium">

                Product Image

              </label>


              {formData.name.trim() && (

                <button
                  type="button"
                  onClick={() =>
                    fetchImageForName(formData.name)
                  }
                  disabled={
                    imageLookupStatus === "loading"
                  }
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    font-medium
                    text-yellow-400
                    hover:text-yellow-300
                    disabled:opacity-50
                  "
                >

                  <Search size={12} />

                  Re-check

                </button>

              )}

            </div>


            <div className="flex items-start gap-4">


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
                  border-gray-800
                  bg-[#151515]
                "
              >

                {imageLookupStatus === "loading" ? (

                  <Loader2
                    size={22}
                    className="animate-spin text-gray-500"
                  />

                ) : formData.image ? (

                  <img
                    src={formData.image}
                    alt="Preview"
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
                    size={30}
                    className="text-gray-600"
                  />

                )}

              </div>


              <div className="flex-1 text-sm">

                {imageLookupStatus === "found" && (

                  <p
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-green-400
                    "
                  >

                    <CheckCircle2 size={15} />

                    Image found and auto-filled from the
                    catalog.

                  </p>

                )}

                {imageLookupStatus === "missing" && (

                  <p
                    className="
                      flex
                      items-start
                      gap-1.5
                      text-amber-400
                    "
                  >

                    <AlertCircle
                      size={15}
                      className="mt-0.5 shrink-0"
                    />

                    <span>
                      No image found for this product
                      yet. Ask the admin to upload one,
                      or double-check the spelling of
                      the product name.
                    </span>

                  </p>

                )}

                {imageLookupStatus === "idle" && (

                  <p className="text-gray-500">
                    Start typing the product name above
                    to auto-fetch its image.
                  </p>

                )}

              </div>

            </div>

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
              disabled={saving}
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
              disabled={saving}
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              <Save size={18} />

              {saving
                ? "SAVING..."
                : isEditing
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