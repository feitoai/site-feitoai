import { Navbar } from "@/components/navbar";
import { ChatWidget } from "@/components/chat-widget";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { IntegrationsSection } from "@/components/sections/integrations-section";
import { FeitoChatSection } from "@/components/sections/feitochat-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FeitoChatSection />
      <PricingSection />
      <ROICalculator />
      <IntegrationsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
