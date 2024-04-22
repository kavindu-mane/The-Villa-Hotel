import { Facilities, HeroSection, RoomsDetails } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* hero section */}
      <HeroSection />
      {/* facilities */}
      <Facilities />
      {/* rooms details */}
      <RoomsDetails />
    </main>
  );
}
