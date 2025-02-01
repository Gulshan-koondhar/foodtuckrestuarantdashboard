import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-[#151c2c] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-1 bg-[#182237] p-5 min-h-screen lg:block hidden">
          <Sidebar />
        </div>
        <div className="lg:col-span-3 p-5 w-full min-h-screen">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
