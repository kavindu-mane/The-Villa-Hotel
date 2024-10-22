"use client";

import { Sheet, SheetTrigger, SheetContent, Brand } from "@/components";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { BiMoney } from "react-icons/bi";
import { CgMenuLeft } from "react-icons/cg";
import { MdDashboard, MdBedroomChild } from "react-icons/md";

// user Url paths for the sidebar
export const userPaths = [
  {
    name: "Dashboard",
    path: "/user",
    icon: <MdDashboard className="h-4 w-4" />,
  },
  {
    name: "Reservations",
    path: "/user/reservations",
    icon: <MdBedroomChild className="h-4 w-4" />,
  },
  {
    name: "Transactions",
    path: "/user/transactions",
    icon: <BiMoney className="h-4 w-4" />,
  },
];

export const UserSidebar: FC = () => {
  // get url params
  const fullPath = usePathname();

  return (
    <div className="h-screen">
      {/* sheet for small devices */}
      <div className="absolute start-0 top-3 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger className="rounded-r-full bg-primary px-3 py-1.5 text-xl text-white">
            <CgMenuLeft className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-64 pe-3 ps-0">
            <div className="px-3 text-xl">
              <Brand />
            </div>
            <UserSidebarItem fullPath={fullPath} className="pt-5" />
          </SheetContent>
        </Sheet>
      </div>

      {/* dropdown menu for large devices */}
      <div className="user-content-area hidden h-screen w-64 overflow-hidden border-r bg-white lg:block">
        {/* content area */}
        <UserSidebarItem fullPath={fullPath} />
      </div>
    </div>
  );
};

const UserSidebarItem: FC<{ fullPath: string; className?: string }> = ({
  fullPath,
  className,
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-y-2 py-3 pe-3", className)}>
      {userPaths.map((path, index) => (
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
