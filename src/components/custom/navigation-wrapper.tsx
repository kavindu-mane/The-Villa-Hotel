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
  DropdownMenuTrigger,
} from "../ui";

export const NavigationWrapper = async () => {
  const session = await auth();

  if (session?.user)
    return (
      <NavigationBar>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full !outline-none !ring-0">
            <Avatar className="cursor-pointer h-9 w-9">
              <AvatarImage
                src={session.user?.image || ""}
                alt={session.user?.email || ""}
              />
              <AvatarFallback className="bg-primary text-xl font-medium text-white">
                {session.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <DropdownMenuContent className="w-48">
              <DropdownMenuGroup>
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
