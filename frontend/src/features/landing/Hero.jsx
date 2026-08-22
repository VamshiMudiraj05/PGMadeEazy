import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  ArrowUpRight,
  Star, 
  ChevronDown, 
  Check, 
  Building,
  ShieldCheck,
  Zap,
  Users,
  Compass,
  Lock,
  Award,
  Layers,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Curated stay categories with editorial structure
const stayCategories = [
  {
    num: "01",
    tag: "TECH CORRIDOR",
    name: "Cyber Corridor Pods",
    sub: "HITEC City • Whitefield • Cyber Hub",
    price: "₹8,500/mo",
    rating: "4.9",
    occupancy: "98% Booked",
    perks: ["1 Gbps Fiber", "Power Backup", "Biometric Access"],
  },
  {
    num: "02",
    tag: "CAMPUS LIVING",
    name: "Varsity Suites & Flats",
    sub: "Gachibowli • Koramangala • North Campus",
    price: "₹6,200/mo",
    rating: "4.8",
    occupancy: "High Demand",
    perks: ["3 Meals Daily", "Housekeeping", "Study Lounges"],
  },
  {
    num: "03",
    tag: "EXECUTIVE LUXURY",
    name: "Private Executive Residences",
    sub: "Indiranagar • Jubilee Hills • Bandra",
    price: "₹14,000/mo",
    rating: "5.0",
    occupancy: "Limited Units",
    perks: ["Private Balcony", "Smart TV & AC", "Fitness Center"],
  },
  {
    num: "04",
    tag: "COMMUNITY CO-LIVING",
    name: "Creative & Nomad Commune",
    sub: "HSR Layout • Madhapur • Baner",
    price: "₹9,800/mo",
    rating: "4.9",
    occupancy: "Fast Filling",
    perks: ["Zero Brokerage", "Community Events", "Work Desks"],
  }
];

// City hubs
const cityHubs = [
  { name: "HITEC City", city: "Hyderabad", count: "140+ PGs", tone: "Tech Elite" },
  { name: "Koramangala", city: "Bangalore", count: "210+ PGs", tone: "Startup Hub" },
  { name: "Gachibowli", city: "Hyderabad", count: "95+ PGs", tone: "Campus Zone" },
  { name: "HSR Layout", city: "Bangalore", count: "160+ PGs", tone: "Modern Co-live" },
  { name: "Indiranagar", city: "Bangalore", count: "80+ PGs", tone: "Premium Stays" },
  { name: "Hinjawadi", city: "Pune", count: "115+ PGs", tone: "IT Park" },
  { name: "Madhapur", city: "Hyderabad", count: "175+ PGs", tone: "Urban Center" },
  { name: "Cyber Hub", city: "Gurugram", count: "130+ PGs", tone: "Corporate Suites" },
];

// Editorial Testimonials
const testimonials = [
  {
    quote: "Found and reserved a single studio in HITEC City in 15 minutes. The photographic audit was 100% accurate.",
    author: "Kartik N.",
    role: "Staff Engineer @ Microsoft",
    city: "Hyderabad"
  },
  {
    quote: "Managing 4 PG facilities shifted from 40 calls a day to a unified dashboard. Digital payments transformed operations.",
    author: "Venkat Reddy",
    role: "Property Host (180 Beds)",
    city: "Bangalore"
  },
  {
    quote: "As a student relocating across states, this platform was the only one where compliance and pricing matched reality.",
    author: "Rhea Sen",
    role: "B.Tech Final Year",
    city: "Hyderabad"
  }
];

