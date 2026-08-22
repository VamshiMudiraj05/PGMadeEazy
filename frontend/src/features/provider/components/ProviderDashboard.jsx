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
          bg: 'bg-amber-500 text-black',
          icon: Clock,
          label: 'Pending'
        };
      case 'APPROVED':
        return {
          bg: 'bg-emerald-500 text-black',
          icon: CheckCircle2,
          label: 'Approved'
        };
      case 'REJECTED':
        return {
          bg: 'bg-red-500 text-white',
          icon: XCircle,
          label: 'Changes Required'
        };
      default:
        return {
          bg: 'bg-[#181820] text-[#7A7A85]',
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
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading manager records...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] min-h-[calc(100vh-140px)] flex overflow-hidden">
      
      {/* Off-canvas Host Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div 
            ref={sidebarRef}
            className="relative z-50 w-72 bg-[#121217] border-r border-[#1E1E26] p-6 flex flex-col justify-between shadow-2xl"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E1E26]">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-sm bg-[#FF5A36] text-white flex items-center justify-center text-xs font-bold">
                    H
                  </div>
                  <span className="font-bold text-white text-sm">Host Desk</span>
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
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A85] block">Authorized Host</span>
              <span className="text-white font-medium truncate block">{user?.email}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Canvas */}
      <div className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              id="hamburger-button"
              onClick={toggleSidebar}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
              aria-label="Toggle Host Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">Provider Hub</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Host Property Dashboard
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/provider-dashboard/add-property')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider bg-[#FF5A36] hover:bg-[#E54B28] text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>List New Property</span>
          </button>
        </div>

        {/* Key Metrics Overview Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A7A85] block">Total Properties</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-white">{totalProps}</span>
              <Building className="w-4 h-4 text-[#7A7A85]" />
            </div>
          </div>

          <div className="p-5 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">Live & Approved</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400">{approvedProps}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="p-5 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">Pending Audit</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-amber-400">{pendingProps}</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          <div className="p-5 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 block">Needs Revision</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-red-400">{rejectedProps}</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
          </div>
        </div>

        {/* Verification Info Banner */}
        <div className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-sm bg-[#181820] border border-[#22222A] flex items-center justify-center text-[#FF5A36] shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Listing Verification Timeline</h3>
              <p className="text-xs text-[#9E9EA7] leading-relaxed">
                All accommodations listed on PG Made Eazy undergo a compliance review within 24-48 hours before becoming visible to verified seekers.
              </p>
            </div>
          </div>
        </div>

        {/* Listed Properties Catalog Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E1E26]">
            <h2 className="text-base font-bold text-white">
              Listed Properties ({properties.length})
            </h2>
            <Link
              to="/provider-dashboard/my-properties"
              className="text-xs font-semibold text-[#FF5A36] hover:text-[#E54B28] flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Manage Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
              <Building className="w-8 h-8 text-[#7A7A85] mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Properties Listed Yet</h3>
                <p className="text-xs text-[#9E9EA7]">List your accommodation to start receiving resident bookings.</p>
              </div>
              <button
                onClick={() => navigate('/provider-dashboard/add-property')}
                className="px-4 py-2 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                + List Property
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
                    className="rounded-sm overflow-hidden bg-[#121217] border border-[#1E1E26] hover:border-[#383848] transition-colors flex flex-col justify-between"
                  >
                    {/* Thumbnail Section */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0B0E]">
                      <img
                        src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-80" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${statusInfo.bg}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusInfo.label}</span>
                        </span>
                      </div>

                      {/* Rent Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#0B0B0E]/90 text-white border border-[#22222A]">
                          ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-[#7A7A85] font-normal">/mo</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-white truncate">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#7A7A85]">
                          <MapPin className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                          <span className="truncate">{property.city}, {property.area}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-[#1E1E26] text-xs text-[#FAFAFA]">
                          <div>
                            <span className="text-[#7A7A85] block text-[10px] uppercase tracking-wider">Inventory</span>
                            <span className="font-semibold">{property.rooms} Rooms</span>
                          </div>
                          <div>
                            <span className="text-[#7A7A85] block text-[10px] uppercase tracking-wider">Structure</span>
                            <span className="font-semibold truncate block">{property.buildingType || 'PG Stay'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="w-full py-2 px-3 rounded-sm bg-[#181820] border border-[#22222A] hover:border-[#FF5A36] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#FF5A36]" />
                        <span>Edit Listing Details</span>
                      </button>
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

