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
    tagline: "B.Tech Student | Software Developer | Data Enthusiast | Science-Based Lifter",
    heroText: "I’m Sai Varun, exploring software development, data, and design while growing step by step, inside and outside of tech, with curiosity and consistency.",
    about: "Aspiring Software Developer and Data Analyst currently pursuing a B.Tech in India. I am establishing a strong foundation in application development, data analysis, and machine learning. I focus on creating user-friendly solutions and using technology to tackle real-world problems. Outside of tech, I follow a science-based approach to fitness and training. I apply the same discipline and analytical mindset to my personal growth.",
    location: "India",
    email: "saivarun.ksvt@gmail.com"
  },
  navigation: [
    { id: "intro", label: "Intro", href: "#intro" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "work", label: "Work", href: "#work" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" }
  ],
  projects: [
    {
      id: "ExamVenue",
      title: "ExamVenue",
      description: "Exam hall searches are made easier with ExamVenue, which gives you the block and room number up front. Students save time and effort by not having to scroll through numerous PDFs",
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