import AuraBackground from "@/components/bg";
import GridBackground from "@/components/grid-bg";
import Navigation from "@/components/nav";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Aura Background with Unicorn Studio Animation */}
      <AuraBackground />
      
      {/* Grid Background */}
      <GridBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
    </div>
  );
}
