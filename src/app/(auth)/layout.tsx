import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { CopyRight, NavigationBarSecondary } from "@/components";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The Villa Hotel",
  description:
    "The Villa Hotel is a luxury hotel located in the heart of the city.",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} flex h-auto min-h-screen flex-col items-center justify-center`}
      >
        <Suspense fallback={<Loading />}>
          <main className="flex h-auto min-h-screen w-full flex-col items-center justify-between gap-y-5">
            <NavigationBarSecondary />
            <div className="w-full max-w-xl border border-border bg-white px-2 py-10 shadow-md md:px-5">
              {children}
              <Toaster />
            </div>
            <CopyRight className="border-none pb-3 text-gray-800" />
          </main>
        </Suspense>
        {/* waves pattern */}
        <Image
          src="/images/waves_2.svg"
          alt="waves"
          width={1920}
          height={100}
          className="absolute bottom-0 -z-10 h-full object-cover opacity-30"
        />
      </body>
    </html>
  );
}

export default RootLayout;
