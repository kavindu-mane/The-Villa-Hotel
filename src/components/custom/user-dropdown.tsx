"use client";

import { FC, useEffect } from "react";
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
import { MdDashboard, MdLogout } from "react-icons/md";
import { useDispatch, Provider } from "react-redux";
import { sessionStore } from "@/states/stores";
import { removeSession, setSession } from "@/states/user";

export const UserDropdown: FC<{ session: Session }> = ({ session }) => {
  return (
    <Provider store={sessionStore}>
      <DropDown session={session} />
    </Provider>
  );
};

const DropDown: FC<{ session: Session }> = ({ session }) => {
  const dispatch = useDispatch();
  // logout user
  const logout = async () => {
    await signOut({ callbackUrl: "/auth/login" }).then(() => {
      dispatch(removeSession());
    });
  };

  useEffect(() => {
    dispatch(setSession(session));
  }, [dispatch, session]);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full !outline-none !ring-0">
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage
            src={session.user?.image || ""}
            alt={session.user?.email || ""}
            className="h-9 w-9"
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
                  session.user.role === Role.ADMIN ? "/admin" : "/user"
                }
                className="flex w-full items-center gap-x-2"
              >
                <MdDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => logout()}
              className="flex w-full items-center cursor-pointer gap-x-2 text-red-600 hover:!bg-red-100 hover:!text-red-700"
            >
              <MdLogout className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
