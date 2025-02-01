import OrderCard from "@/components/OrderCard";
import ProductCard from "@/components/ProductCard";
import Products from "@/components/Products";
import Reservation from "@/components/Reservation";
import RevenueCard from "@/components/RevenueCard";

import React from "react";

const dashboardPage = () => {
  return (
    <div className="w-full mt-5">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <OrderCard />
        <ProductCard />
        <RevenueCard />
      </div>
      <Products limit={3} />
      <Reservation limit={3} />
    </div>
  );
};

export default dashboardPage;
