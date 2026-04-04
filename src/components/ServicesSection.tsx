import { Link } from "react-router-dom";
import { FileText, Linkedin, PenTool, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const services = [
  {
    icon: FileText,
    title: "Resume Review",
    description: "Get your resume professionally reviewed with AI-powered insights and expert recommendations to stand out.",
    price: "Starting ₹499",
    link: "/booking?service=resume",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Optimization",
    description: "Transform your LinkedIn profile into a magnet for recruiters with optimized headlines, summaries, and strategy.",
    price: "Starting ₹799",
    link: "/booking?service=linkedin",
  },
  {
    icon: PenTool,
    title: "Ghostwriting",
    description: "Professional content writing for your personal brand — LinkedIn posts, articles, and thought leadership pieces.",
    price: "Starting ₹999",
    link: "/ghostwriting",
  },
  {
    icon: Users,
    title: "Personal Mentorship",
    description: "One-on-one sessions for career direction, confidence building, healing, and finding your true path.",
    price: "Starting ₹1,499",
    link: "/booking?service=mentorship",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Services That <span className="gradient-text">Elevate</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tailored career solutions designed to help graduates and professionals stand out and succeed.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item}>
              <Card className="group h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-5">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1 mb-4">{service.description}</p>
                  <p className="text-sm font-semibold text-primary mb-4">{service.price}</p>
                  <Link to={service.link}>
                    <Button variant="ghost" size="sm" className="gap-1 px-0 text-primary hover:text-primary">
                      Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
