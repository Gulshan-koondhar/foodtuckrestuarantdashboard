"use client";

import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type CartItem = {
  name: string;
  price: number;
};

type Order = {
  _id: string;
  email: string;
  cartItems: CartItem[];
  country: string;
  address: string;
  customerName: string;
  status: string;
  _createdAt: string;
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/orders/${id}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const query = `*[_type == "order"]{
        _id, email, cartItems, country, address, customerName, status, _createdAt
      }`;

      try {
        const fetchedOrders = await client.fetch(query);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="bg-[#182237] w-full p-5 rounded-md my-5">
      <h1 className="font-bold text-lg text-white">Orders</h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : orders.length > 0 ? (
        <table className="w-full text-white">
          <thead>
            <tr>
              <td className="py-4">Name</td>
              <td className="py-4">Items</td>
              <td className="py-4">Address</td>
              <td className="py-4">Date & Time</td>
              <td className="py-4">Total Amount</td>
              <td className="py-4">Status</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="cursor-pointer hover:bg-gray-700"
              >
                <td className="py-4">{order.customerName}</td>
                <td className="py-4">
                  {order.cartItems.map((item) => item.name).join(", ")}
                </td>
                <td className="py-4">{order.address}</td>
                <td className="py-4">{formatDateTime(order._createdAt)}</td>
                <td className="py-4">
                  $
                  {order.cartItems.reduce(
                    (acc: number, curr: { price: number }) => acc + curr.price,
                    0
                  )}
                </td>
                <td className="py-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white">No orders available.</p>
      )}
    </div>
  );
};

export default OrdersPage;
