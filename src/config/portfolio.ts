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
  eyebrow: "About",
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
  eyebrow: "Projects",
  title: "Selected Work",
  subtitle: "A collection of products built to solve real-world problems.",
};

export type ProjectAction = {
  label: string;
  /** Omit while a link is still a placeholder — it renders as a quiet button. */
  href?: string;
  /** The first action is filled; the rest are outlined. */
  variant?: "primary" | "ghost";
};

export type Project = {
  /** Two-digit display index, e.g. "01". */
  number: string;
  title: string;
  subtitle?: string;
  description: string[];
  tech: string[];
  badges: string[];
  status?: "in-progress" | "completed";
  /** The flagship project gets the largest visual presence. */
  featured?: boolean;
  /** Which placeholder mockup to draw when no `image` is provided. */
  visual: "ridesync" | "yathri" | "brick" | "research";
  /** Path under /public, e.g. "/projects/data-lens.png". Optional. */
  image?: string;
  actions: ProjectAction[];
};

// NOTE: links marked as placeholders are intentionally not wired up yet.
export const projects: Project[] = [
  {
    number: "01",
    title: "RideSync",
    description: [
      "RideSync is an open-source Flutter application built for motorcycle group rides. It lets riders create rides, invite friends, and track everyone's live location in real time so the entire group stays together.",
      "The app records ride statistics, maps every journey, and generates a shareable ride summary after each ride.",
    ],
    tech: ["Flutter", "Firebase", "Riverpod", "OpenStreetMap", "Dart"],
    badges: ["Featured", "Open Source"],
    featured: true,
    visual: "ridesync",
    actions: [
      { label: "GitHub", href: "https://github.com/SaiVarun-26/Ridesync" },
      {
        label: "Website",
        href: "https://ridesync-live.vercel.app/#home",
        variant: "ghost",
      },
    ],
  },
  {
    number: "02",
    title: "Yathri",
    subtitle: "AI-Powered Travel Data Capture Platform",
    description: [
      "Built as part of Smart India Hackathon. Yathri automatically detects trips using smartphone sensors, classifies transport modes, maintains a smart travel diary, and generates mobility insights while preserving user privacy.",
      "It is designed to help governments improve transport planning while also providing meaningful travel insights to everyday users.",
    ],
    tech: [
      "Flutter",
      "FastAPI",
      "Machine Learning",
      "GPS",
      "Activity Recognition",
    ],
    badges: [],
    status: "in-progress",
    visual: "yathri",
    actions: [
      { label: "GitHub", href: "https://github.com/SaiVarun-26/Yathri-App" },
    ],
  },
  {
    number: "03",
    title: "Brick Management System",
    description: [
      "A management platform designed for brick manufacturing businesses.",
      "The system streamlines production tracking, inventory management, customer records, sales, and reporting through one centralized dashboard.",
    ],
    tech: ["React", "FastAPI", "PostgreSQL"],
    badges: [],
    status: "completed",
    visual: "brick",
    actions: [
      {
        label: "GitHub",
        href: "https://github.com/cherryhash-99/FLYSHBRICKS-MANAGEMENT-SYM",
      },
    ],
  },
  {
    number: "04",
    title: "DNA Sequence Storage Quality Assessment",
    subtitle: "Research Paper",
    description: [
      "A machine learning research project focused on evaluating DNA data storage quality.",
      "The research explores feature extraction, explainable AI, and predictive models to improve the reliability of DNA-based digital storage systems.",
    ],
    tech: [],
    badges: ["Published Research"],
    visual: "research",
    actions: [
      {
        label: "Read Paper",
        href: "/projects/dna-research-paper.pdf",
        variant: "primary",
      },
      { label: "Presentation", variant: "ghost" },
    ],
  },
];

export const projectsOutro = {
  text: "Every project pushed me to learn something new. I'm excited to build what's next.",
  action: { label: "View GitHub", href: "https://github.com/SaiVarun-26" },
};

export const contact = {
  email: "k.saivaruntej@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/SaiVarun-26" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sai-varun-tej/" },
  ],
};

export const footer = {
  tagline: "Building software that solves real problems.",
  status: "Open to internships & opportunities.",
};
