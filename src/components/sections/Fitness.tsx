import { motion } from 'framer-motion';
import { Activity, TrendingUp, Target, Clock } from 'lucide-react';

const Fitness = () => {
  const principles = [
    {
      icon: Activity,
      title: "Progressive Overload",
      description: "Gradually increasing the demands on the musculoskeletal system to continually make gains."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Training",
      description: "Tracking workouts, analyzing performance metrics, and adjusting programs based on results."
    },
    {
      icon: Target,
      title: "Goal-Oriented Approach",
      description: "Setting specific, measurable fitness goals and creating structured plans to achieve them."
    },
    {
      icon: Clock,
      title: "Consistency Over Intensity",
      description: "Building sustainable habits that promote long-term health and fitness improvements."
    }
  ];

  return (
    <section id="fitness" className="section">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Science-Based Fitness</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I apply the same analytical mindset I use in software development to fitness and training, 
            focusing on evidence-based practices and measurable results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card border border-subtle-border rounded-lg p-6 hover:border-muted-foreground/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg group-hover:bg-accent transition-colors duration-300">
                  <principle.icon size={24} className="text-secondary-foreground group-hover:text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-hero-accent transition-colors duration-300">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Just like in programming, I believe in continuous improvement, systematic approaches, 
            and the power of data to drive better decisions in fitness and health.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Fitness;