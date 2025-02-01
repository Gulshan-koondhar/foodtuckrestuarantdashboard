"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Product = {
  _id: string; // Unique identifier for the product
  name: string; // Name of the product
  available: boolean; // Availability status
  currentSlug: string; // Slug for the product
  imageUrl: string; // URL of the product's image
  price: number; // Current price of the product
  originalPrice: number; // Original price of the product
  category: string; // Category of the product
  _createdAt: string; // Creation date as a string (ISO format)
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRowClick = (Slug: string) => {
    router.push(`/dashboard/products/${Slug}`);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = `*[_type == "food"] { _id,
        name, available, "currentSlug": slug.current,
        "imageUrl": image.asset->url, price, originalPrice, category,_createdAt
      }`;

      try {
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#182237] w-full p-5 rounded-md my-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-lg text-white">Products</h1>
        <button
          className="bg-gray-700 px-3 py-2 rounded-md"
          onClick={() => router.push("/dashboard/products/addNew")}
        >
          Add New Product
        </button>
      </div>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : products.length > 0 ? (
        <table className="w-full text-white">
          <thead>
            <tr>
              <td className="py-4">Name</td>
              <td className="py-4">Price</td>
              <td className="py-4">Original Price</td>
              <td className="py-4">Category</td>
              <td className="py-4">CreatedAt</td>
            </tr>
          </thead>

          <tbody>
            {products.map((product: Product) => (
              <tr
                key={product._id}
                onClick={() => handleRowClick(product.currentSlug)}
                className="cursor-pointer hover:bg-gray-700"
              >
                <td className="py-4">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={product.imageUrl}
                      alt="image"
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <h1>{product.name}</h1>
                  </div>
                </td>
                <td className="py-4">$ {product.price}</td>
                <td className="py-4">$ {product.originalPrice}</td>
                <td className="py-4">{product.category}</td>
                <td className="py-4">
                  {new Date(product._createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white">No products available.</p>
      )}
    </div>
  );
};

export default Products;
