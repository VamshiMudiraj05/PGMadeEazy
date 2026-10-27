import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard,
  Zap,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Reusable Split-Flap Character Component
function FlapChar({ char, size = "16px" }) {
  const displayChar = char === " " ? "\u00A0" : char.toUpperCase();
  const isSpecial = char === "+" || char === "-" || char === "/" || char === ":" || char === ".";

  return (
    <span 
      className={`c ${isSpecial ? "op" : ""}`}
      style={{ "--cw": size }}
      aria-hidden="true"
    >
      <i className="u">{displayChar}</i>
      <i className="l">{displayChar}</i>
    </span>
  );
}

// Reusable Split-Flap Word/String Component
function FlapWord({ text, size = "16px", colorClass = "text-[#f2f2f2]" }) {
  const chars = String(text).toUpperCase().split("");
  return (
    <span className={`fl ${colorClass}`}>
      {chars.map((ch, idx) => (
        <FlapChar key={idx} char={ch} size={size} />
      ))}
    </span>
  );
}

const seekerSteps = [
  {
    step: '01',
    code: 'STEP // DISCOVERY',
    title: 'Search by Campus & College Corridor',
    description: 'Filter verified student PGs and hostels by walking distance to university campuses, monthly budget brackets, room sharing format (Single, 2-Sharing, 3-Sharing), and mess meal inclusion.',
    highlight: 'Real-time Vacancy Feed'
  },
  {
    step: '02',
    code: 'STEP // INSPECTION',
    title: 'Check Food Menu, WiFi & Room Specs',
    description: 'Review physical on-site photos verified by our audit team. Inspect daily breakfast, lunch, and dinner menus, WiFi download speed tests, power backup, study desks, and curfew rules.',
    highlight: '100% Physically Audited'
  },
  {
    step: '03',
    code: 'STEP // CHECK-IN',
    title: 'Direct Booking with 0% Broker Fees',
    description: 'Connect directly with the PG warden or owner. Lock your student bed with a transparent 1-month deposit, zero broker commission, and automated digital receipts for college records.',
    highlight: '₹0 Student Brokerage'
  }
];

const providerSteps = [
  {
    step: '01',
    code: 'STEP // SUBMISSION',
    title: 'Register PG Hostel & Bed Capacity',
    description: 'Submit your hostel location near academic clusters, room categories, bed counts, monthly rent tariffs, mess facilities, and high-resolution room photos in under 5 minutes.',
    highlight: '5-Minute Setup'
  },
  {
    step: '02',
    code: 'STEP // AUDIT',
    title: '24-Hour On-Site Compliance Audit',
    description: 'Our verification team reviews property documents, food hygiene standards, and security provisions (CCTV, biometric entry) to award the official Verified PG badge.',
    highlight: 'Verified Badge Issued'
  },
  {
    step: '03',
    code: 'STEP // ROSTER',
    title: 'Manage Student Admissions & Rent',
    description: 'Monitor vacant and occupied beds, receive direct student booking inquiries, and maintain transparent digital rent collection records directly from your host control desk.',
    highlight: 'Full Occupancy Control'
  }
];

