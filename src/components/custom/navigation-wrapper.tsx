"use server";

import { auth, signOut } from "@/auth";
import { NavigationBar } from "./navigation";
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
} from "../ui";
import Link from "next/link";

export const NavigationWrapper = async () => {
  const session = await auth();

  if (session?.user)
    return (
      <NavigationBar>
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
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form
                    className="w-full"
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button type="submit" className="flex w-full text-left">
                      Sign Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </NavigationBar>
    );

  return <NavigationBar />;
};
