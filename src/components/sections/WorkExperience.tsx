import { motion } from 'framer-motion';

const WorkExperience = () => {
  return (
    <section id="work" className="section">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Work Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Not yet. Will be added once acquired.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;