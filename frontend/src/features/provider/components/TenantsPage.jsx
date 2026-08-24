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
          setError('Host email verification not found');
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
        setError('Failed to fetch resident tenant records');
        setLoading(false);
      }
    };

    fetchTenants();
  }, [user?.email]);

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED':
      case 'PAID':
        return 'bg-emerald-500 text-black shadow-md';
      case 'PENDING':
        return 'bg-amber-500 text-black shadow-md';
      default:
        return 'bg-red-600 text-white shadow-md';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading resident records...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">OCCUPANCY ROSTER</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Current Resident Directory
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-2xl bg-[#141414] border border-red-500/30 text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Reload Directory
            </button>
          </div>
        ) : tenants.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <Users className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Active Residents</h2>
              <p className="text-xs text-neutral-400">
                When seekers complete reservations and security settlements, their profiles will appear here.
              </p>
            </div>
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="w-full py-3 px-4 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Return to Hub
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenants.map((tenant, idx) => (
              <div 
                key={tenant._id || idx} 
                className="rounded-2xl bg-[#141414] border border-white/10 p-5 flex flex-col justify-between space-y-4 shadow-xl hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Seeker Profile Head */}
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center text-[#E50914] font-extrabold text-sm shrink-0">
                      {tenant.seeker?.name?.charAt(0)?.toUpperCase() || 'R'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white truncate">{tenant.seeker?.name || 'Resident Seeker'}</h3>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-xs text-neutral-400 truncate flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#E50914] shrink-0" />
                        <span className="truncate">{tenant.seeker?.email}</span>
                      </p>
                      {tenant.seeker?.phone && (
                        <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#E50914] shrink-0" />
                          <span>{tenant.seeker?.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Accommodation Specs */}
                  <div className="space-y-2 py-3 border-y border-white/10 text-xs">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>Property:</span>
                      </span>
                      <span className="font-semibold text-white truncate max-w-[160px]">
                        {tenant.property?.name || 'Assigned Room'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>Schedule:</span>
                      </span>
                      <span className="font-mono text-white font-medium">
                        {new Date(tenant.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(tenant.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Bar Footer */}
                <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Reservation:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(tenant.status)}`}>
                      {tenant.status || 'ACTIVE'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Gateway Escrow:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(tenant.paymentStatus)}`}>
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