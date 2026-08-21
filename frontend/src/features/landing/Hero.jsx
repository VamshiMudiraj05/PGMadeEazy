import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  BedDouble, 
  ArrowRight, 
  ArrowUpRight,
  Star, 
  ChevronDown, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Award,
  Users,
  Building,
  Sparkles,
  Wifi,
  Coffee,
  Tv,
  Check,
  Lock,
  Compass,
  SlidersHorizontal,
  Flame,
  KeyRound
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Featured categories inspired by the modern entertainment showcase grid
const stayCategories = [
  {
    id: "tech-corridors",
    tag: "TECH HUBS",
    name: "CYBER CORRIDOR PODS",
    sub: "HITEC City • Whitefield • Cyber Hub",
    price: "₹8,500/mo",
    rating: "4.9",
    occupancy: "98% Booked",
    perks: ["1 Gbps Fiber", "Power Backup", "24/7 Biometric"],
    accent: "#FF6100",
    bgGradient: "from-[#FF6100]/20 via-[#121216] to-[#0a0a0c]"
  },
  {
    id: "student-hubs",
    tag: "CAMPUS LIVING",
    name: "VARSITY SUITES & FLATS",
    sub: "Gachibowli • Koramangala • North Campus",
    price: "₹6,200/mo",
    rating: "4.8",
    occupancy: "Hot Demand",
    perks: ["3 Meals/Day", "Housekeeping", "Study Lounges"],
    accent: "#FF6100",
    bgGradient: "from-[#FF6100]/15 via-[#121216] to-[#0a0a0c]"
  },
  {
    id: "solo-luxe",
    tag: "EXECUTIVE",
    name: "PRIVATE LUXURY RESIDENCES",
    sub: "Indiranagar • Jubilee Hills • Bandra",
    price: "₹14,000/mo",
    rating: "5.0",
    occupancy: "Limited 4 Left",
    perks: ["Private Balcony", "Smart TV & AC", "Gym & Rooftop"],
    accent: "#FF6100",
    bgGradient: "from-[#FF6100]/20 via-[#121216] to-[#0a0a0c]"
  },
  {
    id: "coliving-social",
    tag: "CO-LIVING",
    name: "CREATIVE & NOMAD COMMUNE",
    sub: "HSR Layout • Madhapur • Baner",
    price: "₹9,800/mo",
    rating: "4.9",
    occupancy: "Fast Filling",
    perks: ["Zero Brokerage", "Community Events", "Arcade Lounge"],
    accent: "#FF6100",
    bgGradient: "from-[#FF6100]/15 via-[#121216] to-[#0a0a0c]"
  }
];

// Genre/Area matrix
const cityHubs = [
  { name: "HITEC City", city: "Hyderabad", count: "140+ PGs", tone: "Tech Elite" },
  { name: "Koramangala", city: "Bangalore", count: "210+ PGs", tone: "Startup Hub" },
  { name: "Gachibowli", city: "Hyderabad", count: "95+ PGs", tone: "Campus Zone" },
  { name: "HSR Layout", city: "Bangalore", count: "160+ PGs", tone: "Modern Co-live" },
  { name: "Indiranagar", city: "Bangalore", count: "80+ PGs", tone: "Premium Stays" },
  { name: "Hinjawadi", city: "Pune", count: "115+ PGs", tone: "IT Park" },
  { name: "Madhapur", city: "Hyderabad", count: "175+ PGs", tone: "Urban Center" },
  { name: "Gurugram Cyber", city: "Delhi NCR", count: "130+ PGs", tone: "Corporate Suites" },
];

// Testimonials styled with loud, high-impact typography
const testimonials = [
  {
    quote: "LOCKED A SINGLE PRIVATE STUDIO IN HITEC CITY IN UNDER 15 MINUTES. ZERO BROKER BULLSHIT, 100% VERIFIED ROOMS.",
    author: "KARTIK N.",
    role: "Staff Engineer @ Microsoft",
    city: "Hyderabad"
  },
  {
    quote: "MANAGING 4 PG BUILDINGS WENT FROM 40 CALLS A DAY TO 1 STREAMLINED DASHBOARD. DIGITAL ESCROW & AUTO-RENT CHANGED MY BUSINESS.",
    author: "VENKAT REDDY",
    role: "Host & Property Owner (180 Beds)",
    city: "Bangalore"
  },
  {
    quote: "AS A STUDENT MOVING ACROSS INDIA, THIS WAS THE ONLY PLATFORM WHERE PHOTOS MATCHED REALITY EXACTLY. FLAWLESS EXPERIENCE.",
    author: "RHEA SEN",
    role: "B.Tech Final Year",
    city: "Hyderabad"
  }
];

