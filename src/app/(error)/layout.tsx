import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Footer } from "@/components";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} flex h-full min-h-screen flex-col items-center justify-between`}
      >
        <div className="w-full max-w-screen-2xl">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
