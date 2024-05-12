"use client";

import { Sheet, SheetTrigger, SheetContent, Brand } from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { IoSettings, IoRestaurantSharp, IoKey } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import {
  MdDashboard,
  MdBedroomChild,
  MdTableRestaurant,
  MdOutlineDiscount,
} from "react-icons/md";

// admin Url paths for the sidebar
export const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <MdDashboard className="h-4 w-4" />,
  },
  {
    name: "Rooms",
    path: "/admin/rooms",
    icon: <MdBedroomChild className="h-4 w-4" />,
  },
  {
    name: "Restaurant",
    path: "/admin/restaurant",
    icon: <IoRestaurantSharp className="h-4 w-4" />,
  },
  {
    name: "Room Reservations",
    path: "/admin/room-reservations",
    icon: <IoKey className="h-4 w-4" />,
  },
  {
    name: "Table Reservations",
    path: "/admin/table-reservations",
    icon: <MdTableRestaurant className="h-4 w-4" />,
  },
  {
    name: "Promotions",
    path: "/admin/promotions",
    icon: <MdOutlineDiscount className="h-4 w-4" />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <FaUsers className="h-4 w-4" />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <IoSettings className="h-4 w-4" />,
  },
];

export const AdminSidebar: FC = () => {
  // get url params
  const fullPath = usePathname();

  return (
    <div className="">
      {/* sheet for small devices */}
      <div className="absolute start-0 top-3 lg:hidden">
        <Sheet>
          <SheetTrigger className="rounded-r-full bg-primary px-3 py-1.5 text-xl text-white">
            <CgMenuLeft className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-64 pe-3 ps-0">
            <div className="px-3 text-xl">
              <Brand />
            </div>
            <AdminSidebarItem fullPath={fullPath} className="pt-5" />
          </SheetContent>
        </Sheet>
      </div>

      {/* dropdown menu for large devices */}
      <div className="admin-content-area hidden w-64 overflow-hidden border-r bg-white lg:block">
        {/* content area */}
        <AdminSidebarItem fullPath={fullPath} />
      </div>
    </div>
  );
};

const AdminSidebarItem: FC<{ fullPath: string; className?: string }> = ({
  fullPath,
  className,
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-y-2 py-3 pe-3", className)}>
      {adminPaths.map((path, index) => (
        <Link
          key={index}
          href={path.path}
          className={cn(
            "flex w-full items-center gap-x-2 rounded-e-full bg-white px-3 py-1.5  text-gray-800 hover:bg-gray-200",
            fullPath === path.path
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "",
          )}
        >
          {path.icon}
          {path.name}
        </Link>
      ))}
    </div>
  );
};
