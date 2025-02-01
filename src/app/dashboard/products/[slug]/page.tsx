"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  available: boolean;
  currentSlug: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  category: string;
  _createdAt: string;
};

const ProductSinglePage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(false);

  // Fetch product data when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type=="food" && slug.current=="${(await params).slug}"][0]{ 
          _id, name, available, "currentSlug": slug.current,
          "imageUrl": image.asset->url, price, originalPrice, category, _createdAt
        }`;
        const data: Product = await client.fetch(query);
        setProduct(data);
        setAvailability(data.available);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      await client.patch(product._id).set({ available: availability }).commit();

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (!product) return <p className="text-red-500">Product not found.</p>;

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={250}
            height={250}
            className="w-full bg-[#182237] p-4 rounded-md"
          />
        </div>
        <form onSubmit={handleSubmit} className="sm:col-span-2 space-y-2">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={product.name}
              readOnly
              className="w-full bg-[#182237] p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={product.price}
              readOnly
              className="w-full bg-[#182237] p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="originalPrice">Original Price</label>
            <input
              type="number"
              id="originalPrice"
              value={product.originalPrice}
              readOnly
              className="w-full bg-[#182237] p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={product.category}
              readOnly
              className="w-full bg-[#182237] p-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="createdAt">Created At</label>
            <input
              type="text"
              id="createdAt"
              value={new Date(product._createdAt).toLocaleString()} // Format Date
              readOnly
              className="w-full bg-[#182237] p-2 rounded-md"
            />
          </div>
          {/* Availability Toggle */}
          <div>
            <label htmlFor="availability">Availability</label>
            <select
              id="availability"
              value={availability ? "Available" : "Unavailable"}
              onChange={(e) => setAvailability(e.target.value === "Available")}
              className="w-full bg-[#182237] p-2 rounded-md"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md w-full mt-2"
          >
            {loading ? "Updating.." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductSinglePage;
