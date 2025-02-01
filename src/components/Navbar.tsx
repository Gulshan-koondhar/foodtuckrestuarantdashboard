"use client";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="capitalize font-bold bg-[#182237] w-full p-5 rounded-md text-xl flex gap-3 items-center">
      <Menu className="block lg:hidden" />
      {pathname.split("/").pop()}
    </div>
  );
};

export default Navbar;
