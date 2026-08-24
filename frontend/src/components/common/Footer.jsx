import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp, Building2, Linkedin, Twitter, Github } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const getUserType = () => {
    return user?.userType?.replace('ROLE_', '').toLowerCase();
  };

  const getCtaLink = () => {
    if (!user) return "/register";
    const type = getUserType();
    if (type === "seeker") return "/seeker-dashboard/find-pg";
    if (type === "provider") return "/provider-dashboard/my-properties";
    return "/admin-dashboard";
  };

  const getCtaLabel = () => {
    if (!user) return "Explore Accommodations";
    const type = getUserType();
    if (type === "seeker") return "Browse Accommodations";
    if (type === "provider") return "Manage Properties";
    return "Operations Center";
  };

  const getListPropertyLink = () => {
    if (!user) return "/register";
    const type = getUserType();
    if (type === "provider") return "/provider-dashboard/add-property";
    if (type === "seeker") return "/seeker-dashboard/find-pg";
    return "/admin-dashboard/approvals";
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Subscribed to PG Made Eazy updates.");
    setNewsletterEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-neutral-400 pt-20 pb-12 relative overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-red-600/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Action Banner */}
        <div className="pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-xl border border-red-600/30 text-[10px] font-mono uppercase tracking-widest text-white mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
              <span className="text-[#E50914] font-bold">READY TO GET STARTED?</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-xl leading-[1.05]">
              {user ? "Verified stay living made simple." : "Let’s simplify your next stay."}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={getCtaLink()}
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.7)] transition-all duration-300 cursor-pointer"
            >
              <span>{getCtaLabel()}</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Links & Information Grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]">
                <Building2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold uppercase tracking-tight text-white">
                PG Made <span className="text-[#E50914]">Eazy</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              The verified residential network for students, engineers, and property managers. Zero brokerage friction, audited compliance, and direct secure bookings.
            </p>
          </div>

          {/* Navigation links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white">
              PLATFORM
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <NavLink to={user ? (getUserType() === 'seeker' ? '/seeker-dashboard/find-pg' : getUserType() === 'provider' ? '/provider-dashboard' : '/admin-dashboard') : "/"} className="hover:text-red-400 transition-colors">
                  {user ? "Dashboard" : "Directory"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works" className="hover:text-red-400 transition-colors">
                  Methodology
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-red-400 transition-colors">
                  Support Desk
                </NavLink>
              </li>
              <li>
                <NavLink to={getListPropertyLink()} className="hover:text-red-400 transition-colors">
                  {user && getUserType() === 'provider' ? "Add Property" : user && getUserType() === 'seeker' ? "Find Accommodations" : "List Property"}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Hubs / Regions (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white">
              LOCATIONS
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-neutral-400">
              <li>HITEC City, HYD</li>
              <li>Koramangala, BLR</li>
              <li>Gachibowli, HYD</li>
              <li>HSR Layout, BLR</li>
              <li>Hinjawadi, Pune</li>
            </ul>
          </div>

          {/* Newsletter Input (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-white">
              DISPATCH
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated openings and verified inventory alerts.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="email@domain.com"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-l-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#E50914] text-white text-xs font-bold rounded-r-lg hover:bg-[#b80710] shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
                aria-label="Subscribe"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Socials, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} PG Made Eazy Inc. Designed with intention.
          </p>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/vamshi05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#E50914] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/vamshi_0508"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#E50914] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/VamshiMudiraj05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#E50914] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}