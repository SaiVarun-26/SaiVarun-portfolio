import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WorkExperience } from "@/components/sections/WorkExperience";
import { Projects } from "@/components/sections/Projects";
import { Fitness } from "@/components/sections/Fitness";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  // `ready` flips true once the intro finishes docking the logo,
  // which triggers the hero's sequenced reveal.
  const [ready, setReady] = useState(false);

  return (
    <Layout onReady={setReady}>
      <Hero show={ready} />
      <About />
      <WorkExperience />
      <Projects />
      <Fitness />
      <Contact />
      <Footer />
    </Layout>
  );
};

export default Index;
