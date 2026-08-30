import IntroLoader from "@/components/IntroLoader";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import SkillsBento from "@/components/SkillsBento";
import ContactSection from "@/components/ContactSection";
import SiteBackground from "@/components/SiteBackground";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      {/* Site-wide background */}
      <SiteBackground />

      {/* Intro */}
      <IntroLoader />

      {/* Navbar */}
      <FloatingNav />

      {/* Website content */}
      <main className="relative z-10">
        <Hero />

        <ProjectsGrid />

        <SkillsBento />

        <ContactSection />
      </main>
    </div>
  );
}