"use client";
import React from "react";
import {
  Bed,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
      { title: "Product", path: "/dashboard/products", icon: <ShoppingBag /> },
      { title: "Orders", path: "/dashboard/orders", icon: <ShoppingCart /> },
      {
        title: "Resevation",
        path: "/dashboard/reservation",
        icon: <Bed />,
      },
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <CircleDollarSign />,
      },
    ],
  },
];
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout"); // Call the logout API
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-10">Admin Panel</h1>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <div className="flex flex-col gap-2">
              {item.list.map((list, index) => (
                <div
                  key={index}
                  className={`flex gap-2 hover:bg-[#2e374a] p-2 rounded-md ${pathname === list.path && "bg-[#2e374a]"} `}
                >
                  {list.icon}
                  <Link href={list.path}>{list.title}</Link>
                </div>
              ))}
            </div>
          </li>
        ))}
        <button
          className="hover:bg-[#2e374a] p-2 rounded-md flex gap-2 w-full mt-5"
          onClick={handleLogout}
        >
          <LogOut /> Logout
        </button>
      </ul>
      <div></div>
    </div>
  );
};

export default Sidebar;
