import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import AgitateSection from "@/components/AgitateSection";
import SolutionSection from "@/components/SolutionSection";
import ProofSection from "@/components/ProofSection";
import HowItWorks from "@/components/HowItWorks";
import Differentiation from "@/components/Differentiation";
import DemoCTA from "@/components/DemoCTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ExitIntent from "@/components/ExitIntent";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ProblemSection />
      <AgitateSection />
      <SolutionSection />
      <ProofSection />
      <HowItWorks />
      <Differentiation />
      <DemoCTA />
      <Footer />
      <StickyCTA />
      <ExitIntent />
    </main>
  );
}
