import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  UserCheck
} from 'lucide-react';
import { adminApi } from '../../../services/api';
import { toast } from 'react-hot-toast';

const Providers = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getProviders();
      setProviders(response || []);
    } catch (error) {
      console.error('Error fetching providers:', error);
      setError('Failed to load providers');
      toast.error('Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white select-none">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading host directory...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">PROVIDER NETWORK</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Host Provider Roster ({providers.length})
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-2xl bg-[#141414] border border-red-500/30 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={fetchProviders}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Retry Loading
            </button>
          </div>
        ) : providers.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <User className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Registered Hosts</h2>
              <p className="text-xs text-neutral-400">
                When hosts register their accounts and list accommodations, their verified profiles will appear here.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="w-full py-3 px-4 bg-white/5 border border-white/10 text-neutral-400 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer"
            >
              Back to Operations Center
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div 
                key={provider.id} 
                className="p-6 rounded-2xl bg-[#141414] border border-white/10 flex flex-col justify-between space-y-4 shadow-xl hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Host Profile Header */}
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-[0_0_15px_rgba(229,9,20,0.3)]">
                      {provider.fullName?.charAt(0)?.toUpperCase() || 'H'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-white truncate">{provider.fullName || 'Property Host'}</h2>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-neutral-400 font-mono">ID: {provider.id}</p>
                    </div>
                  </div>

                  {/* Contact Specs */}
                  <div className="space-y-2 py-3 border-y border-white/10 text-xs">
                    <div className="flex items-center gap-2 text-white">
                      <Phone className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span>{provider.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Mail className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span className="truncate">{provider.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span className="truncate">{provider.currentCity || 'Location Pending'}</span>
                    </div>
                    {provider.dateOfBirth && (
                      <div className="flex items-center gap-2 text-neutral-400">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>DOB: {provider.dateOfBirth}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Identity Metadata Footer */}
                <div className="pt-2 space-y-1 text-xs">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Gender:</span>
                    <span className="text-white capitalize font-medium">{provider.gender || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Govt ID:</span>
                    <span className="text-[#E50914] uppercase font-bold text-[10px]">{provider.govtIdType || 'Aadhaar'}</span>
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

export default Providers;