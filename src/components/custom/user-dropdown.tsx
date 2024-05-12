"use client";

import { FC } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";
import { Role } from "@prisma/client";

export const UserDropdown: FC<{ session: Session }> = ({ session }) => {
  const logout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full !outline-none !ring-0">
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage
            src={session.user?.image || ""}
            alt={session.user?.email || ""}
          />
          <AvatarFallback className="bg-primary text-xl font-medium text-white">
            {session.user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <DropdownMenuContent className="me-1 w-48">
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex w-full flex-col">
              <p className="w-full overflow-hidden text-ellipsis font-medium">
                {session.user?.name}
              </p>
              <p className="w-full overflow-hidden text-ellipsis text-xs text-gray-500">
                {session.user?.email}
              </p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={
                  session.user.role === Role.ADMIN ? "/admin" : "/dashboard"
                }
                className="w-full"
              >
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
