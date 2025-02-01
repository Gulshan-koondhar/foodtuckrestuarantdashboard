"use client";
import React from "react";
import {
  Bed,
  CircleDollarSign,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { usePathname } from "next/navigation";
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
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <h1 className="mb-5">{item.title}</h1>
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
      </ul>
    </div>
  );
};

export default Sidebar;
