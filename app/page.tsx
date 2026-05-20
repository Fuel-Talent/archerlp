import type { Metadata } from "next";
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
import { fetchLandingContent } from "@/sanity/lib/fetchContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchLandingContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      type: "website",
    },
  };
}

export default async function Page() {
  const content = await fetchLandingContent();
  return (
    <main className="relative">
      <Navbar content={content.nav} />
      <Hero hero={content.hero} terminal={content.terminal} />
      <ProblemSection content={content.problem} />
      <AgitateSection content={content.agitate} />
      <SolutionSection content={content.solution} />
      <ProofSection content={content.proof} />
      <HowItWorks content={content.howItWorks} />
      <Differentiation content={content.differentiation} />
      <DemoCTA content={content.demo} />
      <Footer content={content.footer} nav={content.nav} />
      <StickyCTA content={content.stickyCta} />
      <ExitIntent content={content.exitIntent} />
    </main>
  );
}
