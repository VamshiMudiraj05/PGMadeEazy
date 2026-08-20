import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  BedDouble, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Award,
  Users
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const features = [
  {
    icon: Search,
    title: "AI Smart Search & Filters",
    description: "Instantly filter by city, neighborhood, budget bracket, room sharing configuration, and verified amenities.",
    badge: "Fast & Accurate"
  },
  {
    icon: UserCheck,
    title: "100% Verified Hosts",
    description: "Every property owner undergoes strict identity and property document verification before being listed.",
    badge: "Strict Safety"
  },
  {
    icon: ShieldCheck,
    title: "Secure Digital Escrow",
    description: "Zero deposit fraud. Complete your booking payment via encrypted channels with instant digital receipts.",
    badge: "Protection Guarantee"
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "Lock your bed or private room instantly without waiting days for offline owner confirmations.",
    badge: "Zero Brokerage"
  },
];

const stats = [
  { value: "500+", label: "Verified PGs", sublabel: "Across Major Cities", icon: Award },
  { value: "10,000+", label: "Happy Seekers", sublabel: "Students & Professionals", icon: Users },
  { value: "4.9/5", label: "Average Rating", sublabel: "From 3,200+ Reviews", icon: Star },
  { value: "24/7", label: "Support Assistance", sublabel: "Always Here For You", icon: Clock },
];

const testimonials = [
  {
    quote: "Found my perfect single-sharing PG in HITEC City within 20 minutes! The photos were 100% accurate and the PayPal payment was effortless.",
    name: "Aravind Sharma",
    role: "Software Engineer at Google",
    rating: 5,
    city: "Hyderabad"
  },
  {
    quote: "As a provider, managing tenant verification and rent receipts was always a headache. PG Made Eazy automated my entire listing and approval pipeline.",
    name: "Sunitha Rao",
    role: "Property Owner (3 PGs)",
    rating: 5,
    city: "Bangalore"
  },
  {
    quote: "Zero brokerage, transparent deposit rules, and clean amenities. The best student accommodation platform I have used in India.",
    name: "Rohan Patel",
    role: "Final Year B.Tech Student",
    rating: 5,
    city: "Hyderabad"
  }
];

const faqs = [
  {
    q: "How does PG Made Eazy verify properties and hosts?",
    a: "Our admin compliance team validates property ownership documents, government IDs of providers, conducts physical or video audits, and verifies listed amenities before approving any PG listing."
  },
  {
    q: "Are there any hidden brokerage fees?",
    a: "Absolutely not. PG Made Eazy is a direct zero-brokerage platform. You only pay the listed monthly rent and security deposit directly to your booking contract."
  },
  {
    q: "How do I secure a room booking?",
    a: "Select your desired PG, choose your check-in and check-out dates, pick the number of rooms/guests, and complete the instant secure checkout. You'll receive a downloadable confirmation receipt immediately."
  },
  {
    q: "What if I need to cancel or change my booking?",
    a: "You can easily view your booking status and manage your reservation from your Seeker Dashboard, complete with direct contact access to your verified host."
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Search box state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500 selection:text-white">
      
      {/* 🌟 Hero Section with Ambient Orbs */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide mb-6 shadow-sm shadow-orange-500/10 hover:border-orange-500/50 transition-all duration-300">
              <Sparkles className="h-3.5 w-3.5 text-orange-400 animate-pulse" />
              <span>The Next-Gen Verified PG & Hostel Ecosystem</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Find Your Ideal PG Stays With{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
                Zero Brokerage
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg text-zinc-400 mb-10 leading-relaxed">
              Explore thousands of curated, verified paying guest accommodations, private studios, and student hostels with transparent pricing, instant booking, and guaranteed peace of mind.
            </p>

            {/* 🔍 Embedded Smart Quick-Search Box */}
            <div className="w-full max-w-3xl glass-panel p-3 sm:p-4 rounded-2xl glow-orange-sm mb-8">
              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Search Text */}
                <div className="sm:col-span-4 relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Area, college or landmark..."
                    className="w-full pl-10 pr-3 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all"
                  />
                </div>

                {/* City Dropdown */}
                <div className="sm:col-span-3">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500 transition-all"
                  >
                    <option value="">All Cities</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi / NCR</option>
                  </select>
                </div>

                {/* Budget Bracket */}
                <div className="sm:col-span-2">
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-3 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:border-orange-500 transition-all"
                  >
                    <option value="">Budget</option>
                    <option value="5000">₹5,000</option>
                    <option value="10000">₹10,000</option>
                    <option value="15000">₹15,000+</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    <Search className="h-4 w-4" />
                    <span>Find PG</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Secondary CTA Options */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                No Booking Fees
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Verified Owners
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Instant Confirmation
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 📊 Live Counter Stats Section */}
      <section className="py-12 border-y border-zinc-800/80 bg-zinc-900/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/70 hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-400 shrink-0">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-200">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚡ Value Proposition / Key Features Grid */}
      <section className="py-20 lg:py-28 relative">
        <div className="container mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Designed For Seamless Living
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Why PG Made Eazy Stands Out
            </h2>
            <p className="mt-4 text-base text-zinc-400">
              We eliminated the stress of finding comfortable student accommodations and executive paying guest spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl glass-panel hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-1.5 text-xs font-semibold text-orange-400">
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 💬 Testimonial Quotes Slider Section */}
      <section className="py-20 border-t border-zinc-800/80 bg-zinc-950/80">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Trusted by 10,000+ Seekers & Hosts
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Read real experiences from residents and property owners across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-400">{t.role}</div>
                  </div>
                  <span className="text-[10px] font-semibold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md border border-orange-500/20">
                    {t.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ❓ Expandable FAQ Accordion */}
      <section className="py-20 border-t border-zinc-800/80">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-zinc-200 hover:text-orange-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-orange-500 transition-transform duration-200 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Action Callout */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/30 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to find your next home?
            </h3>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
              Join thousands of happy residents today. Register as a seeker to explore listings or list your PG property in minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all duration-300"
              >
                Get Started Now
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                Contact Team
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

