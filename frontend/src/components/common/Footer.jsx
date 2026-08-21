import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Mail, Linkedin, Twitter, Instagram, Github, ArrowUpRight, ArrowUp, Building2, MapPin, Phone, ShieldCheck, Heart } from "lucide-react";
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
    <footer className="relative bg-black border-t border-[#1a1a22] text-secondary pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#FF6100]/10 blur-3xl pointer-events-none rounded-full glow-orange-sm" />

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-[#1c1c24]">
          
          {/* Brand & Mission (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6100] text-black shadow-md shadow-[#FF6100]/25">
                <Building2 className="h-5 w-5 text-black stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black uppercase tracking-tight text-white">
                PG Made Eazy
              </span>
            </div>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-sm font-medium">
              Discover, verify, and lock premium student accommodations and paying guest spaces with 100% verified security, zero brokerage confusion, and instant digital escrow.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6100] bg-[#FF6100]/10 border border-[#FF6100]/25 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="h-4 w-4" />
              <span>100% VERIFIED & ESCROW SECURED</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider">
              <li>
                <NavLink to="/" className="hover:text-[#FF6100] transition-colors duration-150">
                  Home Directory
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works" className="hover:text-[#FF6100] transition-colors duration-150">
                  How It Works
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-[#FF6100] transition-colors duration-150">
                  Contact Support
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="hover:text-[#FF6100] transition-colors duration-150">
                  List Property
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">
              COMMUNITY HUB
            </h3>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-wider">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-[#FF6100] mt-0.5 shrink-0" />
                <span className="text-[#cfcfd4]">support@pgmadeeazy.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#FF6100] mt-0.5 shrink-0" />
                <span className="text-[#cfcfd4]">HITEC City, Hyderabad, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-[#FF6100] mt-0.5 shrink-0" />
                <span className="text-[#cfcfd4]">+91 8247593561</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">
              STAY UPDATED
            </h3>
            <p className="text-xs text-[#888888] font-medium leading-relaxed">
              Get flash notifications of newly verified properties and campus accommodation openings.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-3.5 pr-12 py-2.5 bg-[#0e0e12] border border-[#1e1e26] rounded-lg text-xs font-semibold text-white placeholder-[#71717a] focus:outline-none focus:border-[#FF6100] transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 p-2 bg-[#FF6100] text-black font-bold rounded hover:bg-[#ff751a] transition-all duration-150"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[3]" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* 🚀 Giant Watermark Brand Signature Banner */}
        <div className="py-12 border-b border-[#1c1c24] flex items-center justify-between overflow-hidden select-none">
          <div className="text-4xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter text-white/90 hover:text-white transition-colors duration-300">
            PG MADE EAZY<span className="text-[#FF6100]">™</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-[#71717a]">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} PG Made Eazy. Built with{" "}
            <Heart className="h-3.5 w-3.5 text-[#FF6100] fill-[#FF6100] inline mx-0.5" /> for modern living.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-2">
            <a
              href="https://www.linkedin.com/in/vamshi05"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0e0e12] border border-[#1e1e26] text-[#888888] hover:text-[#FF6100] hover:border-[#FF6100]/40 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/vamshi_0508"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0e0e12] border border-[#1e1e26] text-[#888888] hover:text-[#FF6100] hover:border-[#FF6100]/40 transition-all duration-200"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/mruh_meme_project_/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0e0e12] border border-[#1e1e26] text-[#888888] hover:text-[#FF6100] hover:border-[#FF6100]/40 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/VamshiMudiraj05"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0e0e12] border border-[#1e1e26] text-[#888888] hover:text-[#FF6100] hover:border-[#FF6100]/40 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0e0e12] border border-[#1e1e26] text-secondary hover:text-white hover:border-[#FF6100] hover:bg-[#FF6100]/10 glow-orange-sm transition-all duration-200"
          >
            <ArrowUp className="h-3.5 w-3.5 text-primary" />
            <span>TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}