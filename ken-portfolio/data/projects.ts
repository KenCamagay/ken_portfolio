export type Project = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  images?: string[];
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
    images: [
      "/projects/signsight/preview-1.png",
      "/projects/signsight/preview-2.png",
      "/projects/signsight/preview-3.png",
    ],
    repo: "https://github.com/KenCamagay/SignSight",
  },
    {
    title: "AMPOWER",
    tag: "MERN / Full-stack",
    description:
      "AmPower is a web-based designed to help churches manage their calendars and monitor ministry activities. It supports parishes in organizing, overseeing, and tracking various church events and programs. The project’s goal is to improve church operations by offering clergy, ministry leaders, and members a unified digital platform for scheduling worship services, tracking ministry events, and boosting community coordination.",
    tech: [
      "React.js",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "REST API",
      "Full-stack Architecture",
    ],
    images: [
      "/projects/ampower/preview-1.png",
      "/projects/ampower/preview-2.png",
      "/projects/ampower/preview-3.png",
    ],
    live: "https://github.com/hxt-iiixi/InstantCare-Laundry",
  },
  {
    title: "Pharmacy Inventory & Sales (PD LALAS)",
    tag: "Full-stack",
    description:
      "A Laravel-based inventory and sales system with AJAX-powered UI, low-stock alerts, multi-item sales, and responsive dashboard design.",
    tech: ["Laravel", "MySQL", "AJAX", "Bootstrap"],
    images: [
      "/projects/pharmacy/preview-1.png",
      "/projects/pharmacy/preview-2.png",
      "/projects/pharmacy/preview-3.png",
    ],
    repo: "https://github.com/KenCamagay/PD_LALAS",
  },
  {
    title: "Ladon Webservice (E-commerce Website)",
    tag: "Full-stack",
    description:
      "A school supplies ordering platform supporting local businesses, with a web app for secure orders and a mobile app for tracking and sales monitoring.",
    tech: ["PHP", "CSS", "JavaScript"],
    images: [
      "/projects/ladon/preview-1.png",
      "/projects/ladon/preview-2.png",
      "/projects/ladon/preview-3.png",
    ],
    repo: "https://github.com/KenCamagay/Ladon-Webservice",
  },
  {
    title: "DaguDorms (Booking Website)",
    tag: "Full-stack",
    description:
      "An HCI project website for browsing and booking dormitories in Dagupan, featuring searchable listings, booking flow, maps, and user-centered UI design.",
    tech: ["CSS", "JavaScript", "PHP"],
    images: [
      "/projects/dagudorms/preview-1.png",
      "/projects/dagudorms/preview-2.png",
      "/projects/dagudorms/preview-3.png",
    ],
    repo: "https://github.com/devesal/DaguDorms",
  },

];