import { Navbar } from "@/src/components/sections/Navbar";
import { Hero } from "@/src/components/sections/Hero";
import { WhyChooseUs } from "@/src/components/sections/WhyChooseUs";
import { DemoShowcase } from "@/src/components/sections/DemoShowcase";
import { Features } from "@/src/components/sections/Features";
import { Process } from "@/src/components/sections/Process";
import { Pricing } from "@/src/components/sections/Pricing";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { FAQ } from "@/src/components/sections/FAQ";
import { Contact } from "@/src/components/sections/Contact";
import { WhatsAppCTA } from "@/src/components/sections/WhatsAppCTA";
import { Footer } from "@/src/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <DemoShowcase />
      <Features />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <WhatsAppCTA />
      <Footer />
    </div>
  );
}