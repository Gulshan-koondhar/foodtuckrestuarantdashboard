"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { client } from "@/sanity/lib/client";
type Order = {
  _id: string;
  _createdAt: string;
  totalAmount: number;
};

type ChartData = {
  date: string;
  revenue: number;
};
const DailyRevenueChart = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "order"]{
          _createdAt,
          totalAmount
        }`;

        const orders: Order[] = await client.fetch(query);

        // Process data to group revenue by date
        const revenueByDate = orders.reduce(
          (acc: Record<string, number>, order: Order) => {
            const date = new Date(order._createdAt).toLocaleDateString();
            acc[date] = (acc[date] || 0) + order.totalAmount;
            return acc;
          },
          {}
        );

        // Convert object into an array for Recharts
        const formattedData: ChartData[] = Object.keys(revenueByDate).map(
          (date) => ({
            date,
            revenue: revenueByDate[date],
          })
        );

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
      setLoading(false);
    };

    fetchRevenueData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold my-4 p-3 rounded-md bg-[#182237]">
        Daily Revenue Chart
      </h2>
      <ResponsiveContainer
        width="100%"
        height={400}
        className="bg-[#182237] p-2 rounded-md"
      >
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={{ background: "#151c2c", border: "none" }}
            formatter={(value) => `$ ${value}`}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4CAF50"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyRevenueChart;
