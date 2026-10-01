import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// New Visual Effects
import AuroraBackground from "@/components/ui/AuroraBackground";
import NoiseTexture from "@/components/ui/NoiseTexture";
import CursorSpotlight from "@/components/ui/CursorSpotlight";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-primary/30 selection:text-foreground">
      {/* Global Background Elements */}
      <NoiseTexture />
      <CursorSpotlight />
      <ParticleBackground />
      <AuroraBackground />
      
      <div className="fixed inset-0 z-[-2] bg-background" />

      {/* Content wrapper */}
      <div className="relative z-10 content-wrapper">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
