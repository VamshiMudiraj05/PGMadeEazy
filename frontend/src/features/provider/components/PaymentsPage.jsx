import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Building,
  Calendar,
  Download
} from 'lucide-react';

const PaymentsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">Financial Settlement</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Host Revenue & Escrow
              </h1>
            </div>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A85]">Gross Collected Rent</span>
              <div className="h-7 w-7 rounded-sm bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">₹0.00</div>
            <p className="text-[11px] text-[#7A7A85]">Processed securely via platform gateway</p>
          </div>

          <div className="p-5 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Pending Escrow Payouts</span>
              <div className="h-7 w-7 rounded-sm bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400">₹0.00</div>
            <p className="text-[11px] text-[#7A7A85]">Settled directly 24h post resident check-in</p>
          </div>

          <div className="p-5 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5A36]">Security Deposit Escrow</span>
              <div className="h-7 w-7 rounded-sm bg-[#181820] border border-[#22222A] flex items-center justify-center text-[#FF5A36]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">₹0.00</div>
            <p className="text-[11px] text-[#7A7A85]">Held safely for move-out clearance</p>
          </div>
        </div>

        {/* Payment History Card */}
        <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
          <CreditCard className="w-8 h-8 text-[#7A7A85] mx-auto" />
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">Zero Settlement History</h2>
            <p className="text-xs text-[#7A7A85] leading-relaxed">
              When seekers settle advance booking rents and deposits, itemized payouts will be tabulated here.
            </p>
          </div>
          <button
            onClick={() => navigate('/provider-dashboard/my-properties')}
            className="px-4 py-2 rounded-sm bg-[#181820] border border-[#22222A] text-[#9E9EA7] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            View Your Properties
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentsPage;