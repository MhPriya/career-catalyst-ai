import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const STORAGE_KEY = "brandup_lead_captured";

const LeadCapturePopup = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    // TODO: Store in Supabase when backend is enabled
    console.log("Lead captured:", form);
    localStorage.setItem(STORAGE_KEY, "true");
    toast.success("Welcome aboard! Check your email for a surprise 🎉");
    setOpen(false);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-primary" />
            <DialogTitle className="font-heading text-xl">Get Free Career Tips</DialogTitle>
          </div>
          <DialogDescription>
            Join 500+ professionals receiving daily motivation, career tips, and exclusive resources.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="lead-name" className="text-sm">Name</Label>
            <Input
              id="lead-name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor="lead-email" className="text-sm">Email</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
            />
          </div>
          <div>
            <Label htmlFor="lead-phone" className="text-sm">Phone</Label>
            <Input
              id="lead-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={20}
            />
          </div>
          <Button type="submit" className="w-full gradient-bg border-0 text-primary-foreground" disabled={loading}>
            {loading ? "Submitting..." : "Get Free Tips →"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">No spam, unsubscribe anytime.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCapturePopup;
