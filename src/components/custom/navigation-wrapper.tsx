"use server";

import { NavigationBar } from "./navigation";
import getSession from "@/lib/getSession";
import { UserDropdown } from "./user-dropdown";

export const NavigationWrapper = async () => {
  const session = await getSession();

  if (session?.user)
    return (
      <NavigationBar>
        <UserDropdown session={session} />
      </NavigationBar>
    );

  return <NavigationBar />;
};
