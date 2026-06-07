import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import SkillsBento from "@/components/SkillsBento";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <ProjectsGrid />
      <SkillsBento />
      <ContactSection />
    </main>
  );
}