// FAQs
const faqs = [
  {
    q: "How is zero brokerage guaranteed?",
    a: "We connect verified seekers directly with authorized PG property hosts and property managers. There are no intermediary agents, hidden fees, or commission markups."
  },
  {
    q: "What does compliance verification involve?",
    a: "Every property passes an administrative verification audit: host government ID verification, property title validation, amenity checklist inspection, and authentic photograph verification."
  },
  {
    q: "How does the digital booking confirmation operate?",
    a: "When you select your stay dates and confirm a booking, transaction records are stored securely with automated digital invoices and immediate reservation locking."
  },
  {
    q: "Can I manage or inspect booking status post-reservation?",
    a: "Yes. From your Seeker Hub, you can track real-time booking status, download tax invoices, view check-in guides, and coordinate directly with your verified property host."
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [selectedType, setSelectedType] = useState("all");
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/seeker-dashboard/find-pg");
    } else {
      navigate("/login");
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA]">
      
      {/* 01. HERO SECTION - Asymmetric Editorial Composition */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1E1E26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left Headline & Search (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
                  <span>01 / Verified Residential Network</span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.98] text-white">
                  Everything you need. <br />
                  <span className="text-[#9E9EA7]">In one place.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#9E9EA7] leading-relaxed max-w-xl font-normal pt-2">
                  Curated student suites, tech corridor residences, and co-living spaces with audited compliance, zero brokerage friction, and instant confirmation.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white text-xs font-bold uppercase tracking-wider transition-all duration-150"
                >
                  <span>Explore Accommodations</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[2.5] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => navigate(user ? "/provider-dashboard" : "/register")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#141419] hover:bg-[#1C1C24] text-white text-xs font-bold uppercase tracking-wider border border-[#22222A] transition-colors"
                >
                  <Building className="h-3.5 w-3.5 text-[#9E9EA7]" />
                  <span>List Your Space</span>
                </button>
              </div>

              {/* Structured Minimal Search Terminal */}
              <div className="p-4 sm:p-5 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-4 max-w-xl">
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7A7A85]">
                  Search Directory
                </div>

                <form onSubmit={handleSearch} className="space-y-3">
                  <div className="relative flex items-center bg-[#0B0B0E] border border-[#22222A] rounded-sm px-3.5 py-2.5 focus-within:border-[#FF5A36]">
                    <MapPin className="h-4 w-4 text-[#FF5A36] shrink-0 mr-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Landmark, tech park, or institution..."
                      className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0B0B0E] border border-[#22222A] rounded-sm px-3 py-2">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#666672] mb-0.5">Location</label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        aria-label="Select City"
                        className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Hyderabad" className="bg-[#121217]">Hyderabad</option>
                        <option value="Bangalore" className="bg-[#121217]">Bangalore</option>
                        <option value="Pune" className="bg-[#121217]">Pune</option>
                        <option value="Delhi NCR" className="bg-[#121217]">Delhi NCR</option>
                      </select>
                    </div>

                    <div className="bg-[#0B0B0E] border border-[#22222A] rounded-sm px-3 py-2">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#666672] mb-0.5">Room Sharing</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        aria-label="Select Room Sharing Type"
                        className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                      >
                        <option value="all" className="bg-[#121217]">All Layouts</option>
                        <option value="single" className="bg-[#121217]">Single Private</option>
                        <option value="double" className="bg-[#121217]">Double Sharing</option>
                        <option value="triple" className="bg-[#121217]">Triple Sharing</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-sm bg-[#FAFAFA] hover:bg-white text-[#0B0B0E] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>Search Verified Inventory</span>
                  </button>
                </form>
              </div>

            </div>

            {/* Right Offset Product Showcase (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#1E1E26]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF5A36]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Live Inventory Audit</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#7A7A85] uppercase tracking-wider">Real-Time</span>
                </div>

                {/* Micro Product Preview Row 1 */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-sm bg-[#16161D] border border-[#22222A] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Aura Executive Stay</div>
                      <div className="text-[11px] text-[#7A7A85]">HITEC City • Single Private</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#FF5A36]">₹11,500/mo</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">Verified Badge</div>
                    </div>
                  </div>

                  {/* Micro Product Preview Row 2 */}
                  <div className="p-3.5 rounded-sm bg-[#16161D] border border-[#22222A] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Urban Nomad Co-Living</div>
                      <div className="text-[11px] text-[#7A7A85]">Koramangala • Double Sharing</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#FF5A36]">₹7,800/mo</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">Verified Badge</div>
                    </div>
                  </div>

                  {/* Micro Product Preview Row 3 */}
                  <div className="p-3.5 rounded-sm bg-[#16161D] border border-[#22222A] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Varsity Scholar Haven</div>
                      <div className="text-[11px] text-[#7A7A85]">Gachibowli • 3 Meals/Day</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#FF5A36]">₹6,200/mo</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">Verified Badge</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1E1E26] flex items-center justify-between text-xs text-[#7A7A85]">
                  <span>Compliance score: 100%</span>
                  <span>Direct landlord contracts</span>
                </div>
              </div>

              {/* Minimal Trust Statement */}
              <div className="p-4 rounded-sm bg-[#0E0E12] border border-[#1E1E26] flex items-center justify-between text-xs text-[#9E9EA7]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#FF5A36]" />
                  <span>Administrative ID Verification</span>
                </div>
                <span className="text-[#FAFAFA] font-semibold">0% Brokerage</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 02. METRICS - Generous Whitespace & Thin Dividers */}
      <section className="py-16 border-b border-[#1E1E26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white">500+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF5A36]">Verified Properties</div>
              <div className="text-xs text-[#7A7A85]">Audited compliance spaces</div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white">12.5k</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#9E9EA7]">Active Residents</div>
              <div className="text-xs text-[#7A7A85]">Students and engineers</div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white">4.92</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF5A36]">Average Rating</div>
              <div className="text-xs text-[#7A7A85]">From 3,800+ audited reviews</div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white">0%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#9E9EA7]">Brokerage Fees</div>
              <div className="text-xs text-[#7A7A85]">Direct verified connections</div>
            </div>

          </div>
        </div>
      </section>

      {/* 03. CASE STUDY / FEATURE BREAKDOWN (Editorial Presentation) */}
      <section className="py-20 md:py-28 border-b border-[#1E1E26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1E1E26]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36] block mb-2">
                02 / Product Architecture
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                How we engineered certainty.
              </h2>
            </div>
            <p className="text-sm text-[#9E9EA7] max-w-md">
              Replacing fragmented classifieds and shady brokers with an auditable, transparent digital lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 01 */}
            <div className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-4">
              <div className="text-xs font-bold text-[#FF5A36] tracking-widest uppercase">01 / Search</div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                High-precision search & verified media.
              </h3>
              <p className="text-xs text-[#9E9EA7] leading-relaxed">
                Filter by verified floor amenities, single/double sharing models, deposit limits, and authentic photographic audits.
              </p>
              <div className="pt-4 border-t border-[#1E1E26] text-[11px] font-semibold text-[#FAFAFA]">
                Instant criteria matching →
              </div>
            </div>

            {/* Feature 02 */}
            <div className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-4">
              <div className="text-xs font-bold text-[#FF5A36] tracking-widest uppercase">02 / Compliance</div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Owner ID & title audit before publish.
              </h3>
              <p className="text-xs text-[#9E9EA7] leading-relaxed">
                Every listing is vetted through admin verification. Unverified properties and fraudulent listings are prevented from publishing.
              </p>
              <div className="pt-4 border-t border-[#1E1E26] text-[11px] font-semibold text-[#FAFAFA]">
                24-hour verification turnaround →
              </div>
            </div>

            {/* Feature 03 */}
            <div className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-4">
              <div className="text-xs font-bold text-[#FF5A36] tracking-widest uppercase">03 / Confirmation</div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Transparent reservation & instant records.
              </h3>
              <p className="text-xs text-[#9E9EA7] leading-relaxed">
                Lock your stay dates with zero brokerage. Generate immediate tax receipts and coordinate directly with property hosts.
              </p>
              <div className="pt-4 border-t border-[#1E1E26] text-[11px] font-semibold text-[#FAFAFA]">
                Auditable digital trail →
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 04. CURATED STAYS LIST (Thin Dividers instead of cards) */}
      <section className="py-20 md:py-28 border-b border-[#1E1E26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1E1E26]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36] block mb-2">
                03 / Curated Directory
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Featured accommodations.
              </h2>
            </div>
            <button
              onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5A36] hover:text-white transition-colors"
            >
              <span>View Full Directory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Divider-based List Layout */}
          <div className="divide-y divide-[#1E1E26]">
            {stayCategories.map((cat, idx) => (
              <div
                key={idx}
                className="py-6 group transition-colors hover:bg-[#121217]/60 px-4 -mx-4 rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer"
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
              >
                <div className="flex items-start gap-6 lg:w-1/3">
                  <span className="text-xs font-mono font-bold text-[#666672] pt-0.5">{cat.num}</span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A36] block mb-1">
                      {cat.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF5A36] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#7A7A85] mt-0.5">{cat.sub}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:w-1/3">
                  {cat.perks.map((perk, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-[11px] font-medium text-[#9E9EA7] bg-[#16161D] border border-[#22222A] px-2.5 py-1 rounded-sm"
                    >
                      {perk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-6 lg:w-1/4">
                  <div className="text-left lg:text-right">
                    <div className="text-sm font-bold text-white">{cat.price}</div>
                    <div className="text-[10px] text-[#7A7A85] flex items-center lg:justify-end gap-1">
                      <Star className="h-3 w-3 text-[#FF5A36] fill-[#FF5A36]" />
                      <span>{cat.rating} • {cat.occupancy}</span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-sm bg-[#181820] border border-[#22222A] group-hover:border-[#FF5A36] flex items-center justify-center text-[#9E9EA7] group-hover:text-white transition-colors">
                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 05. PRIME LOCATIONS GRID */}
      <section className="py-20 md:py-28 border-b border-[#1E1E26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36] block mb-2">
              04 / Geographical Presence
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Every hub. All verified.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cityHubs.map((hub, idx) => (
              <div
                key={idx}
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="p-5 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-[#383848] transition-all duration-150 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF5A36] block mb-1">
                    {hub.tone}
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {hub.name}
                  </h4>
                  <p className="text-xs text-[#7A7A85]">{hub.city}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#1E1E26] flex items-center justify-between text-xs text-[#9E9EA7]">
                  <span>{hub.count}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF5A36]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 06. DUAL ECOSYSTEM - Seeker Suite vs Host Command */}
      <section className="py-20 md:py-28 border-b border-[#1E1E26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Seeker Suite */}
            <div className="p-8 sm:p-10 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF5A36] block">
                  For Residents & Seekers
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Seeker Access Pass
                </h3>
                <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
                  Browse authenticated rooms with honest photographic audits, transparent deposits, and direct owner messaging.
                </p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3 text-xs text-[#FAFAFA]">
                    <Check className="h-4 w-4 text-[#FF5A36] shrink-0 mt-0.5" />
                    <span>Instant digital reservation records with 0% brokerage markup</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-[#FAFAFA]">
                    <Check className="h-4 w-4 text-[#FF5A36] shrink-0 mt-0.5" />
                    <span>Audited amenities, meal schedules, and curfew policies</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-[#FAFAFA]">
                    <Check className="h-4 w-4 text-[#FF5A36] shrink-0 mt-0.5" />
                    <span>Direct host desk without middleman confusion</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="w-full py-3.5 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                {user ? "Browse Accommodations" : "Join as Seeker"}
              </button>
            </div>

            {/* Host Command Suite */}
            <div className="p-8 sm:p-10 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FAFAFA] block">
                  For Property Owners
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Host Command Suite
                </h3>
                <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
                  Publish verified properties, manage occupancy rates, monitor tenant records, and maintain 100% booking capacity.
                </p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3 text-xs text-[#FAFAFA]">
                    <Check className="h-4 w-4 text-[#FAFAFA] shrink-0 mt-0.5" />
                    <span>Streamlined 24-hour compliance approval workflow</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-[#FAFAFA]">
                    <Check className="h-4 w-4 text-[#FAFAFA] shrink-0 mt-0.5" />
                    <span>Real-time occupancy tracking and tenant roster management</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-[#FAFAFA]">
                    <Check className="h-4 w-4 text-[#FAFAFA] shrink-0 mt-0.5" />
                    <span>Zero listing fees and direct seeker acquisition</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(user ? (user.userType?.includes('PROVIDER') ? "/provider-dashboard/add-property" : "/provider-dashboard") : "/register")}
                className="w-full py-3.5 rounded-sm bg-[#181820] hover:bg-[#22222A] text-white font-bold text-xs uppercase tracking-wider border border-[#2A2A36] transition-colors"
              >
                {user ? (user.userType?.includes('PROVIDER') ? "Add Property" : "Host Suite") : "List Your Property"}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 07. EDITORIAL TESTIMONIALS */}
      <section className="py-20 md:py-28 border-b border-[#1E1E26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36] block mb-2">
              05 / Experiences
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Endorsed by residents & hosts.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#FF5A36]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FF5A36]" />
                    ))}
                  </div>
                  <p className="text-sm text-white leading-relaxed font-medium">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E1E26] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{t.author}</div>
                    <div className="text-[11px] text-[#7A7A85]">{t.role}</div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#9E9EA7] bg-[#181820] border border-[#22222A] px-2 py-0.5 rounded-sm">
                    {t.city}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 08. MINIMAL FAQ ACCORDION */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36] block">
              06 / Clarifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Frequently asked questions.
            </h2>
          </div>

          <div className="divide-y divide-[#1E1E26] border-y border-[#1E1E26]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-semibold text-white hover:text-[#FF5A36] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#7A7A85] transition-transform duration-200 shrink-0 ml-4 ${
                      activeFaq === idx ? "rotate-180 text-[#FF5A36]" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}


