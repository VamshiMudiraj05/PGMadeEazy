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
        return 'bg-emerald-500 text-black';
      case 'PENDING':
        return 'bg-amber-500 text-black';
      default:
        return 'bg-red-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading resident records...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">Occupancy Roster</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Current Resident Directory
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-sm bg-[#121217] border border-red-500/30 text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-sm bg-[#FF5A36] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Reload Directory
            </button>
          </div>
        ) : tenants.length === 0 ? (
          <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
            <Users className="w-8 h-8 text-[#7A7A85] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Active Residents</h2>
              <p className="text-xs text-[#7A7A85]">
                When seekers complete reservations and security settlements, their profiles will appear here.
              </p>
            </div>
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="px-4 py-2 rounded-sm bg-[#181820] border border-[#22222A] text-[#9E9EA7] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Return to Hub
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenants.map((tenant, idx) => (
              <div 
                key={tenant._id || idx} 
                className="rounded-sm bg-[#121217] border border-[#1E1E26] p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Seeker Profile Head */}
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-sm bg-[#181820] border border-[#22222A] flex items-center justify-center text-[#FF5A36] font-bold text-sm shrink-0">
                      {tenant.seeker?.name?.charAt(0)?.toUpperCase() || 'R'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white truncate">{tenant.seeker?.name || 'Resident Seeker'}</h3>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-xs text-[#7A7A85] truncate flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#FF5A36] shrink-0" />
                        <span className="truncate">{tenant.seeker?.email}</span>
                      </p>
                      {tenant.seeker?.phone && (
                        <p className="text-xs text-[#7A7A85] flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#FF5A36] shrink-0" />
                          <span>{tenant.seeker?.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Accommodation Specs */}
                  <div className="space-y-2 py-3 border-y border-[#1E1E26] text-xs">
                    <div className="flex items-center justify-between text-[#7A7A85]">
                      <span className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#FF5A36]" />
                        <span>Property:</span>
                      </span>
                      <span className="font-semibold text-white truncate max-w-[160px]">
                        {tenant.property?.name || 'Assigned Room'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#7A7A85]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FF5A36]" />
                        <span>Schedule:</span>
                      </span>
                      <span className="font-mono text-white font-medium">
                        {new Date(tenant.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(tenant.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Bar Footer */}
                <div className="pt-2 border-t border-[#1E1E26] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#7A7A85]">
                    <span>Reservation:</span>
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(tenant.status)}`}>
                      {tenant.status || 'ACTIVE'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#7A7A85]">
                    <span>Gateway Escrow:</span>
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(tenant.paymentStatus)}`}>
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