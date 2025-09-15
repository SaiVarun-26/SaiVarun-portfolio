import { motion } from 'framer-motion';
import { Code, BarChart3, GraduationCap, MapPin } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio';

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: "B.Tech Student",
      description: "Currently pursuing my degree in India, gaining comprehensive knowledge in computer science and engineering."
    },
    {
      icon: Code,
      title: "Software Development",
      description: "Building user-friendly applications with modern technologies like React, TypeScript, and Node.js."
    },
    {
      icon: BarChart3,
      title: "Data Analysis",
      description: "Exploring machine learning and data visualization to extract insights from complex datasets."
    },
    {
      icon: MapPin,
      title: "Based in India",
      description: "Working on projects that solve real-world problems while building my technical expertise."
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A developer in progress, passionate about creating meaningful solutions
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card border border-subtle-border rounded-lg p-8 mb-12"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {portfolioConfig.personal.about}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group flex items-start gap-4 p-6 bg-card border border-subtle-border rounded-lg hover:border-muted-foreground/30 transition-all duration-300"
              >
                <div className="p-3 bg-secondary rounded-lg group-hover:bg-accent transition-colors duration-300">
                  <item.icon size={24} className="text-secondary-foreground group-hover:text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-hero-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;