import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Building,
  UserCheck
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const TenantsPage = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        if (!user?.email) {
          setError('Host warden identity verification missing');
          setLoading(false);
          return;
        }

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await axios.get(`${apiBaseUrl}/api/properties/owner/email/${encodeURIComponent(user.email)}`);
        const tenantsData = Array.isArray(response.data) ? response.data : [];
        setTenants(tenantsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tenants:', err);
        setError('Failed to fetch resident student records');
        setLoading(false);
      }
    };

    fetchTenants();
  }, [user?.email]);

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED':
      case 'PAID':
        return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40';
      case 'PENDING':
        return 'bg-[#ffb000]/15 text-[#ffb000] border border-[#ffb000]/40';
      default:
        return 'bg-red-500/15 text-red-400 border border-red-500/40';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0a0a0c] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#ffb000]">
          SYNCING RESIDENT MANIFEST...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0c] text-neutral-100 py-10 min-h-screen relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Departure Header */}
        <div className="board p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/provider-dashboard')}
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#ffb000]/40 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#ffb000] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffb000]">
                    TERMINAL 03 // STUDENT RESIDENT ROSTER
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-['Big_Shoulders_Display']">
                  Occupancy & Resident Directory
                </h1>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="board p-8 text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-mono text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-solari-amber cursor-pointer"
            >
              Reload Roster
            </button>
          </div>
        ) : tenants.length === 0 ? (
          <div className="board p-12 text-center max-w-md mx-auto space-y-4">
            <Users className="w-8 h-8 text-neutral-500 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white uppercase font-['Big_Shoulders_Display']">
                Zero Active Student Residents
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                When students complete bed reservations and deposit clearance, their scholar dossiers will appear here.
              </p>
            </div>
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="btn-solari-amber w-full cursor-pointer"
            >
              Return to Flight Deck
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenants.map((tenant, idx) => (
              <div 
                key={tenant._id || idx} 
                className="board p-5 flex flex-col justify-between space-y-4 hover:border-[#ffb000]/60 transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Student Dossier Head */}
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded bg-[#ffb000]/15 border border-[#ffb000]/40 flex items-center justify-center text-[#ffb000] font-mono font-bold text-sm shrink-0">
                      {tenant.seeker?.name?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white font-mono uppercase truncate">
                          {tenant.seeker?.name || 'Student Resident'}
                        </h3>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-xs font-mono text-neutral-400 truncate flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#ffb000] shrink-0" />
                        <span className="truncate">{tenant.seeker?.email}</span>
                      </p>
                      {tenant.seeker?.phone && (
                        <p className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#ffb000] shrink-0" />
                          <span>{tenant.seeker?.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Accommodation Specs */}
                  <div className="space-y-2 py-3 border-y border-neutral-800 text-xs font-mono">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#ffb000]" />
                        <span>Hostel:</span>
                      </span>
                      <span className="font-semibold text-white truncate max-w-[160px]">
                        {tenant.property?.name || 'Assigned Dorm'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#ffb000]" />
                        <span>Term:</span>
                      </span>
                      <span className="text-white font-medium">
                        {new Date(tenant.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(tenant.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Bar Footer */}
                <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span className="text-[10px] uppercase tracking-wider">Bed Manifest:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(tenant.status)}`}>
                      {tenant.status || 'ACTIVE'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span className="text-[10px] uppercase tracking-wider">Rent Escrow:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(tenant.paymentStatus)}`}>
                      {tenant.paymentStatus || 'PAID'}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default TenantsPage;