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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Host Revenue & Settlements
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Track escrow earnings, resident monthly rent, and direct bank payouts</p>
            </div>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-3xl glass-panel border border-zinc-800 glow-orange-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-400">Total Collected Rent</span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">₹0.00</div>
            <p className="text-[11px] text-zinc-500 mt-1">Processed securely via digital checkout</p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-zinc-800 glow-orange-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-400">Pending Escrow Payouts</span>
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">₹0.00</div>
            <p className="text-[11px] text-zinc-500 mt-1">Settled automatically 24h post check-in</p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-zinc-800 glow-orange-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-400">Security Deposit Escrow</span>
              <div className="h-9 w-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">₹0.00</div>
            <p className="text-[11px] text-zinc-500 mt-1">Held safely for move-out clearance</p>
          </div>
        </div>

        {/* Payment History Card */}
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 text-center glow-orange-sm">
          <CreditCard className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-1.5">No Settlement History Yet</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
            When verified seekers pay for booking reservations and security deposits, itemized transaction receipts with download statements will populate here.
          </p>
          <button
            onClick={() => navigate('/provider-dashboard/my-properties')}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-xs transition-colors"
          >
            View Your Properties
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentsPage;