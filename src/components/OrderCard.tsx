"use client";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";

const OrderCard = () => {
  const [totalOrders, setTotalOrders] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const query = `*[_type == "order"] { _id }`;

      try {
        const orders = await client.fetch(query);
        setTotalOrders(orders.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setTotalOrders(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-[#182237] p-5 w-full flex flex-col gap-3 rounded-md">
      <h1 className="font-semibold text-lg text-white">Total Orders</h1>
      {loading ? (
        <h3 className="font-bold text-xl text-white">Loading...</h3>
      ) : totalOrders !== null ? (
        <h3 className="font-bold text-xl text-white">{totalOrders}</h3>
      ) : (
        <h3 className="font-bold text-xl text-red-500">Error loading data</h3>
      )}
    </div>
  );
};

export default OrderCard;
