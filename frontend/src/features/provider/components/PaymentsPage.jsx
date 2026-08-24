import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  DollarSign, 
  CreditCard, 
  Clock, 
  ShieldCheck
} from 'lucide-react';

const PaymentsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">FINANCIAL SETTLEMENT</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Host Revenue & Escrow
              </h1>
            </div>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Gross Collected Rent</span>
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">₹0.00</div>
            <p className="text-[11px] text-neutral-400">Processed securely via platform gateway</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Pending Escrow Payouts</span>
              <div className="h-7 w-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">₹0.00</div>
            <p className="text-[11px] text-neutral-400">Settled directly 24h post resident check-in</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E50914]">Security Deposit Escrow</span>
              <div className="h-7 w-7 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.3)]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">₹0.00</div>
            <p className="text-[11px] text-neutral-400">Held safely for move-out clearance</p>
          </div>
        </div>

        {/* Payment History Card */}
        <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
          <CreditCard className="w-8 h-8 text-neutral-400 mx-auto" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">Zero Settlement History</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              When seekers settle advance booking rents and deposits, itemized payouts will be tabulated here.
            </p>
          </div>
          <button
            onClick={() => navigate('/provider-dashboard/my-properties')}
            className="w-full py-3 px-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
          >
            View Your Properties
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentsPage;