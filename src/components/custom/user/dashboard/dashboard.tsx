"use client";

import { getUserByEmail } from "@/actions/utils/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import { Session } from "next-auth";
import { FC, useCallback, useEffect, useState } from "react";
import { MyReservations } from "@/components";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export const UserDashboard: FC<{ session: Session }> = ({ session }) => {
  const [user, setUser] = useState<any>(null);

  const getUserDetails = useCallback(async () => {
    if (!session?.user?.email) return;
    await getUserByEmail(session?.user?.email).then((data) => {
      setUser(data);
    });
  }, [session?.user?.email]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <section className="flex w-full flex-col items-center">
      <div className="flex-cols mb-16 mt-5 flex w-full max-w-6xl gap-4 sm:flex-row">
        {/* basic details */}
        <div className="w-full rounded-md border border-gray-200 bg-white p-4 shadow-md drop-shadow-xl">
          <h2 className="font- mb-3 text-lg">Basic Details</h2>
          <div className="flex gap-x-2 xl:gap-x-8">
            <Avatar className="h-20 w-20 cursor-pointer">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.email || ""}
                className="h-20 w-20"
              />
              <AvatarFallback className="bg-primary text-3xl font-medium text-white">
                {session?.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="mt-3">
              <p className="w-full overflow-hidden text-ellipsis font-medium">
                Name : {session?.user?.name}
              </p>
              <p className="w-full overflow-hidden text-ellipsis text-xs text-gray-500">
                Email : {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
        {/* coins */}
        <div className="shadow-md w-full max-w-96 rounded-md border border-gray-200 bg-white p-4 drop-shadow-xl">
          <h2 className="text-lg font-medium">Coins</h2>
          <div className="mt-4 flex items-center justify-between">
            <p className="w-full text-end text-3xl font-bold">
              {user?.coins || 0}
            </p>
          </div>
          <p className="mt-2 w-full text-end text-xs italic">
            Equals to : {(user?.coins || 0) * 0.01} USD
          </p>
        </div>
      </div>

      {/* my reservations */}
      <MyReservations />
      
      {/* view more button */}
      <div className="flex w-full max-w-screen-2xl justify-end">
        <Link
          href={"/user/reservations"}
          className="mt-2 flex gap-x-2 text-sm font-medium text-green-500"
        >
          View More
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
};
