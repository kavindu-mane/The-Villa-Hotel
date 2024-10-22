import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { CopyRight, NavigationWrapper, UserSidebar } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Loading from "./loading";
import { EdgeStoreProvider } from "@/lib/edgestore";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The Villa Hotel",
  description:
    "The Villa Hotel is a luxury hotel located in the heart of the city.",
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} overflow-hidden`}>
        <NavigationWrapper />
        <Suspense fallback={<Loading />}>
          <div className="relative flex">
            {/*  side bar */}
            <UserSidebar />
            <div className="admin-content-area flex w-full overflow-y-auto sm:p-3">
              <div className="flex h-full w-full flex-col justify-between rounded-lg border p-3">
                <EdgeStoreProvider> {children}</EdgeStoreProvider>
                {/* flex grow for filling white spaces*/}
                <div className="flex flex-grow flex-col" />
                {/* copyright */}
                <CopyRight className="mt-8 border-t-0 text-gray-500" />
              </div>
            </div>
          </div>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}

export default RootLayout;
