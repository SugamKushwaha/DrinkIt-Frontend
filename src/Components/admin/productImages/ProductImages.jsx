import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  UploadCloud,
  Search,
  Trash2,
  X,
  ImageOff,
  Loader2,
  ImagePlus,
} from "lucide-react";

import {
  getAllProductImages,
  uploadProductImage,
  deleteProductImage,
} from "../../../api/productImageApi";


const ProductImages = () => {

  // =====================================================
  // LIST STATE
  // =====================================================

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");


  // =====================================================
  // UPLOAD FORM STATE
  // =====================================================

  const [productName, setProductName] = useState("");

  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState("");

  const [uploading, setUploading] = useState(false);

  const [formError, setFormError] = useState("");

  const fileInputRef = useRef(null);


  // =====================================================
  // DELETE STATE
  // =====================================================

  const [deletingId, setDeletingId] = useState(null);


  // =====================================================
  // LOAD IMAGES
  // =====================================================

  const loadImages = async () => {

    try {

      setLoading(true);

      const data = await getAllProductImages();

      setImages(data || []);

    } catch (error) {

      console.error(
        "Failed to load product images:",
        error
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    loadImages();

  }, []);


  // =====================================================
  // FILE SELECT
  // =====================================================

  const handleFileSelect = (e) => {

    const selected = e.target.files?.[0];

    if (!selected) {
      return;
    }

    if (!selected.type.startsWith("image/")) {

      setFormError(
        "Please select a valid image file."
      );

      return;
    }

    setFormError("");

    setFile(selected);

    setPreview(URL.createObjectURL(selected));
  };


  const resetForm = () => {

    setProductName("");

    setFile(null);

    setPreview("");

    setFormError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  // =====================================================
  // UPLOAD
  // =====================================================

  const handleUpload = async (e) => {

    e.preventDefault();


    if (!productName.trim()) {

      setFormError(
        "Please enter the exact product name."
      );

      return;
    }

    if (!file) {

      setFormError(
        "Please choose an image to upload."
      );

      return;
    }


    try {

      setUploading(true);

      setFormError("");

      await uploadProductImage(
        productName.trim(),
        file
      );

      resetForm();

      await loadImages();

    } catch (error) {

      console.error(error);

      setFormError(
        error.response?.data?.message ||
          "Unable to upload image. Please try again."
      );

    } finally {

      setUploading(false);
    }
  };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (image) => {

    const confirmed = window.confirm(
      `Remove the image saved for "${image.productName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {

      setDeletingId(image.id);

      await deleteProductImage(image.id);

      setImages((prev) =>
        prev.filter((img) => img.id !== image.id)
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to delete this image."
      );

    } finally {

      setDeletingId(null);
    }
  };


  // =====================================================
  // FILTERED LIST
  // =====================================================

  const filteredImages = useMemo(() => {

    const query = search.trim().toLowerCase();

    if (!query) {
      return images;
    }

    return images.filter((img) =>
      img.productName?.toLowerCase().includes(query)
    );

  }, [images, search]);


  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Product Images
        </h1>

        <p className="mt-1 text-gray-500">
          Upload and manage product images independently
          of the product catalog. Vendors auto-fetch
          images from here by matching the product name
          exactly, so upload before (or as soon as
          possible after) vendors add matching products.
        </p>

      </div>


      {/* =================================================
          UPLOAD FORM
      ================================================= */}

      <form
        onSubmit={handleUpload}
        className="
          rounded-2xl
          border
          border-white/10
          bg-[#151515]
          p-6
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-white
          "
        >

          <ImagePlus size={18} className="text-red-500" />

          Upload New Image

        </div>


        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">


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

            {preview ? (

              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-contain"
              />

            ) : (

              <ImageOff
                size={26}
                className="text-gray-600"
              />

            )}

          </div>


          {/* FIELDS */}

          <div className="flex-1 space-y-3">

            <div className="grid gap-3 sm:grid-cols-2">

              <div>

                <label className="text-xs text-gray-400">
                  Product Name (must match exactly)
                </label>

                <input
                  type="text"
                  value={productName}
                  onChange={(e) => {
                    setFormError("");
                    setProductName(e.target.value);
                  }}
                  placeholder="Johnnie Walker Black Label"
                  className="
                    mt-1
                    h-11
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

              </div>


              <div>

                <label className="text-xs text-gray-400">
                  Image File
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="
                    mt-1
                    block
                    w-full
                    text-sm
                    text-gray-400
                    file:mr-3
                    file:rounded-lg
                    file:border-0
                    file:bg-red-600
                    file:px-3
                    file:py-2
                    file:text-xs
                    file:font-semibold
                    file:text-white
                    hover:file:bg-red-700
                  "
                />

              </div>

            </div>


            {formError && (

              <p className="text-xs text-red-500">
                {formError}
              </p>

            )}


            <div className="flex items-center gap-3">

              <button
                type="submit"
                disabled={uploading}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  hover:bg-red-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {uploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <UploadCloud size={16} />
                )}

                {uploading ? "Uploading..." : "Upload Image"}

              </button>


              {(file || productName) && (

                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    font-medium
                    text-gray-400
                    hover:text-white
                  "
                >

                  <X size={13} />

                  Clear

                </button>

              )}

            </div>

            <p className="text-xs text-gray-500">
              Re-uploading with the same product name
              replaces the existing image for that product.
            </p>

          </div>

        </div>

      </form>


      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="relative max-w-sm">

        <Search
          size={16}
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-500
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name..."
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-[#151515]
            pl-9
            pr-4
            text-sm
            outline-none
            focus:border-red-500
          "
        />

      </div>


      {/* =================================================
          IMAGE GRID
      ================================================= */}

      {loading ? (

        <div className="flex items-center justify-center py-20 text-gray-500">

          <Loader2 size={20} className="mr-2 animate-spin" />

          Loading images...

        </div>

      ) : filteredImages.length === 0 ? (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-[#0f0f0f]
            py-16
            text-center
            text-gray-500
          "
        >

          <ImageOff
            size={30}
            className="mx-auto mb-3 text-gray-600"
          />

          {images.length === 0
            ? "No product images uploaded yet."
            : "No images match your search."}

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >

          {filteredImages.map((img) => (

            <div
              key={img.id}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#151515]
              "
            >

              <div
                className="
                  flex
                  h-[130px]
                  items-center
                  justify-center
                  bg-black
                  p-3
                "
              >

                <img
                  src={img.imageUrl}
                  alt={img.productName}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

              </div>


              <div className="p-3">

                <p
                  className="
                    truncate
                    text-sm
                    font-medium
                    text-white
                  "
                  title={img.productName}
                >
                  {img.productName}
                </p>

                <p className="mt-0.5 truncate text-xs text-gray-500">
                  {img.fileName}
                </p>

              </div>


              <button
                type="button"
                onClick={() => handleDelete(img)}
                disabled={deletingId === img.id}
                className="
                  absolute
                  right-2
                  top-2
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-black/70
                  text-gray-300
                  opacity-0
                  transition
                  hover:bg-red-600
                  hover:text-white
                  group-hover:opacity-100
                  disabled:opacity-50
                "
                title="Delete image"
              >

                {deletingId === img.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}

              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};


export default ProductImages;