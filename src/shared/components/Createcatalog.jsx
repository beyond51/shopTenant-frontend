import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../app/config/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { createCatalogApi, editCatalogApi } from "../apis/createCatalogApi";

const CreateProductCatalog = () => {
  let navigate = useNavigate();
  let { user } = useSelector((store) => store.loggedInUser);
  let { editFormData } = useSelector((store) => store.editProduct);
  const categories = [
    "Electronics",
    "Fashion",
    "Shoes",
    "Beauty",
    "Cosmetics",
    "Home & Kitchen",
    "Furniture",
    "Grocery",
    "Books",
    "Toys & Games",
    "Sports & Fitness",
    "Health & Wellness",
    "Jewellery",
    "Watches",
    "Bags & Luggage",
    "Mobile Phones",
    "Computers & Accessories",
    "Gaming",
    "Cameras",
    "Appliances",
    "Automotive",
    "Baby Products",
    "Pet Supplies",
    "Office Supplies",
    "Stationery",
    "Musical Instruments",
    "Garden & Outdoor",
    "Tools & Hardware",
    "Arts & Crafts",
    "Handmade",
    "Gift Items",
    "Food & Beverages",
    "Industrial Supplies",
    "Medical Supplies",
    "Lighting",
    "Decor",
    "Travel Accessories",
    "Smart Devices",
    "Accessories",
    "Other",
  ];

  const [product, setProduct] = useState({
    productName: editFormData?.productName || "",
    sellingPrice: editFormData?.sellingPrice || "",
    oldPrice: editFormData?.oldPrice || "",
    category: editFormData?.category || "",
    stock: editFormData?.stock || "",
    productImage: editFormData?.productImage[0] || "",
    description: editFormData?.description || "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "productImage" ? files[0] : value,
    }));
  };

  let editCatalogMutation = useMutation({
    mutationFn: (id, formData) => editCatalogApi(id, formData),
    onSuccess: () => {
      navigate("/home/products");
    },
  });

  let createCatalogMutation = useMutation({
    mutationFn: (formData) => createCatalogApi(formData),
    onSuccess: (data) => {
      navigate("/home/products");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("sellingPrice", product.sellingPrice);
    formData.append("oldPrice", product.oldPrice);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    formData.append("description", product.description);
    formData.append("productImage", product.productImage);

    if (editFormData) {
      editCatalogMutation.mutate({ id: editFormData._id, formData });
    } else {
      createCatalogMutation.mutate({ formData });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      {user?.setupSteps?.setUpStore ? (
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Create Product Catalog
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5 lg:flex gap-5">
            {/* Product Name */}
            <div>
              <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Price */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Old Price</label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={product.oldPrice}
                    onChange={handleChange}
                    placeholder="₹1499"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Selling Price
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={product.sellingPrice}
                    onChange={handleChange}
                    placeholder="₹999"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500 max-h-60 overflow-y-auto"
                  required
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock */}
              <div>
                <label className="block mb-1 font-medium">Stock Status</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="enter the stock, example:10"
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block mb-1 font-medium">
                  Upload Product Image
                </label>

                <input
                  type="file"
                  name="productImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  required={!editFormData}
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              {/* Description */}
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product details"
                  rows="4"
                  className="w-full border min-h-50 resize-none p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  editFormData
                    ? editCatalogMutation.isPending
                    : createCatalogMutation.isPending
                }
                className={
                  (
                    editFormData
                      ? editCatalogMutation.isPending
                      : createCatalogMutation.isPending
                  )
                    ? "bg-gray-500 w-full  text-white py-3 rounded-xl"
                    : "w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-semibold"
                }
              >
                {(
                  editFormData
                    ? editCatalogMutation.isPending
                    : createCatalogMutation.isPending
                )
                  ? "Processing..."
                  : "Add Product"}
              </button>
            </div>{" "}
          </form>
        </div>
      ) : (
        <div className="max-w-lg mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Set Up Your Store</h1>

          <p className="text-gray-600 text-lg">
            Before creating your first catalog, you need to complete your store
            profile. Add your store details, branding, and contact information
            so customers can recognize and trust your business.
          </p>

          <div className="mt-8 space-y-2 text-sm text-gray-500">
            <p>✓ Store name and description</p>
            <p>✓ Logo images</p>
            <p>✓ Contact information</p>
          </div>

          <button className="mt-8 px-6 py-3 bg-black text-white rounded-lg font-medium hover:opacity-90">
            Set Up Store
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateProductCatalog;
