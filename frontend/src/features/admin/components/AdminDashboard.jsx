import React, { useState } from 'react';
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
  Sparkles,
  ArrowRight,
  Clock,
  X,
  Activity
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { icon: Home, label: 'Control Center', path: '/admin-dashboard' },
  { icon: AlertCircle, label: 'Audit PG Requests', path: '/admin-dashboard/approvals' },
  { icon: CheckCircle2, label: 'Approved Properties', path: '/admin-dashboard/available-pgs' },
  { icon: XCircle, label: 'Rejected Listings', path: '/admin-dashboard/rejected-pgs' },
  { icon: User, label: 'Host Providers', path: '/admin-dashboard/providers' },
  { icon: Users, label: 'Registered Seekers', path: '/admin-dashboard/seekers' },
  { icon: LogOut, label: 'Sign Out', isLogout: true }
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#050505] text-white min-h-[calc(100vh-140px)] flex overflow-hidden relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Admin Navigation Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative z-50 w-72 bg-[#141414] border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-[#E50914] text-white flex items-center justify-center text-xs font-bold shadow-[0_0_10px_#E50914]">
                    A
                  </div>
                  <span className="font-extrabold text-white text-sm">Admin Desk</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  item.isLogout ? (
                    <button
                      key={index}
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-600/10 text-xs font-bold uppercase tracking-wider transition-all text-left cursor-pointer"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <item.icon className="w-4 h-4 text-[#E50914]" />
                      <span>{item.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">Admin Session</span>
              <span className="text-[#E50914] font-bold truncate block">{user?.email || 'System Administrator'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              id="hamburger-button"
              onClick={toggleSidebar}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-[#E50914]/40 transition-all cursor-pointer"
              aria-label="Toggle Admin Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">SUPERADMIN CONTROL</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Platform Operations Center
              </h1>
            </div>
          </div>
        </div>

        {/* Welcome Hero Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-neutral-300 border border-white/10 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Platform Health Normal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Welcome back, Administrator
            </h2>
            <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
              Inspect new accommodation submissions, review safety compliance photos, and manage all verified providers & resident seekers.
            </p>
          </div>

          <Link
            to="/admin-dashboard/approvals"
            className="px-5 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Review Pending Requests</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Action Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Link
            to="/admin-dashboard/approvals"
            className="p-6 rounded-2xl bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 group space-y-4 shadow-lg hover:shadow-2xl hover:shadow-red-600/5"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">PG Audit Requests</h3>
              <p className="text-xs text-neutral-400">Review pending host listings, photo quality, and pricing details</p>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/available-pgs"
            className="p-6 rounded-2xl bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 group space-y-4 shadow-lg hover:shadow-2xl hover:shadow-red-600/5"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Active Catalog</h3>
              <p className="text-xs text-neutral-400">Manage all approved and publicly discoverable PG stays</p>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/rejected-pgs"
            className="p-6 rounded-2xl bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 group space-y-4 shadow-lg hover:shadow-2xl hover:shadow-red-600/5"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-400">
                <XCircle className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Rejected Properties</h3>
              <p className="text-xs text-neutral-400">View non-compliant accommodations and audit feedback logs</p>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/providers"
            className="p-6 rounded-2xl bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 group space-y-4 shadow-lg hover:shadow-2xl hover:shadow-red-600/5"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.3)]">
                <User className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#E50914] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Host Providers</h3>
              <p className="text-xs text-neutral-400">Manage registered property managers and identity proofs</p>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/seekers"
            className="p-6 rounded-2xl bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 group space-y-4 shadow-lg hover:shadow-2xl hover:shadow-red-600/5"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Seeker Residents</h3>
              <p className="text-xs text-neutral-400">View registered student and professional seeker accounts</p>
            </div>
          </Link>

          <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-4 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">System Security</h3>
              <p className="text-xs text-neutral-400">JWT Token Auth & PayPal Sandbox Escrow Active</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;


