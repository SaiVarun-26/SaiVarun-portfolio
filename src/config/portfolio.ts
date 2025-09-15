export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    shortName: string;
    tagline: string;
    heroText: string;
    about: string;
    location: string;
    email: string;
  };
  navigation: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  projects: Project[];
  socialLinks: SocialLink[];
  footer: {
    copyright: string;
  };
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Sai Varun",
    shortName: "SV",
    tagline: "B.Tech Student | Software Developer | Data Analyst | Science-Based Lifter",
    heroText: "I'm Sai Varun, a developer in progress who loves turning ideas into user-friendly apps, exploring data, and pushing myself both in tech and fitness.",
    about: "I'm a B.Tech student in India. I am passionate about software development and data analysis. I am gaining skills in building applications and exploring machine learning. I take pride in creating user-friendly projects and using technology to solve real-world problems. I also follow a science-based approach to fitness and training.",
    location: "India",
    email: "hello@saivarun.dev"
  },
  navigation: [
    { id: "intro", label: "Intro", href: "#intro" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "fitness", label: "Fitness", href: "#fitness" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" }
  ],
  projects: [
    {
      id: "seat-finder",
      title: "Seat Finder",
      description: "A web application that helps students find available seats in libraries and study spaces. Built with real-time availability tracking and user-friendly interface.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "completed"
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing my work and skills. Features smooth animations, responsive design, and modern aesthetics.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "completed"
    },
    {
      id: "data-analysis-tools",
      title: "Data Analysis Tools",
      description: "Collection of data analysis and visualization tools for exploring datasets and generating insights. Focus on machine learning applications.",
      technologies: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
      status: "in-progress"
    }
  ],
  socialLinks: [
    {
      name: "Email",
      url: "mailto:hello@saivarun.dev",
      icon: "Mail"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/saivarun",
      icon: "Linkedin"
    },
    {
      name: "GitHub",
      url: "https://github.com/saivarun",
      icon: "Github"
    }
  ],
  footer: {
    copyright: "© 2025 Sai Varun. All rights reserved."
  }
};