import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";

import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/categoryApi";

const AdminCategories = () => {
  // =====================================================
  // STATE
  // =====================================================

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    image: null,
    imagePreview: "",
    active: true,
  });

  const fileInputRef =
    useRef(null);

  // =====================================================
  // API ERROR HELPER
  // =====================================================

  const getErrorMessage = (err, fallback) => {
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data ||
      fallback
    );
  };

  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getAdminCategories();

      setCategories(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(
        "Load categories error:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Unable to load categories."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadCategories();
  }, []);

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setForm({
      name: "",
      image: null,
      imagePreview: "",
      active: true,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // OPEN CREATE
  // =====================================================

  const openCreate = () => {
    setEditingId(null);

    resetForm();

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEdit = (category) => {
    setEditingId(category.id);

    setForm({
      name: category.name || "",
      image: null,
      imagePreview: category.image || "",
      active:
        category.active !== false,
    });

    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);

    setEditingId(null);

    resetForm();
  };

  // =====================================================
  // NAME CHANGE
  // =====================================================

  const handleNameChange = (e) => {
    setForm((prev) => ({
      ...prev,
      name: e.target.value,
    }));

    setError("");
  };

  // =====================================================
  // ACTIVE CHANGE
  // =====================================================

  const handleActiveChange = (e) => {
    setForm((prev) => ({
      ...prev,
      active: e.target.checked,
    }));
  };

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      e.target.value = "";

      return;
    }

    // Check file size - 5 MB
    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );

      e.target.value = "";

      return;
    }

    // Create preview
    const previewUrl =
      URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image: file,
      imagePreview: previewUrl,
    }));

    setError("");
  };

  // =====================================================
  // REMOVE SELECTED IMAGE
  // =====================================================

  const removeSelectedImage = () => {
    setForm((prev) => ({
      ...prev,
      image: null,
      imagePreview:
        editingId
          ? categories.find(
              (category) =>
                category.id === editingId
            )?.image || ""
          : "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validate name
    if (!form.name.trim()) {
      setError(
        "Category name is required."
      );

      return;
    }

    // Image required only during CREATE
    if (!editingId && !form.image) {
      setError(
        "Please select a category image."
      );

      return;
    }

    try {
      setSaving(true);

      // =================================================
      // FORM DATA
      // =================================================

      const formData =
        new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "active",
        String(form.active)
      );

      // Add image only when selected
      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      // =================================================
      // UPDATE
      // =================================================

      if (editingId) {
        await updateCategory(
          editingId,
          formData
        );
      }

      // =================================================
      // CREATE
      // =================================================

      else {
        await createCategory(
          formData
        );
      }

      // Reload
      await loadCategories();

      // Close modal
      setShowModal(false);

      setEditingId(null);

      resetForm();

    } catch (err) {
      console.error(
        "Save category error:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Unable to save category."
        )
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    category
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${category.name}"?`
      );

    if (!confirmed) return;

    try {
      setDeletingId(category.id);

      setError("");

      await deleteCategory(
        category.id
      );

      setCategories(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== category.id
          )
      );

    } catch (err) {
      console.error(
        "Delete category error:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Unable to delete category."
        )
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw
            size={30}
            className="animate-spin mx-auto text-yellow-500"
          />

          <p className="mt-4 text-gray-500">
            Loading categories...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >

        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500 mt-1">
            Manage categories shown on
            the customer shop.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-yellow-500
            hover:bg-yellow-400
            text-black
            font-semibold
            px-5
            py-3
            rounded-xl
            transition
          "
        >
          <Plus size={18} />

          Add Category
        </button>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          className="
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            rounded-xl
            p-4
          "
        >
          {error}
        </div>
      )}

      {/* =================================================
          CATEGORY LIST
      ================================================= */}

      <div
        className="
          bg-[#151515]
          border
          border-white/10
          rounded-2xl
          overflow-hidden
        "
      >

        {categories.length === 0 ? (

          <div
            className="
              py-20
              text-center
              text-gray-500
            "
          >

            <ImageIcon
              size={40}
              className="mx-auto mb-4 opacity-40"
            />

            <p>
              No categories found.
            </p>

            <button
              onClick={openCreate}
              className="
                mt-4
                text-yellow-500
                hover:text-yellow-400
              "
            >
              Add your first category
            </button>

          </div>

        ) : (

          <div className="divide-y divide-white/10">

            {categories.map(
              (category) => (

                <div
                  key={category.id}
                  className="
                    p-4
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-4
                  "
                >

                  {/* IMAGE */}

                  <div
                    className="
                      w-full
                      sm:w-28
                      h-24
                      rounded-xl
                      overflow-hidden
                      bg-black
                      border
                      border-white/10
                      shrink-0
                    "
                  >

                    {category.image ? (

                      <img
                        src={category.image}
                        alt={category.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          text-gray-600
                        "
                      >
                        <ImageIcon
                          size={28}
                        />
                      </div>
                    )}

                  </div>

                  {/* DETAILS */}

                  <div className="flex-1">

                    <h3
                      className="
                        text-lg
                        font-semibold
                      "
                    >
                      {category.name}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        mt-1
                      "
                    >
                      ID: {category.id}
                    </p>

                    <span
                      className={`
                        inline-flex
                        mt-2
                        px-2.5
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        ${
                          category.active
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }
                      `}
                    >
                      {category.active
                        ? "ACTIVE"
                        : "INACTIVE"}
                    </span>

                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <button
                      onClick={() =>
                        openEdit(category)
                      }
                      className="
                        w-10
                        h-10
                        rounded-lg
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        hover:text-yellow-400
                        hover:border-yellow-500/40
                        transition
                      "
                      title="Edit category"
                    >
                      <Pencil
                        size={17}
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(category)
                      }
                      disabled={
                        deletingId ===
                        category.id
                      }
                      className="
                        w-10
                        h-10
                        rounded-lg
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        hover:text-red-400
                        hover:border-red-500/40
                        disabled:opacity-50
                        transition
                      "
                      title="Delete category"
                    >

                      {deletingId ===
                      category.id ? (

                        <RefreshCw
                          size={17}
                          className="animate-spin"
                        />

                      ) : (

                        <Trash2
                          size={17}
                        />

                      )}

                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/75
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-lg
              max-h-[90vh]
              overflow-y-auto
              bg-[#151515]
              border
              border-white/10
              rounded-2xl
              p-6
            "
          >

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-6
              "
            >

              <div>

                <h2 className="text-xl font-bold">
                  {editingId
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  {editingId
                    ? "Update category details and image."
                    : "Create a new customer category."}
                </p>

              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                className="
                  text-gray-500
                  hover:text-white
                  disabled:opacity-50
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
              className="space-y-5"
            >

              {/* NAME */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                  "
                >
                  Category Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={
                    handleNameChange
                  }
                  placeholder="e.g. Beer"
                  disabled={saving}
                  className="
                    w-full
                    bg-black
                    border
                    border-white/10
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-yellow-500
                    disabled:opacity-50
                  "
                />

              </div>

              {/* IMAGE */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                  "
                >
                  Category Image
                </label>

                <div
                  className="
                    border
                    border-dashed
                    border-white/20
                    rounded-xl
                    p-4
                    bg-black/50
                  "
                >

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={
                      handleImageChange
                    }
                    disabled={saving}
                    className="
                      block
                      w-full
                      text-sm
                      text-gray-400

                      file:mr-4
                      file:rounded-lg
                      file:border-0
                      file:bg-yellow-500
                      file:px-4
                      file:py-2
                      file:font-semibold
                      file:text-black

                      hover:file:bg-yellow-400
                      disabled:opacity-50
                    "
                  />

                  <p className="text-xs text-gray-600 mt-2">
                    PNG, JPG or WEBP. Maximum
                    5 MB.
                  </p>

                </div>

              </div>

              {/* IMAGE PREVIEW */}

              {form.imagePreview && (

                <div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-2
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-500
                      "
                    >
                      Image Preview
                    </p>

                    {form.image && (

                      <button
                        type="button"
                        onClick={
                          removeSelectedImage
                        }
                        className="
                          text-xs
                          text-red-400
                          hover:text-red-300
                        "
                      >
                        Remove selected
                      </button>

                    )}

                  </div>

                  <div
                    className="
                      relative
                      w-full
                      h-44
                      rounded-xl
                      overflow-hidden
                      border
                      border-white/10
                      bg-black
                    "
                  >

                    <img
                      src={
                        form.imagePreview
                      }
                      alt="Category preview"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  </div>

                </div>

              )}

              {/* ACTIVE */}

              <label
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                  select-none
                "
              >

                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={
                    handleActiveChange
                  }
                  disabled={saving}
                  className="
                    w-4
                    h-4
                    accent-yellow-500
                  "
                />

                <span className="text-sm text-gray-300">
                  Active category
                </span>

              </label>

              {/* BUTTONS */}

              <div
                className="
                  flex
                  gap-3
                  pt-2
                "
              >

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    flex-1
                    border
                    border-white/10
                    text-gray-400
                    hover:text-white
                    py-3
                    rounded-xl
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-yellow-500
                    hover:bg-yellow-400
                    disabled:opacity-50
                    text-black
                    font-semibold
                    py-3
                    rounded-xl
                  "
                >

                  {saving ? (
                    <>
                      <RefreshCw
                        size={17}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Upload
                        size={17}
                      />

                      {editingId
                        ? "Update Category"
                        : "Create Category"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminCategories;