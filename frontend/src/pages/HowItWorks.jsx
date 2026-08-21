import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  ClipboardCheck, 
  Key, 
  Building2, 
  UserCheck, 
  MessageSquare, 
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';

const seekerSteps = [
  {
    step: '01',
    title: 'Search & Filter Confidently',
    description: 'Use location, budget, room type, and verified amenities filters to shortlist your ideal PG accommodation.',
    icon: Search,
    highlight: 'Instant Filters'
  },
  {
    step: '02',
    title: 'Inspect Verified Photos & Rules',
    description: 'View 5-photo interior galleries, transparent deposit terms, and verified house rules before committing.',
    icon: ClipboardCheck,
    highlight: '100% Verified'
  },
  {
    step: '03',
    title: 'Lock Your Room with Digital Escrow',
    description: 'Book your dates online securely with zero brokerage. Receive an instant downloadable digital receipt.',
    icon: Key,
    highlight: 'Zero Brokerage'
  }
];

const providerSteps = [
  {
    step: '01',
    title: 'List Your Property in Minutes',
    description: 'Provide property details, location coordinates, amenities list, house rules, and upload high-res interior photos.',
    icon: Building2,
    highlight: 'Easy Setup'
  },
  {
    step: '02',
    title: 'Pass Fast Compliance Audit',
    description: 'Our admin verification team reviews your listing within 24-48 hours to grant the official "APPROVED" trust badge.',
    icon: UserCheck,
    highlight: 'Trust Badge'
  },
  {
    step: '03',
    title: 'Receive Bookings & Manage Tenants',
    description: 'Track room occupancy, tenant details, and verified digital payment records seamlessly from your dashboard.',
    icon: MessageSquare,
    highlight: 'Real-Time Insights'
  }
];

const benefits = [
  {
    icon: ShieldCheck,
    title: '100% Verified Listings',
    description: 'Every property owner and student residence is thoroughly vetted for safety and quality.'
  },
  {
    icon: CreditCard,
    title: 'Encrypted Digital Payments',
    description: 'Complete transactions securely via digital gateways with full audit trails.'
  },
  {
    icon: Zap,
    title: 'Zero Brokerage Guarantee',
    description: 'Direct connections between seekers and owners with zero middleman commissions.'
  }
];

export default function HowItWorks() {
  const [activePerspective, setActivePerspective] = useState('seeker');

  return (
    <div className="min-h-screen bg-black text-white py-16 lg:py-24 selection:bg-[#FF6100] selection:text-black relative overflow-hidden bg-dot-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#FF6100]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FF6100]/40 text-[#FF6100] text-xs font-black uppercase tracking-[0.18em] mb-6 shadow-lg shadow-[#FF6100]/10">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6100] animate-pulse" />
            <span>SIMPLE & TRANSPARENT PIPELINE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
            HOW <span className="text-[#FF6100]">PG MADE EAZY</span> WORKS
          </h1>
          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed font-medium">
            Whether you are looking for a curated student residence or listing your residential PG properties, here is how our compliance-verified ecosystem operates.
          </p>

          {/* Perspective Toggle Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-[#09090c] border border-[#1e1e26] mt-10">
            <button
              onClick={() => setActivePerspective('seeker')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                activePerspective === 'seeker'
                  ? 'bg-[#FF6100] text-black shadow-lg shadow-[#FF6100]/25'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>FOR PG SEEKERS</span>
            </button>
            <button
              onClick={() => setActivePerspective('provider')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                activePerspective === 'provider'
                  ? 'bg-[#FF6100] text-black shadow-lg shadow-[#FF6100]/25'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>FOR PROPERTY OWNERS</span>
            </button>
          </div>
        </div>

        {/* Dynamic Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {(activePerspective === 'seeker' ? seekerSteps : providerSteps).map((item, idx) => (
            <div
              key={idx}
              className="relative glass-panel rounded-2xl p-8 border border-[#1c1c24] hover:border-[#FF6100] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl hover:shadow-[#FF6100]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#FF6100]/10 border border-[#FF6100]/30 text-[#FF6100]">
                    <item.icon className="h-7 w-7 stroke-[2]" />
                  </div>
                  <span className="text-4xl font-black text-[#1c1c24] tracking-tighter">
                    {item.step}
                  </span>
                </div>

                <div className="inline-block text-[9px] font-black uppercase tracking-widest text-[#FF6100] bg-[#FF6100]/10 border border-[#FF6100]/20 px-2.5 py-1 rounded mb-4">
                  {item.highlight}
                </div>

                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#181822] flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#888888]">
                <CheckCircle2 className="h-4 w-4 text-[#00E676]" />
                <span>GUARANTEED VERIFIED FLOW</span>
              </div>
            </div>
          ))}
        </div>

        {/* Value Highlights */}
        <div className="border-t border-[#1c1c24] pt-16 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              WHY RESIDENTS & HOSTS TRUST US
            </h2>
            <p className="text-xs sm:text-sm text-[#888888] font-semibold uppercase tracking-wider mt-2">
              Everything built for trust, transparency, and modern digital ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#09090c] border border-[#1c1c24] text-center flex flex-col items-center"
              >
                <div className="h-12 w-12 rounded-lg bg-[#FF6100]/10 border border-[#FF6100]/30 flex items-center justify-center text-[#FF6100] mb-4">
                  <b.icon className="h-6 w-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-white mb-2">{b.title}</h3>
                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-medium">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#09090c] border border-[#FF6100]/30 text-center relative overflow-hidden glow-orange-sm">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF6100]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
              READY FOR HASSLE-FREE PG LIVING?
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-medium mb-8 max-w-lg mx-auto">
              Join thousands of verified students and IT professionals on PG Made Eazy today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3.5 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider text-black bg-[#FF6100] hover:bg-[#ff751a] shadow-lg shadow-[#FF6100]/25 transition-all duration-200"
              >
                REGISTER ACCOUNT
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-[#111115] border border-[#22222a] hover:border-[#FF6100]/50 transition-all duration-200"
              >
                CONTACT SUPPORT
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
 