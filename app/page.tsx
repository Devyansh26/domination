import { HeroSection } from "./components/HeroSection";
import { ValueSection } from "./components/ValueSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValueSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </>
  );
}
