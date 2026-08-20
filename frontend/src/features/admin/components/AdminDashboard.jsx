import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Building, 
  User, 
  Users, 
  LogOut, 
  Menu, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  X,
  Layers,
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
    <div className="relative bg-zinc-950 min-h-[calc(100vh-140px)] flex overflow-hidden text-zinc-100 selection:bg-orange-500 selection:text-white">
      
      {/* 🧭 Admin Navigation Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative z-50 w-72 bg-zinc-950/95 border-r border-zinc-800 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-white text-base">Admin Panel</span>
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
                  item.isLogout ? (
                    <button
                      key={index}
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-sm font-semibold transition-all"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-sm font-semibold transition-all"
                    >
                      <item.icon className="w-4 h-4 text-orange-400" />
                      <span>{item.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs">
              <span className="text-zinc-500 block mb-0.5">Admin Session</span>
              <span className="text-orange-400 font-bold truncate block">{user?.email || 'System Administrator'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex-1 relative p-4 sm:p-8 max-w-6xl mx-auto w-full">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              id="hamburger-button"
              onClick={toggleSidebar}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all shadow-sm"
              aria-label="Toggle Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Superadmin Control Center
              </h1>
              <p className="text-xs text-zinc-400">Platform compliance, host approval queues, and user directories</p>
            </div>
          </div>
        </div>

        {/* Welcome Hero Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 mb-8 glow-orange-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Platform Health Normal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Welcome back, Administrator
            </h2>
            <p className="text-xs text-zinc-400 max-w-xl">
              Inspect new accommodation submissions, review safety compliance photos, and manage all verified providers & resident seekers.
            </p>
          </div>

          <Link
            to="/admin-dashboard/approvals"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 hover:-translate-y-0.5 shrink-0"
          >
            <span>Review Pending Requests</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 🚀 Quick Action Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          
          <Link
            to="/admin-dashboard/approvals"
            className="glass-panel p-6 rounded-3xl border border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 group hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">PG Audit Requests</h3>
            <p className="text-xs text-zinc-400">Review pending host listings, photo quality, and pricing details</p>
          </Link>

          <Link
            to="/admin-dashboard/available-pgs"
            className="glass-panel p-6 rounded-3xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-500/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Active Catalog</h3>
            <p className="text-xs text-zinc-400">Manage all approved and publicly discoverable PG stays</p>
          </Link>

          <Link
            to="/admin-dashboard/rejected-pgs"
            className="glass-panel p-6 rounded-3xl border border-red-500/30 hover:border-red-500/60 transition-all duration-300 group hover:shadow-xl hover:shadow-red-500/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <XCircle className="w-6 h-6" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Rejected Properties</h3>
            <p className="text-xs text-zinc-400">View non-compliant accommodations and audit feedback logs</p>
          </Link>

          <Link
            to="/admin-dashboard/providers"
            className="glass-panel p-6 rounded-3xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Host Providers</h3>
            <p className="text-xs text-zinc-400">Manage registered property managers and identity proofs</p>
          </Link>

          <Link
            to="/admin-dashboard/seekers"
            className="glass-panel p-6 rounded-3xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Seeker Residents</h3>
            <p className="text-xs text-zinc-400">View registered student and professional seeker accounts</p>
          </Link>

          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-400">
                <Activity className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">System Security</h3>
              <p className="text-xs text-zinc-400">JWT Token Auth & PayPal Sandbox Escrow Active</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

