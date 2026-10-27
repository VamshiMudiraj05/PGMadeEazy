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
    <footer className="bg-[#0b0b0d] border-t border-[#111] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-[#a7aaaf] pt-16 pb-12 relative font-['Barlow_Semi_Condensed']">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        
        {/* Terminal Callout Box */}
        <div className="board flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#ffb000] font-semibold mb-2">
              DISPATCH // STUDENT PG & HOSTEL NETWORK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.14em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
              {user ? "VERIFIED STUDENT LIVING. OPERATIONAL." : "ZERO BROKERAGE STUDENT PGS."}
            </h2>
            <p className="text-sm text-[#a7aaaf] mt-1 max-w-xl">
              100% direct PG owner rates across India's leading university, college, and campus corridors.
            </p>
          </div>

          <div>
            <Link
              to={getCtaLink()}
              className="btn-solari btn-solari-amber text-xs"
            >
              <span>{getCtaLabel()}</span>
              <span className="chev">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#202226]">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] font-['Big_Shoulders_Display'] font-bold text-base">
                PG
              </div>
              <span className="text-lg font-bold tracking-[0.14em] text-white uppercase font-['Big_Shoulders_Display']">
                PG MADE <span className="text-[#ffb000]">EAZY</span>
              </span>
            </div>
            <p className="text-xs text-[#a7aaaf] leading-relaxed max-w-sm">
              The verified student PG and hostel network for college students and young professionals. Zero brokerage friction, verified mess meals, study WiFi, and direct bookings.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-[11px] font-mono tracking-[0.18em] uppercase text-white font-bold">
              NAVIGATION
            </h3>
            <ul className="space-y-2 text-xs font-semibold uppercase tracking-[0.12em]">
              <li>
                <NavLink to="/" className="hover:text-[#ffb000] transition-colors">
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works" className="hover:text-[#ffb000] transition-colors">
                  How It Works
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-[#ffb000] transition-colors">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to={getListPropertyLink()} className="hover:text-[#ffb000] transition-colors">
                  List Property
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-[11px] font-mono tracking-[0.18em] uppercase text-white font-bold">
              SYSTEM DISPATCH
            </h3>
            <p className="text-xs text-[#a7aaaf]">
              Join the real-time vacancy alerts for upcoming corridor vacancies.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-stretch border border-[#34373c] rounded-[3px] overflow-hidden bg-[#0e0f11]">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="YOUR.NAME@DOMAIN.COM"
                className="w-full px-3 py-2 bg-transparent text-xs text-white placeholder-[#5b5e63] focus:outline-none uppercase font-mono"
                required
              />
              <button
                type="submit"
                className="px-4 bg-[#ffb000] text-[#111] text-xs font-bold uppercase tracking-wider hover:bg-[#ffc233] cursor-pointer"
              >
                JOIN
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-[0.14em] text-[#a7aaaf]">
          <p>
            &copy; {new Date().getFullYear()} PG MADE EAZY // STUDENT PG DISPATCH.
          </p>

          <div className="flex items-center space-x-5">
            <a href="https://github.com/VamshiMudiraj05" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffb000] transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://x.com/vamshi_0508" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffb000] transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/vamshi05" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffb000] transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>TOP OF TERMINAL</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}