const guarantees = [
  {
    icon: Zap,
    rule: 'MANDATE 01',
    title: 'Zero Broker Commission',
    description: 'Students never pay broker fees, visit charges, or commission markups. Direct contact between college students and verified PG owners.'
  },
  {
    icon: ShieldCheck,
    rule: 'MANDATE 02',
    title: 'Audited Food & WiFi',
    description: 'Every student PG undergoes on-site inspection for mess hygiene, drinking water RO purifiers, study WiFi speeds, and round-the-clock security.'
  },
  {
    icon: CreditCard,
    rule: 'MANDATE 03',
    title: '1-Month Deposit Protection',
    description: 'Standardized security deposits with clear refund rules upon completing your college semester or internship. No bogus deductions.'
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
    if (!user) return "Find Student PGs";
    const type = getUserType();
    if (type === "seeker") return "Browse Student PGs";
    if (type === "provider") return "Manage Hostel Beds";
    return "Operations Center";
  };

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] min-h-screen py-10 sm:py-14 relative font-['Barlow_Semi_Condensed']">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* 01. HERO SOLARI CASING */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-none bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                SYSTEM PROTOCOL // LIFECYCLE
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>PROTOCOL: <b className="text-white">ON-SITE AUDITED</b></span>
              <span>BROKERAGE: <b className="text-[#ffb000]">0% MANDATE</b></span>
            </div>
          </div>

          {/* Split-Flap Main Title */}
          <div className="py-6 sm:py-8 space-y-3">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="HOW" size="clamp(24px, 4vw, 50px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="IT" size="clamp(24px, 4vw, 50px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="WORKS." size="clamp(24px, 4vw, 50px)" colorClass="text-[#ffb000]" />
            </div>
            <p className="text-base sm:text-lg text-[#a7aaaf] max-w-3xl leading-relaxed pt-2">
              From discovering verified beds near college campuses to moving in with guaranteed meal plans and zero brokerage, our audited workflow ensures transparent student living.
            </p>
          </div>

          {/* Perspective Toggle Bar */}
          <div className="pt-4 border-t border-[#202226] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActivePerspective('seeker')}
                className={`py-2 px-4 rounded-[2px] text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer border ${
                  activePerspective === 'seeker'
                    ? 'bg-[#ffb000] text-[#0b0b0d] border-[#ffb000]'
                    : 'bg-[#0b0b0d] text-[#a7aaaf] border-[#34373c] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>For Students & Scholars</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActivePerspective('provider')}
                className={`py-2 px-4 rounded-[2px] text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer border ${
                  activePerspective === 'provider'
                    ? 'bg-[#ffb000] text-[#0b0b0d] border-[#ffb000]'
                    : 'bg-[#0b0b0d] text-[#a7aaaf] border-[#34373c] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>For PG Owners & Wardens</span>
                </span>
              </button>
            </div>

            <div className="text-xs uppercase tracking-[0.16em] text-[#a7aaaf]">
              <span>ACTIVE PERSPECTIVE: </span>
              <b className="text-white font-mono">{activePerspective === 'seeker' ? 'STUDENT SEEKER' : 'PG HOST WARDEN'}</b>
            </div>
          </div>
        </div>

        {/* 02. STEP PROGRESSION (SOLARI INDUSTRIAL CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(activePerspective === 'seeker' ? seekerSteps : providerSteps).map((item, idx) => (
            <div
              key={idx}
              className="board flex flex-col justify-between space-y-6 group hover:border-[#ffb000]/60 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#202226]">
                  <div className="flex items-center gap-2">
                    <span className="font-['Big_Shoulders_Display'] text-2xl font-bold text-[#ffb000]">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#a7aaaf]">
                      {item.code}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-semibold px-2 py-0.5 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-neutral-300">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-[0.08em] uppercase text-white font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#a7aaaf] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#202226] text-xs uppercase tracking-[0.14em] text-[#a7aaaf] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>AUDITED STAGE</span>
                </span>
                <span className="font-mono text-[11px] text-[#5b5e63]">GATE 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 03. CORE GUARANTEES / MATRIX */}
        <div className="board">
          <div className="board-head">
            <div>
              <h2 className="text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                CORE STUDENT GUARANTEES // ENFORCED
              </h2>
              <div className="text-xs uppercase tracking-[0.16em] text-[#a7aaaf] mt-1">
                BUILT TO PROTECT STUDENTS & ENSURE TRANSPARENT HOUSING
              </div>
            </div>
            <span className="text-xs font-mono tracking-[0.16em] uppercase text-[#ffb000]">
              100% COMPLIANCE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {guarantees.map((g, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#0e0f11] border border-[#2a2d31] rounded-[3px] space-y-3 hover:border-[#ffb000]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] flex items-center justify-center text-[#ffb000]">
                    <g.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#a7aaaf] tracking-[0.14em]">
                    {g.rule}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-['Big_Shoulders_Display'] uppercase tracking-[0.1em]">
                  {g.title}
                </h3>
                <p className="text-xs text-[#a7aaaf] leading-relaxed">
                  {g.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 04. ACTION DISPATCH CONSOLE */}
        <div className="board">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[#ffb000]">
                <span className="w-2 h-2 rounded-none bg-[#ffb000]" />
                <span>DISPATCH READY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[0.14em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                READY TO FIND YOUR VERIFIED STUDENT PG?
              </h2>
              <p className="text-xs sm:text-sm text-[#a7aaaf] max-w-xl">
                Join thousands of college scholars reserving verified rooms with mess meals, high-speed WiFi, and zero brokerage.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={getCtaLink()}
                className="btn-solari btn-solari-amber text-xs"
              >
                <span>{getCtaLabel()}</span>
                <span className="chev">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                to="/contact"
                className="btn-solari btn-solari-steel text-xs"
              >
                <span>Contact Desk</span>
                <span className="chev">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}