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
      <div className="z-10 h-full max-w-screen-2xl">
        <Facilities />
      </div>
      {/* rooms details */}
      <RoomsDetails />
      {/* testimonies */}
      <div className="w-full max-w-screen-2xl">
        <Testimonies />
      </div>
    </section>
  );
}
