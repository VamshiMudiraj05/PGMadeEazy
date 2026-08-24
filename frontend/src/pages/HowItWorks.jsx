import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Building2,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const seekerSteps = [
  {
    step: '01',
    title: 'Search & Precision Filtering',
    description: 'Filter verified accommodations by precise geographic radius, budget brackets, room sharing format, and audited amenities list.',
    highlight: 'Real-time directory'
  },
  {
    step: '02',
    title: 'Photo Audit & House Rules Inspection',
    description: 'Inspect interior photography verified by our compliance team, along with clear security deposit terms, meal schedules, and curfew policies.',
    highlight: '100% verified media'
  },
  {
    step: '03',
    title: 'Direct Reservation & Instant Record',
    description: 'Confirm your stay with zero brokerage markup. Instantly obtain verifiable digital tax invoices and direct host contact details.',
    highlight: 'Zero brokerage'
  }
];

const providerSteps = [
  {
    step: '01',
    title: 'Listing Submission in Minutes',
    description: 'Submit building location coordinates, room inventory, monthly rent tariffs, house rules, and high-resolution interior photos.',
    highlight: 'Simple onboarding'
  },
  {
    step: '02',
    title: '24-Hour Compliance Audit',
    description: 'Our verification team reviews property documentation, amenities, and owner identification to issue the verified badge.',
    highlight: 'Fast trust audit'
  },
  {
    step: '03',
    title: 'Occupancy & Tenant Roster Control',
    description: 'Track vacant beds, monitor confirmed tenant bookings, and maintain auditable payment logs directly from your command hub.',
    highlight: 'Unified management'
  }
];

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Audited Compliance',
    description: 'Every property host and student residence passes mandatory ID and documentation verification before going live.'
  },
  {
    icon: CreditCard,
    title: 'Encrypted Digital Records',
    description: 'Complete digital invoice generation and transparent deposit logging with full audit trails.'
  },
  {
    icon: Zap,
    title: '0% Brokerage Markup',
    description: 'Direct connections between verified tenants and property owners. No middleman charges.'
  }
];

export default function HowItWorks() {
  const { user } = useAuth();
  const [activePerspective, setActivePerspective] = useState('seeker');

  const getUserType = () => {
    return user?.userType?.replace('ROLE_', '').toLowerCase();
  };

  const getCtaLink = () => {
    if (!user) return "/register";
    const type = getUserType();
    if (type === "seeker") return "/seeker-dashboard/find-pg";
    if (type === "provider") return "/provider-dashboard";
    return "/admin-dashboard";
  };

  const getCtaLabel = () => {
    if (!user) return "Get Started";
    const type = getUserType();
    if (type === "seeker") return "Browse Accommodations";
    if (type === "provider") return "Manage Properties";
    return "Operations Center";
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen py-16 lg:py-24 relative overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/6 left-1/5 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/6 w-[450px] h-[450px] bg-red-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(229,9,20,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
            <span className="text-[#E50914] font-bold">METHODOLOGY & LIFECYCLE</span>
            <span className="text-white/30">|</span>
            <span>AUDITED CERTAINTY</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            How the platform works.
          </h1>
          
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Whether searching for student accommodation or managing multi-unit residential facilities, our compliance-verified infrastructure eliminates friction.
          </p>

          {/* Perspective Selector */}
          <div className="flex items-center gap-4 pt-4 border-b border-white/10 pb-4">
            <button
              onClick={() => setActivePerspective('seeker')}
              className={`text-xs font-mono font-bold uppercase tracking-wider pb-2 transition-all cursor-pointer border-b-2 ${
                activePerspective === 'seeker'
                  ? 'text-white border-[#E50914]'
                  : 'text-neutral-500 border-transparent hover:text-neutral-300'
              }`}
            >
              For Residents & Seekers
            </button>
            <button
              onClick={() => setActivePerspective('provider')}
              className={`text-xs font-mono font-bold uppercase tracking-wider pb-2 transition-all cursor-pointer border-b-2 ${
                activePerspective === 'provider'
                  ? 'text-white border-[#E50914]'
                  : 'text-neutral-500 border-transparent hover:text-neutral-300'
              }`}
            >
              For Property Hosts
            </button>
          </div>
        </div>

        {/* Numbered Step Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(activePerspective === 'seeker' ? seekerSteps : providerSteps).map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#141414]/90 border border-white/10 hover:border-red-600/40 backdrop-blur-2xl flex flex-col justify-between space-y-8 transition-all duration-300 shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E50914]">
                    Step {item.step}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-black/60 border border-white/10">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] font-semibold text-neutral-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span>Audited workflow</span>
              </div>
            </div>
          ))}
        </div>

        {/* Value Principles Grid */}
        <div className="pt-12 border-t border-white/10 space-y-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E50914] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE GUARANTEES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Built on transparency.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-red-600/40 backdrop-blur-xl space-y-3 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center text-[#E50914]">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{b.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Console */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Ready to explore verified accommodations?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Join thousands of students and engineering professionals simplifying paying guest living.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={getCtaLink()}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              <span>{getCtaLabel()}</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/contact"
              className="px-5 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/15 transition-colors cursor-pointer"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
 