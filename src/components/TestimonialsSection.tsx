import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at TCS",
    text: "The resume review was a game changer. I got 3 interview calls within a week of updating my resume with the suggestions!",
    rating: 5,
  },
  {
    name: "Rahul Patel",
    role: "Recent Graduate",
    text: "The mentorship sessions gave me clarity I never had. I went from confused to confident about my career path in just 2 sessions.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "Marketing Professional",
    text: "LinkedIn optimization completely transformed my profile. I started getting recruiters messaging me within days. Highly recommend!",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Freelance Writer",
    text: "The ghostwriting samples blew my mind. The quality of content and understanding of personal branding is exceptional.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real stories from real people who transformed their careers with our guidance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
