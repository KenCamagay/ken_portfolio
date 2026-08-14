import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import SkillsBento from "@/components/SkillsBento";
import ContactSection from "@/components/ContactSection";
import SiteBackground from "@/components/SiteBackground";
import ScrollProgress from "@/components/ScrollProgress";
import IntroLoader from "@/components/IntroLoader";
import Watermark from "@/components/Watermark";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <SiteBackground />
      <IntroLoader />
      <Watermark />
      <Hero />
      <ProjectsGrid />
      <SkillsBento />
      <ContactSection />
    </main>
  );
}