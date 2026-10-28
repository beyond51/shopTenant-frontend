import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  X,
  ImagePlus,
} from "lucide-react";
import StatusBadge from "../features/products/components/StatusBadge";
import ProductForm from "../shared/components/ProductForm";

const initialProducts = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    description: "Soft, breathable cotton T-shirt for everyday wear.",
    category: "Clothing",
    price: 499,
    stock: 24,
    status: "Active",
    image: "https://placehold.co/100x100/f1f5f9/475569?text=T-Shirt",
  },
  {
    id: 2,
    name: "Casual Sneakers",
    description: "Comfortable everyday sneakers with a lightweight sole.",
    category: "Footwear",
    price: 1299,
    stock: 12,
    status: "Active",
    image: "https://placehold.co/100x100/f1f5f9/475569?text=Shoes",
  },
  {
    id: 3,
    name: "Leather Wallet",
    description: "Compact wallet with multiple card slots.",
    category: "Accessories",
    price: 699,
    stock: 0,
    status: "Out of stock",
    image: "https://placehold.co/100x100/f1f5f9/475569?text=Wallet",
  },
  {
    id: 4,
    name: "Slim Fit Jeans",
    description: "Classic slim-fit denim jeans for casual outfits.",
    category: "Clothing",
    price: 999,
    stock: 5,
    status: "Active",
    image: "https://placehold.co/100x100/f1f5f9/475569?text=Jeans",
  },
];

const emptyForm = {
  name: "",
  description: "",
  category: "Clothing",
  price: "",
  stock: "",
  image: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0,
  );

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setImageFile(null);
    setImagePreview(product.image || "");
    setForm({
      name: product.name,
      description: product.description || "",
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return;
    }

    // imageFile is the selected File object. Send it as FormData when connecting your API.
    const productData = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      price,
      stock,
      status: stock === 0 ? "Out of stock" : "Active",
      // Frontend preview only. Upload imageFile to your backend/ImageKit for persistence.
      image:
        imagePreview ||
        form.image.trim() ||
        "https://placehold.co/100x100/f1f5f9/475569?text=Product",
    };

    if (editingId !== null) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingId ? { ...product, ...productData } : product,
        ),
      );
    } else {
      setProducts((current) => [
        { id: Date.now(), ...productData },
        ...current,
      ]);
    }

    setModalOpen(false);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setProducts((current) => current.filter((product) => product.id !== id));
  };

  return (
    <div className="space-y-6 p-5 sm:p-8">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your shop's products and inventory.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Products</p>
            <Package size={20} className="text-slate-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {products.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">In Stock</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {products.filter((product) => product.stock > 0).length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Stock Units</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">{totalStock}</p>
        </div>
      </div>

      {/* Product list */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-3 text-sm outline-none focus:border-slate-400"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium">Product</th>
                <th className="px-5 py-4 font-medium">Category</th>
                <th className="px-5 py-4 font-medium">Price</th>
                <th className="px-5 py-4 font-medium">Stock</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          product.image ||
                          "https://placehold.co/100x100/f1f5f9/475569?text=Product"
                        }
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/100x100/f1f5f9/475569?text=Product";
                        }}
                        className="h-14 w-14 rounded-lg border border-slate-200 bg-slate-50 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800">
                          {product.name}
                        </p>
                        {product.description && (
                          <p className="mt-0.5 max-w-xs truncate text-xs text-slate-500">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {product.category}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {product.stock}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge product={product} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        title="Edit product"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        title="Delete product"
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center">
                    <Package className="mx-auto text-slate-300" size={32} />
                    <p className="mt-3 font-medium text-slate-700">
                      No products found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try another search or add a product.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit modal */}
      {modalOpen && <ProductForm handleSubmit={handleSubmit} editingId={editingId} setModalOpen={setModalOpen}/>}
    </div>
  );
}
