import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Linkedin, PenTool, Users, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const services = [
  {
    id: "resume",
    icon: FileText,
    title: "Resume Review",
    description: "Professional AI-powered resume review with detailed feedback, keyword optimization, and ATS scoring.",
    price: "₹499",
    duration: "30 min",
    features: ["ATS Score Check", "Keyword Optimization", "Format Review", "Actionable Feedback"],
  },
  {
    id: "linkedin",
    icon: Linkedin,
    title: "LinkedIn Optimization",
    description: "Complete LinkedIn profile overhaul — headline, summary, experience, and networking strategy.",
    price: "₹799",
    duration: "45 min",
    features: ["Headline Optimization", "Summary Rewrite", "Keyword Strategy", "Content Plan"],
  },
  {
    id: "ghostwriting",
    icon: PenTool,
    title: "Ghostwriting",
    description: "Professional content writing for LinkedIn posts, articles, and personal brand building.",
    price: "₹999",
    duration: "Custom",
    features: ["LinkedIn Posts", "Articles", "Thought Leadership", "Brand Voice"],
  },
  {
    id: "mentorship",
    icon: Users,
    title: "Personal Mentorship",
    description: "One-on-one career mentoring sessions for clarity, confidence, and direction.",
    price: "₹1,499",
    duration: "60 min",
    features: ["Career Direction", "Confidence Building", "Goal Setting", "Action Plan"],
  },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const Booking = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [step, setStep] = useState(1);

  const handleBook = () => {
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill all fields");
      return;
    }
    // TODO: Razorpay integration + Supabase storage
    toast.success("Booking request submitted! We'll confirm your slot shortly.");
    setStep(1);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Book a <span className="gradient-text">Session</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Choose a service, pick your time, and let's get started on your career transformation.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {["Service", "Date & Time", "Details"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step > i + 1 ? "bg-primary text-primary-foreground" : step === i + 1 ? "gradient-bg text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="hidden sm:inline text-sm text-muted-foreground">{label}</span>
              {i < 2 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {services.map((s) => (
              <Card
                key={s.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedService === s.id ? "border-primary ring-2 ring-primary/20" : "border-border/50"}`}
                onClick={() => setSelectedService(s.id)}
              >
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mb-4">
                    <s.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold mb-1 text-foreground">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{s.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-heading font-bold text-lg text-foreground">{s.price}</span>
                    <Badge variant="secondary" className="text-xs">{s.duration}</Badge>
                  </div>
                  <ul className="space-y-1">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-heading font-semibold mb-3 text-foreground">Select Date</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border pointer-events-auto"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-3 text-foreground">Select Time</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((t) => (
                        <Button
                          key={t}
                          variant={selectedTime === t ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(t)}
                          className={selectedTime === t ? "gradient-bg border-0 text-primary-foreground" : ""}
                        >
                          {t}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-heading font-semibold text-foreground">Your Details</h3>
                <div>
                  <Label>Name</Label>
                  <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
                </div>
                <Button onClick={handleBook} className="w-full gradient-bg border-0 text-primary-foreground">
                  Proceed to Payment (Razorpay)
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 1 && selectedService && (
          <div className="text-center mt-8">
            <Button onClick={() => setStep(2)} className="gradient-bg border-0 text-primary-foreground px-8">
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {step === 2 && selectedDate && selectedTime && (
          <div className="text-center mt-8">
            <Button onClick={() => setStep(3)} className="gradient-bg border-0 text-primary-foreground px-8">
              Continue <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
