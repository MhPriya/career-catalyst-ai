import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const samples = [
  {
    title: "From Zero to Thought Leader: A LinkedIn Story",
    preview: "When I started posting on LinkedIn, I had 200 connections and zero engagement. Fast forward 6 months — 15K followers, 3 job offers, and a personal brand that speaks before I do.\n\nHere's exactly what changed:\n\n1. I stopped posting generic motivational quotes\n2. I started sharing real stories from my career\n3. I engaged with 20 posts every morning before posting mine...",
    full: true,
  },
  {
    title: "The Resume That Got 12 Interview Calls",
    preview: "My client came to me with a 3-page resume full of buzzwords and zero impact. After our session, we transformed it into a 1-page powerhouse that landed 12 interview calls in 2 weeks.\n\nThe secret? We followed the STAR method for every bullet point and removed everything that didn't directly prove their value...",
    full: true,
  },
  {
    title: "Why Your Cover Letter Is Costing You Jobs",
    preview: "I reviewed 500+ cover letters last year. 90% of them started with 'I am writing to express my interest in the position of...' — the most boring opening in history.\n\nHere's what top candidates do differently...",
    full: true,
  },
];

const lockedSamples = [
  { title: "Complete LinkedIn Content Calendar (30 Days)", type: "Premium" },
  { title: "Executive Bio Writing Template", type: "Premium" },
  { title: "Personal Brand Strategy Document", type: "Premium" },
];

const Ghostwriting = () => {
  const [ctaOpen, setCtaOpen] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  const handleView = () => {
    const next = viewCount + 1;
    setViewCount(next);
    if (next >= 3) {
      setTimeout(() => setCtaOpen(true), 500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Ghostwriting <span className="gradient-text">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Professional content that builds your personal brand. See real samples below.
          </p>
        </div>

        {/* Free samples */}
        <div className="max-w-3xl mx-auto space-y-6 mb-12">
          <h2 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" /> Free Samples
          </h2>
          {samples.map((s, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-3 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{s.preview}</p>
                <Button variant="ghost" size="sm" className="mt-3 text-primary gap-1" onClick={handleView}>
                  Read Full Sample <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Locked content */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
            <Lock className="h-5 w-5 text-accent" /> Premium Content
          </h2>
          {lockedSamples.map((s, i) => (
            <Card key={i} className="border-border/50 opacity-75 relative overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-heading font-medium text-foreground">{s.title}</span>
                </div>
                <Badge variant="secondary">{s.type}</Badge>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 pointer-events-none" />
            </Card>
          ))}
          <div className="text-center mt-8">
            <Button onClick={() => setCtaOpen(true)} className="gradient-bg border-0 text-primary-foreground px-8">
              Get Premium Ghostwriting
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={ctaOpen} onOpenChange={setCtaOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Unlock Premium Ghostwriting</DialogTitle>
            <DialogDescription>
              Get professionally written content that builds your personal brand and attracts opportunities.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 my-4">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold">✓</span> 30-day LinkedIn content calendar
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold">✓</span> Executive bio and summary
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold">✓</span> Before/after transformation
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-bold">✓</span> Dedicated brand strategist
            </div>
          </div>
          <Link to="/booking?service=ghostwriting" onClick={() => setCtaOpen(false)}>
            <Button className="w-full gradient-bg border-0 text-primary-foreground">
              Book Ghostwriting — Starting ₹999
            </Button>
          </Link>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Ghostwriting;