// FAQ items
const faqs = [
  {
    q: "HOW DOES PG MADE EAZY GUARANTEE ZERO BROKERAGE?",
    a: "We connect verified seekers directly with authorized PG property hosts and property managers. No middlemen, no commissions, no surprise hidden agent charges."
  },
  {
    q: "WHAT DOES 100% VERIFIED LISTING MEAN?",
    a: "Every single property listed on PG Made Eazy passes an administrative compliance check: host government ID verification, property ownership audit, amenity proof, and accurate photographic inspections."
  },
  {
    q: "HOW DOES THE DIGITAL ESCROW BOOKING WORK?",
    a: "When you select your stay dates and confirm a booking, payment is processed securely through encrypted gateways. Your booking reservation is locked with instant digital invoices and confirmation receipts."
  },
  {
    q: "CAN I CANCEL OR TRANSFER MY RESERVATION?",
    a: "Yes. From your Seeker Hub, you can view your real-time booking status, download formal tax invoices, and coordinate directly with your verified property host."
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [selectedType, setSelectedType] = useState("all");
  const [activeTab, setActiveTab] = useState(0);
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
    <div className="min-h-screen bg-black text-white selection:bg-[#FF6100] selection:text-black overflow-x-hidden">
      
      {/* ⚡ HERO SECTION: Loud, Optimistic, Attention-led */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#1a1a20] bg-dot-pattern">
        
        {/* Saturated Ambient Glow Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#FF6100]/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-[#FF6100]/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            
            {/* Loud Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FF6100]/40 text-[#FF6100] text-xs font-black uppercase tracking-[0.18em] mb-8 shadow-lg shadow-[#FF6100]/10">
              <span className="flex h-2 w-2 rounded-full bg-[#FF6100] animate-pulse" />
              <span>THE ONLY 360° VERIFIED PG PLATFORM</span>
            </div>

            {/* Giant Typographic Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] mb-8">
              THE ONLY 360° PLATFORM{" "}
              <span className="text-[#FF6100] block mt-1">
                FOR PG LIVING.
              </span>
            </h1>

            {/* Tight Punchy Subtitle */}
            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#a1a1aa] font-medium leading-relaxed mb-10 tracking-tight">
              Curated student corridors, tech hub residences, and luxury co-living spaces with 100% verified hosts, zero brokerage confusion, and instant digital booking.
            </p>

            {/* Dual High-Voltage CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <button
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="group flex items-center gap-2.5 px-8 py-4 rounded-lg bg-[#FF6100] hover:bg-[#ff751a] text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-[#FF6100]/25 hover:shadow-[#FF6100]/40 transition-all duration-200 active:scale-[0.98]"
              >
                <span>EXPLORE PGs NOW</span>
                <ArrowUpRight className="h-4 w-4 stroke-[3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => navigate(user ? "/provider-dashboard" : "/register")}
                className="flex items-center gap-2 px-8 py-4 rounded-lg bg-[#0f0f13] hover:bg-[#18181f] text-white font-black text-sm uppercase tracking-wider border border-[#26262f] hover:border-[#FF6100]/50 transition-all duration-200"
              >
                <Building className="h-4 w-4 text-[#FF6100]" />
                <span>LIST YOUR PROPERTY</span>
              </button>
            </div>

            {/* 🔍 Bold Interactive Quick-Terminal Search Box */}
            <div className="w-full max-w-4xl p-2 sm:p-3 rounded-2xl bg-[#0a0a0d] border border-[#22222a] shadow-2xl glow-orange-sm">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                
                {/* Search Text */}
                <div className="flex-1 relative flex items-center bg-[#121217] rounded-xl border border-[#22222a] px-4 py-3 focus-within:border-[#FF6100] transition-colors">
                  <MapPin className="h-4 w-4 text-[#FF6100] shrink-0 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search landmark, university or tech park..."
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white placeholder-[#71717a] focus:outline-none"
                  />
                </div>

                {/* City Picker */}
                <div className="w-full md:w-48 bg-[#121217] rounded-xl border border-[#22222a] px-3 py-3 focus-within:border-[#FF6100] transition-colors">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    aria-label="Filter properties by city"
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-white uppercase focus:outline-none cursor-pointer"
                  >
                    <option value="Hyderabad" className="bg-[#121217] text-white">Hyderabad</option>
                    <option value="Bangalore" className="bg-[#121217] text-white">Bangalore</option>
                    <option value="Pune" className="bg-[#121217] text-white">Pune</option>
                    <option value="Delhi NCR" className="bg-[#121217] text-white">Delhi NCR</option>
                  </select>
                </div>

                {/* Sharing Style */}
                <div className="w-full md:w-44 bg-[#121217] rounded-xl border border-[#22222a] px-3 py-3 focus-within:border-[#FF6100] transition-colors">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    aria-label="Filter properties by room sharing type"
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-white uppercase focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-[#121217] text-white">All Sharing</option>
                    <option value="single" className="bg-[#121217] text-white">Single Private</option>
                    <option value="double" className="bg-[#121217] text-white">Double Sharing</option>
                    <option value="triple" className="bg-[#121217] text-white">Triple Sharing</option>
                  </select>
                </div>

                {/* Execute Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF6100] hover:bg-[#ff751a] text-black font-black text-xs uppercase tracking-wider transition-all duration-200"
                >
                  <Search className="h-4 w-4 stroke-[3]" />
                  <span>SEARCH</span>
                </button>
              </form>
            </div>

            {/* Trust Pill Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-wider text-[#888888]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#FF6100]" />
                <span>Zero Brokerage Fees</span>
              </div>
              <div className="h-3 w-[1px] bg-[#22222a] hidden sm:block" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#FF6100]" />
                <span>100% ID Verified Hosts</span>
              </div>
              <div className="h-3 w-[1px] bg-[#22222a] hidden sm:block" />
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#FF6100]" />
                <span>Instant Escrow Confirm</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📊 LIVE RUNTIME STATS: Monochromatic & Bold */}
      <section className="border-b border-[#1a1a20] bg-[#070709] py-8">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#0e0e12] border border-[#1c1c23] flex flex-col">
              <span className="text-3xl sm:text-4xl font-black text-[#FF6100] tracking-tight">500+</span>
              <span className="text-xs font-black uppercase tracking-wider text-white mt-1">Verified Properties</span>
              <span className="text-[11px] font-medium text-[#71717a] mt-0.5">Audited & approved spaces</span>
            </div>

            <div className="p-6 rounded-xl bg-[#0e0e12] border border-[#1c1c23] flex flex-col">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">12,500+</span>
              <span className="text-xs font-black uppercase tracking-wider text-white mt-1">Active Seekers</span>
              <span className="text-[11px] font-medium text-[#71717a] mt-0.5">Students & engineers housed</span>
            </div>

            <div className="p-6 rounded-xl bg-[#0e0e12] border border-[#1c1c23] flex flex-col">
              <span className="text-3xl sm:text-4xl font-black text-[#FF6100] tracking-tight">4.92 / 5</span>
              <span className="text-xs font-black uppercase tracking-wider text-white mt-1">Community Score</span>
              <span className="text-[11px] font-medium text-[#71717a] mt-0.5">From 3,800+ real reviews</span>
            </div>

            <div className="p-6 rounded-xl bg-[#0e0e12] border border-[#1c1c23] flex flex-col">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">0%</span>
              <span className="text-xs font-black uppercase tracking-wider text-white mt-1">Brokerage Friction</span>
              <span className="text-[11px] font-medium text-[#71717a] mt-0.5">Direct transparent living</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🎵 ALL INCLUSIVE: Entertainment-Style Showcase Deck */}
      <section className="py-20 md:py-28 border-b border-[#1a1a20]">
        <div className="container mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6100] mb-2">
                CURATED SECTIONS
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                ALL INCLUSIVE.
              </h2>
              <p className="text-sm text-[#888888] font-medium mt-2 max-w-lg">
                Every amenity, high-speed connectivity, and verified security built into your monthly pass.
              </p>
            </div>

            <button
              onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF6100] hover:text-white transition-colors"
            >
              <span>VIEW FULL INVENTORY</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Grid of modern cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stayCategories.map((cat, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-[#0b0b0e] border border-[#1e1e26] hover:border-[#FF6100] transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 hover:-translate-y-1.5 shadow-xl hover:shadow-[#FF6100]/10"
              >
                {/* Header Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#FF6100] text-black">
                      {cat.tag}
                    </span>
                    <span className="text-[11px] font-bold text-[#888888] flex items-center gap-1">
                      <Star className="h-3 w-3 text-[#FF6100] fill-[#FF6100]" />
                      {cat.rating}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FF6100] transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#888888] font-medium mb-6">
                    {cat.sub}
                  </p>

                  {/* Amenities / Perks Pills */}
                  <div className="space-y-2 mb-6">
                    {cat.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-[#cfcfd4] font-medium">
                        <Check className="h-3.5 w-3.5 text-[#FF6100] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Pricing & Trigger */}
                <div className="pt-4 border-t border-[#1a1a22] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717a] block">STARTING AT</span>
                    <span className="text-base font-black text-white">{cat.price}</span>
                  </div>
                  <button
                    onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                    className="p-2.5 rounded-lg bg-[#14141a] group-hover:bg-[#FF6100] text-white group-hover:text-black transition-all duration-200"
                    aria-label={`Book ${cat.name}`}
                  >
                    <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🏙️ EVERY GENRE. EVERY ERA. ALL FIRE. -> "EVERY CITY. EVERY HUB. ALL VERIFIED." */}
      <section className="py-20 md:py-28 border-b border-[#1a1a20] bg-[#070709]">
        <div className="container mx-auto px-4 sm:px-8">
          
          <div className="max-w-3xl mb-14">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6100] mb-2">
              PRIME LOCATIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              EVERY HUB. EVERY CITY. ALL VERIFIED.
            </h2>
            <p className="text-sm text-[#888888] font-medium mt-2">
              From tech clusters to university lanes, explore verified accommodations right where you work and study.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cityHubs.map((hub, idx) => (
              <div
                key={idx}
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="group cursor-pointer p-5 rounded-xl bg-[#0e0e12] border border-[#1a1a22] hover:border-[#FF6100] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#FF6100] block mb-1">
                    {hub.tone}
                  </span>
                  <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FF6100] transition-colors">
                    {hub.name}
                  </h4>
                  <p className="text-xs text-[#71717a] font-medium">{hub.city}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#16161c] flex items-center justify-between text-xs text-[#a1a1aa] font-bold">
                  <span>{hub.count}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF6100] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🧰 THE COMPLETE KIT: Seeker Suite vs Host Command */}
      <section className="py-20 md:py-28 border-b border-[#1a1a20]">
        <div className="container mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6100] mb-2">
              DUAL ECOSYSTEM
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              THE COMPLETE KIT.
            </h2>
            <p className="text-sm text-[#888888] font-medium mt-3">
              Purpose-built digital infrastructure for modern seekers and professional property hosts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Seeker Kit Card */}
            <div className="rounded-2xl bg-[#09090c] border border-[#1e1e26] p-8 relative overflow-hidden group hover:border-[#FF6100]/60 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 text-[#FF6100] opacity-10 group-hover:opacity-20 transition-opacity">
                <Compass className="h-32 w-32" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-[#FF6100] text-black inline-block mb-6">
                FOR RESIDENTS & SEEKERS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-3">
                SEEKER ACCESS PASS
              </h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-8">
                Skip unverified brokers, shady deposits, and deceptive photos. Filter, inspect, and lock your ideal room with instant escrow receipts.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-[#FF6100]/20 flex items-center justify-center text-[#FF6100] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-white">Instant Digital Escrow</h5>
                    <p className="text-xs text-[#71717a]">Zero risk. Transparent deposits with automated refund clauses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-[#FF6100]/20 flex items-center justify-center text-[#FF6100] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-white">100% Genuine Room Media</h5>
                    <p className="text-xs text-[#71717a]">Audited amenity specifications, real photos, and floor configurations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-[#FF6100]/20 flex items-center justify-center text-[#FF6100] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-white">Direct Host Messaging</h5>
                    <p className="text-xs text-[#71717a]">Communicate directly with property operators without middlemen.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/register")}
                className="w-full py-4 rounded-lg bg-[#FF6100] hover:bg-[#ff751a] text-black font-black text-xs uppercase tracking-wider transition-all duration-200"
              >
                JOIN AS A SEEKER
              </button>
            </div>

            {/* Provider Kit Card */}
            <div className="rounded-2xl bg-[#09090c] border border-[#1e1e26] p-8 relative overflow-hidden group hover:border-[#FF6100]/60 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 text-white opacity-5 group-hover:opacity-10 transition-opacity">
                <Building className="h-32 w-32" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-[#1c1c24] text-white border border-[#2a2a36] inline-block mb-6">
                FOR PG OWNERS & HOSTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-3">
                HOST COMMAND SUITE
              </h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-8">
                Eliminate offline paperwork. Publish verified listings, manage tenant leases, collect digital payments, and keep rooms 100% occupied.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-white">Automated Listing Pipeline</h5>
                    <p className="text-xs text-[#71717a]">Submit rooms with instant admin compliance review & live badge.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-white">Live Occupancy & Rent Tracking</h5>
                    <p className="text-xs text-[#71717a]">Monitor occupied beds, pending rent cycles, and digital payment receipts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-white">Zero Listing Commission</h5>
                    <p className="text-xs text-[#71717a]">Retain 100% of your rental margins with direct seeker connections.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/register")}
                className="w-full py-4 rounded-lg bg-[#14141a] hover:bg-white text-white hover:text-black font-black text-xs uppercase tracking-wider border border-[#2a2a36] hover:border-white transition-all duration-200"
              >
                LIST YOUR PG BUILDINGS
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 🔒 MOVE IN ANYWHERE, ZERO BROKERAGE (Trust Grid) */}
      <section className="py-16 border-b border-[#1a1a20] bg-[#070709]">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#888888] block mb-8">
            TRUSTED ESCROW & VERIFICATION PROTOCOLS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <ShieldCheck className="h-5 w-5 text-[#FF6100]" />
              <span>GOVERNMENT ID KYC</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <Lock className="h-5 w-5 text-[#FF6100]" />
              <span>256-BIT ESCROW PAYMENT</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <Award className="h-5 w-5 text-[#FF6100]" />
              <span>COMPLIANCE AUDITED</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <Clock className="h-5 w-5 text-[#FF6100]" />
              <span>24/7 RESIDENT DESK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🗣️ USED BY THE BEST. BUILT FOR EVERYONE. (Loud Testimonials) */}
      <section className="py-20 md:py-28 border-b border-[#1a1a20]">
        <div className="container mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6100] mb-2">
              REAL EXPERIENCES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              USED BY THE BEST. BUILT FOR EVERYONE.
            </h2>
            <p className="text-sm text-[#888888] font-medium mt-3">
              Read how tech workers, students, and top property owners rely on PG Made Eazy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#09090c] border border-[#1e1e26] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-6 text-[#FF6100]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#FF6100]" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-white uppercase tracking-tight leading-relaxed mb-8">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#181820] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-wider">{t.author}</div>
                    <div className="text-[11px] text-[#71717a] font-medium">{t.role}</div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded bg-[#FF6100]/15 text-[#FF6100] border border-[#FF6100]/30">
                    {t.city}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ❓ FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 md:py-28 border-b border-[#1a1a20] bg-[#070709]">
        <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
          
          <div className="text-center mb-16">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6100] mb-2">
              CLEAR ANSWERS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#1c1c24] bg-[#0c0c10] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left text-xs sm:text-sm font-black uppercase tracking-wider text-white hover:text-[#FF6100] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#FF6100] transition-transform duration-200 shrink-0 ml-4 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed border-t border-[#181820] pt-4 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🔥 MONOLITH CTA: Loud Typographic Finish */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-black text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF6100]/20 blur-[150px] pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-8 relative z-10 max-w-4xl">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#FF6100] block mb-4">
            START YOUR NEXT CHAPTER
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6">
            THE ONLY LIVING ECOSYSTEM YOU'LL EVER NEED.
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa] font-medium max-w-xl mx-auto mb-10">
            Join over 12,000+ residents and hosts simplifying paying guest accommodations across India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
              className="px-9 py-4 rounded-lg bg-[#FF6100] hover:bg-[#ff751a] text-black font-black text-sm uppercase tracking-wider shadow-xl shadow-[#FF6100]/25 hover:shadow-[#FF6100]/40 transition-all duration-200 active:scale-[0.98]"
            >
              CREATE FREE ACCOUNT
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 rounded-lg bg-[#111116] hover:bg-[#18181f] text-white font-black text-sm uppercase tracking-wider border border-[#262633] transition-all duration-200"
            >
              TALK TO SUPPORT
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}


