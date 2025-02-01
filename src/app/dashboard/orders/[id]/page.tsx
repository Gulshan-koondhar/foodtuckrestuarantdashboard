"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

type CartItem = {
  name: string;
  price: number;
  _id: string;
  quantity: number;
};

type Order = {
  _id: string;
  cartItems: CartItem[];
  totalAmount: number;
  status: string;
  _createdAt: string;
  address: string;
  customerName: string;
  email: string;
  phone: string;
};

const OrderSinglePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData: Order = await client.fetch(
          `*[_type=="order" && _id=="${(await params).id}"][0]{
            _id, cartItems, totalAmount,
            status, _createdAt, address, customerName, email, phone
          }`
        );
        setOrder(orderData);
        setSelectedStatus(orderData.status); // Set the current status
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const updateOrderStatus = async () => {
    if (!order || selectedStatus === order.status) return; // If no changes, don't update

    setUpdating(true);
    try {
      await client.patch(order._id).set({ status: selectedStatus }).commit();
      setOrder((prev) => (prev ? { ...prev, status: selectedStatus } : prev));
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading order details...</p>
    );
  if (!order)
    return <p className="text-center text-red-500">Order not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order & Cart Items Section */}
        <div className="bg-[#182237] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order ID: {order._id}</h2>
          <h3 className="text-lg font-semibold mb-2">Items</h3>
          {order.cartItems && order.cartItems.length > 0 ? (
            <ul className="space-y-2" key={order._id}>
              {order.cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between border-b pb-2 text-white"
                >
                  <span>
                    {item.name} - {item.quantity} x ${item.price}
                  </span>
                  <span className="font-semibold">
                    ${item.quantity * item.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No items in this order.</p>
          )}

          <div className="mt-4 text-lg font-semibold">
            Total Price:{" "}
            <span className="text-green-400">$ {order.totalAmount}</span>
          </div>

          <div className="mt-2">
            <span className="font-semibold">Status: </span>
            <span className="text-yellow-400">{order.status}</span>
          </div>

          <div className="mt-2 text-gray-400 text-sm">
            <span className="font-semibold">Order Placed At: </span>
            {new Date(order._createdAt).toLocaleString()}
          </div>
        </div>

        {/* Customer Details Section */}
        <div className="bg-[#1f2937] p-6 rounded-lg shadow-md text-white">
          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
          <p>
            <span className="font-semibold">Name:</span> {order.customerName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {order.email}
          </p>
          <p>
            <span className="font-semibold">Contact:</span> {order.phone}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {order.address}
          </p>
        </div>
      </div>

      {/* Update Order Status */}
      <div className="mt-6">
        <label htmlFor="status" className="text-lg font-semibold mr-2">
          Update Status:
        </label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-[#182237] text-white p-2 rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="on the way">On the Way</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Update Order Button */}
      <div className="mt-6">
        <button
          onClick={updateOrderStatus}
          disabled={updating}
          className={`px-6 py-2 rounded-md text-white ${
            updating ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {updating ? "Updating..." : "Update Order Status"}
        </button>
      </div>
    </div>
  );
};

export default OrderSinglePage;
