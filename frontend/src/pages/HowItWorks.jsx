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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 lg:py-24 selection:bg-orange-500 selection:text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Simple & Transparent Process
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            How <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">PG Made Eazy</span> Works
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Whether you're looking for a cozy student residence or listing your residential PG property, here is how our verified ecosystem operates.
          </p>

          {/* Perspective Toggle Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 mt-8">
            <button
              onClick={() => setActivePerspective('seeker')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activePerspective === 'seeker'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>For PG Seekers</span>
            </button>
            <button
              onClick={() => setActivePerspective('provider')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activePerspective === 'provider'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>For Property Owners</span>
            </button>
          </div>
        </div>

        {/* Dynamic Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {(activePerspective === 'seeker' ? seekerSteps : providerSteps).map((item, idx) => (
            <div
              key={idx}
              className="relative glass-panel rounded-3xl p-8 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 glow-orange-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 text-orange-400">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <span className="text-3xl font-extrabold text-zinc-700 tracking-tighter">
                    {item.step}
                  </span>
                </div>

                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-md mb-3">
                  {item.highlight}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Guaranteed verified flow</span>
              </div>
            </div>
          ))}
        </div>

        {/* Value Highlights */}
        <div className="border-t border-zinc-800 pt-16 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Residents & Hosts Choose Us
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              Everything built for trust, transparency, and modern digital ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-center flex flex-col items-center"
              >
                <div className="h-12 w-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-orange-500/15 via-zinc-900 to-orange-500/15 border border-orange-500/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to experience hassle-free PG living?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mb-8">
              Join thousands of verified students and professionals on PG Made Eazy today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all"
              >
                Register Account
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl font-semibold text-sm text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
 