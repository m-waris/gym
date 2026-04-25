import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Programs from "@/components/Programs";
import Stats from "@/components/Stats";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className=" ">
      <Navbar />
      <Hero />
      <Marquee />
      <Programs />
      <Stats />
      <Trainers />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
