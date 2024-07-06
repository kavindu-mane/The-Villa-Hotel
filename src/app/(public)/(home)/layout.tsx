import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../globals.css";
import { BackToTop, Footer, NavigationWrapper } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Loading from "./loading";
import Script from "next/script";

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
          <main className="flex w-full flex-col items-center">
            <div className="absolute z-[999] flex w-full max-w-screen-2xl justify-center rounded-b-xl bg-white">
              <NavigationWrapper />
            </div>
            {children}
            <Toaster />
          </main>
          <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" />
          <df-messenger
            intent="WELCOME"
            chat-title="Villa-chatbot-Tour-Guide"
            agent-id="d7a12815-c933-44d2-a464-512f9360da65"
            language-code="en"
          ></df-messenger>
        </Suspense>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

export default RootLayout;
