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
  Compass, 
  CalendarCheck, 
  X
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
    <div className="bg-[#0B0B0E] text-[#FAFAFA] min-h-[calc(100vh-140px)] flex overflow-hidden">
      
      {/* Off-canvas Navigation Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative z-50 w-72 bg-[#121217] border-r border-[#1E1E26] p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E1E26]">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-sm bg-[#FF5A36] text-white flex items-center justify-center text-xs font-bold">
                    P
                  </div>
                  <span className="font-bold text-white text-sm">Resident Desk</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-sm text-[#7A7A85] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-[#9E9EA7] hover:text-white hover:bg-[#181820] text-xs font-semibold uppercase tracking-wider transition-colors text-left"
                  >
                    <item.icon className="w-4 h-4 text-[#FF5A36]" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-sm text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Canvas */}
      <div className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-10">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
              aria-label="Toggle Portal Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">Seeker Hub</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Welcome back, {user?.name || 'Resident'}
              </h1>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-sm bg-[#121217] border border-[#1E1E26] text-[#9E9EA7]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Audited Resident Profile</span>
          </div>
        </div>

        {/* Art-Directed Action Console Banner */}
        <div className="p-8 sm:p-10 rounded-sm bg-[#121217] border border-[#1E1E26] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">
              Accommodations Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Discover verified spaces with 0% brokerage markup.
            </h2>
            <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
              Every property on our directory features verified photo galleries, transparent deposit schedules, and direct landlord contact lines.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => navigate('/seeker-dashboard/find-pg')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-wider text-white bg-[#FF5A36] hover:bg-[#E54B28] transition-colors"
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
              className="group p-6 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-[#383848] cursor-pointer transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="h-9 w-9 rounded-sm bg-[#181820] border border-[#22222A] flex items-center justify-center text-[#FF5A36]">
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#FF5A36] transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-[#9E9EA7] leading-relaxed">
                  {item.sublabel}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E1E26] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#FAFAFA]">
                <span>Access Module</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5A36] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#1E1E26]">
          <div className="p-5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Audited Compliance</span>
            </div>
            <p className="text-xs text-[#7A7A85] leading-relaxed">
              Every accommodation is audited by our verification team with confirmed legal documentation.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <CreditCard className="w-4 h-4 text-[#FF5A36]" />
              <span>Digital Transaction Logs</span>
            </div>
            <p className="text-xs text-[#7A7A85] leading-relaxed">
              Transparent digital receipts with full audit trails and zero hidden brokerage commissions.
            </p>
          </div>

          <div className="p-5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <Headphones className="w-4 h-4 text-[#7A7A85]" />
              <span>Dedicated Support Desk</span>
            </div>
            <p className="text-xs text-[#7A7A85] leading-relaxed">
              Need assistance with an active booking or host communication? Our help desk is active daily.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeekerDashboard;