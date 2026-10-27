import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  DollarSign, 
  CreditCard, 
  Clock, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const PaymentsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0a0c] text-neutral-100 py-10 min-h-screen relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation & Departure Header */}
        <div className="board p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/provider-dashboard')}
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#ffb000]/40 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ffb000] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffb000]">
                    TERMINAL 04 // ESCROW & DISBURSEMENTS
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-['Big_Shoulders_Display']">
                  Host Revenue & Escrow Settlements
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Telemetry Strips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="board p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Gross Collected Rent
              </span>
              <div className="h-7 w-7 rounded bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-3xl font-mono font-extrabold text-white">₹0.00</div>
            <p className="text-[11px] font-mono text-neutral-500">Processed securely via platform escrow gateway</p>
          </div>

          <div className="board p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffb000]">
                Pending Escrow Payouts
              </span>
              <div className="h-7 w-7 rounded bg-[#ffb000]/15 border border-[#ffb000]/30 flex items-center justify-center text-[#ffb000]">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-3xl font-mono font-extrabold text-[#ffb000]">₹0.00</div>
            <p className="text-[11px] font-mono text-neutral-500">Disbursed directly 24h post student dorm check-in</p>
          </div>

          <div className="board p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                Security Deposit Vault
              </span>
              <div className="h-7 w-7 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-3xl font-mono font-extrabold text-white">₹0.00</div>
            <p className="text-[11px] font-mono text-neutral-500">Held in reserve for move-out clearance</p>
          </div>
        </div>

        {/* Zero Student Brokerage Manifesto Strip */}
        <div className="board p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#ffb000]/5 border-[#ffb000]/30">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#ffb000] shrink-0" />
            <div className="text-xs font-mono">
              <span className="font-bold text-white uppercase">ZERO STUDENT BROKERAGE POLICY // </span>
              <span className="text-neutral-400">100% of student rent and deposits flow directly to registered host wardens without agent markups.</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#ffb000] uppercase tracking-wider shrink-0 px-2.5 py-1 rounded bg-[#ffb000]/10 border border-[#ffb000]/30">
            AUDITED LEDGER
          </span>
        </div>

        {/* Payment History Empty State */}
        <div className="board p-12 text-center max-w-md mx-auto space-y-4">
          <CreditCard className="w-8 h-8 text-neutral-500 mx-auto" />
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white uppercase font-['Big_Shoulders_Display']">
              Zero Settlement Archives
            </h2>
            <p className="text-xs font-mono text-neutral-400 leading-relaxed">
              When students confirm bed bookings and settle advance dues, itemized bank disbursements will be recorded on this ledger.
            </p>
          </div>
          <button
            onClick={() => navigate('/provider-dashboard/my-properties')}
            className="btn-solari-amber w-full cursor-pointer"
          >
            Review Listed Accommodations
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentsPage;