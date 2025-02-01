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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h1 className="font-bold text-lg text-white mb-4 md:mb-0">Products</h1>
        <button
          className="bg-gray-700 px-3 py-2 rounded-md text-sm md:text-base"
          onClick={() => router.push("/dashboard/products/addNew")}
        >
          Add New Product
        </button>
      </div>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-white min-w-[600px]">
            <thead>
              <tr>
                <td className="py-2 px-4 text-center min-w-[200px]">Name</td>
                <td className="py-2 px-4 text-center min-w-[100px]">Price</td>
                <td className="py-2 px-4 text-center min-w-[150px]">
                  Original Price
                </td>
                <td className="py-2 px-4 text-center min-w-[150px]">
                  Category
                </td>
                <td className="py-2 px-4 text-center min-w-[150px]">
                  CreatedAt
                </td>
              </tr>
            </thead>

            <tbody>
              {products.map((product: Product) => (
                <tr
                  key={product._id}
                  onClick={() => handleRowClick(product.currentSlug)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <td className="p-4">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={product.imageUrl}
                        alt="image"
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <h1 className="text-sm md:text-base">{product.name}</h1>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-center md:text-base">
                    $ {product.price}
                  </td>
                  <td className="py-4 text-sm text-center md:text-base">
                    $ {product.originalPrice}
                  </td>
                  <td className="py-4 text-sm text-center md:text-base">
                    {product.category}
                  </td>
                  <td className="py-4 text-sm text-center md:text-base">
                    {new Date(product._createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-white">No products available.</p>
      )}
    </div>
  );
};

export default Products;
