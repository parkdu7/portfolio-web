import { Hero } from '@/components/sections/Hero';
import { Achievements } from '@/components/sections/Achievements';
import { TechStack } from '@/components/sections/TechStack';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      <Hero />
      <Achievements />
      <TechStack />
      <Projects />
      <Contact />
    </>
  );
}
