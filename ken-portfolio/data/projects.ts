export type Project = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  image?: string;
  repo?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "SignSight",
    tag: "AI / Accessibility",
    description:
      "A sign language recognition project built to help bridge communication gaps through real-time hand gesture detection, clean web design, and accessible user experience.",
    tech: ["Next.js", "React", "Tailwind CSS", "FastAPI", "MediaPipe"],

    repo: "https://github.com/KenCamagay/SignSight",
  },
  {
    title: "Pharmacy Inventory & Sales (PD LALAS)",
    tag: "Full-stack",
    description:
      "A Laravel-based inventory and sales system with AJAX-powered UI, low-stock alerts, multi-item sales, and responsive dashboard design.",
    tech: ["Laravel", "MySQL", "AJAX", "Bootstrap"],

    repo: "https://github.com/KenCamagay/PD_LALAS",
    live: "https://your-live-demo.com",
  },
  {
    title: "Ladon Webservice (E-commerce Website)",
    tag: "Full-stack",
    description:
      "A school supplies ordering platform supporting local businesses, with a web app for secure orders and a mobile app for tracking and sales monitoring.",
    tech: ["PHP", "CSS", "JavaScript"],
  
    repo: "https://github.com/KenCamagay/Ladon-Webservice",
  },
  {
    title: "DaguDorms (Booking Website)",
    tag: "Full-stack",
    description:
      "An HCI project website for browsing and booking dormitories in Dagupan, featuring searchable listings, booking flow, maps, and user-centered UI design.",
    tech: ["CSS", "JavaScript", "PHP"],
 
    repo: "https://github.com/devesal/DaguDorms",
  },
];