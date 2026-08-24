import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  XCircle, 
  AlertTriangle,
  User,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { getSecureImageUrl } from '../../../utils/imageUtils';

const AdminRejectedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadRejectedProperties();
  }, []);

  const loadRejectedProperties = async () => {
    try {
      setLoading(true);
      const rejectedProperties = await propertyApi.getRejectedProperties();
      setProperties(rejectedProperties || []);
    } catch (err) {
      toast.error('Failed to load rejected properties');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white select-none">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading audit archives...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

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
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">COMPLIANCE ARCHIVES</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Rejected Accommodations ({properties.length})
              </h1>
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Rejected Accommodations</h2>
              <p className="text-xs text-neutral-400">
                All submitted listings meet quality guidelines and zero accommodations are currently in the rejected state.
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
            {properties.map((property, pIdx) => (
              <div
                key={property.id || pIdx}
                className="rounded-2xl overflow-hidden bg-[#141414] border border-red-500/30 flex flex-col justify-between shadow-xl hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-300"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={getSecureImageUrl(property.images?.[0] || null, pIdx)}
                    alt={property.name}
                    className="w-full h-full object-cover grayscale-[30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-600 text-white shadow-md">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Rejected</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Rejection Audit Reason Banner */}
                    <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Audit Finding:</span>
                      </div>
                      <p className="text-xs text-neutral-200 leading-relaxed">
                        {property.rejectionReason || 'No specific reason provided in audit record.'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white truncate">
                        {property.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                        <span className="truncate">{property.city}, {property.area}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-white/10 text-xs text-white">
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Monthly Tariff</span>
                        <span className="font-extrabold text-[#E50914]">₹{property.rent?.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Inventory</span>
                        <span className="font-semibold">{property.rooms} Rooms</span>
                      </div>
                    </div>

                    {/* Owner Details */}
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 text-white font-medium truncate">
                        <User className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>{property.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] pl-5">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{property.ownerEmail}</span>
                      </div>
                    </div>
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

export default AdminRejectedProperties;