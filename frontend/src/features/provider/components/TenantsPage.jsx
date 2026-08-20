import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Home, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  XCircle,
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
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PENDING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-100">
        <div className="h-12 w-12 border-3 border-orange-500 border-t-transparent rounded-full animate-spin glow-orange-sm" />
        <p className="text-sm font-semibold text-zinc-400">Loading resident tenant records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Current Resident Directory
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Verified occupants staying across your listed properties</p>
            </div>
          </div>
        </div>

        {error ? (
          <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
            >
              Reload Data
            </button>
          </div>
        ) : tenants.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-zinc-800 text-center max-w-md mx-auto glow-orange-sm">
            <Users className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold text-white mb-1.5">No Active Tenants Found</h2>
            <p className="text-xs text-zinc-400 mb-6">
              When seekers reserve your rooms and complete their deposits, their profiles and contact info will appear here.
            </p>
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-xs transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenants.map((tenant, idx) => (
              <div 
                key={tenant._id || idx} 
                className="glass-panel p-6 rounded-3xl border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-orange-500/5 glow-orange-sm"
              >
                <div>
                  {/* Seeker Profile Head */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-extrabold text-base shrink-0">
                      {tenant.seeker?.name?.charAt(0)?.toUpperCase() || 'R'}
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white truncate">{tenant.seeker?.name || 'Resident Seeker'}</h3>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-xs text-zinc-400 truncate flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-orange-500 shrink-0" />
                        <span className="truncate">{tenant.seeker?.email}</span>
                      </p>
                      {tenant.seeker?.phone && (
                        <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3 text-orange-500 shrink-0" />
                          <span>{tenant.seeker?.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Accommodation Specs */}
                  <div className="space-y-2.5 py-3 border-y border-zinc-800/80 text-xs">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-orange-500" />
                        <span>Property:</span>
                      </span>
                      <span className="font-semibold text-white truncate max-w-[160px]">
                        {tenant.property?.name || 'Assigned Room'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        <span>Duration:</span>
                      </span>
                      <span className="font-mono text-zinc-200">
                        {new Date(tenant.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(tenant.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Bar Footer */}
                <div className="mt-4 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Booking Reservation:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(tenant.status)}`}>
                      {tenant.status || 'ACTIVE'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Escrow Payment:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(tenant.paymentStatus)}`}>
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