import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import WorkExperience from '@/components/sections/WorkExperience';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <WorkExperience />
      <About />
      <Contact />
    </Layout>
  );
};

export default Index;
