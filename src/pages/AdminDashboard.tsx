import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Calendar, CreditCard, Sparkles, Bot, Phone, Instagram, Linkedin } from "lucide-react";

const stats = [
  { label: "Total Leads", value: "1,247", icon: Users, change: "+12%" },
  { label: "Bookings", value: "89", icon: Calendar, change: "+8%" },
  { label: "Revenue", value: "₹1,23,400", icon: CreditCard, change: "+15%" },
  { label: "Content Published", value: "156", icon: FileText, change: "+5%" },
];

const placeholders = [
  { label: "AI Content Generator", icon: Sparkles, status: "Coming in Phase 3" },
  { label: "AI Chatbot", icon: Bot, status: "Placeholder" },
  { label: "AI Calling System", icon: Phone, status: "Placeholder" },
  { label: "Instagram Auto-Post", icon: Instagram, status: "Placeholder" },
  { label: "LinkedIn Auto-Post", icon: Linkedin, status: "Placeholder" },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your personal brand platform.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <Card key={s.label} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <s.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">{s.change}</Badge>
                </div>
                <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder integrations */}
        <h2 className="font-heading text-xl font-semibold mb-4 text-foreground">Integrations & AI Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholders.map((p) => (
            <Card key={p.label} className="border-border/50 opacity-70">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <p.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground">{p.label}</p>
                  <Badge variant="outline" className="text-xs mt-1">{p.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
