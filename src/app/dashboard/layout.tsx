import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-[#151c2c] text-white">
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-1 bg-[#182237] p-5 min-h-screen">
          <Sidebar />
        </div>
        <div className="col-span-3 p-5">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
