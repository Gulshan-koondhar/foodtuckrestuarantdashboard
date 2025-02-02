"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Bed,
  CircleDollarSign,
  LayoutDashboard,
  Menu,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
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

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="block lg:hidden" />
      </SheetTrigger>
      <SheetContent
        className="bg-[#182237] p-5 min-h-screen text-white"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="text-white font-bold text-xl text-center">
            Admin
          </SheetTitle>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="list-none">
                <div className="flex flex-col gap-2">
                  {item.list.map((list, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 hover:bg-[#2e374a] text-white p-2 rounded-md ${pathname === list.path && "bg-[#2e374a]"} `}
                    >
                      {list.icon}
                      <Link href={list.path} className="">
                        {list.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
