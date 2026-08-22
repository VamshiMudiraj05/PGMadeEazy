import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp, Building2, Mail, Linkedin, Twitter, Instagram, Github } from "lucide-react";
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
    <footer className="bg-[#0B0B0E] border-t border-[#1E1E26] text-[#9E9EA7] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Editorial Action Banner */}
        <div className="pb-16 border-b border-[#1E1E26] flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36] block mb-3">
              {user ? "Platform Navigation" : "Ready to get started?"}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-xl leading-[1.05]">
              {user ? "Verified stay living made simple." : "Let’s simplify your next stay."}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={getCtaLink()}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white text-xs font-bold uppercase tracking-wider transition-all duration-150"
            >
              <span>{getCtaLabel()}</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Links & Information Grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-[#1E1E26]">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#FF5A36] text-white">
                <Building2 className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
              <span className="text-base font-extrabold uppercase tracking-tight text-white">
                PG Made Eazy
              </span>
            </div>
            <p className="text-xs text-[#9E9EA7] leading-relaxed max-w-sm">
              The verified residential network for students, engineers, and property managers. Zero brokerage friction, audited compliance, and direct secure bookings.
            </p>
          </div>

          {/* Navigation links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FAFAFA]">
              Platform
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <NavLink to={user ? (getUserType() === 'seeker' ? '/seeker-dashboard/find-pg' : getUserType() === 'provider' ? '/provider-dashboard' : '/admin-dashboard') : "/"} className="hover:text-white transition-colors">
                  {user ? "Dashboard" : "Directory"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/how-it-works" className="hover:text-white transition-colors">
                  Methodology
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-white transition-colors">
                  Support Desk
                </NavLink>
              </li>
              <li>
                <NavLink to={getListPropertyLink()} className="hover:text-white transition-colors">
                  {user && getUserType() === 'provider' ? "Add Property" : user && getUserType() === 'seeker' ? "Find Accommodations" : "List Property"}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Hubs / Regions (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FAFAFA]">
              Locations
            </h3>
            <ul className="space-y-2 text-xs font-medium text-[#7A7A85]">
              <li>HITEC City, HYD</li>
              <li>Koramangala, BLR</li>
              <li>Gachibowli, HYD</li>
              <li>HSR Layout, BLR</li>
              <li>Hinjawadi, Pune</li>
            </ul>
          </div>

          {/* Newsletter Input (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FAFAFA]">
              Dispatch
            </h3>
            <p className="text-xs text-[#7A7A85] leading-relaxed">
              Curated openings and verified inventory alerts.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="email@domain.com"
                className="w-full px-3 py-2 bg-[#121217] border border-[#22222A] rounded-l-sm text-xs text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36]"
                required
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#FF5A36] text-white text-xs font-bold rounded-r-sm hover:bg-[#E54B28] transition-colors"
                aria-label="Subscribe"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Socials, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#666672]">
          <p>
            &copy; {new Date().getFullYear()} PG Made Eazy Inc. Designed with intention.
          </p>

          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/vamshi05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9E9EA7] hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/vamshi_0508"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9E9EA7] hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/VamshiMudiraj05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9E9EA7] hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#9E9EA7] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}