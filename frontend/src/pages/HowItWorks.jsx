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
  Zap,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';

const seekerSteps = [
  {
    step: '01',
    title: 'Search & Precision Filtering',
    description: 'Filter verified accommodations by precise geographic radius, budget brackets, room sharing format, and audited amenities list.',
    highlight: 'Real-time directory'
  },
  {
    step: '02',
    title: '5-Photo Audit & House Rules Inspection',
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

import { useAuth } from '../context/AuthContext';

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
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
        
        {/* Editorial Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
            <span>Methodology & Lifecycle</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            How the platform works.
          </h1>
          
          <p className="text-base sm:text-lg text-[#9E9EA7] leading-relaxed">
            Whether searching for student accommodation or managing multi-unit residential facilities, our compliance-verified infrastructure eliminates friction.
          </p>

          {/* Perspective Selector */}
          <div className="flex items-center gap-4 pt-4 border-b border-[#1E1E26] pb-4">
            <button
              onClick={() => setActivePerspective('seeker')}
              className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors border-b-2 ${
                activePerspective === 'seeker'
                  ? 'text-[#FAFAFA] border-[#FF5A36]'
                  : 'text-[#7A7A85] border-transparent hover:text-white'
              }`}
            >
              For Residents & Seekers
            </button>
            <button
              onClick={() => setActivePerspective('provider')}
              className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors border-b-2 ${
                activePerspective === 'provider'
                  ? 'text-[#FAFAFA] border-[#FF5A36]'
                  : 'text-[#7A7A85] border-transparent hover:text-white'
              }`}
            >
              For Property Hosts
            </button>
          </div>
        </div>

        {/* Numbered Step Progression with Thin Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(activePerspective === 'seeker' ? seekerSteps : providerSteps).map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-sm bg-[#121217] border border-[#1E1E26] flex flex-col justify-between space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#1E1E26]">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A36]">
                    Step {item.step}
                  </span>
                  <span className="text-[10px] text-[#7A7A85] uppercase tracking-wider font-semibold">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E1E26] text-[11px] font-semibold text-[#7A7A85] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Audited workflow</span>
              </div>
            </div>
          ))}
        </div>

        {/* Value Principles Grid */}
        <div className="pt-12 border-t border-[#1E1E26] space-y-12">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36] block mb-2">
              Guarantees
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Built on transparency.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-3"
              >
                <div className="text-[#FF5A36]">
                  <b.icon className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">{b.title}</h3>
                <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Action Console */}
        <div className="p-8 sm:p-12 rounded-sm bg-[#121217] border border-[#1E1E26] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to explore verified accommodations?
            </h2>
            <p className="text-xs sm:text-sm text-[#9E9EA7]">
              Join thousands of students and engineering professionals simplifying paying guest living.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={getCtaLink()}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>{getCtaLabel()}</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/contact"
              className="px-5 py-3 rounded-sm bg-[#181820] hover:bg-[#22222A] text-white text-xs font-bold uppercase tracking-wider border border-[#2A2A36] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
 