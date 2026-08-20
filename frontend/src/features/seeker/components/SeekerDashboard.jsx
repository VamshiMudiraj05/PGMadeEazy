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
  Sparkles, 
  Compass, 
  CalendarCheck, 
  HeartHandshake,
  CheckCircle2,
  X
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { icon: Search, label: 'Find PG Accommodations', sublabel: 'Explore verified student & professional stays', path: '/seeker-dashboard/find-pg', gradient: 'from-orange-500/20 to-amber-500/10', border: 'hover:border-orange-500/50' },
  { icon: CalendarCheck, label: 'My Bookings', sublabel: 'Manage your active reservations & payment receipts', path: '/seeker-dashboard/bookings', gradient: 'from-blue-500/20 to-indigo-500/10', border: 'hover:border-blue-500/50' },
  { icon: User, label: 'Profile & Documents', sublabel: 'Update contact details, occupation, and verification', path: '/seeker-dashboard/profile', gradient: 'from-purple-500/20 to-pink-500/10', border: 'hover:border-purple-500/50' },
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
    <div className="relative bg-zinc-950 min-h-[calc(100vh-140px)] flex overflow-hidden text-zinc-100 selection:bg-orange-500 selection:text-white">
      
      {/* 🧭 Off-canvas Mobile / Desktop Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative z-50 w-72 bg-zinc-950/95 border-r border-zinc-800/80 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Compass className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-white text-base">Seeker Portal</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                  <X className="w-5 h-5" />
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
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-sm font-semibold transition-all"
                  >
                    <item.icon className="w-4 h-4 text-orange-400" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-sm font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Canvas */}
      <div className="flex-1 relative p-4 sm:p-8 max-w-6xl mx-auto w-full">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all shadow-sm"
              aria-label="Toggle Portal Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Resident Portal
              </h1>
              <p className="text-xs text-zinc-400">Discover properties, track stays, and manage receipts</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Seeker Account Verified</span>
          </div>
        </div>

        {/* 🌟 Welcome Banner */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-800 mb-8 glow-orange-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-3xl pointer-events-none rounded-full" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-orange-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome Back</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Hello, {user?.name || 'Resident'}!
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Ready to find your next home away from home? Explore our newly approved verified listings with zero brokerage and digital escrow protection.
            </p>
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              <span>Explore Verified PGs</span>
            </button>
          </div>
        </div>

        {/* 🚀 Quick Action Feature Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`group p-6 rounded-3xl glass-panel border border-zinc-800 ${item.border} cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 flex flex-col justify-between`}
            >
              <div>
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.gradient} border border-white/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform mb-5`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-1.5">
                  {item.label}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.sublabel}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-1.5 text-xs font-semibold text-orange-400">
                <span>Access Portal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* 💡 Quick Resident Advice & Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">100% Verified Hosts</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every accommodation is audited by our compliance team with verified identity & ownership records.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Encrypted Digital Escrow</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Transparent payments via PayPal with instant digital invoices and zero hidden brokerage fees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">24/7 Dedicated Support</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Need assistance with an active booking or host communication? Our help desk is always available.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeekerDashboard;