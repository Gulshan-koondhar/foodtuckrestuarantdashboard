"use client";

import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";

type Reservation = {
  _id: string;
  email: string;
  contactNumber: string;
  tableNo: number;
  noOfPersons: number;
  dateTime: string;
  customerName: string;
  status?: string; // New field for reservation status
};

const ReservationSinglePage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [status, setStatus] = useState<string>("Approve"); // Default selection

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const query = `*[_type=="reservation" && _id=="${(await params).id}"][0]{
          _id,email,contactNumber,tableNo,noOfPersons,dateTime,customerName,status
        }`;
        const data: Reservation = await client.fetch(query);
        setReservation(data);
        setStatus(data.status || "Approve"); // Set default status
      } catch (error) {
        console.error("Error fetching reservation:", error);
      }
    };

    fetchReservation();
  }, []);
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      weekday: "long", // e.g., Monday
      year: "numeric",
      month: "long", // e.g., January
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Display AM/PM
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reservation) return;

    try {
      await client.patch(reservation._id).set({ status }).commit();
      alert("Reservation status updated successfully!");
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  if (!reservation) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="p-6 bg-[#1a1a2e] text-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Customer Name</label>
          <input
            type="text"
            value={reservation.customerName}
            disabled
            className="w-full bg-[#182237] p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            value={reservation.email}
            disabled
            className="w-full bg-[#182237] p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block">Contact Number</label>
          <input
            type="text"
            value={reservation.contactNumber}
            disabled
            className="w-full bg-[#182237] p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block">Table Number</label>
          <input
            type="number"
            value={reservation.tableNo}
            disabled
            className="w-full bg-[#182237] p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block">Number of Persons</label>
          <input
            type="number"
            value={reservation.noOfPersons}
            disabled
            className="w-full bg-[#182237] p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block">Date and Time</label>
          <input
            type="text"
            value={formatDateTime(reservation.dateTime)}
            disabled
            className="w-full bg-[#182237] p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block">Reservation Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#182237] p-2 rounded-md"
          >
            <option value="Approve">Approve</option>
            <option value="Cancel">Cancel</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReservationSinglePage;
