import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Building,
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
      <div className="min-h-[calc(100vh-140px)] bg-[#0B0B0E] flex flex-col items-center justify-center gap-3 text-[#FAFAFA]">
        <div className="h-6 w-6 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A7A85]">Loading host directory...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E26]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="p-2 rounded-sm bg-[#121217] border border-[#22222A] text-[#9E9EA7] hover:text-white hover:border-[#FF5A36] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">Provider Network</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Host Provider Roster ({providers.length})
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-sm bg-[#121217] border border-red-500/30 text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={fetchProviders}
              className="px-4 py-2 rounded-sm bg-[#FF5A36] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : providers.length === 0 ? (
          <div className="p-12 rounded-sm bg-[#121217] border border-[#1E1E26] text-center max-w-md mx-auto space-y-4">
            <User className="w-8 h-8 text-[#7A7A85] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Registered Hosts</h2>
              <p className="text-xs text-[#7A7A85]">
                When hosts register their accounts and list accommodations, their verified profiles will appear here.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="px-4 py-2 rounded-sm bg-[#181820] border border-[#22222A] text-[#9E9EA7] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Back to Operations Center
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div 
                key={provider.id} 
                className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Host Profile Header */}
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-sm bg-[#FF5A36] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {provider.fullName?.charAt(0)?.toUpperCase() || 'H'}
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-white truncate">{provider.fullName || 'Property Host'}</h2>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-[#7A7A85] font-mono">ID: {provider.id}</p>
                    </div>
                  </div>

                  {/* Contact Specs */}
                  <div className="space-y-2 py-3 border-y border-[#1E1E26] text-xs">
                    <div className="flex items-center gap-2 text-[#FAFAFA]">
                      <Phone className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                      <span>{provider.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#FAFAFA]">
                      <Mail className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                      <span className="truncate">{provider.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#FAFAFA]">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5A36] shrink-0" />
                      <span className="truncate">{provider.currentCity || 'Location Pending'}</span>
                    </div>
                    {provider.dateOfBirth && (
                      <div className="flex items-center gap-2 text-[#7A7A85]">
                        <Calendar className="w-3.5 h-3.5 text-[#7A7A85] shrink-0" />
                        <span>DOB: {provider.dateOfBirth}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Identity Metadata Footer */}
                <div className="pt-2 space-y-1 text-xs">
                  <div className="flex justify-between items-center text-[#7A7A85]">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Gender:</span>
                    <span className="text-white capitalize font-medium">{provider.gender || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#7A7A85]">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Govt ID:</span>
                    <span className="text-[#FF5A36] uppercase font-bold text-[10px]">{provider.govtIdType || 'Aadhaar'}</span>
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