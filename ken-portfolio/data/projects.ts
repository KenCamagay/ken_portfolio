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
      "A real-time sign language recognition application that uses computer vision to detect hand gestures and translate them into letters through an accessible web interface.",
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "FastAPI",
      "MediaPipe",
    ],
    images: ["/projects/signsight/preview-1.png"],
    repo: "https://github.com/KenCamagay/SignSight",
  },

  {
    title: "AMPOWER",
    tag: "MERN / Full-stack",
    description:
      "A web-based platform designed to help churches organize calendars, manage ministry activities, and coordinate events through a centralized system.",
    tech: [
      "React.js",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "REST API",
    ],
    images: ["/projects/signsight/ampower.png"],
    repo: "https://github.com/KenCamagay/AMPOWER",
  },

  {
    title: "PD LALAS",
    tag: "Inventory / Sales",
    description:
      "A Laravel-based pharmacy inventory and sales system featuring low-stock alerts, multi-item transactions, AJAX interactions, and a responsive dashboard.",
    tech: [
      "Laravel",
      "MySQL",
      "AJAX",
      "Bootstrap",
    ],
    images: ["/projects/signsight/pdlalas.png"],
    repo: "https://github.com/KenCamagay/PD_LALAS",
  },

  {
    title: "Ladon Webservice",
    tag: "E-commerce",
    description:
      "A school supplies ordering platform designed to support local businesses with online ordering and tools for tracking sales and customer transactions.",
    tech: [
      "PHP",
      "JavaScript",
      "CSS",
    ],
    images: ["/projects/signsight/ladon.png"],
    repo: "https://github.com/KenCamagay/Ladon-Webservice",
  },

  // Kept in the data for future use, but not shown
  // because ProjectsGrid currently displays only the first 4.
  {
    title: "DaguDorms",
    tag: "Booking / HCI",
    description:
      "A dormitory browsing and booking platform focused on searchable listings, booking flow, maps, and user-centered interface design.",
    tech: [
      "PHP",
      "JavaScript",
      "CSS",
    ],
    images: ["/projects/dagudorms/preview-1.png"],
    repo: "https://github.com/devesal/DaguDorms",
  },
];