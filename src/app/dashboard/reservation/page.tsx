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

const ReservationPage = () => {
  const [reservations, setReservation] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/reservation/${id}`);
  };

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const query = `*[_type == "reservation"]{_id,email,contactNumber,tableNo,noOfPersons,dateTime,customerName}`;

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
  }, []);

  // Helper function to format the DateTime
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  return (
    <div className="bg-[#182237] w-full p-5 rounded-md my-5">
      <h1 className="font-bold text-lg text-white mb-5">Reservation</h1>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : reservations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-white min-w-[800px]">
            <thead>
              <tr>
                <th className="p-2 text-left min-w-[150px]">Name</th>
                <th className="p-2 text-left min-w-[100px]">Table No</th>
                <th className="p-2 text-left min-w-[120px]">No: of Persons</th>
                <th className="p-2 text-left min-w-[200px]">Date & Time</th>
                <th className="p-2 text-left min-w-[150px]">Phone</th>
                <th className="p-2 text-left min-w-[200px]">Email</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation: Reservation) => (
                <tr
                  key={reservation._id}
                  onClick={() => handleRowClick(reservation._id)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <td className="p-2">{reservation.customerName}</td>
                  <td className="p-2">{reservation.tableNo}</td>
                  <td className="p-2">{reservation.noOfPersons}</td>
                  <td className="p-2">
                    {formatDateTime(reservation.dateTime)}
                  </td>
                  <td className="p-2">{reservation.contactNumber}</td>
                  <td className="p-2">{reservation.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-white">No reservations available.</p>
      )}
    </div>
  );
};

export default ReservationPage;
