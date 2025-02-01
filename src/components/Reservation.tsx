"use client";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type Reservation = {
  _id: string; // Unique identifier for the reservation
  email: string; // Customer's email address
  contactNumber: string; // Customer's contact number
  tableNo: number; // Reserved table number
  noOfPersons: number; // Number of people for the reservation
  dateTime: string; // Reservation date and time in ISO format (e.g., "2025-01-31T15:30:00Z")
  customerName: string; // Name of the customer
};

const Reservation = ({ limit }: { limit: number }) => {
  const [reservations, setReservation] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const query = `*[_type == "reservation"][0...${limit}]{_id,email,contactNumber,tableNo,noOfPersons,dateTime,customerName}`;

      try {
        const data = await client.fetch(query);
        setReservation(data);
      } catch (error) {
        console.error("Error fetching reservation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [limit]);

  // Helper function to format the DateTime
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/reservation/${id}`);
  };

  return (
    <div className="bg-[#182237] w-full p-5 rounded-md mb-5">
      <h1 className="font-bold text-lg">Reservation</h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : reservations.length > 0 ? (
        <table className="w-full text-white">
          <thead>
            <tr>
              <td className="py-4">Name</td>
              <td className="py-4">Table No</td>
              <td className="py-4">No: of Persons</td>
              <td className="py-4">Date & Time</td>
              <td className="py-4">Phone</td>
              <td className="py-4">Email</td>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation._id}
                onClick={() => handleRowClick(reservation._id)}
                className="cursor-pointer hover:bg-gray-700"
              >
                <td className="py-4">{reservation.customerName}</td>
                <td className="py-4">{reservation.tableNo}</td>
                <td className="py-4">{reservation.noOfPersons}</td>
                <td className="py-4">{formatDateTime(reservation.dateTime)}</td>
                <td className="py-4">{reservation.contactNumber}</td>
                <td className="py-4">{reservation.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white">No reservations available.</p>
      )}
    </div>
  );
};

export default Reservation;
