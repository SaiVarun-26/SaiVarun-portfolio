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
    heroText: "I’m Sai Varun, exploring software development, data, and design while growing step by step, inside and outside of tech, with curiosity and consistency.",
    about: "I'm a B.Tech student in India. I am passionate about software development and data analysis. I am gaining skills in building applications and exploring machine learning. I take pride in creating user-friendly projects and using technology to solve real-world problems. I also follow a science-based approach to fitness and training.",
    location: "India",
    email: "saivarun.ksvt@gmail.com"
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
      technologies: ["React", "Node.js"],
      status: "completed"
    },
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing my work and skills. Features smooth animations, responsive design, and minimal aesthetics.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "completed"
    },
    {
  id: "weather-app",
  title: "Weather App",
  description: "When the user inputs the city, the weather and temperature will be displayed using the OpenWeatherMap API.",
  technologies: ["JavaScript", "React", "OpenWeatherMap API"],
  status: "completed"
    }
  ],
  socialLinks: [
    {
      name: "Email",
      url: "mailto:saivarun.ksvt@gmail.com",
      icon: "Mail"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sai-varun-tej",
      icon: "Linkedin"
    },
    {
      name: "GitHub",
      url: "https://github.com/SaiVarun-26",
      icon: "Github"
    }
  ],
  footer: {
    copyright: "© 2025 Sai Varun. All rights reserved."
  }
};