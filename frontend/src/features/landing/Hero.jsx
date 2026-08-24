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
  Building2,
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Curated stay categories with authentic editorial structure
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

// Authentic Testimonials
const testimonials = [
  {
    quote: "Found and reserved a single studio in HITEC City in 15 minutes. The photographic audit was 100% accurate.",
    author: "Kartik N.",
    role: "Staff Engineer @ Microsoft",
    city: "Hyderabad",
    rating: 5
  },
  {
    quote: "Managing 4 PG facilities shifted from 40 calls a day to a unified dashboard. Digital payments transformed operations.",
    author: "Venkat Reddy",
    role: "Property Host (180 Beds)",
    city: "Bangalore",
    rating: 5
  },
  {
    quote: "As a student relocating across states, this platform was the only one where compliance and pricing matched reality.",
    author: "Rhea Sen",
    role: "B.Tech Final Year",
    city: "Hyderabad",
    rating: 5
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
    <div className="bg-[#050505] text-white min-h-screen relative overflow-hidden select-none">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-0 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-0 w-[550px] h-[550px] bg-red-600/8 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* 01. HERO SECTION - Dark Studio Style */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Headline & Search Console (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(229,9,20,0.25)]">
                  <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
                  <span className="text-[#E50914] font-bold">VERIFIED RESIDENTIAL NETWORK</span>
                  <span className="text-white/30">|</span>
                  <span>DIRECT OWNER BOOKINGS</span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.02] text-white">
                  Everything you need. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-red-500 to-amber-500">
                    In one place.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl font-normal pt-2">
                  Curated student suites, tech corridor residences, and co-living spaces with audited compliance, zero brokerage friction, and instant confirmation.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                  className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(229,9,20,0.5)] hover:shadow-[0_0_35px_rgba(229,9,20,0.8)] transition-all duration-300 cursor-pointer"
                >
                  <span>Explore Accommodations</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={() => navigate(user ? "/provider-dashboard" : "/register")}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/15 backdrop-blur-xl transition-all duration-200 cursor-pointer"
                >
                  <Building className="h-4 w-4 text-red-400" />
                  <span>List Your Property</span>
                </button>
              </div>

              {/* Glassmorphic Search Bar Console */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-2xl space-y-4 max-w-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />
                
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  <span className="text-red-500 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    SEARCH DIRECTORY
                  </span>
                  <span>REAL-TIME INVENTORY</span>
                </div>

                <form onSubmit={handleSearch} className="space-y-3.5">
                  <div className="relative flex items-center bg-black/60 border border-white/15 rounded-lg px-4 py-3 focus-within:border-[#E50914] focus-within:ring-1 focus-within:ring-[#E50914]/50 transition-all">
                    <MapPin className="h-4 w-4 text-[#E50914] shrink-0 mr-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Landmark, tech park, or institution..."
                      className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/60 border border-white/15 rounded-lg px-3.5 py-2.5 focus-within:border-[#E50914] transition-all">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">Location</label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        aria-label="Select City"
                        className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Hyderabad" className="bg-[#141414]">Hyderabad</option>
                        <option value="Bangalore" className="bg-[#141414]">Bangalore</option>
                        <option value="Pune" className="bg-[#141414]">Pune</option>
                        <option value="Delhi NCR" className="bg-[#141414]">Delhi NCR</option>
                      </select>
                    </div>

                    <div className="bg-black/60 border border-white/15 rounded-lg px-3.5 py-2.5 focus-within:border-[#E50914] transition-all">
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">Room Sharing</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        aria-label="Select Room Sharing Type"
                        className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                      >
                        <option value="all" className="bg-[#141414]">All Layouts</option>
                        <option value="single" className="bg-[#141414]">Single Private</option>
                        <option value="double" className="bg-[#141414]">Double Sharing</option>
                        <option value="triple" className="bg-[#141414]">Triple Sharing</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-[#E50914] hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>Search Verified Inventory</span>
                  </button>
                </form>
              </div>

            </div>

            {/* Right Offset Product Showcase (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-2xl space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#E50914] animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Live Inventory Audit</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-red-500 bg-red-600/15 border border-red-600/30 px-2 py-0.5 rounded">
                    REAL-TIME
                  </span>
                </div>

                {/* Product Showcase Cards */}
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-red-600/40 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                          Aura Executive Stay
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">HITEC City • Single Private</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#E50914]">₹11,500/mo</div>
                        <div className="text-[10px] text-emerald-400 font-mono font-bold">Verified Badge</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-red-600/40 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                          Urban Nomad Co-Living
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">Koramangala • Double Sharing</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#E50914]">₹7,800/mo</div>
                        <div className="text-[10px] text-emerald-400 font-mono font-bold">Verified Badge</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-red-600/40 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                          Varsity Scholar Haven
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">Gachibowli • 3 Meals/Day</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#E50914]">₹6,200/mo</div>
                        <div className="text-[10px] text-emerald-400 font-mono font-bold">Verified Badge</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Compliance Score: 100%
                  </span>
                  <span className="text-neutral-300 font-medium">Direct Landlord Contracts</span>
                </div>
              </div>

              {/* Trust Statement */}
              <div className="p-4 rounded-xl bg-[#141414]/70 border border-white/10 backdrop-blur-xl flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#E50914]" />
                  <span>Administrative ID Verification</span>
                </div>
                <span className="text-white font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-600/30">
                  0% BROKERAGE
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 02. METRICS */}
      <section className="py-16 border-b border-white/10 bg-black/40 backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">500+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E50914]">Verified Properties</div>
              <div className="text-xs text-neutral-400">Audited compliance spaces</div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">12.5k</div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-300">Active Residents</div>
              <div className="text-xs text-neutral-400">Students and engineers</div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">4.92</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E50914]">Average Rating</div>
              <div className="text-xs text-neutral-400">From 3,800+ audited reviews</div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">0%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-300">Brokerage Fees</div>
              <div className="text-xs text-neutral-400">Direct verified connections</div>
            </div>

          </div>
        </div>
      </section>

      {/* 03. PRODUCT ARCHITECTURE / FEATURES */}
      <section className="py-20 md:py-28 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E50914] mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>02 // PRODUCT ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                How we engineered certainty.
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              Replacing fragmented classifieds and shady brokers with an auditable, transparent digital lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 01 */}
            <div className="p-7 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-red-600/50 transition-all duration-300 space-y-4 group">
              <div className="text-xs font-mono font-bold text-[#E50914] tracking-widest uppercase">01 // PRECISION SEARCH</div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                High-precision search & verified media.
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Filter by verified floor amenities, single/double sharing models, deposit limits, and authentic photographic audits.
              </p>
              <div className="pt-4 border-t border-white/10 text-[11px] font-semibold text-red-400 flex items-center gap-1">
                <span>Instant criteria matching</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 02 */}
            <div className="p-7 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-red-600/50 transition-all duration-300 space-y-4 group">
              <div className="text-xs font-mono font-bold text-[#E50914] tracking-widest uppercase">02 // COMPLIANCE AUDIT</div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                Owner ID & title audit before publish.
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every listing is vetted through admin verification. Unverified properties and fraudulent listings are prevented from publishing.
              </p>
              <div className="pt-4 border-t border-white/10 text-[11px] font-semibold text-red-400 flex items-center gap-1">
                <span>24-hour verification turnaround</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 03 */}
            <div className="p-7 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-red-600/50 transition-all duration-300 space-y-4 group">
              <div className="text-xs font-mono font-bold text-[#E50914] tracking-widest uppercase">03 // INSTANT RESERVATION</div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                Transparent reservation & instant records.
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Lock your stay dates with zero brokerage. Generate immediate tax receipts and coordinate directly with property hosts.
              </p>
              <div className="pt-4 border-t border-white/10 text-[11px] font-semibold text-red-400 flex items-center gap-1">
                <span>Auditable digital trail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 04. CURATED STAYS LIST */}
      <section className="py-20 md:py-28 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E50914] mb-2">
                <span>03 // CURATED DIRECTORY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Featured Accommodations.
              </h2>
            </div>
            <button
              onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E50914] hover:text-red-400 transition-colors cursor-pointer"
            >
              <span>View Full Directory</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {stayCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#141414]/70 border border-white/10 hover:border-red-600/50 hover:bg-[#1a1a1a] transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer group shadow-lg"
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
              >
                <div className="flex items-start gap-6 lg:w-1/3">
                  <span className="text-sm font-mono font-bold text-neutral-500 pt-0.5">{cat.num}</span>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E50914] block mb-1">
                      {cat.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{cat.sub}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:w-1/3">
                  {cat.perks.map((perk, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-[11px] font-medium text-neutral-300 bg-black/60 border border-white/10 px-3 py-1 rounded-full"
                    >
                      {perk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-6 lg:w-1/4">
                  <div className="text-left lg:text-right">
                    <div className="text-base font-extrabold text-white">{cat.price}</div>
                    <div className="text-[11px] text-neutral-400 flex items-center lg:justify-end gap-1.5 mt-0.5">
                      <Star className="h-3 w-3 text-[#E50914] fill-[#E50914]" />
                      <span>{cat.rating} • {cat.occupancy}</span>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-red-600/20 border border-red-600/40 group-hover:bg-[#E50914] flex items-center justify-center text-red-400 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 05. PRIME LOCATIONS GRID */}
      <section className="py-20 md:py-28 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E50914] mb-2">
              <span>04 // GEOGRAPHICAL PRESENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Every Hub. All Verified.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cityHubs.map((hub, idx) => (
              <div
                key={idx}
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="p-6 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-red-600/50 hover:bg-[#1a1a1a] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E50914] block mb-1">
                    {hub.tone}
                  </span>
                  <h4 className="text-base font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                    {hub.name}
                  </h4>
                  <p className="text-xs text-neutral-400">{hub.city}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-300">
                  <span>{hub.count}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#E50914] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 06. DUAL ECOSYSTEM */}
      <section className="py-20 md:py-28 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Seeker Suite */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-2xl space-y-6 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />
              
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E50914] block">
                  FOR RESIDENTS & SEEKERS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Seeker Access Pass
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Browse authenticated rooms with honest photographic audits, transparent deposits, and direct owner messaging.
                </p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3 text-xs text-neutral-300">
                    <Check className="h-4 w-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>Instant digital reservation records with 0% brokerage markup</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-neutral-300">
                    <Check className="h-4 w-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>Audited amenities, meal schedules, and curfew policies</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-neutral-300">
                    <Check className="h-4 w-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>Direct host desk without middleman confusion</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="w-full py-4 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
              >
                {user ? "Browse Accommodations" : "Join as Seeker"}
              </button>
            </div>

            {/* Host Command Suite */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-2xl space-y-6 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">
                  FOR PROPERTY OWNERS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Host Command Suite
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Publish verified properties, manage occupancy rates, monitor tenant records, and maintain 100% booking capacity.
                </p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3 text-xs text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Streamlined 24-hour compliance approval workflow</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real-time occupancy tracking and tenant roster management</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Zero listing fees and direct seeker acquisition</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(user ? (user.userType?.includes('PROVIDER') ? "/provider-dashboard/add-property" : "/provider-dashboard") : "/register")}
                className="w-full py-4 rounded-lg bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-all cursor-pointer"
              >
                {user ? (user.userType?.includes('PROVIDER') ? "Add Property" : "Host Suite") : "List Your Property"}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 07. TESTIMONIALS */}
      <section className="py-20 md:py-28 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E50914] mb-2">
              <Star className="w-3.5 h-3.5 fill-[#E50914]" />
              <span>05 // EXPERIENCES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Endorsed by residents & hosts.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-red-600/40 flex flex-col justify-between space-y-6 transition-all shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#E50914]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#E50914]" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed font-medium">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{t.author}</div>
                    <div className="text-[11px] text-neutral-400">{t.role}</div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-neutral-400 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full">
                    {t.city}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 08. FAQ ACCORDION */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E50914]">
              <span>06 // CLARIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions.
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-white hover:text-red-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform duration-300 shrink-0 ml-4 ${
                      activeFaq === idx ? "rotate-180 text-[#E50914]" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
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




