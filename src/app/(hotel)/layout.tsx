import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { BackToTop, Footer, NavigationWrapper } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Loading from "./loading";

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
      <body className={`${poppins.className} flex flex-col items-center`}>
        <Suspense fallback={<Loading />}>
          <main className="w-full max-w-screen-2xl">
            <NavigationWrapper />
            {children}
            <Toaster />
          </main>
        </Suspense>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

export default RootLayout;
