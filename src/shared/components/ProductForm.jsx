import { ImagePlus, X } from "lucide-react";
import React from "react";

const ProductForm = ({ handleSubmit ,editingId,setModalOpen}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:p-6">
      <div className="my-auto flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-slate-950/20">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 py-5 sm:px-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ImagePlus size={19} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Product Management
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {editingId !== null ? "Edit Product" : "Add Product"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add your product details and keep your catalogue updated.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          {/* Scrollable Content — scrollbar hidden */}
          <div className="no-scrollbar min-h-0 flex-1 space-y-6 overflow-y-auto bg-slate-50/70 px-6 py-6 sm:px-8">
            {/* Product Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Classic T-Shirt"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Description */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">
                  Product Description
                </label>
                <span className="text-xs text-slate-400">
                  {form.description.length}/1000
                </span>
              </div>

              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the product, its features, material, or size..."
                maxLength={1000}
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option>Clothing</option>
                  <option>Footwear</option>
                  <option>Accessories</option>
                  <option>Electronics</option>
                  <option>Home</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="499"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="20"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Image
              </label>

              {imagePreview && (
                <div className="mb-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="h-20 w-20 rounded-xl border border-slate-100 bg-slate-50 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {imageFile?.name || "Product image"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Image preview</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                      setForm({ ...form, image: "" });
                    }}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              )}

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-5 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                  <ImagePlus size={23} />
                </span>

                <span className="text-sm font-semibold text-slate-800">
                  {imageFile
                    ? "Choose a different image"
                    : "Upload product image"}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  Click to browse files · JPG, PNG, WebP · Max 5 MB
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size > 5 * 1024 * 1024) {
                      window.alert("Please choose an image smaller than 5 MB.");
                      e.target.value = "";
                      return;
                    }

                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    setForm({ ...form, image: "" });
                  }}
                />
              </label>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:px-8">
            <p className="hidden text-xs text-slate-400 sm:block">
              <span className="text-red-500">*</span> Required fields
            </p>

            <div className="ml-auto flex gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                {editingId !== null ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
