import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Building, 
  User, 
  LogOut, 
  Menu, 
  ShieldCheck, 
  CreditCard, 
  Headphones, 
  Search, 
  ArrowRight, 
  ArrowUpRight,
  CalendarCheck, 
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { icon: Search, label: 'Search & Directory', sublabel: 'Explore verified student & professional accommodations', path: '/seeker-dashboard/find-pg' },
  { icon: CalendarCheck, label: 'Active Reservations', sublabel: 'Manage confirmed stays & digital tax invoices', path: '/seeker-dashboard/bookings' },
  { icon: User, label: 'Profile & Credentials', sublabel: 'Review contact details, occupation, and identity badges', path: '/seeker-dashboard/profile' },
];

const SeekerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#050505] text-white min-h-[calc(100vh-80px)] flex overflow-hidden relative select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-red-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      
      {/* Off-canvas Navigation Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative z-50 w-72 bg-[#141414] border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-[#E50914] text-white flex items-center justify-center text-xs font-bold shadow-[0_0_10px_#E50914]">
                    P
                  </div>
                  <span className="font-bold text-white text-sm">Resident Desk</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-all text-left"
                  >
                    <item.icon className="w-4 h-4 text-[#E50914]" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3.5 py-3 rounded-lg text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Canvas */}
      <div className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-10 relative z-10">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-colors"
              aria-label="Toggle Portal Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>SEEKER HUB</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome back, {user?.name || 'Resident'}
              </h1>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#141414] border border-white/10 text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>Audited Resident Profile</span>
          </div>
        </div>

        {/* Art-Directed Action Console Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />
          
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">
              ACCOMMODATIONS DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Discover verified spaces with 0% brokerage markup.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Every property on our directory features verified photo galleries, transparent deposit schedules, and direct landlord contact lines.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#b80710] shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Explore Stays</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Feature Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="group p-6 rounded-2xl bg-[#141414]/80 border border-white/10 hover:border-red-600/50 backdrop-blur-xl cursor-pointer transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-all">
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.sublabel}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white">
                <span>Access Module</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E50914] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div className="p-5 rounded-2xl bg-[#141414]/70 border border-white/10 backdrop-blur-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Audited Compliance</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every accommodation is audited by our verification team with confirmed legal documentation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414]/70 border border-white/10 backdrop-blur-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <CreditCard className="w-4 h-4 text-[#E50914]" />
              <span>Digital Transaction Logs</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Transparent digital receipts with full audit trails and zero hidden brokerage commissions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414]/70 border border-white/10 backdrop-blur-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <Headphones className="w-4 h-4 text-neutral-300" />
              <span>Dedicated Support Desk</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Need assistance with an active booking or host communication? Our help desk is active daily.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeekerDashboard;