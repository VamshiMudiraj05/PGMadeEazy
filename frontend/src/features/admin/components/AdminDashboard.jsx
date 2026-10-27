import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Users, 
  LogOut, 
  Menu, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Clock,
  X,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

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

const menuItems = [
  { icon: Home, label: 'Control Center', code: '01 // DISPATCH', path: '/admin-dashboard' },
  { icon: AlertCircle, label: 'Audit PG Requests', code: '02 // AUDIT QUEUE', path: '/admin-dashboard/approvals' },
  { icon: CheckCircle2, label: 'Approved Properties', code: '03 // LIVE ROSTER', path: '/admin-dashboard/available-pgs' },
  { icon: XCircle, label: 'Rejected Listings', code: '04 // FAILED AUDIT', path: '/admin-dashboard/rejected-pgs' },
  { icon: User, label: 'Host Providers', code: '05 // WARDENS', path: '/admin-dashboard/providers' },
  { icon: Users, label: 'Registered Seekers', code: '06 // STUDENTS', path: '/admin-dashboard/seekers' },
  { icon: LogOut, label: 'Sign Out Terminal', code: 'EXIT', isLogout: true }
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] min-h-[calc(100vh-140px)] flex overflow-hidden relative font-['Barlow_Semi_Condensed']">
      
      {/* Solari Admin Navigation Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative z-50 w-80 bg-[#121316] border-r border-[#26292d] p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#202226]">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-[3px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] flex items-center justify-center text-sm font-bold font-['Big_Shoulders_Display']">
                    ADM
                  </div>
                  <div>
                    <span className="font-bold tracking-[0.14em] text-white uppercase font-['Big_Shoulders_Display'] text-base block">
                      ADMIN DESK
                    </span>
                    <span className="text-[10px] font-mono text-[#ffb000]">OPERATIONS CONTROL</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#a7aaaf] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-1.5">
                {menuItems.map((item, index) => (
                  item.isLogout ? (
                    <button
                      key={index}
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-[2px] text-[#ff4b4b] hover:bg-[#ff4b4b]/10 border border-transparent hover:border-[#ff4b4b]/30 text-xs font-semibold uppercase tracking-wider transition-all text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#ff4b4b]/70">{item.code}</span>
                    </button>
                  ) : (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-[2px] text-[#a7aaaf] hover:text-white hover:bg-[#181a1d] border border-transparent hover:border-[#34373c] text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-[#ffb000]" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#5b5e63]">{item.code}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Session Readout */}
            <div className="p-3 bg-[#0b0b0d] border border-[#34373c] rounded-[2px] text-xs space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a7aaaf] block">ACTIVE CREDENTIALS</span>
              <span className="text-[#ffb000] font-bold font-mono truncate block">{user?.email || 'SYSTEM_ADMINISTRATOR'}</span>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ROOT PERMISSIONS VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Top Header Board */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <button
                id="hamburger-button"
                onClick={toggleSidebar}
                className="p-2 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#a7aaaf] hover:text-white hover:border-[#ffb000] transition-colors cursor-pointer"
                aria-label="Toggle Admin Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
              <span className="w-2.5 h-2.5 rounded-none bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                PLATFORM OPERATIONS // COMMAND DESK
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>STATUS: <b className="text-emerald-400 font-mono">100% OPERATIONAL</b></span>
              <span>AUDIT: <b className="text-[#ffb000] font-mono">ON-SITE STRICT</b></span>
            </div>
          </div>

          <div className="py-4 sm:py-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="COMPLIANCE" size="clamp(24px, 3.8vw, 44px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="DESK." size="clamp(24px, 3.8vw, 44px)" colorClass="text-[#ffb000]" />
            </div>
          </div>
        </div>

        {/* Welcome Telemetry Console */}
        <div className="board flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffb000]">
              <span className="w-2 h-2 bg-[#ffb000]" />
              <span>SUPERADMIN CREDENTIALS ACTIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[0.12em] uppercase text-white font-['Big_Shoulders_Display']">
              WELCOME BACK, ADMINISTRATOR
            </h2>
            <p className="text-xs sm:text-sm text-[#a7aaaf] max-w-2xl leading-relaxed">
              Review new student PG listing submissions, verify mess food & WiFi audits, monitor host warden credentials, and oversee tenant deposit integrity.
            </p>
          </div>

          <Link
            to="/admin-dashboard/approvals"
            className="btn-solari btn-solari-amber text-xs shrink-0"
          >
            <span>INSPECT AUDIT QUEUE</span>
            <span className="chev">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Quick Action Solari Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Tile 01: Audit PG Requests */}
          <Link
            to="/admin-dashboard/approvals"
            className="board hover:border-[#ffb000] transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#202226]">
              <div className="h-9 w-9 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] flex items-center justify-center text-[#ffb000]">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#ffb000] uppercase tracking-wider">01 // PENDING</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.1em] font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                PG Audit Requests
              </h3>
              <p className="text-xs text-[#a7aaaf] mt-1 leading-relaxed">
                Inspect pending hostel listings, photogrammetric room proofs, mess menus, and tariff schedules.
              </p>
            </div>
            <div className="pt-3 border-t border-[#202226] flex items-center justify-between text-xs uppercase tracking-wider text-[#a7aaaf]">
              <span>Audit Queue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ffb000] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tile 02: Approved Active Catalog */}
          <Link
            to="/admin-dashboard/available-pgs"
            className="board hover:border-[#ffb000] transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#202226]">
              <div className="h-9 w-9 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">02 // ACTIVE</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.1em] font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                Active Student PGs
              </h3>
              <p className="text-xs text-[#a7aaaf] mt-1 leading-relaxed">
                Manage the live catalog of physically audited paying guest stays, room tariffs, and bed availability.
              </p>
            </div>
            <div className="pt-3 border-t border-[#202226] flex items-center justify-between text-xs uppercase tracking-wider text-[#a7aaaf]">
              <span>Live Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ffb000] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tile 03: Rejected Properties */}
          <Link
            to="/admin-dashboard/rejected-pgs"
            className="board hover:border-[#ffb000] transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#202226]">
              <div className="h-9 w-9 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] flex items-center justify-center text-[#ff4b4b]">
                <XCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#ff4b4b] uppercase tracking-wider">03 // REJECTED</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.1em] font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                Rejected Listings
              </h3>
              <p className="text-xs text-[#a7aaaf] mt-1 leading-relaxed">
                Review non-compliant accommodations, inspection failure notes, and host improvement feedback.
              </p>
            </div>
            <div className="pt-3 border-t border-[#202226] flex items-center justify-between text-xs uppercase tracking-wider text-[#a7aaaf]">
              <span>Audit Logs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ffb000] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tile 04: Host Providers */}
          <Link
            to="/admin-dashboard/providers"
            className="board hover:border-[#ffb000] transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#202226]">
              <div className="h-9 w-9 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] flex items-center justify-center text-[#ffb000]">
                <User className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#a7aaaf] uppercase tracking-wider">04 // HOSTS</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.1em] font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                Host Wardens & Owners
              </h3>
              <p className="text-xs text-[#a7aaaf] mt-1 leading-relaxed">
                Inspect registered property operators, verified government identification proofs, and contact details.
              </p>
            </div>
            <div className="pt-3 border-t border-[#202226] flex items-center justify-between text-xs uppercase tracking-wider text-[#a7aaaf]">
              <span>Roster Registry</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ffb000] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tile 05: Student Seekers */}
          <Link
            to="/admin-dashboard/seekers"
            className="board hover:border-[#ffb000] transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#202226]">
              <div className="h-9 w-9 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] flex items-center justify-center text-[#ffb000]">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#a7aaaf] uppercase tracking-wider">05 // SEEKERS</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.1em] font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors">
                Student & Scholar Accounts
              </h3>
              <p className="text-xs text-[#a7aaaf] mt-1 leading-relaxed">
                Review registered student and professional accounts, university affiliations, and active reservations.
              </p>
            </div>
            <div className="pt-3 border-t border-[#202226] flex items-center justify-between text-xs uppercase tracking-wider text-[#a7aaaf]">
              <span>Student Roster</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ffb000] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tile 06: System Security Telemetry */}
          <div className="board space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#202226]">
              <div className="h-9 w-9 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] flex items-center justify-center text-emerald-400">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">06 // INTEGRITY</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.1em] font-['Big_Shoulders_Display']">
                Security & Escrow Logs
              </h3>
              <p className="text-xs text-[#a7aaaf] mt-1 leading-relaxed">
                Cryptographic session enforcement, zero-brokerage mandate audit, and PayPal Sandbox deposit ledger.
              </p>
            </div>
            <div className="pt-3 border-t border-[#202226] flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ALL PROTOCOLS GREEN</span>
              </span>
              <span>256-BIT</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
