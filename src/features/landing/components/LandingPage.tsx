import { useScrollReveal } from "../hooks/useScrollReveal";
import { BenefitsSection } from "../sections/BenefitsSection";
import { DownloadSection } from "../sections/DownloadSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { HeroSection } from "../sections/HeroSection";
import { HowItWorksSection } from "../sections/HowItWorksSection";
import { MoleculesSection } from "../sections/MoleculesSection";
import { ProblemsSection } from "../sections/ProblemsSection";
import { SocialProofSection } from "../sections/SocialProofSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";

export function LandingPage() {
  useScrollReveal();

  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <BenefitsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MoleculesSection />
      <SocialProofSection />
      <TestimonialsSection />
      <DownloadSection />
    </>
  );
}
