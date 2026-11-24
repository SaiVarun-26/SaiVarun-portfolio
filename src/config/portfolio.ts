// Single source of truth for all portfolio content.

export const profile = {
  fullName: "Sai Varun Tej",
  shortName: "SVT",
  headline: ["I build software", "around everyday friction."],
  subtitle:
    "I'm a B.Tech student who likes fixing the small annoyances people have stopped noticing.",
  resumeUrl: "/resume.pdf",
};

export type NavItem = {
  id: string;
  label: string;
};

export const navItems: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const about = {
  title: "Why I build what I build.",
  subtitle:
    "Most of what I know, I learned by building something and getting it wrong first.",
  paragraphs: [
    "I'm a B.Tech student, and I like building software that removes the small, annoying parts of everyday life.",
    "I'd rather build than sit through another tutorial. I pick a project, ship a rough version, find what's broken and fix it. Most of what I know came from mistakes I had to debug myself.",
    "Recently I've gotten deeply interested in AI engineering, so that's where my learning and my projects are heading.",
  ],
  // `icon` keys are resolved to lucide icons in About.tsx.
  cards: [
    {
      icon: "hammer",
      title: "Learning",
      text: "Building products over tutorials.",
    },
    {
      icon: "layers",
      title: "Current Focus",
      text: "AI engineering and full stack.",
    },
    {
      icon: "graduation",
      title: "Currently",
      text: "B.Tech student shipping projects.",
    },
    {
      icon: "dumbbell",
      title: "Outside Work",
      text: "Fitness and long-term discipline.",
    },
  ],
};

export const experienceHeader = {
  title: "Experience",
  subtitle: "The experiences that taught me how software is really built.",
};

export type Experience = {
  status: "completed" | "current";
  statusLabel: string;
  /** Optional second badge, e.g. "OFFLINE INTERNSHIP". */
  typeLabel?: string;
  year: string;
  company: string;
  role: string;
  project: string;
  /** Small label above the project name, framing it as part of the internship. */
  projectLabel: string;
  tagline: string;
  description: string[];
  listTitle: string;
  bullets: string[];
  stack: string[];
  /** Which placeholder mockup to draw when no `image` is provided. */
  visual: "dashboard" | "phone";
  /** Path under /public, e.g. "/experience/contractiq.png". Optional. */
  image?: string;
  /** Public repository. When absent, the private-repo note is shown. */
  github?: string;
};

export const experiences: Experience[] = [
  {
    status: "completed",
    statusLabel: "Internship Completed",
    year: "2026",
    company: "Infosys Springboard",
    role: "Virtual Internship 7.0",
    project: "ContractIQ",
    projectLabel: "Built during the internship",
    tagline: "Enterprise Contract Lifecycle Management Platform",
    description: [
      "During my Infosys Springboard internship, I worked on ContractIQ, a contract lifecycle management platform. It keeps contracts, renewals, obligations and compliance tracking in one system, with reporting on top.",
      "I contributed across the stack, from the FastAPI backend and database models to the React dashboards. It was the first real application where the frontend, backend and database had to work together as one product, and it changed how I think about building a feature.",
    ],
    listTitle: "What I worked on",
    bullets: [
      "Built REST APIs using FastAPI",
      "Implemented JWT authentication",
      "Integrated the React frontend with the backend APIs",
      "Designed relational database models using PostgreSQL and SQLAlchemy",
      "Built dashboards, CRUD modules and reporting features",
      "Debugged issues and deployed the frontend using Vercel",
    ],
    stack: [
      "FastAPI",
      "React",
      "TanStack Start",
      "PostgreSQL",
      "SQLAlchemy",
      "JWT",
      "Tailwind CSS",
      "Vercel",
    ],
    visual: "dashboard",
    github:
      "https://github.com/SaiVarun-26/Contract-Obligation-Tracking-Compliance-Management-Platform",
  },
  {
    status: "current",
    statusLabel: "Currently Working",
    typeLabel: "OFFLINE INTERNSHIP",
    year: "2026",
    company: "ATRIBS Global Technology",
    role: "Software Engineering Intern",
    project: "Yathri",
    projectLabel: "Currently building",
    tagline: "AI-Powered Travel Data Capture Platform",
    description: [
      "I'm interning in the office at ATRIBS Global Technology, working on Yathri. Manual travel surveys depend on people filling in forms, so Yathri captures trips automatically from smartphone sensors, GPS and activity recognition, with privacy built in from the start.",
      "Citizens get a clearer picture of how they travel, and government agencies get mobility data they can plan with. I work across the Flutter app, the FastAPI backend and the analytics side, so I see how raw sensor data turns into something a planner can use.",
    ],
    listTitle: "Current responsibilities",
    bullets: [
      "Automatic Trip Detection",
      "Transport Mode Classification",
      "Flutter Mobile Development",
      "FastAPI Backend",
      "Government Analytics Dashboard",
      "Privacy-first Architecture",
      "Location Intelligence",
      "Travel Insights",
    ],
    stack: [
      "Flutter",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Riverpod",
      "Google Maps",
      "Machine Learning",
      "GPS Sensors",
    ],
    visual: "phone",
  },
];

export const selectedWork = {
  title: "Selected Work",
  subtitle: "A collection of products built to solve real-world problems.",
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  year: string;
  /** Path under /public, e.g. "/projects/data-lens.png". Optional. */
  image?: string;
  github?: string;
  live?: string;
};

// NOTE: years and links below are placeholders. Replace with real ones.
export const projects: Project[] = [
  {
    title: "Everyday Friction",
    description:
      "A collection of small tools that remove repetitive tasks from daily workflows.",
    tech: ["React", "TypeScript", "Tailwind"],
    year: "2025",
    github: "https://github.com",
  },
  {
    title: "Data Lens",
    description:
      "An exploratory analytics interface that turns raw datasets into clear, interactive stories.",
    tech: ["Python", "Pandas", "D3"],
    year: "2025",
    github: "https://github.com",
  },
  {
    title: "Motion System",
    description:
      "A reusable animation layer focused on restrained, purposeful interface motion.",
    tech: ["Framer Motion", "React"],
    year: "2024",
    github: "https://github.com",
  },
];

export const contact = {
  email: "hello@saivaruntej.dev",
  socials: [
    { label: "GitHub", url: "https://github.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "X", url: "https://x.com" },
  ],
};
