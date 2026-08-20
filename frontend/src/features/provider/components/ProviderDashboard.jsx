import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Building,
  User,
  LogOut,
  Menu,
  Plus,
  AlertCircle,
  XCircle,
  Info,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  TrendingUp,
  X,
  ArrowRight,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const menuItems = [
  { icon: Home, label: 'Dashboard Overview', path: '/provider-dashboard' },
  { icon: Building, label: 'All Properties', path: '/provider-dashboard/my-properties' },
  { icon: Plus, label: 'List New PG Stay', path: '/provider-dashboard/add-property' },
  { icon: XCircle, label: 'Rejected Listings', path: '/provider-dashboard/rejected-properties' },
  { icon: User, label: 'Host Profile & Identity', path: '/provider-dashboard/profile' },
  { icon: LogOut, label: 'Sign Out', isLogout: true }
];

const ProviderDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      !e.target.closest('#hamburger-button')
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const ownerName = user?.name;
      const ownerProperties = await propertyApi.getPropertiesByOwner(ownerName);
      setProperties(ownerProperties || []);
    } catch {
      toast.error('Failed to load host properties');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: Clock,
          label: 'Pending Review'
        };
      case 'APPROVED':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: CheckCircle2,
          label: 'Approved & Live'
        };
      case 'REJECTED':
        return {
          bg: 'bg-red-500/10 text-red-400 border-red-500/20',
          icon: XCircle,
          label: 'Changes Required'
        };
      default:
        return {
          bg: 'bg-zinc-800 text-zinc-400 border-zinc-700',
          icon: AlertCircle,
          label: status || 'Draft'
        };
    }
  };

  const handleEdit = (propertyId) => {
    navigate(`/provider/edit-property/${propertyId}`);
  };

  const totalProps = properties.length;
  const approvedProps = properties.filter(p => p.status === 'APPROVED').length;
  const pendingProps = properties.filter(p => p.status === 'PENDING').length;
  const rejectedProps = properties.filter(p => p.status === 'REJECTED').length;

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading your property manager records...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-zinc-950 min-h-[calc(100vh-140px)] flex overflow-hidden text-zinc-100 selection:bg-orange-500 selection:text-white">
      
      {/* 🧭 Off-canvas Host Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div 
            ref={sidebarRef}
            className="relative z-50 w-72 bg-zinc-950/95 border-r border-zinc-800/80 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl animate-in slide-in-from-left duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Building className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-white text-base">Host Manager</span>
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
              <span className="text-zinc-400 block mb-0.5">Logged in as Host</span>
              <span className="text-white font-bold truncate block">{user?.email}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Canvas */}
      <div className="flex-1 relative p-4 sm:p-8 max-w-6xl mx-auto w-full">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              id="hamburger-button"
              onClick={toggleSidebar}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all shadow-sm"
              aria-label="Toggle Host Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Host Property Dashboard
              </h1>
              <p className="text-xs text-zinc-400">Manage listings, track tenant occupancy, and view revenue</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/provider-dashboard/add-property')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>List New Property</span>
          </button>
        </div>

        {/* 📊 Key Metrics Overview Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl glass-panel border border-zinc-800">
            <span className="text-xs font-semibold text-zinc-400 block mb-1">Total Properties</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{totalProps}</span>
              <Building className="w-5 h-5 text-orange-500/60" />
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-zinc-800">
            <span className="text-xs font-semibold text-zinc-400 block mb-1">Live & Approved</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{approvedProps}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500/60" />
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-zinc-800">
            <span className="text-xs font-semibold text-zinc-400 block mb-1">Pending Audit</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">{pendingProps}</span>
              <Clock className="w-5 h-5 text-amber-500/60" />
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-zinc-800">
            <span className="text-xs font-semibold text-zinc-400 block mb-1">Needs Attention</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-red-400">{rejectedProps}</span>
              <XCircle className="w-5 h-5 text-red-500/60" />
            </div>
          </div>
        </div>

        {/* ℹ️ Property Approval Guide Banner */}
        <div className="p-6 rounded-3xl glass-panel border border-zinc-800 mb-8 glow-orange-sm">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Listing Verification Process</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                All accommodations listed on PG Made Eazy undergo a quick quality audit within 24-48 hours before becoming visible to verified students and working professionals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>Pending review after submission</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Immediate visibility upon approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span>Zero listing fee / 100% direct booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🏢 Listed Properties Catalog Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Your Listed Properties ({properties.length})
            </h2>
            <Link
              to="/provider-dashboard/my-properties"
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-md mx-auto">
              <Building className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No Properties Listed Yet</h3>
              <p className="text-xs text-zinc-400 mb-6">List your PG stay or hostel to start receiving verified resident bookings.</p>
              <button
                onClick={() => navigate('/provider-dashboard/add-property')}
                className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20"
              >
                + Add Your First Property
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, pIdx) => {
                const statusInfo = getStatusBadge(property.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={property.id || pIdx}
                    className="rounded-3xl overflow-hidden glass-panel border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-orange-500/5 glow-orange-sm"
                  >
                    {/* Thumbnail Section */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                      <img
                        src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${statusInfo.bg}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusInfo.label}</span>
                        </span>
                      </div>

                      {/* Rent Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-zinc-950/80 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                          ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-zinc-400 font-normal">/mo</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white truncate mb-1">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="truncate">{property.city}, {property.area}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-zinc-800/80 text-xs text-zinc-300">
                          <div>
                            <span className="text-zinc-500 block text-[10px]">Total Rooms</span>
                            <span className="font-semibold">{property.rooms} Rooms</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[10px]">Structure</span>
                            <span className="font-semibold truncate block">{property.buildingType || 'PG Stay'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(property.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-orange-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-orange-400" />
                          <span>Edit Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProviderDashboard;

