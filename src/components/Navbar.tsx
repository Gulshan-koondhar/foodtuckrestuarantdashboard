"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { AppSidebar } from "./AppSidebar";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="capitalize font-bold bg-[#182237] w-full p-5 rounded-md text-xl flex gap-3 items-center">
      <AppSidebar />
      {pathname.split("/").pop()}
    </div>
  );
};

export default Navbar;
