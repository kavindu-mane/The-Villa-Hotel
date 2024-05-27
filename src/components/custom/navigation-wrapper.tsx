"use server";

import getSession from "@/lib/getSession";
import { UserDropdown, NavigationBar } from "@/components";

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
