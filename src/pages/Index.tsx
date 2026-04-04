import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto gradient-bg rounded-2xl p-12 text-primary-foreground">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Book a free consultation and discover how we can help you reach your full potential.
            </p>
            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-lg bg-background text-foreground font-semibold px-8 py-3 hover:bg-background/90 transition-colors"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <LeadCapturePopup />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
