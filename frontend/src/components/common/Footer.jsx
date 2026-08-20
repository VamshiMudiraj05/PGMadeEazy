import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Mail, Linkedin, Twitter, Instagram, Github, Send, ArrowUp, Building2, MapPin, Phone, ShieldCheck, Heart } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to PG Made Eazy updates!");
    setNewsletterEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-orange-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-zinc-800/80">
          
          {/* Brand & Mission (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-md shadow-orange-500/25">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-orange-400 bg-clip-text text-transparent">
                PG Made Eazy
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Discover, verify, and book premium paying guest accommodations and student hostels with zero friction, zero brokerage confusion, and 100% verified security.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Verified Listings & Secure Payments</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-100">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink to="/" className="hover:text-orange-400 transition-colors duration-200">
                  Home Catalog
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works" className="hover:text-orange-400 transition-colors duration-200">
                  How It Works
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-orange-400 transition-colors duration-200">
                  Contact Support
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="hover:text-orange-400 transition-colors duration-200">
                  List Your Property
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-100">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                <span className="text-zinc-300">support@pgmadeeazy.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                <span className="text-zinc-300">HITEC City, Hyderabad, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                <span className="text-zinc-300">+91 8247593561</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-100">
              Stay Updated
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get notified of newly verified PGs, flash discounts, and campus accommodation alerts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-3.5 pr-12 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm"
                  aria-label="Subscribe"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} PG Made Eazy. Crafted with{" "}
            <Heart className="h-3.5 w-3.5 text-orange-500 fill-orange-500 inline" /> for seekers & providers.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href="https://www.linkedin.com/in/vamshi05"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400 hover:border-orange-500/40 hover:glow-orange-sm transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/vamshi_0508"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400 hover:border-orange-500/40 hover:glow-orange-sm transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/mruh_meme_project_/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400 hover:border-orange-500/40 hover:glow-orange-sm transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/VamshiMudiraj05"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400 hover:border-orange-500/40 hover:glow-orange-sm transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300"
          >
            <ArrowUp className="h-3.5 w-3.5 text-orange-500" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}