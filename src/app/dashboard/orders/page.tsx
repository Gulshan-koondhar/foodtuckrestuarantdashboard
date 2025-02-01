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
      <h1 className="font-bold text-lg text-white mb-5">Orders</h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-white min-w-[800px]">
            <thead>
              <tr>
                <th className="p-2 text-left min-w-[150px]">Name</th>
                <th className="p-2 text-left min-w-[200px]">Items</th>
                <th className="p-2 text-left min-w-[200px]">Address</th>
                <th className="p-2 text-left min-w-[150px]">Date & Time</th>
                <th className="p-2 text-left min-w-[120px]">Total Amount</th>
                <th className="p-2 text-left min-w-[100px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <td className="p-2">{order.customerName}</td>
                  <td className="p-2">
                    {order.cartItems.map((item) => item.name).join(", ")}
                  </td>
                  <td className="p-2">{order.address}</td>
                  <td className="p-2">{formatDateTime(order._createdAt)}</td>
                  <td className="p-2">
                    $
                    {order.cartItems.reduce(
                      (acc: number, curr: { price: number }) =>
                        acc + curr.price,
                      0
                    )}
                  </td>
                  <td className="p-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-white">No orders available.</p>
      )}
    </div>
  );
};

export default OrdersPage;
