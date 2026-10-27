import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
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
  Sparkles,
  Wifi,
  Utensils,
  BedDouble
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

// Solari Flap Character Unit
function FlapChar({ char, size = "18px" }) {
  const isSpace = char === " ";
  const displayChar = isSpace ? "" : char;
  return (
    <span
      className={`c ${isSpace ? "sp" : ""}`}
      style={{ "--cw": size }}
      aria-hidden="true"
    >
      <i className="u">{displayChar}</i>
      <i className="l">{displayChar}</i>
    </span>
  );
}

// Reusable Split-Flap Word
function FlapWord({ text, size = "18px", colorClass = "text-[#f2f2f2]" }) {
  const chars = String(text).toUpperCase().split("");
  return (
    <span className={`fl ${colorClass}`}>
      {chars.map((ch, idx) => (
        <FlapChar key={idx} char={ch} size={size} />
      ))}
    </span>
  );
}

const menuItems = [
  { 
    code: 'MOD-01',
    icon: Search, 
    label: 'STUDENT PG SEARCH & DIRECTORY', 
    sublabel: 'Filter verified student rooms by sharing bed count, meal plans, and zero brokerage.', 
    path: '/seeker-dashboard/find-pg',
    tag: 'EXPLORE'
  },
  { 
    code: 'MOD-02',
    icon: CalendarCheck, 
    label: 'ACTIVE RESERVATIONS & BOOKINGS', 
    sublabel: 'Review confirmed hostel beds, check-in schedules, and digital payment receipts.', 
    path: '/seeker-dashboard/bookings',
    tag: 'STAYS'
  },
  { 
    code: 'MOD-03',
    icon: User, 
    label: 'STUDENT PROFILE & CREDENTIALS', 
    sublabel: 'Verify your student institution, emergency warden contacts, and identity documents.', 
    path: '/seeker-dashboard/profile',
    tag: 'KYC'
  },
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
    <div className="bg-[#0b0b0d] text-[#f2f2f2] min-h-[calc(100vh-80px)] flex overflow-hidden relative select-none">
      
      {/* Off-canvas Navigation Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative z-50 w-80 bg-[#121316] border-r border-[#26292d] p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#202226]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-none bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
                  <span className="font-['Big_Shoulders_Display'] text-lg font-bold uppercase tracking-[0.16em] text-white">
                    RESIDENT TERMINAL
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-[2px] text-[#a7aaaf] hover:text-white border border-transparent hover:border-[#34373c]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-start gap-3 p-3 rounded-[3px] border border-[#202226] bg-[#0b0b0d] hover:border-[#ffb000]/60 hover:bg-[#181a1f] transition-all text-left group"
                  >
                    <item.icon className="w-4 h-4 text-[#ffb000] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#f2f2f2] font-['Barlow_Semi_Condensed'] group-hover:text-[#ffb000]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#a7aaaf] font-['Barlow_Semi_Condensed'] line-clamp-1">
                        {item.sublabel}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-[3px] bg-[#0b0b0d] border border-[#ff4b4b]/40 text-[#ff4b4b] hover:bg-[#ff4b4b]/10 text-xs font-bold uppercase tracking-[0.18em] font-['Barlow_Semi_Condensed'] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>TERMINATE SESSION</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Canvas */}
      <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Top Split-Flap Header Board */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#a7aaaf] hover:text-[#ffb000] hover:border-[#ffb000]/60 transition-colors"
                aria-label="Toggle Portal Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
              <span className="w-2 h-2 bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb000] font-['Barlow_Semi_Condensed']">
                SEEKER CONSOLE // TERMINAL V3.1
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-[0.16em] text-[#a7aaaf]">
              <span className="hidden sm:inline">STATUS: <b className="text-emerald-400">ACTIVE SCHOLAR</b></span>
              <span>BROKERAGE: <b className="text-[#ffb000]">0% STRICT</b></span>
            </div>
          </div>

          <div className="py-4 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed'] mb-1">
                AUTHENTICATED RESIDENT ID: {user?.id?.slice(-8) || 'SCHOLAR'}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <FlapWord text="WELCOME," size="clamp(22px, 3.5vw, 38px)" colorClass="text-[#f2f2f2]" />
                <FlapWord text={(user?.name || 'RESIDENT').slice(0, 16)} size="clamp(22px, 3.5vw, 38px)" colorClass="text-[#ffb000]" />
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigate('/seeker-dashboard/find-pg')}
                className="btn-solari btn-solari-amber text-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>SEARCH STUDENT PGS</span>
                <span className="chev">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Status Telemetry Strips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-[3px] bg-[#121316] border border-[#26292d] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">CAMPUS RADIUS</div>
              <div className="text-xl font-bold text-white font-['Big_Shoulders_Display']">&lt; 1.5 KM</div>
            </div>
            <BedDouble className="w-5 h-5 text-[#ffb000]" />
          </div>

          <div className="p-3.5 rounded-[3px] bg-[#121316] border border-[#26292d] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">MEAL PLANS</div>
              <div className="text-xl font-bold text-emerald-400 font-['Big_Shoulders_Display']">3X DAILY INCL.</div>
            </div>
            <Utensils className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="p-3.5 rounded-[3px] bg-[#121316] border border-[#26292d] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">HIGH-SPEED WIFI</div>
              <div className="text-xl font-bold text-white font-['Big_Shoulders_Display']">300 MBPS FIBER</div>
            </div>
            <Wifi className="w-5 h-5 text-[#ffb000]" />
          </div>

          <div className="p-3.5 rounded-[3px] bg-[#121316] border border-[#26292d] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">STUDENT BROKERAGE</div>
              <div className="text-xl font-bold text-[#ffb000] font-['Big_Shoulders_Display']">₹0 NIL</div>
            </div>
            <ShieldCheck className="w-5 h-5 text-[#ffb000]" />
          </div>
        </div>

        {/* Action Modules Terminal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="p-5 rounded-[3px] bg-[#121316] border border-[#26292d] hover:border-[#ffb000]/70 cursor-pointer transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffb000] border border-[#ffb000]/30 px-2 py-0.5 bg-[#ffb000]/10">
                    {item.code}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
                    {item.tag}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="p-2 bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] group-hover:border-[#ffb000]">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                    {item.label}
                  </h3>
                </div>

                <p className="text-xs text-[#a7aaaf] leading-relaxed font-['Barlow_Semi_Condensed']">
                  {item.sublabel}
                </p>
              </div>

              <div className="pt-3 border-t border-[#202226] flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
                <span>LAUNCH MODULE</span>
                <span className="p-1 bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Guarantee Standards Board */}
        <div className="board">
          <div className="board-head">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
              RESIDENT PROTECTIONS // VERIFIED PROTOCOLS
            </span>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white font-['Barlow_Semi_Condensed']">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AUDITED CAMPUS COMPLIANCE</span>
              </div>
              <p className="text-xs text-[#a7aaaf] leading-relaxed font-['Barlow_Semi_Condensed']">
                Every PG and hostel is physically inspected for fire safety, biometrics, clean mess kitchens, and verified wardens.
              </p>
            </div>

            <div className="p-4 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white font-['Barlow_Semi_Condensed']">
                <CreditCard className="w-4 h-4 text-[#ffb000]" />
                <span>DIRECT DEPOSIT ESCROW</span>
              </div>
              <p className="text-xs text-[#a7aaaf] leading-relaxed font-['Barlow_Semi_Condensed']">
                100% digital invoices with transparent deposit receipts. No unexpected deductions or unreceipted cash requests.
              </p>
            </div>

            <div className="p-4 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white font-['Barlow_Semi_Condensed']">
                <Headphones className="w-4 h-4 text-[#f2f2f2]" />
                <span>STUDENT ESCALATION DESK</span>
              </div>
              <p className="text-xs text-[#a7aaaf] leading-relaxed font-['Barlow_Semi_Condensed']">
                Direct hotline with quick response times for maintenance tickets, warden mediation, or room reassignments.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeekerDashboard;