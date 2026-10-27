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
  MapPin,
  X,
  ArrowRight,
  Edit3,
  BedDouble,
  ShieldCheck
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { getSecureImageUrl } from '../../../utils/imageUtils';

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
  { icon: Home, label: 'DASHBOARD OVERVIEW', path: '/provider-dashboard' },
  { icon: Building, label: 'HOSTEL CATALOG', path: '/provider-dashboard/my-properties' },
  { icon: Plus, label: 'ONBOARD NEW STUDENT PG', path: '/provider-dashboard/add-property' },
  { icon: XCircle, label: 'REVISION REVIEWS', path: '/provider-dashboard/rejected-properties' },
  { icon: User, label: 'WARDEN DOSSIER', path: '/provider-dashboard/profile' },
  { icon: LogOut, label: 'TERMINATE SESSION', isLogout: true }
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
          bg: 'bg-[#ffb000] text-black',
          icon: Clock,
          label: 'PENDING AUDIT'
        };
      case 'APPROVED':
        return {
          bg: 'bg-emerald-500 text-black',
          icon: CheckCircle2,
          label: 'LIVE & APPROVED'
        };
      case 'REJECTED':
        return {
          bg: 'bg-[#ff4b4b] text-white',
          icon: XCircle,
          label: 'REVISION REQUIRED'
        };
      default:
        return {
          bg: 'bg-[#26292d] text-[#a7aaaf]',
          icon: AlertCircle,
          label: status || 'DRAFT'
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
      <div className="min-h-[calc(100vh-140px)] bg-[#0b0b0d] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-none animate-spin shadow-[0_0_10px_#ffb000]" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
          RETRIEVING HOST INVENTORY...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0d] text-[#f2f2f2] min-h-[calc(100vh-140px)] flex overflow-hidden select-none relative">
      
      {/* Off-canvas Host Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div 
            ref={sidebarRef}
            className="relative z-50 w-72 bg-[#121316] border-r border-[#26292d] p-6 flex flex-col justify-between shadow-2xl"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#202226]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-none bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
                  <span className="font-['Big_Shoulders_Display'] text-lg font-bold uppercase tracking-[0.16em] text-white">
                    WARDEN DISPATCH
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-[2px] text-[#a7aaaf] hover:text-white border border-transparent hover:border-[#34373c]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {menuItems.map((item, index) => (
                  item.isLogout ? (
                    <button
                      key={index}
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-[3px] text-[#ff4b4b] border border-[#ff4b4b]/30 hover:bg-[#ff4b4b]/10 text-xs font-bold uppercase tracking-wider font-['Barlow_Semi_Condensed'] transition-all text-left cursor-pointer"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full flex items-center gap-3 p-3 rounded-[3px] text-[#f2f2f2] border border-[#202226] bg-[#0b0b0d] hover:border-[#ffb000]/60 hover:bg-[#181a1f] text-xs font-bold uppercase tracking-wider font-['Barlow_Semi_Condensed'] transition-all"
                    >
                      <item.icon className="w-4 h-4 text-[#ffb000]" />
                      <span>{item.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-[2px] bg-[#0b0b0d] border border-[#26292d] text-xs space-y-0.5 font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
              <span className="text-[10px] font-mono font-bold text-[#ffb000] block">AUTHORIZED HOST WARDEN</span>
              <span className="text-white font-medium truncate block">{user?.email}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Canvas */}
      <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto w-full space-y-6 relative z-10">
        
        {/* Top Header Board */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <button
                id="hamburger-button"
                onClick={toggleSidebar}
                className="p-1.5 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#a7aaaf] hover:text-[#ffb000] hover:border-[#ffb000]/60 transition-all cursor-pointer"
                aria-label="Toggle Host Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
              <span className="w-2 h-2 bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffb000] font-['Barlow_Semi_Condensed']">
                PROVIDER CONSOLE // HOSTEL OPERATIONS
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-['Barlow_Semi_Condensed'] uppercase tracking-[0.16em] text-[#a7aaaf]">
              <span>HOST STATUS: <b className="text-emerald-400 font-mono">VERIFIED OPERATOR</b></span>
              <span>AUDIT QUEUE: <b className="text-white font-mono">{pendingProps} PENDING</b></span>
            </div>
          </div>

          <div className="py-4 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#a7aaaf] font-['Barlow_Semi_Condensed'] mb-1">
                HOST WARDEN: {user?.name?.toUpperCase() || 'OPERATOR'}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                <FlapWord text="HOSTEL" size="clamp(22px, 3.5vw, 36px)" colorClass="text-[#f2f2f2]" />
                <FlapWord text="OPERATIONS HUB." size="clamp(22px, 3.5vw, 36px)" colorClass="text-[#ffb000]" />
              </div>
            </div>

            <button
              onClick={() => navigate('/provider-dashboard/add-property')}
              className="btn-solari btn-solari-amber text-xs self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>ONBOARD NEW PG STAY</span>
              <span className="chev">→</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Overview Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-[3px] bg-[#121316] border border-[#26292d] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a7aaaf] block font-['Barlow_Semi_Condensed']">TOTAL PROPERTIES</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-white font-['Big_Shoulders_Display']">{totalProps}</span>
              <Building className="w-4 h-4 text-[#a7aaaf]" />
            </div>
          </div>

          <div className="p-4 rounded-[3px] bg-[#121316] border border-[#26292d] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400 block font-['Barlow_Semi_Condensed']">LIVE & APPROVED</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-['Big_Shoulders_Display']">{approvedProps}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="p-4 rounded-[3px] bg-[#121316] border border-[#26292d] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffb000] block font-['Barlow_Semi_Condensed']">PENDING AUDIT</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-[#ffb000] font-['Big_Shoulders_Display']">{pendingProps}</span>
              <Clock className="w-4 h-4 text-[#ffb000]" />
            </div>
          </div>

          <div className="p-4 rounded-[3px] bg-[#121316] border border-[#26292d] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff4b4b] block font-['Barlow_Semi_Condensed']">NEEDS REVISION</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-[#ff4b4b] font-['Big_Shoulders_Display']">{rejectedProps}</span>
              <XCircle className="w-4 h-4 text-[#ff4b4b]" />
            </div>
          </div>
        </div>

        {/* Verification Info Banner */}
        <div className="p-4 rounded-[3px] bg-[#121316] border border-[#26292d] space-y-2">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] text-[#ffb000] shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white font-['Barlow_Semi_Condensed']">CAMPUS AUDIT TIMELINE PROTOCOL</h3>
              <p className="text-xs text-[#a7aaaf] leading-relaxed font-['Barlow_Semi_Condensed']">
                All student accommodations listed on PG Made Eazy undergo a physical audit and license verification within 24-48 hours before becoming live to students.
              </p>
            </div>
          </div>
        </div>

        {/* Listed Properties Catalog Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#202226]">
            <h2 className="text-base font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display']">
              HOSTED PROPERTIES ({properties.length})
            </h2>
            <Link
              to="/provider-dashboard/my-properties"
              className="text-xs font-['Barlow_Semi_Condensed'] text-[#ffb000] hover:text-white flex items-center gap-1 uppercase tracking-wider transition-colors"
            >
              <span>MANAGE FULL DIRECTORY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="board text-center p-12 max-w-md mx-auto space-y-4">
              <Building className="w-8 h-8 text-[#a7aaaf] mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display']">
                  NO PROPERTIES ONBOARDED YET
                </h3>
                <p className="text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed']">
                  Onboard your student hostel or PG stay to start receiving scholar bookings.
                </p>
              </div>
              <button
                onClick={() => navigate('/provider-dashboard/add-property')}
                className="btn-solari btn-solari-amber text-xs mx-auto"
              >
                + ONBOARD PG STAY
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map((property, pIdx) => {
                const statusInfo = getStatusBadge(property.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={property.id || pIdx}
                    className="rounded-[3px] overflow-hidden bg-[#121316] border border-[#26292d] hover:border-[#ffb000]/60 transition-all flex flex-col justify-between group"
                  >
                    {/* Thumbnail Section */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0b0d]">
                      <img
                        src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                        alt={property.name}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-80" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-2.5 right-2.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-[2px] font-['Barlow_Semi_Condensed'] ${statusInfo.bg}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusInfo.label}</span>
                        </span>
                      </div>

                      {/* Rent Badge */}
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#0b0b0d]/90 text-[#ffb000] border border-[#ffb000]/40 font-['Big_Shoulders_Display'] tracking-wider">
                          ₹{property.rent?.toLocaleString()}<span className="text-[10px] text-[#a7aaaf] font-['Barlow_Semi_Condensed']">/BED/MO</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-bold uppercase tracking-[0.14em] text-white font-['Big_Shoulders_Display'] group-hover:text-[#ffb000] transition-colors truncate">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#a7aaaf] font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                          <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                          <span className="truncate">{property.city}, {property.area}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#202226] text-xs text-white font-['Barlow_Semi_Condensed'] uppercase tracking-wider">
                          <div>
                            <span className="text-[#a7aaaf] block text-[10px]">INVENTORY</span>
                            <span className="font-semibold">{property.rooms} ROOMS TOTAL</span>
                          </div>
                          <div>
                            <span className="text-[#a7aaaf] block text-[10px]">STRUCTURE</span>
                            <span className="font-semibold truncate block">{property.buildingType || 'STUDENT PG'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="btn-solari btn-solari-steel text-xs w-full justify-center group-hover:border-[#ffb000]/60 group-hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#ffb000]" />
                        <span>EDIT PROPERTY DOSSIER</span>
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
