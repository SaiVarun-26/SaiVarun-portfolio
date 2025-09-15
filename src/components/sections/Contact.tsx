import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio';

const Contact = () => {
  const iconMap = {
    Mail,
    Linkedin,
    Github,
  };

  return (
    <section id="contact" className="section">
      <div className="container mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology and development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-md mx-auto"
        >
          {portfolioConfig.socialLinks.map((link, index) => {
            const IconComponent = iconMap[link.icon as keyof typeof iconMap];
            
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 px-6 py-3 bg-card border border-subtle-border rounded-lg hover:border-muted-foreground/30 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent 
                  size={20} 
                  className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" 
                />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium">
                  {link.name}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-muted-foreground">
            {portfolioConfig.footer.copyright}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;