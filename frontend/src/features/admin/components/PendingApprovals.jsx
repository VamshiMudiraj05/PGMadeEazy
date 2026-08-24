import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  Check, 
  X,
  AlertCircle
} from 'lucide-react';
import { propertyApi } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { getSecureImageUrl } from '../../../utils/imageUtils';

export default function PendingApprovals() {
  const navigate = useNavigate();
  const [pendingProperties, setPendingProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPendingProperties();
  }, []);

  const loadPendingProperties = async () => {
    try {
      setLoading(true);
      const properties = await propertyApi.getPendingProperties();
      setPendingProperties(properties || []);
    } catch (err) {
      setError('Failed to load pending properties');
      toast.error('Failed to load pending properties');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (propertyId) => {
    try {
      await propertyApi.approveProperty(propertyId, 'Property approved by admin');
      toast.success('Property approved successfully');
      loadPendingProperties();
    } catch (err) {
      toast.error('Failed to approve property');
    }
  };

  const handleReject = async (propertyId) => {
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      try {
        await propertyApi.rejectProperty(propertyId, reason);
        toast.success('Property rejected successfully');
        loadPendingProperties();
      } catch (err) {
        toast.error('Failed to reject property');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#050505] flex flex-col items-center justify-center gap-4 text-white select-none">
        <div className="h-8 w-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#E50914]" />
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading audit requests...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white py-10 min-h-screen relative select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 relative z-10">
        
        {/* Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-neutral-400 hover:text-white hover:border-red-600/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#E50914]">PENDING AUDITS</div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Pending Property Approvals
              </h1>
            </div>
          </div>
        </div>

        {error ? (
          <div className="p-8 rounded-2xl bg-[#141414] border border-red-500/30 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <p className="text-xs font-semibold text-red-400">{error}</p>
            <button
              onClick={loadPendingProperties}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : pendingProperties.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141414] border border-white/10 text-center max-w-md mx-auto space-y-4 shadow-xl">
            <Building className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">No Pending Audits</h2>
              <p className="text-xs text-neutral-400">
                All submitted accommodations have been processed. The review queue is empty.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingProperties.map((property, pIdx) => (
              <div key={property.id || pIdx} className="rounded-2xl overflow-hidden bg-[#141414] border border-white/10 hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between shadow-xl">
                {property.images && property.images.length > 0 && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={getSecureImageUrl(property.images[0])}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                  </div>
                )}
                
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white truncate">{property.name}</h3>
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
                  </div>
                  
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleApprove(property.id)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(property.id)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
 