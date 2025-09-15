import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Fitness from '@/components/sections/Fitness';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <Fitness />
      <About />
      <Contact />
    </Layout>
  );
};

export default Index;
