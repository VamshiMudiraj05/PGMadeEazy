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
    <div className="bg-[#0B0B0E] text-[#FAFAFA] min-h-[calc(100vh-140px)] flex overflow-hidden">
      
      {/* Admin Navigation Drawer */}
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
                    A
                  </div>
                  <span className="font-bold text-white text-sm">Admin Desk</span>
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
                  item.isLogout ? (
                    <button
                      key={index}
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-red-400 hover:bg-red-500/10 text-xs font-bold uppercase tracking-wider transition-colors text-left"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-[#9E9EA7] hover:text-white hover:bg-[#181820] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-[#FF5A36]" />
                      <span>{item.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-sm bg-[#0B0B0E] border border-[#1E1E26] text-xs space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A85] block">Admin Session</span>
              <span className="text-[#FF5A36] font-bold truncate block">{user?.email || 'System Administrator'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              id="hamburger-button"
              onClick={toggleSidebar}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
              aria-label="Toggle Admin Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">Superadmin Control</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Platform Operations Center
              </h1>
            </div>
          </div>
        </div>

        {/* Welcome Hero Banner */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#121217] border border-[#1E1E26] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#181820] text-[#9E9EA7] border border-[#22222A] text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#FF5A36]" />
              <span>Platform Health Normal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Welcome back, Administrator
            </h2>
            <p className="text-xs text-[#9E9EA7] max-w-xl leading-relaxed">
              Inspect new accommodation submissions, review safety compliance photos, and manage all verified providers & resident seekers.
            </p>
          </div>

          <Link
            to="/admin-dashboard/approvals"
            className="px-5 py-2.5 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Review Pending Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Action Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Link
            to="/admin-dashboard/approvals"
            className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-amber-500/50 transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-sm bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#555560] group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">PG Audit Requests</h3>
              <p className="text-xs text-[#7A7A85]">Review pending host listings, photo quality, and pricing details</p>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/available-pgs"
            className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-emerald-500/50 transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-sm bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#555560] group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Active Catalog</h3>
              <p className="text-xs text-[#7A7A85]">Manage all approved and publicly discoverable PG stays</p>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/rejected-pgs"
            className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-red-500/50 transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-sm bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <XCircle className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#555560] group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Rejected Properties</h3>
              <p className="text-xs text-[#7A7A85]">View non-compliant accommodations and audit feedback logs</p>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/providers"
            className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-[#FF5A36] transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-sm bg-[#181820] border border-[#22222A] flex items-center justify-center text-[#FF5A36]">
                <User className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#555560] group-hover:text-[#FF5A36] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Host Providers</h3>
              <p className="text-xs text-[#7A7A85]">Manage registered property managers and identity proofs</p>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/seekers"
            className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] hover:border-blue-500/50 transition-colors group space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#555560] group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Seeker Residents</h3>
              <p className="text-xs text-[#7A7A85]">View registered student and professional seeker accounts</p>
            </div>
          </Link>

          <div className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-4">
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-sm bg-[#181820] border border-[#22222A] flex items-center justify-center text-[#7A7A85]">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">System Security</h3>
              <p className="text-xs text-[#7A7A85]">JWT Token Auth & PayPal Sandbox Escrow Active</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

