import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import SelectedProjects from '../components/home/SelectedProjects';
import Process from '../components/home/Process';
import AboutPreview from '../components/home/AboutPreview';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <SelectedProjects />
      <Process />
      <AboutPreview />
      <Testimonials />
      <CTA />
    </>
  );
}

export default Home;