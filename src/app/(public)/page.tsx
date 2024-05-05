import {
  Facilities,
  HeroSection,
  RoomsDetails,
  Testimonies,
} from "@/components";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between">
      {/* hero section */}
      <HeroSection />
      {/* facilities */}
      <Facilities />
      {/* rooms details */}
      <RoomsDetails />
      {/* testimonies */}
      <Testimonies />
    </section>
  );
}
