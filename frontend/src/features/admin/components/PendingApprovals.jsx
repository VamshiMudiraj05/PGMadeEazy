import { useState, useEffect } from 'react';
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
    } catch {
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
    } catch {
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
      } catch {
        toast.error('Failed to reject property');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#1f2226] flex flex-col items-center justify-center gap-4 text-[#f2f2f2] font-['Barlow_Semi_Condensed']">
        <div className="h-8 w-8 border-2 border-[#ffb000] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#a7aaaf]">LOADING AUDIT REQUESTS...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] py-10 min-h-screen relative font-['Barlow_Semi_Condensed']">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Navigation & Header */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/admin-dashboard')}
                className="btn-solari btn-solari-steel text-xs py-1.5 px-3"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
              <span className="w-2.5 h-2.5 bg-[#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                PENDING PROPERTY APPROVALS ({pendingProperties.length})
              </h2>
            </div>
          </div>
        </div>

        {error ? (
          <div className="board text-center max-w-md mx-auto space-y-4">
            <p className="text-xs font-mono text-red-400 uppercase tracking-wider">{error}</p>
            <button
              onClick={loadPendingProperties}
              className="btn-solari btn-solari-amber text-xs"
            >
              RETRY FETCH
            </button>
          </div>
        ) : pendingProperties.length === 0 ? (
          <div className="board text-center max-w-md mx-auto space-y-4 py-12">
            <Building className="w-10 h-10 text-[#a7aaaf] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white uppercase font-['Big_Shoulders_Display'] tracking-[0.1em]">
                NO PENDING AUDITS
              </h2>
              <p className="text-xs text-[#a7aaaf]">
                All submitted accommodations have been processed. The review queue is empty.
              </p>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="btn-solari btn-solari-steel text-xs"
            >
              RETURN TO CONTROL CENTER
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingProperties.map((property, pIdx) => (
              <div 
                key={property.id || pIdx} 
                className="rounded-[3px] overflow-hidden bg-[#0e0f11] border border-[#2a2d31] hover:border-[#ffb000]/60 transition-colors flex flex-col justify-between"
              >
                {property.images && property.images.length > 0 && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={getSecureImageUrl(property.images[0])}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f11] via-transparent to-transparent opacity-80" />
                  </div>
                )}
                
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white uppercase tracking-[0.08em] font-['Big_Shoulders_Display'] truncate">
                        {property.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#a7aaaf]">
                        <MapPin className="w-3.5 h-3.5 text-[#ffb000] shrink-0" />
                        <span className="truncate uppercase">{property.city}, {property.area}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#202226] text-xs text-white">
                      <div>
                        <span className="text-[#a7aaaf] block text-[10px] uppercase tracking-wider">TARIFF</span>
                        <span className="font-bold text-[#ffb000] font-['Big_Shoulders_Display'] text-base">₹{property.rent?.toLocaleString()}/MO</span>
                      </div>
                      <div>
                        <span className="text-[#a7aaaf] block text-[10px] uppercase tracking-wider">ROOMS</span>
                        <span className="font-mono font-bold">{property.rooms} ROOMS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-[#202226] flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleApprove(property.id)}
                      className="flex-1 py-2 px-3 rounded-[2px] bg-emerald-500 hover:bg-emerald-400 text-[#0b0b0d] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>APPROVE</span>
                    </button>
                    <button
                      onClick={() => handleReject(property.id)}
                      className="flex-1 py-2 px-3 rounded-[2px] bg-[#0b0b0d] border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>REJECT</span>
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