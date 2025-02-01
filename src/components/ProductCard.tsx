"use client";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";

const ProductCard = () => {
  const [products, setProducts] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = `*[_type == "food"] { _id }`;

      try {
        const data = await client.fetch(query);
        setProducts(data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#182237] p-5 w-full flex flex-col gap-3 rounded-md">
      <h1 className="font-semibold text-lg">Total Products</h1>
      {loading ? (
        <h3 className="font-bold text-xl text-white">Loading...</h3>
      ) : products !== null ? (
        <h3 className="font-bold text-xl text-white">{products}</h3>
      ) : (
        <h3 className="font-bold text-xl text-red-500">Error loading data</h3>
      )}
    </div>
  );
};

export default ProductCard;
