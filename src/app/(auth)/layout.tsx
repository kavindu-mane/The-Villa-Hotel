import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import { FcGoogle } from "react-icons/fc";
import { AuthFooter, Button, GoogleAuth } from "@/components";
import { signIn } from "next-auth/react";

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
        <div className="w-full max-w-screen-sm border border-border px-2 py-10 shadow-md md:px-5">
          {children}
          <GoogleAuth />
          <AuthFooter />
          <Toaster />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
