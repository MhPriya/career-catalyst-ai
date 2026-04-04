import { Link } from "react-router-dom";
import { Sparkles, Mail, Phone, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-bold text-foreground">BrandUp</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered career guidance, motivation, and personal branding for the next generation of professionals.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2">
              {["Resume Review", "LinkedIn Optimization", "Ghostwriting", "Mentorship"].map((s) => (
                <li key={s}>
                  <Link to="/booking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Daily Motivation", href: "/daily-motivation" },
                { label: "Book a Session", href: "/booking" },
                { label: "Ghostwriting", href: "/ghostwriting" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" /> hello@brandup.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20career%20guidance" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BrandUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
